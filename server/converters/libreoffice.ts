import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";

const execAsync = promisify(exec);

/**
 * Determines file type based on extension
 */
export enum FileType {
  POWERPOINT = "powerpoint",
  WORD = "word",
  UNKNOWN = "unknown"
}

/**
 * Get file type based on extension
 * 
 * @param filePath Path to the file
 * @returns FileType enum value
 */
export function getFileType(filePath: string): FileType {
  const ext = path.extname(filePath).toLowerCase();
  
  if (['.ppt', '.pptx'].includes(ext)) {
    return FileType.POWERPOINT;
  } else if (['.doc', '.docx'].includes(ext)) {
    return FileType.WORD;
  }
  
  return FileType.UNKNOWN;
}

/**
 * Converts a document file to PDF using LibreOffice
 * Supports PowerPoint (PPT/PPTX) and Word (DOC/DOCX) files
 * 
 * @param inputFile Path to the document file
 * @param outputFile Path where the PDF should be saved
 * @returns Promise that resolves when conversion is complete
 */
export async function convertToPdf(inputFile: string, outputFile: string): Promise<void> {
  try {
    // Ensure input file exists
    if (!fs.existsSync(inputFile)) {
      throw new Error(`Input file not found: ${inputFile}`);
    }
    
    // Get directories
    const inputDir = path.dirname(inputFile);
    const outputDir = path.dirname(outputFile);
    
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Get filenames
    const inputFileName = path.basename(inputFile);
    const outputFileName = path.basename(outputFile);
    
    // Create a temporary directory for conversion
    const tempDir = path.join(process.cwd(), "temp", Date.now().toString());
    fs.mkdirSync(tempDir, { recursive: true });
    
    // Copy input file to temp directory
    await fs.promises.copyFile(inputFile, path.join(tempDir, inputFileName));
    
    // Run LibreOffice conversion command
    // Using headless mode with PDF export
    const command = `libreoffice --headless --convert-to pdf --outdir "${tempDir}" "${path.join(tempDir, inputFileName)}"`;
    
    await execAsync(command, { timeout: 60000 }); // 60 seconds timeout
    
    // The output PDF will have the same name as input but with .pdf extension
    const tempOutputFile = path.join(tempDir, path.basename(inputFile, path.extname(inputFile)) + ".pdf");
    
    // Check if the output file was created
    if (!fs.existsSync(tempOutputFile)) {
      throw new Error("PDF conversion failed - output file not created");
    }
    
    // Move the output file to the desired location
    await fs.promises.rename(tempOutputFile, outputFile);
    
    // Clean up temp directory
    await fs.promises.rm(tempDir, { recursive: true, force: true });
    
    // Check if the file was moved successfully
    if (!fs.existsSync(outputFile)) {
      throw new Error("Failed to move converted PDF file");
    }
    
    return;
  } catch (error: any) {
    // If LibreOffice is not installed, provide a helpful error message
    if (typeof error === 'object' && error?.message?.includes("command not found") && error?.message?.includes("libreoffice")) {
      throw new Error("LibreOffice not installed. Please install LibreOffice to use the converter.");
    }
    
    // Cleanup on error
    if (fs.existsSync(outputFile)) {
      await fs.promises.unlink(outputFile).catch(() => {});
    }
    
    throw error;
  }
}

/**
 * Legacy function for backward compatibility 
 * Redirects to the new convertToPdf function
 * 
 * @deprecated Use convertToPdf instead
 */
export async function convertPptToPdf(inputFile: string, outputFile: string): Promise<void> {
  return convertToPdf(inputFile, outputFile);
}
