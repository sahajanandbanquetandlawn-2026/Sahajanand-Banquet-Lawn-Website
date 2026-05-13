import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Phone, MapPin, MessageCircle } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (isHomePage) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-links">
          <button onClick={() => scrollToSection('home')} className="nav-link">Home</button>
          <button onClick={() => scrollToSection('about')} className="nav-link">About Us</button>
          <button onClick={() => scrollToSection('services')} className="nav-link">Services</button>
          <button onClick={() => scrollToSection('gallery')} className="nav-link">Gallery</button>
          <button onClick={() => scrollToSection('contact')} className="nav-link">Contact Us</button>
        </div>

        <div className="nav-actions">
          <a href="https://www.instagram.com/sahajanand.banquet.and.lawn?igsh=dWsxc3NseGM5ZGF3" target="_blank" rel="noopener noreferrer" className="nav-icon" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="https://wa.me/918849641922" target="_blank" rel="noopener noreferrer" className="nav-icon" aria-label="WhatsApp">
            <MessageCircle size={20} />
          </a>
          <a href="tel:+918849641922" className="nav-icon" aria-label="Call Us">
            <Phone size={20} />
          </a>
          <a href="https://maps.app.goo.gl/NDRziWPEeyxLJ13s8" target="_blank" rel="noopener noreferrer" className="nav-icon" aria-label="Google Maps">
            <MapPin size={20} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
