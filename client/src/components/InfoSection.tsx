import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function InfoSection() {
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">About this converter</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Features</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Convert multiple PPT/PPTX files at once</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Preserves formatting, images, and animations</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Download individual PDFs or as a ZIP archive</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Secure processing with automatic file cleanup</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Limitations</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <AlertCircle className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <span>Maximum file size: 100MB per file</span>
              </li>
              <li className="flex items-start">
                <AlertCircle className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <span>Maximum batch size: 10 files at once</span>
              </li>
              <li className="flex items-start">
                <AlertCircle className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <span>Password-protected files are not supported</span>
              </li>
              <li className="flex items-start">
                <AlertCircle className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <span>Files are automatically deleted after 24 hours</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
