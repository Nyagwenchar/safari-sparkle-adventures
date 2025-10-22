import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Camera, Backpack, Sun, Binoculars, Heart, MapPin } from "lucide-react";

const SafariTips = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">Safari Tips & Advice</h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            Make the most of your African safari adventure with these expert tips and recommendations from our experienced guides.
          </p>

          <div className="space-y-8">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Backpack className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">What to Pack</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Clothing</h3>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Neutral-colored clothing (khaki, beige, olive) - avoid bright colors and black</li>
                    <li>Lightweight, long-sleeved shirts and pants for sun and insect protection</li>
                    <li>Warm fleece or jacket for early morning game drives</li>
                    <li>Wide-brimmed hat and sunglasses</li>
                    <li>Comfortable walking shoes and sandals</li>
                    <li>Swimsuit if your lodge has a pool</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Essential Items</h3>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Binoculars (8x32 or 10x42 magnification recommended)</li>
                    <li>Camera with zoom lens (200-400mm ideal for wildlife)</li>
                    <li>Extra batteries and memory cards</li>
                    <li>Sunscreen (SPF 50+) and lip balm</li>
                    <li>Insect repellent with DEET</li>
                    <li>Personal medications and first aid kit</li>
                    <li>Reusable water bottle</li>
                    <li>Flashlight or headlamp</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Camera className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Photography Tips</h2>
              </div>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Bring a telephoto lens (200-400mm) for wildlife shots</li>
                <li>Use a bean bag or cushion to stabilize your camera in the vehicle</li>
                <li>Shoot during golden hours (early morning and late afternoon)</li>
                <li>Focus on the animal's eyes for sharp, engaging portraits</li>
                <li>Be patient - great shots come to those who wait</li>
                <li>Capture the landscape and atmosphere, not just animals</li>
                <li>Respect your guide's instructions - never compromise safety for a photo</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Health & Safety</h2>
              </div>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Consult your doctor about required vaccinations (Yellow Fever, Typhoid, Hepatitis A/B)</li>
                <li>Take malaria prophylaxis as prescribed by your doctor</li>
                <li>Drink only bottled or purified water</li>
                <li>Use hand sanitizer regularly, especially before meals</li>
                <li>Stay hydrated - drink at least 2-3 liters of water daily</li>
                <li>Apply sunscreen regularly, even on cloudy days</li>
                <li>Always listen to your guide's safety instructions</li>
                <li>Never exit the vehicle unless your guide says it's safe</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Binoculars className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Wildlife Viewing Etiquette</h2>
              </div>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Keep quiet and minimize sudden movements</li>
                <li>Never feed wild animals</li>
                <li>Maintain a safe distance - let animals come to you</li>
                <li>Don't litter - take all trash with you</li>
                <li>Respect animal behavior - if they seem stressed, move away</li>
                <li>Turn off phone ringers and avoid loud conversations</li>
                <li>Be patient - wildlife viewing requires time and luck</li>
                <li>Support conservation by visiting responsibly</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Sun className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Best Time to Visit</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Dry Season (June-October)</h3>
                  <p className="text-muted-foreground mb-2">
                    Peak safari season with excellent wildlife viewing. Animals gather around water sources, making them easier to spot. Perfect for the Great Migration in Masai Mara (July-September).
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Wet Season (November-May)</h3>
                  <p className="text-muted-foreground mb-2">
                    Lush green landscapes, newborn animals, and excellent bird watching. Fewer tourists and lower prices. Some camps may close or have limited access.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Cultural Sensitivity</h2>
              </div>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Always ask permission before photographing local people</li>
                <li>Dress modestly when visiting villages or cultural sites</li>
                <li>Learn a few basic Swahili phrases (Jambo - Hello, Asante - Thank you)</li>
                <li>Support local artisans by purchasing authentic handicrafts</li>
                <li>Respect local customs and traditions</li>
                <li>Be open-minded and embrace cultural differences</li>
              </ul>
            </section>

            <section className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg">
              <h2 className="text-xl font-semibold text-foreground mb-3">Pro Tip from Our Guides</h2>
              <p className="text-muted-foreground">
                "The best safari moments often happen when you're patient and observant. Put down your camera occasionally and simply experience the magic of the African wilderness with your own eyes. These memories will last longer than any photograph."
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SafariTips;
