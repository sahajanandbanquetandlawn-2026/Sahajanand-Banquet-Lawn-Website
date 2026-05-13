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
    <section id="gallery" className="section gallery-section">
      <div className="container">
        <h2 className="section-title">Moments Captured</h2>
      </div>
      
      <div className="gallery-scroll-container">
        <div className="gallery-scroll-content">
          {[...galleryImages, ...galleryImages].map((imgSrc, idx) => (
            <div 
              key={idx} 
              className="gallery-image-wrapper"
              onClick={() => setSelectedImg(imgSrc)}
            >
              <img src={imgSrc} alt={`Gallery image ${idx + 1}`} className="gallery-image" />
              <div className="gallery-overlay">
                <span className="gallery-overlay-text">View Image</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <button className="btn-secondary" onClick={() => navigate('/gallery')}>
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
