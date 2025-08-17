import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, FileText, Shield, FileCheck, Info, MessageCircle } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home", icon: FileText },
    { href: "/about", label: "About", icon: Info },
    { href: "/privacy", label: "Privacy", icon: Shield },
    { href: "/terms", label: "Terms", icon: FileCheck },
    { href: "/contact", label: "Contact", icon: MessageCircle },
  ];

  const isActive = (href: string) => {
    return location === href || (href !== "/" && location.startsWith(href));
  };

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">Pportable</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href)
                      ? "text-primary"
                      : "text-gray-600"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <Link href="/">
              <Button size="sm" className="ml-4">
                Convert Now
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-6">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.href} href={item.href}>
                        <div
                          className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                            isActive(item.href)
                              ? "bg-primary/10 text-primary"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="font-medium">{item.label}</span>
                        </div>
                      </Link>
                    );
                  })}
                  <div className="pt-4 border-t">
                    <Link href="/">
                      <Button className="w-full">
                        Convert Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}