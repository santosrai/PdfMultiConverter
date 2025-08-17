import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, FileText, Users, Zap, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About PPT to PDF Converter
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We created this tool to make document conversion simple, fast, and accessible to everyone. 
            Convert your PowerPoint and Word files to PDF format in seconds, with no downloads or registrations required.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-gray-600 mb-4">
                  In today's digital world, document conversion shouldn't be complicated or expensive. 
                  We believe everyone should have access to reliable, secure, and fast file conversion tools.
                </p>
                <p className="text-gray-600">
                  That's why we built this converter – to provide a free, browser-based solution that 
                  preserves your document formatting while ensuring your files remain private and secure.
                </p>
              </div>
              <div className="bg-primary/5 rounded-lg p-6">
                <FileText className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Simple & Effective</h3>
                <p className="text-gray-600">
                  No software installations, no account creation, no complicated processes. 
                  Just upload, convert, and download.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6">
              <Zap className="h-10 w-10 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Our optimized conversion engine processes files in seconds, not minutes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Shield className="h-10 w-10 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">100% Secure</h3>
              <p className="text-gray-600">
                Files are processed securely and automatically deleted after conversion.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Users className="h-10 w-10 text-purple-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Always Free</h3>
              <p className="text-gray-600">
                No hidden fees, no premium accounts. Quality conversion tools for everyone.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Why Choose Us */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-6">Why Choose Our Converter?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Perfect Format Preservation</h3>
                    <p className="text-gray-600 text-sm">
                      Maintains original layouts, fonts, images, and formatting.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Batch Processing</h3>
                    <p className="text-gray-600 text-sm">
                      Convert up to 10 files simultaneously to save time.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Multiple Formats</h3>
                    <p className="text-gray-600 text-sm">
                      Supports PPT, PPTX, DOC, and DOCX file formats.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">No Registration Required</h3>
                    <p className="text-gray-600 text-sm">
                      Start converting immediately without creating an account.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Cross-Platform</h3>
                    <p className="text-gray-600 text-sm">
                      Works on Windows, Mac, Linux, and mobile devices.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Regular Updates</h3>
                    <p className="text-gray-600 text-sm">
                      Continuously improved with new features and better performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              <p className="text-gray-600 mb-6">
                Have questions, suggestions, or need technical support? We'd love to hear from you.
              </p>
              <Link href="/contact">
                <Button size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12 bg-primary/5 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Ready to Convert Your Files?</h2>
          <p className="text-gray-600 mb-6">
            Join thousands of users who trust our converter for their document needs.
          </p>
          <Link href="/">
            <Button size="lg" className="mr-4">
              Start Converting Now
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}