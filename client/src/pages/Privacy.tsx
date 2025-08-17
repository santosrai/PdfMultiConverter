import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Shield, Lock, Eye, Clock, Trash2, AlertCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: August 17, 2025
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Our Commitment to Your Privacy</h2>
            <p className="text-gray-600 mb-4">
              At PPT to PDF Converter, we take your privacy seriously. This policy explains how we handle 
              your information when you use our file conversion service. We believe in transparency and 
              your right to know exactly how your data is processed.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-800">Privacy First:</span>
              </div>
              <p className="text-green-700 mt-1">
                We do not store your files or personal data longer than necessary for conversion. 
                No registration required, no tracking across the web.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Information We Collect */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Eye className="h-6 w-6 mr-2" />
              Information We Collect
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Files You Upload</h3>
                <p className="text-gray-600 mb-2">
                  When you use our converter, we temporarily process your PowerPoint and Word files 
                  to convert them to PDF format.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>Original files (PPT, PPTX, DOC, DOCX)</li>
                  <li>Converted PDF files</li>
                  <li>File metadata (name, size, type)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Technical Information</h3>
                <p className="text-gray-600 mb-2">
                  We collect minimal technical data to ensure our service works properly:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>IP address (for rate limiting and security)</li>
                  <li>Browser type and version</li>
                  <li>Operating system information</li>
                  <li>Conversion timestamps and success rates</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">What We Don't Collect</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>Personal identification information</li>
                  <li>Email addresses or contact details</li>
                  <li>Account information (no accounts required)</li>
                  <li>Payment information (service is free)</li>
                  <li>Third-party tracking cookies</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Information */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Lock className="h-6 w-6 mr-2" />
              How We Use Your Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-green-800">✓ What We Do</h3>
                  <ul className="text-gray-600 space-y-1 mt-2">
                    <li>• Convert your files to PDF format</li>
                    <li>• Provide download links for converted files</li>
                    <li>• Monitor service performance and uptime</li>
                    <li>• Prevent abuse and ensure security</li>
                    <li>• Improve our conversion algorithms</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-red-800">✗ What We Don't Do</h3>
                  <ul className="text-gray-600 space-y-1 mt-2">
                    <li>• Read or analyze file contents</li>
                    <li>• Share files with third parties</li>
                    <li>• Use files for marketing purposes</li>
                    <li>• Create user profiles or tracking</li>
                    <li>• Sell or monetize your data</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* File Storage and Deletion */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Clock className="h-6 w-6 mr-2" />
              File Storage and Automatic Deletion
            </h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <Trash2 className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-800">Automatic File Deletion</span>
              </div>
              <p className="text-blue-700">
                All uploaded and converted files are automatically deleted from our servers within 24 hours. 
                We do not maintain long-term storage of your documents.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Storage Timeline</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">
                      <strong>During conversion:</strong> Files stored temporarily in memory for processing
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">
                      <strong>After conversion:</strong> Files available for download for up to 24 hours
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-gray-600">
                      <strong>After 24 hours:</strong> All files permanently deleted from our servers
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cookies and Tracking */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
            <p className="text-gray-600 mb-4">
              We use minimal cookies to ensure our service functions properly:
            </p>
            
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold">Essential Cookies</h3>
                <p className="text-gray-600 text-sm">
                  Required for basic functionality like maintaining your conversion session.
                </p>
              </div>
              <div className="border-l-4 border-gray-300 pl-4">
                <h3 className="font-semibold">Analytics Cookies</h3>
                <p className="text-gray-600 text-sm">
                  Help us understand how our service is used to improve performance (anonymous data only).
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <span className="font-semibold text-yellow-800">No Third-Party Tracking</span>
              </div>
              <p className="text-yellow-700 mt-1">
                We do not use third-party advertising cookies or tracking scripts that follow you across websites.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="text-gray-600 mb-4">
              You have the following rights regarding your data:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Right to Delete</h3>
                <p className="text-gray-600 text-sm">
                  You can close your browser tab to immediately stop file processing. 
                  All files are automatically deleted within 24 hours.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Right to Know</h3>
                <p className="text-gray-600 text-sm">
                  Contact us to learn what information we have about your usage 
                  (limited to conversion logs and technical data).
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Right to Opt-Out</h3>
                <p className="text-gray-600 text-sm">
                  You can disable cookies in your browser settings, though this may 
                  affect service functionality.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Right to Complain</h3>
                <p className="text-gray-600 text-sm">
                  If you have privacy concerns, contact us directly or reach out 
                  to your local data protection authority.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Questions About Privacy?</h2>
            <p className="text-gray-600 mb-6">
              If you have questions about this privacy policy or how we handle your data, 
              please don't hesitate to contact us.
            </p>
            <Link href="/contact">
              <Button>
                Contact Us
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Updates */}
        <div className="bg-gray-100 rounded-lg p-6">
          <h3 className="font-semibold mb-2">Policy Updates</h3>
          <p className="text-gray-600 text-sm">
            We may update this privacy policy from time to time. Any changes will be posted on this page 
            with an updated "Last updated" date. We encourage you to review this policy periodically.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}