import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Palmtree, Shield, LogOut, LogIn } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Tours", href: "/tours" },
    { name: "Destinations", href: "/destinations" },
    { name: "About", href: "/about" },
  ];

  const handleNavClick = (path: string) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(path);
    }
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-xl shadow-lg border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isScrolled ? "bg-primary/10" : "bg-card/20 backdrop-blur-sm"
            }`}>
              <Palmtree className="h-6 w-6 text-primary" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              MB Travels
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted hover:text-primary"
                }`}
              >
                {link.name}
              </button>
            ))}
            
            <div className="w-px h-6 bg-border mx-2" />
            
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all"
              onClick={() => handleNavClick("/contact")}
            >
              Book Now
            </Button>
            
            {user ? (
              <>
                {isAdmin && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleNavClick("/admin")}
                    className="gap-2"
                  >
                    <Shield className="h-4 w-4" />
                    Admin
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="gap-2 text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavClick("/auth")}
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card/98 backdrop-blur-xl border-t border-border animate-fade-in">
          <div className="container mx-auto px-4 py-6 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className={`block w-full text-left py-3 px-4 rounded-xl font-medium transition-colors ${
                  location.pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.name}
              </button>
            ))}
            
            <div className="pt-4 space-y-3">
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => handleNavClick("/contact")}
              >
                Book Now
              </Button>
              
              {user ? (
                <>
                  {isAdmin && (
                    <Button
                      variant="outline"
                      onClick={() => handleNavClick("/admin")}
                      className="w-full gap-2"
                    >
                      <Shield className="h-4 w-4" />
                      Admin Panel
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="w-full gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => handleNavClick("/auth")}
                  className="w-full gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
