import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Clock, Award, CheckCircle, Star } from "lucide-react";

export default function TrustSignals() {
  const securityFeatures = [
    {
      icon: Shield,
      title: "SSL Encrypted",
      description: "Bank-level security for all file uploads",
    },
    {
      icon: Lock,
      title: "Private Processing",
      description: "Files are never stored permanently",
    },
    {
      icon: Clock,
      title: "Auto-Delete",
      description: "Files automatically deleted after 24h",
    },
    {
      icon: Award,
      title: "GDPR Compliant",
      description: "Full privacy protection guaranteed",
    },
  ];

  const testimonials = [
    {
      name: "Sujan Rai",
      role: "Designer",
      company: "N.evolutiontech",
      rating: 5,
      text: "This converter saved me hours of work. The batch processing feature is incredibly efficient for our quarterly reports.",
      avatar: "SC",
    },
    {
      name: "Ramkaji Bista",
      role: "Teacher",
      company: "High School",
      rating: 5,
      text: "Perfect for converting my lesson presentations to PDF. Students love having both formats available.",
      avatar: "MR",
    },
    {
      name: "Aliza Bista",
      role: "Data Analysist",
      company: "Chevron",
      rating: 5,
      text: "Quality is excellent and it preserves all our custom fonts and animations. Highly recommended!",
      avatar: "EW",
    },
  ];

  const stats = [
    { number: "2.5M+", label: "Files Converted" },
    { number: "150K+", label: "Happy Users" },
    { number: "99.9%", label: "Success Rate" },
    { number: "24/7", label: "Available" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Thousands of Users Worldwide
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join professionals and students who rely on our secure, fast, and
            reliable converter for their daily document needs.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Security Features */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="text-center border-0 shadow-md bg-white"
              >
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            What Our Users Say
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border-0 shadow-md">
                <CardContent className="pt-6">
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-gray-600 mb-4 italic">
                    "{testimonial.text}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                      <div className="text-xs text-gray-500">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Security Badges */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-600 mb-4">Trusted & Secure</p>
          <div className="flex justify-center items-center space-x-6">
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200 px-4 py-2"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              SSL Secured
            </Badge>
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-2"
            >
              <Shield className="h-4 w-4 mr-2" />
              GDPR Compliant
            </Badge>
            <Badge
              variant="outline"
              className="bg-purple-50 text-purple-700 border-purple-200 px-4 py-2"
            >
              <Award className="h-4 w-4 mr-2" />
              ISO Certified
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
