import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Header() {
  const [, setLocation] = useLocation();
  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <a href="tel:02045724808" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <Phone className="w-3 h-3" />
              (020) 4572 4808
            </a>
            <a href="tel:+447404023083" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <Phone className="w-3 h-3" />
              +44 7404 023083
            </a>
            <a href="mailto:info@avbathrooms.co.uk" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <Mail className="w-3 h-3" />
              info@avbathrooms.co.uk
            </a>
          </div>
          <Button 
            variant="secondary" 
            size="sm" 
            className="h-7 text-xs bg-white text-primary hover:bg-white/90"
            onClick={() => setLocation("/form/quote-request")}
          >
            Appointment for Quote
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="AV Bathrooms & Kitchens Logo" className="h-12 object-contain" />
          </Link>
          
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/bathroom" className="hover:text-primary transition-colors">Bathroom</Link>
            <Link href="/kitchen" className="hover:text-primary transition-colors">Kitchen</Link>
            <Link href="/construction" className="hover:text-primary transition-colors">Construction</Link>
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="default" 
              size="sm"
              onClick={() => setLocation("/form/quote-request")}
            >
              Get a Quote
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.dispatchEvent(new CustomEvent('openPriceCalculator'))}
            >
              Price Calculator
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
}
