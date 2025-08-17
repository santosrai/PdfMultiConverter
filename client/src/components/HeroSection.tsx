import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Zap,
  Shield,
  CheckCircle,
  Star,
  Users,
  Download,
} from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  const stats = [
    { label: "Files Converted", value: "2.5M+", icon: FileText },
    { label: "Happy Users", value: "150K+", icon: Users },
    { label: "Success Rate", value: "99.9%", icon: CheckCircle },
  ];

  const features = [
    { icon: Zap, text: "Lightning Fast Conversion" },
    { icon: Shield, text: "100% Secure & Private" },
    { icon: Download, text: "No Registration Required" },
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="text-center lg:text-left">
            {/* Trust Badge */}
            <div className="flex justify-center lg:justify-start mb-6">
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200 px-4 py-2"
              >
                <Star className="h-4 w-4 mr-2 fill-green-500 text-green-500" />
                Trusted by 150,000+ Users
              </Badge>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Convert
              <span className="text-primary bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                PowerPoint{" "}
              </span>
              to PDF in Seconds
            </h1>

            {/* Subheading */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Fast, secure, and free PowerPoint and Word document conversion.
              Preserve formatting, images, and layouts with our advanced
              converter.
              <span className="font-semibold text-gray-800">
                {" "}
                No downloads or registration required.
              </span>
            </p>

            {/* Key Features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm border"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-gray-700">
                      {feature.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <Button
              onClick={onGetStarted}
              size="lg"
              className="text-lg px-8 py-6 mb-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FileText className="mr-2 h-5 w-5" />
              Convert Your Files Now - Free
            </Button>

            {/* Security Notice */}
            <p className="text-sm text-gray-500">
              🔒 Your files are processed securely and automatically deleted
              after 24 hours
            </p>
          </div>

          {/* Right Column - Stats & Visual */}
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card
                    key={index}
                    className="text-center border-0 shadow-md bg-white/80 backdrop-blur"
                  >
                    <CardContent className="pt-4 pb-4">
                      <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Visual Representation */}
            <Card className="bg-gradient-to-r from-orange-100 to-red-100 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center justify-center space-x-6">
                  {/* PowerPoint File */}
                  <div className="text-center">
                    <div className="w-16 h-20 bg-orange-500 rounded-lg flex items-center justify-center mb-2 shadow-md">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                      PPT/PPTX
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center">
                    <div className="w-8 h-0.5 bg-gray-400"></div>
                    <div className="w-0 h-0 border-l-4 border-l-gray-400 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                  </div>

                  {/* Conversion Process */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-2 shadow-md animate-pulse">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">Convert</p>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center">
                    <div className="w-8 h-0.5 bg-gray-400"></div>
                    <div className="w-0 h-0 border-l-4 border-l-gray-400 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                  </div>

                  {/* PDF File */}
                  <div className="text-center">
                    <div className="w-16 h-20 bg-red-500 rounded-lg flex items-center justify-center mb-2 shadow-md">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">PDF</p>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    <strong>Fast & Reliable:</strong> Average conversion time
                    under 10 seconds
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial Preview */}
          </div>
        </div>
      </div>
    </section>
  );
}
