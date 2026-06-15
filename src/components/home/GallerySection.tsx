import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageModal from '../common/ImageModal';
import './GallerySection.css';

const galleryImages = [
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2162&auto=format&fit=crop"
];

const GallerySection = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const autoScrollRef = useRef<number>(0);
  const navigate = useNavigate();

  // Auto-scroll using JS instead of CSS animation
  const startAutoScroll = useCallback(() => {
    let lastTime = 0;
    const speed = 0.8; // pixels per frame (~48px/sec at 60fps)

    const tick = (time: number) => {
      if (!scrollRef.current) return;
      
      if (lastTime && !isPausedRef.current) {
        scrollRef.current.scrollLeft += speed;

        // Loop: when we've scrolled past the first set of images, jump back
        const contentWidth = scrollRef.current.scrollWidth;
        const halfWidth = contentWidth / 2;
        if (scrollRef.current.scrollLeft >= halfWidth) {
          scrollRef.current.scrollLeft -= halfWidth;
        }
      }
      lastTime = time;
      autoScrollRef.current = requestAnimationFrame(tick);
    };

    autoScrollRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    startAutoScroll();
    return () => cancelAnimationFrame(autoScrollRef.current);
  }, [startAutoScroll]);

  // Pause on hover
  const handleMouseEnter = () => { isPausedRef.current = true; };
  const handleMouseLeave = () => { isPausedRef.current = false; };

  // Arrow click: pause briefly and scroll manually
  const scrollByArrow = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    isPausedRef.current = true;
    const amount = direction === 'left' ? -450 : 450;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });

    // Resume auto-scroll after a short delay
    setTimeout(() => { isPausedRef.current = false; }, 2000);
  };

  return (
    <section id="gallery" className="gallery-section-premium">
      <div className="container">
        <div className="gallery-header">
          <span className="gallery-subtitle">Gallery</span>
          <h2 className="gallery-title-text">Moments Captured</h2>
          <div className="gallery-header-divider" />
        </div>
      </div>
      
      <div className="gallery-scroll-wrapper">
        {/* Left scroll arrow */}
        <button
          className="gallery-scroll-arrow gallery-scroll-arrow--left"
          onClick={() => scrollByArrow('left')}
          aria-label="Scroll gallery left"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div
          className="gallery-scroll-container-premium"
          ref={scrollRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="gallery-scroll-content-premium">
            {[...galleryImages, ...galleryImages].map((imgSrc, idx) => (
              <div 
                key={idx} 
                className="gallery-image-wrapper-premium"
                onClick={() => setSelectedIndex(idx % galleryImages.length)}
              >
                <img src={imgSrc} alt={`Gallery image ${idx + 1}`} className="gallery-image-premium" />
                <div className="gallery-overlay-premium">
                  <div className="gallery-overlay-box">
                    <svg className="zoom-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      <line x1="11" y1="8" x2="11" y2="14"></line>
                      <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                    <span className="gallery-overlay-text-premium">Expand View</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right scroll arrow */}
        <button
          className="gallery-scroll-arrow gallery-scroll-arrow--right"
          onClick={() => scrollByArrow('right')}
          aria-label="Scroll gallery right"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="container gallery-action-container">
        <button className="btn-secondary premium-cta-btn" onClick={() => navigate('/gallery')}>
          See More Photos
        </button>
      </div>

      <ImageModal 
        isOpen={selectedIndex !== null} 
        onClose={() => setSelectedIndex(null)} 
        imageSrc={selectedIndex !== null ? galleryImages[selectedIndex] : ''}
        images={galleryImages}
        currentIndex={selectedIndex ?? 0}
        onNavigate={(idx) => setSelectedIndex(idx)}
      />
    </section>
  );
};

export default GallerySection;
