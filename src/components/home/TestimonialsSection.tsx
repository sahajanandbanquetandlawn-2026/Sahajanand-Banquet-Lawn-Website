import './TestimonialsSection.css';

const testimonials = [
  {
    id: 1,
    name: "Rahul & Priya",
    text: "The perfect venue for our dream wedding. The lawn was exquisitely decorated, and the staff was incredibly cooperative. An unforgettable experience!",
  },
  {
    id: 2,
    name: "Amit Sharma",
    text: "We hosted our corporate gala at the banquet. The ambiance is highly premium, and the catering services were top-notch. Highly recommended.",
  },
  {
    id: 3,
    name: "Sneha Desai",
    text: "Beautiful location, elegant lighting, and seamless management. Our anniversary celebration could not have been better anywhere else.",
  },
  {
    id: 4,
    name: "Vikram Singh",
    text: "A truly majestic experience. The attention to detail in the decor and the vastness of the lawn makes it the best venue in the city.",
  },
  {
    id: 5,
    name: "Anjali & Rohan",
    text: "From start to finish, the Sahajanand team made sure our event was flawless. The banquet hall feels so luxurious and premium.",
  }
];

const TestimonialsSection = () => {
  return (
    <section className="section testimonials-section bg-secondary">
      <h2 className="section-title">Client Feedback</h2>
      
      <div className="marquee-container">
        <div className="marquee-content">
          {/* Duplicate the testimonials array to create a seamless loop */}
          {[...testimonials, ...testimonials].map((t, index) => (
            <div key={`${t.id}-${index}`} className="testimonial-card">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">- {t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
