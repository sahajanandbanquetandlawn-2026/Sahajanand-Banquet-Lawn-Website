import './ServicesSection.css';

const ServicesSection = () => {
  return (
    <section id="services" className="section bg-primary">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        
        {/* First Layout Block - Lawn (Left: Image, Right: Text) */}
        <div className="service-block">
          <div className="service-image-wrapper left">
            <img 
              src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop" 
              alt="Lawn View" 
              className="service-image"
            />
          </div>
          <div className="service-content">
            <h3 className="service-heading">The Grand Lawn</h3>
            <p className="service-text">
              Experience the vast expanse of our lush green lawn, the perfect setting for open-air weddings and receptions.
            </p>
            <ul className="service-features">
              <li>Lush green natural landscape</li>
              <li>Flexible open-air seating</li>
              <li>Stunning cinematic lighting</li>
              <li>Accommodates grand gatherings</li>
            </ul>
          </div>
        </div>

        {/* Second Layout Block - Banquet (Left: Text, Right: Image) */}
        <div className="service-block">
          <div className="service-content">
            <h3 className="service-heading">The Majestic Banquet</h3>
            <p className="service-text">
              Step into an aura of sophistication within our premium banquet hall. 
              Designed with intricate detailing, luxurious chandeliers, and a regal 
              interior, it is the ultimate venue for an elite indoor celebration.
            </p>
            <ul className="service-features">
              <li>Fully air-conditioned environment</li>
              <li>State-of-the-art acoustic and lighting systems</li>
              <li>Spacious dining area</li>
              <li>Dedicated stage and seating arrangements</li>
            </ul>
          </div>
          <div className="service-image-wrapper right">
            <img 
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop" 
              alt="Banquet Interior" 
              className="service-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
