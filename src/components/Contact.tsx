import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
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

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      lines: ["+254 700 123 456", "+254 700 789 012"],
      color: "primary"
    },
    {
      icon: Mail,
      title: "Email Us",
      lines: ["info@bmsafaris.com", "bookings@bmsafaris.com"],
      color: "accent"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      lines: ["Nairobi, Kenya", "Westlands Business District"],
      color: "secondary"
    }
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 section-warm" />
      <div className="absolute inset-0 pattern-lines" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-primary/10 border border-primary/20">
            <MessageCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Get In Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Start Your Adventure
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get in touch to plan your perfect African safari experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="card-elevated overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-primary via-accent to-secondary" />
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                  <Send className="h-5 w-5 text-primary" />
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Your Name</label>
                      <Input
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-12 rounded-xl bg-background border-2 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Your Email</label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-12 rounded-xl bg-background border-2 focus:border-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Phone Number (optional)</label>
                    <Input
                      name="phone"
                      placeholder="+1 234 567 890"
                      value={formData.phone}
                      onChange={handleChange}
                      className="h-12 rounded-xl bg-background border-2 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Your Message</label>
                    <Textarea
                      name="message"
                      placeholder="Tell us about your dream safari..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="rounded-xl bg-background border-2 focus:border-primary resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Inquiry
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Cards */}
          <div className="space-y-4">
            {contactInfo.map((info) => (
              <Card key={info.title} className="card-elevated group">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-${info.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <info.icon className={`h-6 w-6 text-${info.color}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">{info.title}</h3>
                    {info.lines.map((line, i) => (
                      <p key={i} className="text-muted-foreground text-sm">{line}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Quick response card */}
            <Card className="bg-gradient-to-br from-secondary to-secondary/80 border-0 overflow-hidden">
              <CardContent className="p-6 text-secondary-foreground">
                <h3 className="font-bold text-lg mb-2">Quick Response</h3>
                <p className="text-secondary-foreground/80 text-sm">
                  We typically respond within 2-4 hours during business hours. For urgent inquiries, please call us directly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
