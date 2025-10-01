

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../Routes/routes';
import './SchoolHeader.css';

const SchoolHeader = ({ school }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.body.classList.contains('dark-mode'));
    };
    
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`school-header ${isDarkMode ? 'dark' : ''}`}>
      <div className="container">
        <div className="school-info">
          <div className="school-image">
            <img 
              src={school.image || '../../../public/images/default.jpg'} 
              alt={school.name}
            />
          </div>
          <div className="school-details">
            <h1>{school.name}</h1>
            <p className="address">
              <span className="icon">📍</span> {school.address}
            </p>
            <p className="contact">
              <span className="icon">📞</span> {school.contact}
            </p>
            <p className="timings">
              <span className="icon">⏰</span> Delivery: {school.deliveryTimings}
            </p>
            <div className="rating">
              <span className="stars">★★★★★</span>
              <span className="rating-value">{school.rating}</span>
            </div>
          </div>
        </div>
        <Link to="/" className="back-link">
          ← Back to all schools
        </Link>
      </div>
    </div>
  );
};

export default SchoolHeader;