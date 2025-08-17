import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "wouter";
import { 
  MessageCircle, 
  Mail, 
  HelpCircle, 
  Bug, 
  Lightbulb, 
  CheckCircle,
  AlertCircle,
  Clock,
  Send
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

type InquiryType = "general" | "technical" | "bug" | "feature" | "other";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    type: "general" as InquiryType,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inquiryTypes = [
    { value: "general", label: "General Question", icon: MessageCircle, color: "text-blue-600" },
    { value: "technical", label: "Technical Support", icon: HelpCircle, color: "text-orange-600" },
    { value: "bug", label: "Bug Report", icon: Bug, color: "text-red-600" },
    { value: "feature", label: "Feature Request", icon: Lightbulb, color: "text-green-600" },
    { value: "other", label: "Other", icon: Mail, color: "text-gray-600" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        type: "general",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question, suggestion, or need technical support? We're here to help! 
            Send us a message and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Send className="h-5 w-5" />
                  <span>Send us a Message</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      What can we help you with?
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {inquiryTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => handleInputChange("type", type.value)}
                            className={`p-3 rounded-lg border-2 text-left transition-colors ${
                              formData.type === type.value
                                ? "border-primary bg-primary/5"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <Icon className={`h-5 w-5 ${type.color}`} />
                              <span className="font-medium">{type.label}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Brief description of your inquiry"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Please provide details about your question or issue..."
                      rows={6}
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-6">
            {/* Response Time */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <h3 className="font-semibold text-lg">Response Time</h3>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">General questions: 2-4 hours</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Technical support: 4-8 hours</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Bug reports: 1-2 business days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <HelpCircle className="h-6 w-6 text-green-600" />
                  <h3 className="font-semibold text-lg">Quick Help</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Looking for immediate answers? Check out these common questions:
                </p>
                <div className="space-y-3">
                  <div className="border-l-3 border-blue-500 pl-3">
                    <h4 className="font-medium text-sm">File Size Limits</h4>
                    <p className="text-xs text-gray-600">
                      Maximum 100MB per file, up to 10 files per batch.
                    </p>
                  </div>
                  <div className="border-l-3 border-green-500 pl-3">
                    <h4 className="font-medium text-sm">Supported Formats</h4>
                    <p className="text-xs text-gray-600">
                      PPT, PPTX, DOC, DOCX files are supported.
                    </p>
                  </div>
                  <div className="border-l-3 border-orange-500 pl-3">
                    <h4 className="font-medium text-sm">File Security</h4>
                    <p className="text-xs text-gray-600">
                      Files are automatically deleted after 24 hours.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alternative Contact */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Mail className="h-6 w-6 text-purple-600" />
                  <h3 className="font-semibold text-lg">Other Ways to Reach Us</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-medium">Direct Email</h4>
                    <p className="text-gray-600">support@ppttopdf.com</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Business Hours</h4>
                    <p className="text-gray-600">Monday - Friday, 9 AM - 6 PM EST</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Emergency Issues</h4>
                    <p className="text-gray-600">Use the form above for fastest response</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feedback Encouragement */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">We Value Your Feedback</h3>
              <p className="text-sm text-gray-600 mb-4">
                Your suggestions help us improve our service for everyone. 
                Don't hesitate to share ideas for new features or improvements!
              </p>
              <Link href="/">
                <Button variant="outline" size="sm" className="w-full">
                  Try Our Converter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}