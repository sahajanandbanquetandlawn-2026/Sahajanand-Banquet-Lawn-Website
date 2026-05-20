import { Utensils, Music, Wifi, Car, Sun, Wind, CheckCircle2, ShieldCheck, GlassWater } from 'lucide-react';
import './AmenitiesSection.css';

const amenities = [
  {
    category: "Banquet Amenities",
    items: [
      { id: 'b1', name: 'Central AC', icon: <Wind size={32} />, desc: 'Fully air-conditioned halls' },
      { id: 'b2', name: 'Premium Catering', icon: <Utensils size={32} />, desc: 'Multi-cuisine premium food' },
      { id: 'b3', name: 'Acoustic Sound', icon: <Music size={32} />, desc: 'State-of-the-art sound systems' },
    ]
  },
  {
    category: "Lawn Amenities",
    items: [
      { id: 'l1', name: 'Open Skies', icon: <Sun size={32} />, desc: 'Lush green open landscape' },
      { id: 'l2', name: 'Ambient Lighting', icon: <GlassWater size={32} />, desc: 'Cinematic outdoor lighting' },
      { id: 'l3', name: 'Flexible Seating', icon: <CheckCircle2 size={32} />, desc: 'Customizable arrangements' },
    ]
  },
  {
    category: "Common Amenities",
    items: [
      { id: 'c1', name: 'Valet Parking', icon: <Car size={32} />, desc: 'Spacious secure parking' },
      { id: 'c2', name: 'High-Speed Wi-Fi', icon: <Wifi size={32} />, desc: 'Seamless connectivity' },
      { id: 'c3', name: '24/7 Security', icon: <ShieldCheck size={32} />, desc: 'CCTV & Guard coverage' },
    ]
  }
];

const AmenitiesSection = () => {
  return (
    <section id="amenities" className="section amenities-section bg-primary">
      <div className="container">
        <h2 className="section-title">Amenities</h2>
        
        <div className="amenities-grid">
          {amenities.map((group, idx) => (
            <div key={idx} className="amenity-group">
              <h3 className="amenity-category-title">{group.category}</h3>
              <div className="amenity-items">
                {group.items.map(item => (
                  <div key={item.id} className="amenity-card">
                    <div className="amenity-icon">
                      {item.icon}
                    </div>
                    <h4 className="amenity-name">{item.name}</h4>
                    <p className="amenity-desc">{item.desc}</p>
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
