import heroImage from "@/assets/hero-safari.jpg";

const Hero = () => {

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/80" />
      </div>

      <div className="container relative z-10 px-4 text-center animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground drop-shadow-lg">
          Discover the Magic of Africa
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-primary-foreground/90 drop-shadow-md">
          Experience unforgettable safaris, breathtaking landscapes, and authentic cultural encounters
        </p>
      </div>
    </section>
  );
};

export default Hero;
