import React from 'react';
import './TermsAlert.css';

const TermsAlert = ({ accepted, onToggleAccept }) => {
  return (
    <div className="terms-alert">
      <div className="terms-content">
        <h4>Important Terms & Conditions</h4>
        <ul>
          <li>Orders must be placed before 10:00 AM for same-day delivery</li>
          <li>Student must present school ID for meal collection</li>
          <li>Cancellations must be made at least 2 hours before delivery</li>
        </ul>
      </div>
      <div className="terms-checkbox">
        <input 
          type="checkbox" 
          id="terms-agreement" 
          checked={accepted}
          onChange={onToggleAccept}
        />
        <label htmlFor="terms-agreement">
          I agree to the terms and conditions
        </label>
      </div>
    </div>
  );
};

export default TermsAlert;