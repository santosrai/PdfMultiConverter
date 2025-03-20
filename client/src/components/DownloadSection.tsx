import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DownloadCloud, FileText } from "lucide-react";
import { ConvertedFile, formatFileSize } from "@/lib/fileUtils";
import { format } from "date-fns";

interface DownloadSectionProps {
  files: ConvertedFile[];
  onDownloadAll: () => void;
}

export default function DownloadSection({
  files,
  onDownloadAll,
}: DownloadSectionProps) {
  const hasFiles = files.length > 0;

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Converted Files</CardTitle>
        <Button
          onClick={onDownloadAll}
          disabled={!hasFiles}
          className="flex items-center"
        >
          <DownloadCloud className="mr-2 h-4 w-4" />
          Download All (ZIP)
        </Button>
      </CardHeader>
      <CardContent>
        {!hasFiles ? (
          <div className="py-8 text-center border border-gray-200 rounded-md">
            <p className="text-gray-500">No converted files yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {files.map((file) => (
              <div
                key={file.id}
                className="border border-gray-200 rounded-md p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-100 text-red-600 rounded flex items-center justify-center">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium">{file.name}</h3>
                    <p className="text-sm text-gray-500">
                      Converted on {format(file.dateConverted, "MMM d, yyyy")} - {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <a
                  href={file.url}
                  download
                  className="text-primary hover:text-blue-700 flex items-center"
                >
                  <DownloadCloud className="h-5 w-5 mr-1" />
                  Download
                </a>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
