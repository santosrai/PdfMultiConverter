import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { Link } from "wouter";

interface FAQItem {
  question: string;
  answer: string;
  category: "general" | "technical" | "security";
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([0]); // First item open by default

  const faqData: FAQItem[] = [
    {
      category: "general",
      question: "Is the PPT to PDF converter really free?",
      answer: "Yes, absolutely! Our converter is completely free to use with no hidden charges, registration requirements, or premium upgrades. You can convert unlimited files without any cost."
    },
    {
      category: "technical",
      question: "What file formats are supported?",
      answer: "We support PowerPoint files (.ppt, .pptx) and Word documents (.doc, .docx). All these formats can be converted to high-quality PDF files while preserving formatting, images, and layouts."
    },
    {
      category: "general",
      question: "How many files can I convert at once?",
      answer: "You can upload and convert up to 10 files simultaneously in a single batch. Each file can be up to 100MB in size, making it perfect for most business and educational needs."
    },
    {
      category: "security",
      question: "Is my data safe and secure?",
      answer: "Absolutely. We use bank-level SSL encryption for all uploads. Your files are processed securely and automatically deleted from our servers within 24 hours. We never store or share your documents."
    },
    {
      category: "technical",
      question: "Will the formatting be preserved in the PDF?",
      answer: "Yes! Our advanced conversion engine preserves original formatting, fonts, images, layouts, and even animations where applicable. The output PDF will look identical to your original document."
    },
    {
      category: "general",
      question: "Do I need to create an account?",
      answer: "No account creation required! Simply visit our website, upload your files, and start converting immediately. This saves you time and protects your privacy."
    },
    {
      category: "technical",
      question: "How long does the conversion take?",
      answer: "Most conversions complete within 10-30 seconds, depending on file size and complexity. Larger files or batch conversions may take a few minutes, but you'll see real-time progress updates."
    },
    {
      category: "security",
      question: "What happens to my files after conversion?",
      answer: "Your files are automatically and permanently deleted from our servers within 24 hours of upload. You can download your converted PDFs immediately, and we recommend saving them to your device."
    },
    {
      category: "technical",
      question: "Can I convert password-protected files?",
      answer: "Currently, we don't support password-protected files for security reasons. Please remove the password protection before uploading, or contact us if you have specific security requirements."
    },
    {
      category: "general",
      question: "What if the conversion fails?",
      answer: "If a conversion fails, you'll see an error message with details. Common causes include corrupted files or unsupported features. You can try again or contact our support team for assistance."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const categories = {
    general: { label: "General Questions", color: "bg-blue-50 text-blue-700" },
    technical: { label: "Technical", color: "bg-green-50 text-green-700" },
    security: { label: "Security & Privacy", color: "bg-purple-50 text-purple-700" }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our PowerPoint to PDF converter. 
            Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-12">
          {faqData.map((item, index) => {
            const isOpen = openItems.includes(index);
            const categoryInfo = categories[item.category];
            
            return (
              <Card key={index} className="border border-gray-200 shadow-sm">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryInfo.color}`}>
                            {categoryInfo.label}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {item.question}
                        </h3>
                      </div>
                      <div className="ml-4">
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-6">
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-gray-600 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Contact CTA */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our support team is here to help. Get personalized assistance with any 
              technical issues or questions about our converter.
            </p>
            <div className="space-x-4">
              <Link href="/contact">
                <Button size="lg">
                  Contact Support
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}