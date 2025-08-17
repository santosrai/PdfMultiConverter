import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { FileCheck, AlertTriangle, Shield, Scale } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileCheck className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: August 17, 2025
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Welcome to PPT to PDF Converter</h2>
            <p className="text-gray-600 mb-4">
              These Terms of Service ("Terms") govern your use of the PPT to PDF Converter website 
              and services. By using our service, you agree to these terms. Please read them carefully.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Scale className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-800">Simple Terms:</span>
              </div>
              <p className="text-blue-700 mt-1">
                We keep our terms clear and fair. Use our service responsibly, and we'll provide 
                reliable file conversion for free.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Service Description */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Our Service</h2>
            <p className="text-gray-600 mb-4">
              PPT to PDF Converter is a free web-based tool that converts PowerPoint presentations 
              and Word documents to PDF format. Our service includes:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Conversion of PPT, PPTX, DOC, and DOCX files</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Batch processing of up to 10 files</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Individual and bulk download options</span>
                </li>
              </ul>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Real-time conversion progress tracking</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Secure file processing and automatic deletion</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Cross-platform compatibility</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Acceptable Use */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Shield className="h-6 w-6 mr-2" />
              Acceptable Use Policy
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-800">✓ You May:</h3>
                <ul className="space-y-2 text-gray-600 ml-4">
                  <li>• Convert your own documents for personal or business use</li>
                  <li>• Convert documents you have permission to modify</li>
                  <li>• Use the service for educational or commercial purposes</li>
                  <li>• Share the service with others</li>
                  <li>• Provide feedback and suggestions for improvement</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-red-800">✗ You May Not:</h3>
                <ul className="space-y-2 text-gray-600 ml-4">
                  <li>• Upload files containing malware, viruses, or malicious code</li>
                  <li>• Convert copyrighted materials without proper authorization</li>
                  <li>• Attempt to overload our servers or disrupt the service</li>
                  <li>• Use automated tools to abuse our conversion limits</li>
                  <li>• Upload illegal, harmful, or inappropriate content</li>
                  <li>• Reverse engineer or attempt to copy our conversion technology</li>
                  <li>• Violate any applicable laws or regulations</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* File Limitations */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">File Upload Limitations</h2>
            <p className="text-gray-600 mb-4">
              To ensure fair usage and maintain service quality, we have implemented the following limits:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">Technical Limits</h3>
                <ul className="space-y-1 text-yellow-700 text-sm">
                  <li>• Maximum file size: 100MB per file</li>
                  <li>• Maximum batch size: 10 files at once</li>
                  <li>• Supported formats: PPT, PPTX, DOC, DOCX</li>
                  <li>• File retention: 24 hours maximum</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2">Content Restrictions</h3>
                <ul className="space-y-1 text-red-700 text-sm">
                  <li>• No password-protected files</li>
                  <li>• No corrupted or damaged files</li>
                  <li>• No files with restricted access rights</li>
                  <li>• No illegal or harmful content</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimers and Limitations */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <AlertTriangle className="h-6 w-6 mr-2" />
              Service Disclaimers
            </h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">"As Is" Service</h3>
                <p className="text-gray-600 text-sm">
                  Our service is provided "as is" without warranties of any kind. While we strive for 
                  high-quality conversions, we cannot guarantee perfect results for all document types 
                  and formatting scenarios.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Conversion Quality</h3>
                <p className="text-gray-600 text-sm">
                  We make our best effort to preserve formatting, but complex layouts, custom fonts, 
                  or advanced features may not convert perfectly. Always review converted files before 
                  using them for important purposes.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Service Availability</h3>
                <p className="text-gray-600 text-sm">
                  We aim for high uptime but cannot guarantee uninterrupted service. Maintenance, 
                  updates, or technical issues may temporarily affect availability.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liability Limitations */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              To the fullest extent permitted by law:
            </p>
            
            <div className="space-y-3 text-gray-600">
              <p>
                <strong>1. No Consequential Damages:</strong> We are not liable for any indirect, 
                incidental, special, or consequential damages arising from your use of our service.
              </p>
              <p>
                <strong>2. Maximum Liability:</strong> Our total liability to you for any claims 
                related to the service shall not exceed the amount you paid for the service (which is $0 for our free service).
              </p>
              <p>
                <strong>3. File Responsibility:</strong> You are responsible for maintaining backups 
                of your original files. We recommend keeping copies before conversion.
              </p>
              <p>
                <strong>4. Third-Party Content:</strong> We are not responsible for any third-party 
                content, links, or services that may be referenced in converted documents.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Intellectual Property */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Your Content</h3>
                <p className="text-gray-600">
                  You retain all rights to your files. We do not claim ownership of any documents 
                  you upload or convert. You grant us a temporary license to process your files 
                  solely for the purpose of conversion.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Our Service</h3>
                <p className="text-gray-600">
                  The PPT to PDF Converter website, including its design, functionality, and 
                  conversion technology, is protected by intellectual property laws. You may not 
                  copy, modify, or distribute our service without permission.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Termination */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Service Termination</h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to suspend or terminate access to our service for users who:
            </p>
            <ul className="space-y-2 text-gray-600 ml-4">
              <li>• Violate these Terms of Service</li>
              <li>• Abuse our service or attempt to harm our systems</li>
              <li>• Upload illegal or harmful content</li>
              <li>• Engage in activities that could damage our reputation</li>
            </ul>
            <p className="text-gray-600 mt-4">
              You may stop using our service at any time by simply closing your browser tab.
            </p>
          </CardContent>
        </Card>

        {/* Changes to Terms */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Changes to These Terms</h2>
            <p className="text-gray-600 mb-4">
              We may update these Terms of Service from time to time to reflect changes in our 
              service or legal requirements. When we make changes:
            </p>
            <ul className="space-y-2 text-gray-600 ml-4">
              <li>• We will post the updated terms on this page</li>
              <li>• We will update the "Last updated" date</li>
              <li>• Significant changes will be highlighted on our homepage</li>
              <li>• Your continued use constitutes acceptance of the new terms</li>
            </ul>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Questions About These Terms?</h2>
            <p className="text-gray-600 mb-6">
              If you have questions about these Terms of Service or need clarification on any point, 
              please contact us. We're here to help ensure you have a clear understanding of our policies.
            </p>
            <Link href="/contact">
              <Button>
                Contact Us
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Legal Notice */}
        <div className="bg-gray-100 rounded-lg p-6">
          <h3 className="font-semibold mb-2">Legal Notice</h3>
          <p className="text-gray-600 text-sm">
            These Terms of Service constitute the entire agreement between you and PPT to PDF Converter 
            regarding your use of our service. If any provision is found to be unenforceable, the 
            remaining provisions will remain in full force and effect.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}