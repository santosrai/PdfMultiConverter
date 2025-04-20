import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DownloadCloud,
  Presentation,
  FileText,
  X,
  Trash2,
  File,
} from "lucide-react";
import { UploadedFile, FileStatus, formatFileSize, getFileTypeFromName, FileType } from "@/lib/fileUtils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface FilesListProps {
  files: UploadedFile[];
  onRemove: (id: string) => void;
  onCancel: (id: string) => void;
  onConvertAll: () => void;
  onClearAll: () => void;
  simulateProgress: (id: string, progress: number) => void;
}

// Helper function to get the appropriate icon for the file type
function getFileIcon(file: UploadedFile) {
  const fileType = getFileTypeFromName(file.name);
  
  switch (fileType) {
    case FileType.POWERPOINT:
      return <Presentation className="h-6 w-6" />;
    case FileType.WORD:
      return <File className="h-6 w-6" />;
    case FileType.PDF:
      return <FileText className="h-6 w-6" />;
    default:
      return <File className="h-6 w-6" />;
  }
}

// Helper function to get background color for the file icon
function getIconBackground(file: UploadedFile) {
  const fileType = getFileTypeFromName(file.name);
  
  switch (fileType) {
    case FileType.POWERPOINT:
      return "#FFF4E5"; // Light orange
    case FileType.WORD:
      return "#E3F2FD"; // Light blue
    case FileType.PDF:
      return "#E8F5E9"; // Light green
    default:
      return "#F5F5F5"; // Light gray
  }
}

// Helper function to get text color for the file icon
function getIconColor(file: UploadedFile) {
  const fileType = getFileTypeFromName(file.name);
  
  switch (fileType) {
    case FileType.POWERPOINT:
      return "#E65100"; // Dark orange
    case FileType.WORD:
      return "#0D47A1"; // Dark blue
    case FileType.PDF:
      return "#2E7D32"; // Dark green
    default:
      return "#616161"; // Dark gray
  }
}

function StatusBadge({ status }: { status: FileStatus }) {
  switch (status) {
    case FileStatus.QUEUED:
      return (
        <Badge variant="outline" className="bg-gray-100 text-gray-800">
          Queued
        </Badge>
      );
    case FileStatus.PROCESSING:
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 animate-pulse">
          Converting
        </Badge>
      );
    case FileStatus.COMPLETED:
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800">
          Completed
        </Badge>
      );
    case FileStatus.FAILED:
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800">
          Failed
        </Badge>
      );
    case FileStatus.CANCELLED:
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
          Cancelled
        </Badge>
      );
    default:
      return null;
  }
}

export default function FilesList({
  files,
  onRemove,
  onCancel,
  onConvertAll,
  onClearAll,
  simulateProgress,
}: FilesListProps) {
  const hasFiles = files.length > 0;
  const hasQueuedFiles = files.some((file) => file.status === FileStatus.QUEUED);
  
  // This simulates progress updates for files in PROCESSING state
  // In a real app, this would be handled with WebSockets or SSE
  useEffect(() => {
    const processingFiles = files.filter(
      (file) => file.status === FileStatus.PROCESSING
    );
    
    if (processingFiles.length === 0) return;
    
    const intervalIds: NodeJS.Timeout[] = [];
    
    processingFiles.forEach((file) => {
      if (file.progress >= 100) return;
      
      const id = setInterval(() => {
        const increment = Math.floor(Math.random() * 10) + 1;
        const newProgress = Math.min(file.progress + increment, 100);
        simulateProgress(file.id, newProgress);
        
        if (newProgress >= 100) {
          clearInterval(id);
        }
      }, 500);
      
      intervalIds.push(id);
    });
    
    return () => {
      intervalIds.forEach((id) => clearInterval(id));
    };
  }, [files, simulateProgress]);

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Uploaded Files</CardTitle>
        <div className="flex space-x-2">
          <Button
            onClick={onConvertAll}
            disabled={!hasQueuedFiles}
            className="flex items-center"
          >
            <DownloadCloud className="mr-2 h-4 w-4" />
            Convert All
          </Button>
          <Button
            variant="outline"
            onClick={onClearAll}
            disabled={!hasFiles}
            className="flex items-center"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {!hasFiles ? (
          <div className="py-8 text-center border border-gray-200 rounded-md">
            <p className="text-gray-500">No files uploaded yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {files.map((file) => (
              <div key={file.id} className="border border-gray-200 rounded-md p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded flex items-center justify-center"
                         style={{ 
                           backgroundColor: getIconBackground(file),
                           color: getIconColor(file)
                         }}>
                      {file.status === FileStatus.COMPLETED ? (
                        <FileText className="h-6 w-6" />
                      ) : (
                        getFileIcon(file)
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-medium truncate">
                        {file.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                      {file.error && (
                        <p className="text-sm text-red-500">{file.error}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <StatusBadge status={file.status} />
                    
                    {file.status === FileStatus.COMPLETED && (
                      <a
                        href={file.pdfUrl}
                        download
                        className="text-primary hover:text-blue-700"
                      >
                        <DownloadCloud className="h-5 w-5" />
                      </a>
                    )}
                    
                    {file.status === FileStatus.PROCESSING ? (
                      <button 
                        onClick={() => onCancel(file.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    ) : (
                      <button 
                        onClick={() => onRemove(file.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
                
                {file.status === FileStatus.PROCESSING && (
                  <>
                    <Progress value={file.progress} className="h-2.5 w-full" />
                    <p className="text-xs text-right mt-1 text-gray-500">
                      {file.progress}% completed
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}