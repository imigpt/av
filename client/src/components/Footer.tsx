import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "./ui/button";

export default function Footer() {
  const [, setLocation] = useLocation();
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="AV Bathrooms & Kitchens Logo" className="h-10 object-contain brightness-0 invert" />
            </Link>
            <p className="text-sm leading-relaxed text-background/80">
              We are a family run company offering luxury or affordable bathrooms and kitchen. All bathrooms and kitchens are fully supplied and fitted by our trusted tradesmen who have years of experience in trade.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/bathroom" className="hover:text-primary transition-colors">Bathroom</Link></li>
              <li><Link href="/kitchen" className="hover:text-primary transition-colors">Kitchen</Link></li>
              <li><Link href="/construction" className="hover:text-primary transition-colors">Construction</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">Products</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>12 Hanson Street, Glasgow G31 2JW</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:info@avbathrooms.co.uk" className="hover:text-primary transition-colors">
                  info@avbathrooms.co.uk
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+447404023083" className="hover:text-primary transition-colors">
                  +44 7404 023083
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:02045724808" className="hover:text-primary transition-colors">
                  (020) 4572 4808
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+447938464661" className="hover:text-primary transition-colors">
                  +44 7938 464661
                </a>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="https://www.facebook.com/avbathroom.kitchens/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/avbathroom.kitchens" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Locations</h3>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold mb-1">Wetwall & Bathroom Showroom</h4>
                <p className="text-background/80">12 Hanson Street,<br/>Glasgow G31 2JW</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Kitchen & Tile Showroom</h4>
                <p className="text-background/80">14 Caledonia,<br/>Glasgow G5 0EX</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-6 flex flex-wrap justify-between items-center gap-4 text-sm text-background/80">
          <div>AV Bathrooms & Kitchens © 2025</div>
          <div className="flex gap-4 items-center">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a>
            <Button 
              onClick={() => setLocation("/form/quote-request")} 
              className="ml-4"
              size="sm"
            >
              Get a Quote
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
