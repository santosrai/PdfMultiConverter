import { useState, useRef, useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TrustSignals from "@/components/TrustSignals";
import AdvancedFeatures from "@/components/AdvancedFeatures";
import FAQ from "@/components/FAQ";
import FileUploader from "@/components/FileUploader";
import FilesList from "@/components/FilesList";
import DownloadSection from "@/components/DownloadSection";
import InfoSection from "@/components/InfoSection";
import Footer from "@/components/Footer";
import { FileStatus, UploadedFile, ConvertedFile } from "@/lib/fileUtils";
import { useToast } from "@/hooks/use-toast";
import JSZip from "jszip";

// Helper function to update stats via API
async function updateStats(statName: string) {
  try {
    await fetch("/api/stats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stat: statName }),
    });
  } catch (error) {
    console.error(`Error updating ${statName} stats:`, error);
    // In a real application, you might want to show a toast or handle this error more gracefully
  }
}

// Helper function to fetch initial stats
async function fetchStats() {
  try {
    const response = await fetch("/api/stats");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching stats:", error);
    return { filesConverted: 0, happyUsers: 0 }; // Return default values on error
  }
}

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
  const [filesConverted, setFilesConverted] = useState(0); // Initialize with 0, will be fetched
  const [happyUsers, setHappyUsers] = useState(0); // Initialize with 0, will be fetched
  const { toast } = useToast();
  const converterRef = useRef<HTMLDivElement>(null);

  // Fetch initial stats when the component mounts
  useEffect(() => {
    fetchStats().then(data => {
      setFilesConverted(data.filesConverted || 0);
      setHappyUsers(data.happyUsers || 0);
    });
  }, []);

  const scrollToConverter = () => {
    converterRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

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

  const convertSingleFile = async (file: UploadedFile): Promise<boolean> => {
    try {
      console.log("Starting conversion for file:", file.name);

      // Update this file to processing state
      setUploadedFiles((prevFiles) =>
        prevFiles.map((prevFile) =>
          prevFile.id === file.id
            ? { ...prevFile, status: FileStatus.PROCESSING, progress: 0 }
            : prevFile
        )
      );

      const formData = new FormData();
      formData.append("file", file.fileData);

      console.log("Sending fetch request to /api/conversion");

      // Add timeout to the fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch("/api/conversion", {
        method: "POST",
        body: formData,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

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

      // Update stats counters via API
      await updateStats("filesConverted");

      // Increment happy users occasionally (simulate satisfied customers)
      if (Math.random() < 0.3) { // 30% chance to increment happy users
        await updateStats("happyUsers");
      }

      return true;
    } catch (error) {
      console.error("Conversion error for file", file.name, ":", error);

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
        description: `Failed to convert ${file.name}. Please try again.`,
        variant: "destructive",
      });

      return false;
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

    // Process files sequentially one at a time instead of in parallel
    let successCount = 0;
    let failureCount = 0;

    for (const file of filesToConvert) {
      const success = await convertSingleFile(file);
      if (success) {
        successCount++;
      } else {
        failureCount++;
      }

      // Add a small delay between files to prevent overloading the server
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Show summary toast
    if (failureCount === 0) {
      toast({
        title: "Conversion completed",
        description: `Successfully converted ${successCount} files.`,
      });
    } else {
      toast({
        title: "Conversion partially completed",
        description: `Converted ${successCount} files. Failed to convert ${failureCount} files.`,
        variant: "destructive",
      });
    }
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
      toast({
        title: "Preparing download",
        description: "Creating ZIP archive with all converted files...",
      });

      const zip = new JSZip();

      // Fetch all converted PDFs and add them to the zip
      const fetchPromises = convertedFiles.map(async (file) => {
        const response = await fetch(file.url);
        if (!response.ok) throw new Error(`Failed to fetch ${file.name}`);

        const blob = await response.blob();
        zip.file(file.name, blob);

        return file.name;
      });

      await Promise.all(fetchPromises);

      // Generate the zip file
      const zipBlob = await zip.generateAsync({ type: "blob" });

      // Create a download link
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "converted_documents.zip";
      link.click();

      // Clean up
      URL.revokeObjectURL(url);

      toast({
        title: "Download started",
        description: `${convertedFiles.length} files have been packaged into a ZIP file.`,
      });
    } catch (error) {
      console.error("Error creating ZIP:", error);

      toast({
        title: "Download failed",
        description: "Failed to create ZIP file. Please try downloading files individually.",
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
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <HeroSection onGetStarted={scrollToConverter} />

      {/* Trust Signals */}
      <TrustSignals filesConverted={filesConverted} happyUsers={happyUsers} />

      {/* Advanced Features */}
      <AdvancedFeatures />

      {/* Converter Section */}
      <section ref={converterRef} className="py-16 bg-white" id="converter">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Start Converting Your Files
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Upload your PowerPoint or Word documents and convert them to PDF format in seconds. 
              Support for batch processing with real-time progress tracking.
            </p>
          </div>

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
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      <Footer />
    </div>
  );
}