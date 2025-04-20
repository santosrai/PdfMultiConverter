import { useState } from "react";
import FileUploader from "@/components/FileUploader";
import FilesList from "@/components/FilesList";
import DownloadSection from "@/components/DownloadSection";
import InfoSection from "@/components/InfoSection";
import Footer from "@/components/Footer";
import { FileStatus, UploadedFile, ConvertedFile } from "@/lib/fileUtils";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
  const { toast } = useToast();

  const handleFilesAdded = (files: UploadedFile[]) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
    
    if (files.length > 0) {
      toast({
        title: "Files added successfully!",
        description: `${files.length} file${files.length > 1 ? 's' : ''} has been added to the queue.`,
      });
    }
  };

  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles((prevFiles) => 
      prevFiles.filter((file) => file.id !== fileId)
    );
  };

  const handleCancelConversion = async (fileId: string) => {
    try {
      console.log("Cancelling conversion for file:", fileId);
      const response = await fetch(`/api/conversion/${fileId}/cancel`, {
        method: "POST",
        // Remove credentials
      });
      
      console.log("Cancel response status:", response.status);
      
      setUploadedFiles((prevFiles) =>
        prevFiles.map((file) =>
          file.id === fileId
            ? { ...file, status: FileStatus.CANCELLED }
            : file
        )
      );
      
      toast({
        title: "Conversion cancelled",
        description: "The file conversion was cancelled.",
      });
    } catch (error) {
      console.error("Error cancelling conversion:", error);
      toast({
        title: "Error",
        description: "Failed to cancel conversion.",
        variant: "destructive",
      });
    }
  };

  const handleConvertAll = async () => {
    const filesToConvert = uploadedFiles.filter(
      (file) => file.status === FileStatus.QUEUED
    );
    
    if (filesToConvert.length === 0) {
      toast({
        title: "No files to convert",
        description: "Please upload files first.",
        variant: "destructive",
      });
      return;
    }

    // Update all queued files to processing
    setUploadedFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.status === FileStatus.QUEUED
          ? { ...file, status: FileStatus.PROCESSING, progress: 0 }
          : file
      )
    );

    // Start processing each file
    for (const file of filesToConvert) {
      try {
        console.log("Starting conversion for file:", file.name);
        const formData = new FormData();
        formData.append("file", file.fileData);

        console.log("Sending fetch request to /api/conversion");
        const response = await fetch("/api/conversion", {
          method: "POST",
          body: formData,
          // Don't include credentials as they might cause issues
        });

        console.log("Response status:", response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Conversion API error:", errorText);
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        console.log("Conversion result:", result);
        
        // Update the file with completed status
        setUploadedFiles((prevFiles) =>
          prevFiles.map((prevFile) =>
            prevFile.id === file.id
              ? { 
                  ...prevFile, 
                  status: FileStatus.COMPLETED, 
                  progress: 100,
                  pdfUrl: result.pdfUrl,
                  pdfSize: result.pdfSize
                }
              : prevFile
          )
        );

        // Add to converted files
        setConvertedFiles((prevConverted) => [
          ...prevConverted,
          {
            id: result.id,
            name: result.name,
            url: result.pdfUrl,
            size: result.pdfSize,
            dateConverted: new Date(),
          },
        ]);
      } catch (error) {
        console.error("Conversion error:", error);
        
        // Update file with error status
        setUploadedFiles((prevFiles) =>
          prevFiles.map((prevFile) =>
            prevFile.id === file.id
              ? { ...prevFile, status: FileStatus.FAILED, error: String(error) }
              : prevFile
          )
        );
        
        toast({
          title: "Conversion failed",
          description: `Failed to convert ${file.name}. ${String(error)}`,
          variant: "destructive",
        });
      }
    }
    
    toast({
      title: "Conversion completed",
      description: "All files have been processed.",
    });
  };

  const handleClearAll = () => {
    setUploadedFiles([]);
    
    toast({
      title: "All files cleared",
      description: "All uploaded files have been removed from the queue.",
    });
  };

  const handleDownloadAll = async () => {
    if (convertedFiles.length === 0) {
      toast({
        title: "No files to download",
        description: "Please convert files first.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log("Starting ZIP download for files:", convertedFiles.map(f => f.id));
      const response = await fetch("/api/download/zip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileIds: convertedFiles.map(f => f.id)
        }),
        // Remove credentials
      });
      
      console.log("ZIP download response status:", response.status);

      if (!response.ok) {
        throw new Error("Failed to create ZIP file");
      }

      // Create a download link and click it
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "converted_pdfs.zip";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Download started",
        description: "Your ZIP file is being downloaded.",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: String(error),
        variant: "destructive",
      });
    }
  };

  // Mock function to simulate progress updates
  // In a real app, this would be done with WebSockets or Server-Sent Events
  const simulateProgressUpdate = (fileId: string, progress: number) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === fileId && file.status === FileStatus.PROCESSING
          ? { ...file, progress }
          : file
      )
    );
  };

  return (
    <div className="bg-gray-50 font-sans text-gray-800 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-semibold mb-2">Document to PDF Converter</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Convert multiple PowerPoint presentations and Word documents to PDF files in seconds.
            Preserve all formatting and images with our batch converter.
          </p>
        </header>

        <FileUploader onFilesAdded={handleFilesAdded} />

        <FilesList
          files={uploadedFiles}
          onRemove={handleRemoveFile}
          onCancel={handleCancelConversion}
          onConvertAll={handleConvertAll}
          onClearAll={handleClearAll}
          simulateProgress={simulateProgressUpdate}
        />

        <DownloadSection
          files={convertedFiles}
          onDownloadAll={handleDownloadAll}
        />

        <InfoSection />

        <Footer />
      </div>
    </div>
  );
}
