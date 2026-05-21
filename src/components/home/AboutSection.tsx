import './AboutSection.css';

const AboutSection = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-wrapper">
          <div className="about-content-block">
            <span className="about-subtitle">The Venue</span>
            <h2 className="about-heading-premium">Where Celebrations Find Perfection</h2>
            <div className="about-heading-divider" />
            <p className="about-text-lead">
              Welcome to Sahajanand Banquet & Lawn, the perfect venue in Vadodara for all your celebrations, from weddings and receptions to corporate events.
            </p>
            <p className="about-text-body">
              We offer a spacious lush green lawn and a fully air-conditioned banquet hall, complete with dedicated event management, catering, and decorations. With prime amenities like ample parking, power backup, and a convenient location, we ensure your outdoor or indoor events are seamless and unforgettable.
            </p>
            
            <div className="about-stats-grid">
              <div className="about-stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Air Conditioned Hall</span>
              </div>
              <div className="about-stat-item">
                <span className="stat-number">Lush</span>
                <span className="stat-label">Green Outdoor Lawn</span>
              </div>
              <div className="about-stat-item">
                <span className="stat-number">Ample</span>
                <span className="stat-label">Secure Parking Area</span>
              </div>
            </div>
          </div>
          
          <div className="about-images-block">
            <div className="image-frame-gold" />
            <div className="about-img-container primary-img">
              <img 
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&auto=format&fit=crop" 
                alt="Luxury Banquet Interior" 
                className="about-img"
              />
            </div>
            <div className="about-img-container secondary-img">
              <img 
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=600&auto=format&fit=crop" 
                alt="Lawn Venue setup" 
                className="about-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
