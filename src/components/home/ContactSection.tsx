import { useState, type FormEvent } from 'react';
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Inquiry submitted successfully!");
    handleClear();
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
                <button type="button" className="btn-secondary light" onClick={handleClear}>Clear</button>
                <button type="submit" className="btn-primary">Submit Inquiry</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
