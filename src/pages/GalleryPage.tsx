import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ImageModal from '../components/common/ImageModal';
import SchemaMarkup from '../components/common/SchemaMarkup';
import './GalleryPage.css';

const allGalleryImages = [
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2162&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522413452208-996901845b4c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507504031003-b417219a0fde?q=80&w=2071&auto=format&fit=crop"
];

const galleryBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.sahajanandbanquetandlawn.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Gallery",
      "item": "https://www.sahajanandbanquetandlawn.com/gallery"
    }
  ]
};

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <div className="gallery-page-premium">
      <SchemaMarkup schema={galleryBreadcrumb} id="breadcrumb-gallery" />
      
      <div className="gallery-page-header-premium">
        <div className="container header-container">
          <button className="back-btn-premium" onClick={() => navigate('/', { state: { scrollGalleryToContact: true } })} aria-label="Go back to gallery section">
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </button>
          
          <div className="header-text-block">
            <span className="gallery-page-tag">Portfolio</span>
            <h1 className="gallery-page-title">Our Grand Gallery</h1>
            <div className="gallery-page-divider" />
            <p className="gallery-page-subtitle">A glimpse into the magical moments and celebrations hosted at Sahajanand</p>
          </div>
        </div>
      </div>

      <div className="container gallery-grid-container">
        <div className="gallery-masonry-grid">
          {allGalleryImages.map((imgSrc, idx) => (
            <div 
              key={idx} 
              className="gallery-grid-item-premium"
              onClick={() => setSelectedIndex(idx)}
            >
              <img src={imgSrc} alt={`Celebration at Sahajanand ${idx + 1}`} className="grid-image-premium" />
              <div className="grid-overlay-premium">
                <div className="grid-overlay-content">
                  <svg className="zoom-icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                  <span>Expand Image</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ImageModal 
        isOpen={selectedIndex !== null} 
        onClose={() => setSelectedIndex(null)} 
        imageSrc={selectedIndex !== null ? allGalleryImages[selectedIndex] : ''}
        images={allGalleryImages}
        currentIndex={selectedIndex ?? 0}
        onNavigate={(idx) => setSelectedIndex(idx)}
      />
    </div>
  );
}
