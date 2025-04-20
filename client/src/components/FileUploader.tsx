import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { UploadedFile, FileStatus, generateId } from "@/lib/fileUtils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface FileUploaderProps {
  onFilesAdded: (files: UploadedFile[]) => void;
}

export default function FileUploader({ onFilesAdded }: FileUploaderProps) {
  const { toast } = useToast();
  
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Filter for PPT/PPTX and DOC/DOCX files
      const validTypeFiles = acceptedFiles.filter(
        (file) =>
          // PowerPoint files
          file.type === "application/vnd.ms-powerpoint" ||
          file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
          file.name.toLowerCase().endsWith(".ppt") ||
          file.name.toLowerCase().endsWith(".pptx") ||
          // Word files
          file.type === "application/msword" ||
          file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          file.name.toLowerCase().endsWith(".doc") || 
          file.name.toLowerCase().endsWith(".docx")
      );

      if (validTypeFiles.length === 0) {
        toast({
          title: "Invalid files",
          description: "Please upload only PowerPoint (.ppt/.pptx) or Word (.doc/.docx) files",
          variant: "destructive",
        });
        return;
      }

      // Check file size limit (100MB)
      const MAX_SIZE = 100 * 1024 * 1024; // 100MB
      const validFiles = validTypeFiles.filter((file) => file.size <= MAX_SIZE);
      
      if (validFiles.length < validTypeFiles.length) {
        toast({
          title: "File size exceeded",
          description: "Some files exceed the 100MB limit and were excluded.",
          variant: "destructive",
        });
      }

      // Check batch limit (10 files)
      const MAX_FILES = 10;
      const filesToProcess = validFiles.slice(0, MAX_FILES);
      
      if (filesToProcess.length < validFiles.length) {
        toast({
          title: "Too many files",
          description: `Maximum ${MAX_FILES} files can be uploaded at once. Only the first ${MAX_FILES} will be processed.`,
          variant: "destructive",
        });
      }

      // Create UploadedFile objects
      const uploadedFiles: UploadedFile[] = filesToProcess.map((file) => ({
        id: generateId(),
        name: file.name,
        size: file.size,
        fileData: file,
        status: FileStatus.QUEUED,
        progress: 0,
        createdAt: new Date(),
      }));

      onFilesAdded(uploadedFiles);
    },
    [onFilesAdded, toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      // PowerPoint formats
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      // Word formats
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
  });

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-primary bg-blue-50"
              : "border-gray-300 hover:border-primary"
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            <Upload className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-1">
              {isDragActive
                ? "Drop your files here"
                : "Drag & drop files here"}
            </h3>
            <p className="text-gray-500 mb-4 text-sm">Or click to browse your files</p>
            <Button>Select Files</Button>
            <input {...getInputProps()} />
            <p className="text-xs text-gray-500 mt-4">
              Supported formats: PowerPoint (.ppt, .pptx) and Word (.doc, .docx) 
              <br />(Max 10 files, 100MB each)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
