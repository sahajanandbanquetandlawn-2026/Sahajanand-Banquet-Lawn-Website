import { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import './ImageModal.css';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  images?: string[];
  currentIndex?: number;
  onNavigate?: (index: number) => void;
}

const ImageModal = ({ isOpen, onClose, imageSrc, images, currentIndex = 0, onNavigate }: ImageModalProps) => {
  const hasNavigation = images && images.length > 1 && onNavigate;
  const canGoPrev = hasNavigation && currentIndex > 0;
  const canGoNext = hasNavigation && currentIndex < images.length - 1;

  const goNext = useCallback(() => {
    if (canGoNext && onNavigate) onNavigate(currentIndex + 1);
  }, [canGoNext, onNavigate, currentIndex]);

  const goPrev = useCallback(() => {
    if (canGoPrev && onNavigate) onNavigate(currentIndex - 1);
  }, [canGoPrev, onNavigate, currentIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose, goNext, goPrev]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <button className="modal-close" onClick={onClose} aria-label="Close image">
        <X size={32} />
      </button>

      {/* Left Arrow */}
      {canGoPrev && (
        <button
          className="modal-nav-btn modal-nav-btn--left"
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          aria-label="Previous image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* Image */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img
          key={imageSrc}
          src={imageSrc}
          alt="Enlarged gallery view"
          className="modal-image"
        />
      </div>

      {/* Right Arrow */}
      {canGoNext && (
        <button
          className="modal-nav-btn modal-nav-btn--right"
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          aria-label="Next image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      {/* Image Counter */}
      {hasNavigation && (
        <div className="modal-counter">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

export default ImageModal;
