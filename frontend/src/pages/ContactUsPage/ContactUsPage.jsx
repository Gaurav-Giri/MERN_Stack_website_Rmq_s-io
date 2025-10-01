// ContactUsPage.jsx
import React, { useState } from 'react';
import { useThemeTrigger } from '../../ThemeTrigger';
import './ContactUsPage.css';

const ContactUsPage = () => {
  const { darkMode } = useThemeTrigger();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Simulate form submission
    try {
      // In a real application, you would make an API call here
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus({ type: 'success', message: 'Your message has been sent successfully!' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'There was an error sending your message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`contact-us-page ${darkMode ? 'dark-mode' : ''}`}>
      <div className="contact-container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Please fill out the form below or use our contact information.</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="info-details">
                <h3>Address</h3>
                <p>123 Business Avenue, Suite 100<br />City, State 12345</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div className="info-details">
                <h3>Phone</h3>
                <p>(123) 456-7890</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="info-details">
                <h3>Email</h3>
                <p>info@company.com</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="info-details">
                <h3>Business Hours</h3>
                <p>Monday - Friday: 9am - 5pm<br />Saturday: 10am - 2pm<br />Sunday: Closed</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            <h2>Send us a Message</h2>
            {submitStatus && (
              <div className={`submit-status ${submitStatus.type}`}>
                {submitStatus.message}
              </div>
            )}
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
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
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;