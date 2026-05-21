import { useState } from 'react';
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
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <section id="gallery" className="gallery-section-premium">
      <div className="container">
        <div className="gallery-header">
          <span className="gallery-subtitle">Visual Journey</span>
          <h2 className="gallery-title-text">Moments Captured</h2>
          <div className="gallery-header-divider" />
        </div>
      </div>
      
      <div className="gallery-scroll-container-premium">
        <div className="gallery-scroll-content-premium">
          {[...galleryImages, ...galleryImages].map((imgSrc, idx) => (
            <div 
              key={idx} 
              className="gallery-image-wrapper-premium"
              onClick={() => setSelectedImg(imgSrc)}
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

      <div className="container gallery-action-container">
        <button className="btn-secondary premium-cta-btn" onClick={() => navigate('/gallery')}>
          See More Photos
        </button>
      </div>

      <ImageModal 
        isOpen={!!selectedImg} 
        onClose={() => setSelectedImg(null)} 
        imageSrc={selectedImg || ''} 
      />
    </section>
  );
};

export default GallerySection;
