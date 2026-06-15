import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Phone, MapPin, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      if (isHomePage) {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.location.href = `/#${id}`;
      }
    }, 300); // Wait for menu closing animation
  };

  return (
    <>
      <nav className={`navbar ${scrolled || menuOpen ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo or brand name on left for mobile context */}
          <div className="nav-brand" onClick={() => handleLinkClick('home')}>
            <img src="/Transparent white logo .jpeg" alt="Sahajanand Logo" className="nav-logo" />
            <span>Sahajanand</span>
          </div>

          <div className="nav-links-desktop">
            <button onClick={() => handleLinkClick('home')} className="nav-link">Home</button>
            <button onClick={() => handleLinkClick('about')} className="nav-link">About Us</button>
            <button onClick={() => handleLinkClick('services')} className="nav-link">Services</button>
            <button onClick={() => handleLinkClick('amenities')} className="nav-link">Amenities</button>
            <button onClick={() => handleLinkClick('gallery')} className="nav-link">Gallery</button>
            <button onClick={() => handleLinkClick('contact')} className="nav-link">Contact Us</button>
          </div>

          <div className="nav-actions-desktop">
            <a href="https://www.instagram.com/sahajanand.banquet.and.lawn?igsh=dWsxc3NseGM5ZGF3" target="_blank" rel="noopener noreferrer" className="nav-icon" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://wa.me/918849641922" target="_blank" rel="noopener noreferrer" className="nav-icon" aria-label="WhatsApp">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                <path d="M9.49 10.06a5.42 5.42 0 0 0 1.08 1.78c.5.55 1.07 1.01 1.72 1.37.33.18.7.33 1 .35.31.02.58-.07.77-.28l.3-.34c.17-.19.42-.21.65-.1l1.26.63c.22.11.36.32.37.56 0 .38-.16.74-.44.99-.3.27-.66.44-1.06.47-.74.06-1.46-.16-2.1-.5a8.72 8.72 0 0 1-2.56-2.05 8.22 8.22 0 0 1-1.36-2.3c-.25-.6-.37-1.26-.23-1.9.07-.33.24-.63.49-.86.27-.25.62-.4.97-.38.2.01.38.12.48.3l.72 1.23c.11.2.1.44-.04.62l-.38.43c-.16.18-.17.44-.04.65"/>
              </svg>
            </a>
            <a href="tel:+918849641922" className="nav-icon" aria-label="Call Us">
              <Phone size={20} />
            </a>
            <a href="https://maps.app.goo.gl/NDRziWPEeyxLJ13s8" target="_blank" rel="noopener noreferrer" className="nav-icon" aria-label="Google Maps">
              <MapPin size={20} />
            </a>
          </div>

          {/* Hamburger toggle button for mobile */}
          <button className="nav-hamburger" onClick={toggleMenu} aria-label="Toggle menu">
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Slide-out mobile menu overlay */}
      <div className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-nav-links">
            <button onClick={() => handleLinkClick('home')} className="mobile-nav-link">Home</button>
            <button onClick={() => handleLinkClick('about')} className="mobile-nav-link">About Us</button>
            <button onClick={() => handleLinkClick('services')} className="mobile-nav-link">Services</button>
            <button onClick={() => handleLinkClick('amenities')} className="mobile-nav-link">Amenities</button>
            <button onClick={() => handleLinkClick('gallery')} className="mobile-nav-link">Gallery</button>
            <button onClick={() => handleLinkClick('contact')} className="mobile-nav-link">Contact Us</button>
          </div>
          
          <div className="mobile-nav-divider" />
          
          <div className="mobile-nav-actions">
            <a href="https://www.instagram.com/sahajanand.banquet.and.lawn?igsh=dWsxc3NseGM5ZGF3" target="_blank" rel="noopener noreferrer" className="mobile-nav-icon instagram" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              <span>Instagram</span>
            </a>
            <a href="https://wa.me/918849641922" target="_blank" rel="noopener noreferrer" className="mobile-nav-icon whatsapp" aria-label="WhatsApp">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                <path d="M9.49 10.06a5.42 5.42 0 0 0 1.08 1.78c.5.55 1.07 1.01 1.72 1.37.33.18.7.33 1 .35.31.02.58-.07.77-.28l.3-.34c.17-.19.42-.21.65-.1l1.26.63c.22.11.36.32.37.56 0 .38-.16.74-.44.99-.3.27-.66.44-1.06.47-.74.06-1.46-.16-2.1-.5a8.72 8.72 0 0 1-2.56-2.05 8.22 8.22 0 0 1-1.36-2.3c-.25-.6-.37-1.26-.23-1.9.07-.33.24-.63.49-.86.27-.25.62-.4.97-.38.2.01.38.12.48.3l.72 1.23c.11.2.1.44-.04.62l-.38.43c-.16.18-.17.44-.04.65"/>
              </svg>
              <span>WhatsApp</span>
            </a>
            <a href="tel:+918849641922" className="mobile-nav-icon call" aria-label="Call Us">
              <Phone size={22} />
              <span>Call Us</span>
            </a>
            <a href="https://maps.app.goo.gl/NDRziWPEeyxLJ13s8" target="_blank" rel="noopener noreferrer" className="mobile-nav-icon maps" aria-label="Google Maps">
              <MapPin size={22} />
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
