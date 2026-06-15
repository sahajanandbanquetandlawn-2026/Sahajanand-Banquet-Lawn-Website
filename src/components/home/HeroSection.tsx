import HeroStars from './HeroStars';
import './HeroSection.css';

const HeroSection = () => {
  const handleScrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-background">
        <img 
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop" 
          alt="Luxury Banquet Background" 
          className="hero-image"
        />
        <div className="hero-overlay"></div>
        <HeroStars />
      </div>
      
      <div className="hero-content">
        <div className="hero-logo-container animate-fade-in-up delay-1">
          <img src="/file.svg" alt="Sahajanand Banquet & Lawn Logo" className="hero-logo" />
        </div>
        <h1 className="hero-title animate-fade-in-up delay-2">
          <span className="hero-title-main">Sahajanand</span>
          <span className="hero-title-sub">Banquet &amp; Lawn</span>
        </h1>
        <div className="hero-divider animate-fade-in-up delay-3" />
        <p className="hero-slogan animate-fade-in-up delay-4">Elegance and Grandeur for Your Unforgettable Moments</p>
      </div>

      <div className="scroll-indicator animate-fade-in delay-5" onClick={handleScrollToAbout}>
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span className="scroll-text">Explore Venue</span>
      </div>
    </section>
  );
};

export default HeroSection;
