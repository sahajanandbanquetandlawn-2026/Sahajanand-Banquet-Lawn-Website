import { X } from 'lucide-react';
import './ImageModal.css';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
}

const ImageModal = ({ isOpen, onClose, imageSrc }: ImageModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <button className="modal-close" onClick={onClose} aria-label="Close image">
        <X size={32} />
      </button>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageSrc} alt="Enlarged gallery view" className="modal-image" />
      </div>
    </div>
  );
};

export default ImageModal;
