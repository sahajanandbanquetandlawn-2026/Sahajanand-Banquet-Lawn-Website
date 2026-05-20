import './AboutSection.css';

const AboutSection = () => {
  return (
    <section id="about" className="section bg-primary">
      <div className="container">
        <h2 className="section-title">About Us</h2>
        <div className="about-summary">
          <p className="about-text" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem' }}>
            Welcome to Sahajanand Banquet & Lawn, the perfect venue in Vadodara for all your celebrations, from weddings and receptions to corporate events. We offer a spacious lush green lawn and a fully air-conditioned banquet hall, complete with dedicated event management, catering, and decorations. With prime amenities like ample parking, power backup, and a convenient location, we ensure your outdoor or indoor events are seamless and unforgettable.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
