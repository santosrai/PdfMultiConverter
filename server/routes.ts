import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";
import { promisify } from "util";
import multer from "multer";
import { z } from "zod";
import { convertToPdf, getFileType, FileType } from "./converters/libreoffice";
import JSZip from "jszip";

// Create temp upload directory
const uploadsDir = path.join(process.cwd(), "uploads");
const outputDir = path.join(process.cwd(), "converted");

// Make directories if they don't exist
fs.mkdirSync(uploadsDir, { recursive: true });
fs.mkdirSync(outputDir, { recursive: true });

// Configure multer storage
const storage_config = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Create a unique filename with original name
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

// File filter to accept PPT/PPTX and DOC/DOCX files
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = [
    // PowerPoint
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    // Word
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  
  const allowedExtensions = [".ppt", ".pptx", ".doc", ".docx"];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedMimeTypes.includes(file.mimetype) || allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only PowerPoint (.ppt, .pptx) and Word (.doc, .docx) files are allowed"));
  }
};

// Set up multer with limits
const upload = multer({
  storage: storage_config,
  fileFilter: fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB max file size
  },
});

// Cleanup function to remove old files
async function cleanupOldFiles() {
  const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const now = Date.now();

  try {
    // Clean uploads directory
    const uploadFiles = await fs.promises.readdir(uploadsDir);
    for (const file of uploadFiles) {
      const filePath = path.join(uploadsDir, file);
      const stats = await fs.promises.stat(filePath);
      if (now - stats.mtime.getTime() > oneDay) {
        await fs.promises.unlink(filePath);
      }
    }

    // Clean output directory
    const outputFiles = await fs.promises.readdir(outputDir);
    for (const file of outputFiles) {
      const filePath = path.join(outputDir, file);
      const stats = await fs.promises.stat(filePath);
      if (now - stats.mtime.getTime() > oneDay) {
        await fs.promises.unlink(filePath);
      }
    }
  } catch (error) {
    console.error("Error cleaning up old files:", error);
  }
}

// Run cleanup every hour
setInterval(cleanupOldFiles, 60 * 60 * 1000);

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to handle file uploads and conversion
  app.post("/api/conversion", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const file = req.file;
      const stats = await fs.promises.stat(file.path);

      // Create conversion job in storage
      const job = await storage.createConversionJob({
        originalFileName: file.originalname,
        originalFilePath: file.path,
        fileSize: stats.size,
      });

      // Generate output filename (with .pdf extension)
      const outputFileName = path.basename(file.originalname, path.extname(file.originalname)) + ".pdf";
      const outputPath = path.join(outputDir, job.id + "_" + outputFileName);

      try {
        // Convert file to PDF
        await convertToPdf(file.path, outputPath);

        // Update job with success info
        const outputStats = await fs.promises.stat(outputPath);
        await storage.updateConversionJob(job.id, {
          status: "completed",
          progress: 100,
          outputFilePath: outputPath,
          outputFileSize: outputStats.size,
        });

        // Return success response
        res.status(200).json({
          id: job.id,
          name: outputFileName,
          pdfUrl: `/api/files/${job.id}/${encodeURIComponent(outputFileName)}`,
          pdfSize: outputStats.size,
        });
      } catch (error) {
        console.error("Conversion error:", error);
        
        // Update job with error info
        await storage.updateConversionJob(job.id, {
          status: "failed",
          error: String(error),
        });
        
        res.status(500).json({ message: "Conversion failed", error: String(error) });
      }
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "File upload failed", error: String(error) });
    }
  });

  // API route to serve converted files
  app.get("/api/files/:id/:filename", async (req, res) => {
    try {
      const { id, filename } = req.params;
      
      // Get job from storage
      const job = await storage.getConversionJob(parseInt(id));
      
      if (!job || !job.outputFilePath) {
        return res.status(404).json({ message: "File not found" });
      }
      
      // Check if file exists
      if (!fs.existsSync(job.outputFilePath)) {
        return res.status(404).json({ message: "File not found" });
      }
      
      // Stream the file as response
      res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(filename)}"`);
      res.setHeader("Content-Type", "application/pdf");
      
      const fileStream = fs.createReadStream(job.outputFilePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error("File serving error:", error);
      res.status(500).json({ message: "Error serving file", error: String(error) });
    }
  });

  // API route to cancel conversion
  app.post("/api/conversion/:id/cancel", async (req, res) => {
    try {
      const { id } = req.params;
      
      await storage.updateConversionJob(parseInt(id), {
        status: "cancelled",
      });
      
      res.status(200).json({ message: "Conversion cancelled" });
    } catch (error) {
      console.error("Cancellation error:", error);
      res.status(500).json({ message: "Error cancelling conversion", error: String(error) });
    }
  });

  // API route to download multiple files as ZIP
  app.post("/api/download/zip", async (req, res) => {
    try {
      // Validate request body
      const schema = z.object({
        fileIds: z.array(z.number()),
      });
      
      const { fileIds } = schema.parse(req.body);
      
      if (fileIds.length === 0) {
        return res.status(400).json({ message: "No file IDs provided" });
      }
      
      // Create ZIP file
      const zip = new JSZip();
      
      // Add files to ZIP
      for (const id of fileIds) {
        const job = await storage.getConversionJob(id);
        
        if (job && job.outputFilePath && fs.existsSync(job.outputFilePath)) {
          const fileContent = await fs.promises.readFile(job.outputFilePath);
          const filename = path.basename(job.outputFilePath);
          
          zip.file(filename, fileContent);
        }
      }
      
      // Generate ZIP file
      const zipContent = await zip.generateAsync({ type: "nodebuffer" });
      
      // Send ZIP file
      res.setHeader("Content-Disposition", "attachment; filename=converted_pdfs.zip");
      res.setHeader("Content-Type", "application/zip");
      res.send(zipContent);
    } catch (error) {
      console.error("ZIP creation error:", error);
      res.status(500).json({ message: "Error creating ZIP file", error: String(error) });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
