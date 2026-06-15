import { useState, useCallback, useRef, useEffect, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from '../../lib/supabase';
import MapSection from './MapSection';
import './ContactSection.css';

/* ─── Confetti Particle System ─── */
interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  size: number;
  opacity: number;
  shape: 'rect' | 'circle' | 'star';
}

const CONFETTI_COLORS = [
  '#771d3e', '#f272ab', '#f9a8d4', '#fff0f5',  // golds
  '#ff6b6b', '#ee5a24', '#f39c12',              // warm
  '#6c5ce7', '#a29bfe', '#fd79a8',              // purple/pink
  '#00cec9', '#55efc4', '#81ecec',              // teal
];

const ConfettiCanvas = ({ active }: { active: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  const createParticles = useCallback(() => {
    const particles: Particle[] = [];
    for (let i = 0; i < 150; i++) {
      particles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 200,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * 4 + 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: Math.random() * 8 + 4,
        opacity: 1,
        shape: (['rect', 'circle', 'star'] as const)[Math.floor(Math.random() * 3)],
      });
    }
    return particles;
  }, []);

  useEffect(() => {
    if (!active || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    particlesRef.current = createParticles();

    const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) => {
      const spikes = 5;
      const outerRadius = size;
      const innerRadius = size / 2;
      let rot = (Math.PI / 2) * 3;
      const step = Math.PI / spikes;
      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(cx + Math.cos(rot) * outerRadius, cy + Math.sin(rot) * outerRadius);
        rot += step;
        ctx.lineTo(cx + Math.cos(rot) * innerRadius, cy + Math.sin(rot) * innerRadius);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particlesRef.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity
        p.vx *= 0.99;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.004;

        if (p.opacity <= 0) return;
        alive = true;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          drawStar(ctx, 0, 0, p.size / 2);
        }
        ctx.restore();
      });

      if (alive) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [active, createParticles]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="confetti-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1100,
      }}
    />
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    eventType: 'Wedding',
    otherEvent: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [buttonState, setButtonState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setButtonState('submitting');
    
    try {
      const { error } = await supabase.rpc('submit_website_inquiry', {
        p_name: formData.name,
        p_phone: formData.phone,
        p_event_type: formData.eventType === 'Others' ? 'Other' : formData.eventType,
        p_other_event_type: formData.eventType === 'Others' ? formData.otherEvent : null,
        p_event_date: formData.date
      });

      if (error) throw error;

      setButtonState('success');
      setShowConfetti(true);

      // Show success on button briefly, then show modal
      setTimeout(() => {
        setShowSuccessModal(true);
        handleClear();
      }, 600);

      // Stop confetti after a few seconds
      setTimeout(() => setShowConfetti(false), 5000);
    } catch (error: any) {
      console.error("Submission error:", error);
      setButtonState('idle');
      alert("There was an error submitting your inquiry. Please try again or call us.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({
      name: '',
      phone: '',
      date: '',
      eventType: 'Wedding',
      otherEvent: ''
    });
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    setButtonState('idle');
  };

  /* Create ripple effect on button click */
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('btn-ripple');
    btn.appendChild(ripple);

    setTimeout(() => ripple.remove(), 700);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="contact-wrapper">
          <div className="contact-info">
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1rem', color: '#1c1c1c' }}>Contact Us</h2>
            <p className="contact-desc">
              Ready to make your event unforgettable? Reach out to us for bookings, 
              inquiries, or simply to take a tour of our magnificent venue.
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="contact-text">
                  <strong>Address</strong>
                  <span>Near Shree Siddheshwar Happy Life, Manjalpur-Atladra Overbridge, Manjalpur, Vadodara, Gujarat, India 390011</span>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className="contact-text">
                  <strong>Visiting Hours</strong>
                  <div className="timing-info">
                    <div className="timing-slots">
                      <div className="timing-slot">
                        <span className="slot-label">Morning:</span>
                        <span className="slot-time">10:30 AM – 12:30 PM</span>
                      </div>
                      <div className="timing-slot">
                        <span className="slot-label">Evening:</span>
                        <span className="slot-time">06:00 PM – 08:30 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="contact-text">
                  <strong>Phone</strong>
                  <a href="tel:+918849641922">+91 88496 41922</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="contact-text">
                  <strong>Email</strong>
                  <a href="mailto:sahajanandbanquetandlawn@gmail.com">sahajanandbanquetandlawn@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="eventType">Type of Event</label>
                <select 
                  id="eventType" 
                  name="eventType" 
                  value={formData.eventType} 
                  onChange={handleChange}
                  required
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {formData.eventType === 'Others' && (
                <div className="form-group animate-fade-in">
                  <label htmlFor="otherEvent">Please Specify</label>
                  <input 
                    type="text" 
                    id="otherEvent" 
                    name="otherEvent" 
                    value={formData.otherEvent} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="date">Date of Event</label>
                <input 
                  type="date" 
                  id="date" 
                  name="date" 
                  value={formData.date} 
                  onChange={handleChange}
                  onClick={(e) => {
                    if ('showPicker' in HTMLInputElement.prototype) {
                      e.currentTarget.showPicker();
                    }
                  }}
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={handleClear} disabled={isSubmitting}>Clear</button>
                <button 
                  ref={submitBtnRef}
                  type="submit" 
                  className={`btn-submit-premium ${buttonState}`}
                  disabled={isSubmitting}
                  onClick={handleButtonClick}
                >
                  <span className="btn-content">
                    {buttonState === 'submitting' && (
                      <span className="btn-spinner" />
                    )}
                    {buttonState === 'success' && (
                      <span className="btn-checkmark">✓</span>
                    )}
                    <span className="btn-text">
                      {buttonState === 'idle' && 'Submit Inquiry'}
                      {buttonState === 'submitting' && 'Sending...'}
                      {buttonState === 'success' && 'Sent!'}
                    </span>
                  </span>
                  <span className="btn-shimmer" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Google Maps — Find Us */}
        <MapSection />
      </div>

      {/* Confetti overlay */}
      {createPortal(<ConfettiCanvas active={showConfetti} />, document.body)}

      {showSuccessModal && createPortal(
        <div className="success-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="success-modal premium-modal">
            <button className="modal-close-icon" onClick={closeModal} aria-label="Close modal">×</button>
            
            {/* Decorative top accent */}
            <div className="modal-accent-bar" />

            {/* Success icon with animation */}
            <div className="modal-success-icon">
              <svg viewBox="0 0 52 52" className="checkmark-svg">
                <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
            </div>

            <h3 className="modal-title">Inquiry Submitted!</h3>
            <p className="modal-subtitle">Thank you for reaching out. We will contact you soon.</p>
            
            <div className="modal-extra-info premium">
              <p>For the best experience, we invite you to visit our venue in person!</p>
              
              <div className="modal-actions-grid premium">
                <a href="https://maps.app.goo.gl/NDRziWPEeyxLJ13s8" target="_blank" rel="noopener noreferrer" className="btn-modal-premium map-btn-premium">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  Get Directions
                </a>
                <a href="tel:+918849641922" className="btn-modal-premium call-btn-premium">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  Call Us
                </a>
                <a href="https://wa.me/918849641922?text=Hi%2C%20I%20am%20interested%20in%20your%20venue.%20I%20want%20to%20know%20more%20information%20about%20it.%20Can%20you%20share%20it%3F" target="_blank" rel="noopener noreferrer" className="btn-modal-premium wa-btn-premium">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </div>
            
            <button className="btn-modal-close" onClick={closeModal}>Close</button>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default ContactSection;
