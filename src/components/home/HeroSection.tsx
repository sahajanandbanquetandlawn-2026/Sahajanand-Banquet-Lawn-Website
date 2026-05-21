import './HeroSection.css';

const HeroSection = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-background">
        {/* Using a placeholder high-quality image from Unsplash for visual premium look */}
        <img 
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop" 
          alt="Luxury Banquet Background" 
          className="hero-image"
        />
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content animate-fade-in">
        <img src="/sahajanand-logo-white.png" alt="Sahajanand Banquet & Lawn Logo" className="hero-logo" />
        <h1 className="hero-title">Sahajanand Banquet & Lawn</h1>
        <p className="hero-slogan">Elegance and Grandeur for Your Unforgettable Moments</p>
      </div>
    </section>
  );
};

export default HeroSection;
