import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Award, Users, Globe, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                About MB Travels
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Your trusted partner in African safari adventures since 2010
              </p>
            </div>

            <div className="max-w-4xl mx-auto mb-16">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  MB Travels was founded with a simple yet powerful mission: to share the breathtaking
                  beauty of Africa with travelers from around the world while contributing to the
                  conservation of its precious wildlife and supporting local communities.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  With over a decade of experience in crafting unforgettable safari experiences,
                  we've helped thousands of travelers discover the magic of Kenya's national parks,
                  witness the Great Migration, and create memories that last a lifetime.
                </p>
                <p className="text-lg text-muted-foreground">
                  Our team of experienced guides and travel specialists are passionate about wildlife
                  conservation and cultural preservation. We work closely with local communities and
                  conservation organizations to ensure that tourism benefits both wildlife and people.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <Card className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2 text-lg">14+ Years</h3>
                  <p className="text-muted-foreground">
                    Of excellence in safari tourism
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2 text-lg">5000+</h3>
                  <p className="text-muted-foreground">
                    Happy travelers worldwide
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2 text-lg">50+ Tours</h3>
                  <p className="text-muted-foreground">
                    Across Kenya and East Africa
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2 text-lg">100%</h3>
                  <p className="text-muted-foreground">
                    Committed to conservation
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-16 bg-card border border-border rounded-lg p-8 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-foreground mb-2">Sustainability</h3>
                  <p className="text-muted-foreground">
                    We promote responsible tourism practices that minimize environmental impact
                    and support conservation efforts.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Community</h3>
                  <p className="text-muted-foreground">
                    We partner with local communities to ensure tourism benefits local economies
                    and preserves cultural heritage.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Excellence</h3>
                  <p className="text-muted-foreground">
                    We maintain the highest standards in service quality, safety, and customer
                    satisfaction.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Authenticity</h3>
                  <p className="text-muted-foreground">
                    We create genuine experiences that connect travelers with Africa's wildlife,
                    landscapes, and cultures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
