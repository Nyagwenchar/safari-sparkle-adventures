import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const location = useLocation();
  const tourName = location.state?.tourName;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: tourName ? `I'm interested in booking the ${tourName} tour. ` : "",
  });

  useEffect(() => {
    if (tourName) {
      setFormData(prev => ({
        ...prev,
        message: `I'm interested in booking the ${tourName} tour. `
      }));
    }
  }, [tourName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Inquiry Received!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Start Your Adventure
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get in touch to plan your perfect African safari experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-background border-border"
                      />
                    </div>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-background border-border"
                      />
                    </div>
                  </div>
                  <div>
                    <Input
                      name="phone"
                      placeholder="Phone Number (optional)"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Tell us about your dream safari..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="bg-background border-border resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Send Inquiry
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Call Us</h3>
                  <p className="text-muted-foreground">+254 700 123 456</p>
                  <p className="text-muted-foreground">+254 700 789 012</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Email Us</h3>
                  <p className="text-muted-foreground">info@bmsafaris.com</p>
                  <p className="text-muted-foreground">bookings@bmsafaris.com</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Visit Us</h3>
                  <p className="text-muted-foreground">
                    Nairobi, Kenya<br />
                    Westlands Business District
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
