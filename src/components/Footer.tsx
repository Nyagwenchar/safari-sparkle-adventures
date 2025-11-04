import { Palmtree, Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (path: string) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(path);
    }
  };

  return (
    <footer id="about" className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Palmtree className="h-8 w-8" />
              <span className="text-2xl font-bold">MB Travels</span>
            </div>
            <p className="text-primary-foreground/80 mb-4">
              Creating unforgettable African safari experiences since 2010. We're passionate about
              showcasing the beauty of Kenya's wildlife, landscapes, and cultures while supporting
              local communities and conservation efforts.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="mailto:info@mbtravels.com" className="hover:text-accent transition-colors">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <button onClick={() => handleLinkClick("/tours")} className="hover:text-accent transition-colors">Our Tours</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("/destinations")} className="hover:text-accent transition-colors">Destinations</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("/about")} className="hover:text-accent transition-colors">About Us</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("/contact")} className="hover:text-accent transition-colors">Book Now</button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Travel Info</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <button onClick={() => handleLinkClick("/booking-terms")} className="hover:text-accent transition-colors">Booking Terms</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("/travel-insurance")} className="hover:text-accent transition-colors">Travel Insurance</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("/visa-requirements")} className="hover:text-accent transition-colors">Visa Requirements</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("/safari-tips")} className="hover:text-accent transition-colors">Safari Tips</button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} MB Travels. All rights reserved. | Crafted with passion for adventure.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
