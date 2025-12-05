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
    <footer id="about" className="bg-gradient-to-b from-primary to-primary/95 text-primary-foreground relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-primary-foreground/10 flex items-center justify-center">
                <Palmtree className="h-7 w-7" />
              </div>
              <span className="text-2xl font-bold">MB Travels</span>
            </div>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed max-w-md">
              Creating unforgettable African safari experiences since 2010. We're passionate about
              showcasing the beauty of Kenya's wildlife, landscapes, and cultures while supporting
              local communities and conservation efforts.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: Facebook, href: "https://facebook.com" },
                { icon: Instagram, href: "https://instagram.com" },
                { icon: Twitter, href: "https://twitter.com" },
                { icon: Mail, href: "mailto:info@mbtravels.com" },
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-xl bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-300"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent rounded-full" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Our Tours", path: "/tours" },
                { label: "Destinations", path: "/destinations" },
                { label: "About Us", path: "/about" },
                { label: "Book Now", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <button 
                    onClick={() => handleLinkClick(link.path)} 
                    className="text-primary-foreground/80 hover:text-accent transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Travel Info */}
          <div>
            <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-secondary rounded-full" />
              Travel Info
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Booking Terms", path: "/booking-terms" },
                { label: "Travel Insurance", path: "/travel-insurance" },
                { label: "Visa Requirements", path: "/visa-requirements" },
                { label: "Safari Tips", path: "/safari-tips" },
              ].map((link) => (
                <li key={link.path}>
                  <button 
                    onClick={() => handleLinkClick(link.path)} 
                    className="text-primary-foreground/80 hover:text-accent transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-primary-foreground/60 text-sm">
            &copy; {new Date().getFullYear()} MB Travels. All rights reserved. | Crafted with passion for adventure.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
