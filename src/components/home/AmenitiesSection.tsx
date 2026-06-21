import { useState, useEffect } from 'react';
import { Utensils, Speaker, Wifi, Car, Sun, Wind, CheckCircle2, ShieldCheck, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Monitor screen width to auto-switch layouts
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Autoplay functionality for mobile cards
  useEffect(() => {
    if (!isMobile) return;

    const autoplayTimer = setInterval(() => {
      if (activeSlide < 2) {
        // Move to the next slide in the current category
        setActiveSlide((prev) => prev + 1);
      } else {
        // Move to the next category and reset slide to 0
        setActiveTab((prevTab) => (prevTab + 1) % amenities.length);
        setActiveSlide(0);
      }
    }, 3500); // Slide changes every 3.5 seconds

    return () => clearInterval(autoplayTimer);
  }, [isMobile, activeTab, activeSlide]);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setActiveSlide(0); // Reset carousel slide on tab change
  };

  // Carousel controls
  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev < 2 ? prev + 1 : prev));
  };

  // Swipe support
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && activeSlide < 2) {
      handleNextSlide();
    } else if (isRightSwipe && activeSlide > 0) {
      handlePrevSlide();
    }
  };

  return (
    <section id="amenities" className="amenities-section-premium">
      <div className="container">
        <div className="amenities-header">
          <span className="amenities-subtitle">Experience & Convenience</span>
          <h2 className="amenities-title-text">World-Class Amenities</h2>
          <div className="amenities-header-divider" />
        </div>

        {isMobile ? (
          /* Mobile optimized view */
          <div className="mobile-amenities-container">
            {/* Sliding Pill Tab bar */}
            <div className="mobile-tabs-scroller">
              <div className="mobile-tabs-pill">
                {amenities.map((group, idx) => (
                  <button
                    key={idx}
                    className={`mobile-tab-btn ${activeTab === idx ? 'active' : ''}`}
                    onClick={() => handleTabChange(idx)}
                  >
                    {group.category.split(' ')[0]} {/* Shorten name for space e.g. "Banquet" */}
                  </button>
                ))}
                {/* Active Indicator Background Slider */}
                <div 
                  className="mobile-tab-indicator" 
                  style={{ 
                    transform: `translateX(${activeTab * 100}%)`,
                    width: `${100 / amenities.length}%`
                  }} 
                />
              </div>
            </div>

            {/* Swipeable Carousel */}
            <div className="mobile-carousel-outer">
              {/* Prev Button Arrow (hidden on first slide) */}
              <button 
                className={`mobile-carousel-arrow prev ${activeSlide === 0 ? 'disabled' : ''}`}
                onClick={handlePrevSlide}
                aria-label="Previous amenity"
                disabled={activeSlide === 0}
              >
                <ChevronLeft size={20} />
              </button>

              <div className="mobile-carousel-viewport">
                <div 
                  className="mobile-carousel-track"
                  style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  {amenities[activeTab].items.map((item) => (
                    <div key={item.id} className="mobile-carousel-slide">
                      <div className="amenity-card-premium active-mobile-card">
                        <div className="amenity-card-inner">
                          <div className="amenity-icon-container">
                            {item.icon}
                          </div>
                          <h4 className="amenity-name-text">{item.name}</h4>
                          <p className="amenity-desc-text">{item.desc}</p>
                        </div>
                        <div className="card-top-glow" style={{ opacity: 1 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Button Arrow (hidden on last slide) */}
              <button 
                className={`mobile-carousel-arrow next ${activeSlide === 2 ? 'disabled' : ''}`}
                onClick={handleNextSlide}
                aria-label="Next amenity"
                disabled={activeSlide === 2}
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="mobile-carousel-dots">
              {amenities[activeTab].items.map((_, i) => (
                <button
                  key={i}
                  className={`mobile-carousel-dot ${activeSlide === i ? 'active' : ''}`}
                  onClick={() => setActiveSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Original Desktop grid view */
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
                      <div className="card-top-glow" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AmenitiesSection;
