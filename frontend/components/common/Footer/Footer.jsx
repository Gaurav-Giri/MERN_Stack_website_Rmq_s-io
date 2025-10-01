import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Company</h3>
            <p>Fresh meals delivered to your child's school</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>support@schoollunchbox.com</p>
            <p>+91 9876543210</p>
          </div>
        </div>
        <div className="copyright">
          <p>© 2023 School Lunch Box. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;