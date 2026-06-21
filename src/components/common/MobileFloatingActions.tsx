import React from 'react';
import { Phone, MapPin } from 'lucide-react';
import './MobileFloatingActions.css';

const MobileFloatingActions: React.FC = () => {
  return (
    <div className="mobile-floating-actions">
      <a
        href="https://wa.me/918849641922"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-action-circle whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          <path d="M9.49 10.06a5.42 5.42 0 0 0 1.08 1.78c.5.55 1.07 1.01 1.72 1.37.33.18.7.33 1 .35.31.02.58-.07.77-.28l.3-.34c.17-.19.42-.21.65-.1l1.26.63c.22.11.36.32.37.56 0 .38-.16.74-.44.99-.3.27-.66.44-1.06.47-.74.06-1.46-.16-2.1-.5a8.72 8.72 0 0 1-2.56-2.05 8.22 8.22 0 0 1-1.36-2.3c-.25-.6-.37-1.26-.23-1.9.07-.33.24-.63.49-.86.27-.25.62-.4.97-.38.2.01.38.12.48.3l.72 1.23c.11.2.1.44-.04.62l-.38.43c-.16.18-.17.44-.04.65"/>
        </svg>
        <span className="pulse-ring"></span>
      </a>

      <a
        href="https://www.instagram.com/sahajanand.banquet.and.lawn?igsh=dWsxc3NseGM5ZGF3"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-action-circle instagram"
        aria-label="Follow us on Instagram"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      </a>

      <a
        href="tel:+918849641922"
        className="floating-action-circle call"
        aria-label="Call Us"
      >
        <Phone size={24} className="icon-svg" />
        <span className="pulse-ring"></span>
      </a>

      <a
        href="https://maps.app.goo.gl/NDRziWPEeyxLJ13s8"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-action-circle location"
        aria-label="Find us on Google Maps"
      >
        <MapPin size={24} className="icon-svg" />
      </a>
    </div>
  );
};

export default MobileFloatingActions;
