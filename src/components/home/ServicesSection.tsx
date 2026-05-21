import './ServicesSection.css';

const ServicesSection = () => {
  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="services-header">
          <span className="services-subtitle">Our Spaces</span>
          <h2 className="services-title-premium">Exquisite Spaces for Grand Occasions</h2>
          <div className="services-header-divider" />
        </div>
        
        {/* First Layout Block - Lawn (Left: Image, Right: Text) */}
        <div className="service-block">
          <div className="service-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200&auto=format&fit=crop" 
              alt="Lawn View" 
              className="service-image"
            />
            <div className="service-image-overlay" />
          </div>
          <div className="service-content">
            <span className="service-category">Outdoor Venue</span>
            <h3 className="service-heading">The Grand Lawn</h3>
            <p className="service-text">
              Experience the vast expanse of our lush green lawn, the perfect setting for open-air weddings and receptions. Enveloped by majestic trees and ambient night sky, it offers a magical garden atmosphere.
            </p>
            <ul className="service-features">
              <li>
                <svg className="feature-bullet" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Lush green natural landscape</span>
              </li>
              <li>
                <svg className="feature-bullet" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Flexible open-air seating arrangements</span>
              </li>
              <li>
                <svg className="feature-bullet" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Stunning cinematic backdrop lighting</span>
              </li>
              <li>
                <svg className="feature-bullet" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Accommodates grand guest gatherings easily</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Second Layout Block - Banquet (Left: Text, Right: Image) */}
        <div className="service-block reverse">
          <div className="service-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop" 
              alt="Banquet Interior" 
              className="service-image"
            />
            <div className="service-image-overlay" />
          </div>
          <div className="service-content">
            <span className="service-category">Indoor Venue</span>
            <h3 className="service-heading">The Majestic Banquet</h3>
            <p className="service-text">
              Step into an aura of sophistication within our premium banquet hall. Designed with intricate detailing, luxurious chandeliers, and a regal interior, it is the ultimate venue for an elite indoor celebration.
            </p>
            <ul className="service-features">
              <li>
                <svg className="feature-bullet" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Fully air-conditioned luxurious environment</span>
              </li>
              <li>
                <svg className="feature-bullet" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>State-of-the-art acoustic & intelligent lighting</span>
              </li>
              <li>
                <svg className="feature-bullet" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Spacious dining area with custom layouts</span>
              </li>
              <li>
                <svg className="feature-bullet" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Dedicated performance stage & VIP seating</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
