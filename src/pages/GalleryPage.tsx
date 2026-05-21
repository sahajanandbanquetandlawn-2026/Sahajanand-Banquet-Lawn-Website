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
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="gallery-page">
      <SchemaMarkup schema={galleryBreadcrumb} id="breadcrumb-gallery" />
      <div className="gallery-page-header">
        <div className="container">
          <button className="back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={24} />
            <span>Back to Home</span>
          </button>
          <h1 className="page-title">Our Grand Gallery</h1>
          <p className="page-subtitle">A glimpse into the magical moments hosted at Sahajanand</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '100px' }}>
        <div className="gallery-grid">
          {allGalleryImages.map((imgSrc, idx) => (
            <div 
              key={idx} 
              className="gallery-grid-item"
              onClick={() => setSelectedImg(imgSrc)}
            >
              <img src={imgSrc} alt={`Gallery grid ${idx + 1}`} />
              <div className="gallery-overlay">
                <span className="gallery-overlay-text">Click to Zoom</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ImageModal 
        isOpen={!!selectedImg} 
        onClose={() => setSelectedImg(null)} 
        imageSrc={selectedImg || ''} 
      />
    </div>
  );
}

