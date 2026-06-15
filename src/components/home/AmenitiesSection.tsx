import { Utensils, Speaker, Wifi, Car, Sun, Wind, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import './AmenitiesSection.css';

const amenities = [
  {
    category: "Banquet Amenities",
    items: [
      { id: 'b1', name: 'Central AC', icon: <Wind size={28} />, desc: 'Fully air-conditioned halls' },
      { id: 'b2', name: 'Premium Catering', icon: <Utensils size={28} />, desc: 'Multi-cuisine premium food' },
      { id: 'b3', name: 'Quality Sound', icon: <Speaker size={28} />, desc: 'Clear, reliable audio setup' },
    ]
  },
  {
    category: "Lawn Amenities",
    items: [
      { id: 'l1', name: 'Open Skies', icon: <Sun size={28} />, desc: 'Lush green open landscape' },
      { id: 'l2', name: 'Ambient Lighting', icon: <Sparkles size={28} />, desc: 'Cinematic outdoor lighting' },
      { id: 'l3', name: 'Flexible Seating', icon: <CheckCircle2 size={28} />, desc: 'Customizable arrangements' },
    ]
  },
  {
    category: "Common Amenities",
    items: [
      { id: 'c1', name: 'Valet Parking', icon: <Car size={28} />, desc: 'Spacious secure parking' },
      { id: 'c2', name: 'High-Speed Wi-Fi', icon: <Wifi size={28} />, desc: 'Seamless connectivity' },
      { id: 'c3', name: '24/7 Security', icon: <ShieldCheck size={28} />, desc: 'CCTV & Guard coverage' },
    ]
  }
];

const AmenitiesSection = () => {
  return (
    <section id="amenities" className="amenities-section-premium">
      <div className="container">
        <div className="amenities-header">
          <span className="amenities-subtitle">Experience & Convenience</span>
          <h2 className="amenities-title-text">World-Class Amenities</h2>
          <div className="amenities-header-divider" />
        </div>
        
        <div className="amenities-grid-premium">
          {amenities.map((group, idx) => (
            <div key={idx} className="amenity-group-premium">
              <h3 className="amenity-category-title-premium">
                <span>{group.category}</span>
              </h3>
              <div className="amenity-items-grid">
                {group.items.map(item => (
                  <div key={item.id} className="amenity-card-premium">
                    <div className="amenity-card-inner">
                      <div className="amenity-icon-container">
                        {item.icon}
                      </div>
                      <h4 className="amenity-name-text">{item.name}</h4>
                      <p className="amenity-desc-text">{item.desc}</p>
                    </div>
                    {/* Top gold border highlight decoration */}
                    <div className="card-top-glow" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
