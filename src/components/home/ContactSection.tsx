import { useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from '../../lib/supabase';
import './ContactSection.css';

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.rpc('submit_website_inquiry', {
        p_name: formData.name,
        p_phone: formData.phone,
        p_event_type: formData.eventType === 'Others' ? 'Other' : formData.eventType,
        p_other_event_type: formData.eventType === 'Others' ? formData.otherEvent : null,
        p_event_date: formData.date
      });

      if (error) throw error;

      setShowSuccessModal(true);
      handleClear();
    } catch (error: any) {
      console.error("Submission error:", error);
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

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="contact-wrapper">
          <div className="contact-info">
            <h2 className="section-title dark" style={{ textAlign: 'left', marginBottom: '1rem' }}>Contact Us</h2>
            <p className="contact-desc">
              Ready to make your event unforgettable? Reach out to us for bookings, 
              inquiries, or simply to take a tour of our magnificent venue.
            </p>
            <div className="contact-details">
              <p><strong>Address:</strong> near Shree Siddheshwar Happyllife, Overbridge, Darbar Chokdi, Manjalpur, Vadodara, Gujarat 390011</p>
              <p><strong>Timings:</strong> Mon-Sun, 10 AM - 12 PM & 5 PM - 7 PM</p>
              <p><strong>Phone:</strong> <a href="tel:+918849641922">+91 88496 41922</a></p>
              <p><strong>Email:</strong> sahajanandbanquetandlawn@gmail.com</p>
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
                <button type="button" className="btn-secondary light" onClick={handleClear} disabled={isSubmitting}>Clear</button>
                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showSuccessModal && createPortal(
        <div className="success-modal-overlay animate-fade-in">
          <div className="success-modal">
            <button className="modal-close-icon" onClick={() => setShowSuccessModal(false)} aria-label="Close modal">×</button>
            <h3 className="modal-title">Inquiry Submitted Successfully!</h3>
            <p className="modal-subtitle">Thank you for reaching out. We will contact you soon.</p>
            
            <div className="modal-extra-info">
              <p>For the best experience, we invite you to visit our venue in person!</p>
              
              <div className="modal-actions-grid">
                <a href="https://maps.app.goo.gl/NDRziWPEeyxLJ13s8" target="_blank" rel="noopener noreferrer" className="btn-modal map-btn">
                  Get Directions
                </a>
                <a href="tel:+918849641922" className="btn-modal call-btn">
                  Call Us
                </a>
                <a href="https://wa.me/918849641922?text=Hi%2C%20I%20am%20interested%20in%20your%20venue.%20I%20want%20to%20know%20more%20information%20about%20it.%20Can%20you%20share%20it%3F" target="_blank" rel="noopener noreferrer" className="btn-modal wa-btn">
                  WhatsApp Us
                </a>
              </div>
            </div>
            
            <button className="btn-secondary modal-close-btn" onClick={() => setShowSuccessModal(false)}>Close</button>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default ContactSection;
