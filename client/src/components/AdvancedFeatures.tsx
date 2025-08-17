import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Layers, 
  Zap, 
  FileStack, 
  Download, 
  RefreshCw, 
  Shield, 
  Clock,
  Star,
  CheckCircle,
  ArrowRight
} from "lucide-react";

export default function AdvancedFeatures() {
  const currentFeatures = [
    {
      icon: FileStack,
      title: "Batch Processing",
      description: "Convert up to 10 files simultaneously",
      status: "available",
      color: "bg-green-50 text-green-700 border-green-200"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Average conversion time under 10 seconds",
      status: "available", 
      color: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
      icon: Download,
      title: "Bulk Download",
      description: "Download all files as a single ZIP archive",
      status: "available",
      color: "bg-purple-50 text-purple-700 border-purple-200"
    },
    {
      icon: Shield,
      title: "Secure Processing",
      description: "SSL encrypted with automatic file deletion",
      status: "available",
      color: "bg-green-50 text-green-700 border-green-200"
    }
  ];

  const upcomingFeatures = [
    {
      icon: Layers,
      title: "Advanced Formatting",
      description: "Enhanced support for complex layouts and animations",
      status: "coming-soon",
      eta: "Q2 2025"
    },
    {
      icon: RefreshCw,
      title: "Cloud Integration",
      description: "Direct integration with Google Drive and Dropbox",
      status: "coming-soon",
      eta: "Q3 2025"
    },
    {
      icon: Clock,
      title: "Scheduled Conversions",
      description: "Set up automatic recurring conversions",
      status: "planned",
      eta: "Q4 2025"
    },
    {
      icon: Star,
      title: "Premium Templates",
      description: "Professional PDF templates and watermarks",
      status: "planned",
      eta: "2026"
    }
  ];

  const getStatusBadge = (status: string, eta?: string) => {
    switch (status) {
      case "available":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Available
          </Badge>
        );
      case "coming-soon":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            <Clock className="h-3 w-3 mr-1" />
            Coming {eta}
          </Badge>
        );
      case "planned":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
            <Star className="h-3 w-3 mr-1" />
            Planned {eta}
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Advanced Features & Roadmap
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover what makes our converter special and see what exciting features 
            we're working on to make your document conversion experience even better.
          </p>
        </div>

        {/* Current Features */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            🚀 Available Now
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${feature.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      {getStatusBadge(feature.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-lg mb-2">{feature.title}</CardTitle>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Upcoming Features */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            🔮 Coming Soon & Planned
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="bg-white/80 backdrop-blur border border-gray-200 hover:border-blue-300 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                          {getStatusBadge(feature.status, feature.eta)}
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                        {feature.status === "coming-soon" && (
                          <div className="flex items-center text-xs text-blue-600">
                            <ArrowRight className="h-3 w-3 mr-1" />
                            <span>In active development</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Feature Request CTA */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 border-0 text-white inline-block">
            <CardContent className="pt-6 px-8">
              <h3 className="text-xl font-semibold mb-2">Have a Feature Request?</h3>
              <p className="text-blue-100 mb-4">
                We're always looking for ways to improve. Share your ideas with us!
              </p>
              <Badge variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                <Star className="h-3 w-3 mr-1" />
                Suggest a Feature
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}