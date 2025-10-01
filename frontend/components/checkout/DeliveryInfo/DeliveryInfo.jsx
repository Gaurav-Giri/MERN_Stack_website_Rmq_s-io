import React from 'react';
import './DeliveryInfo.css';

const DeliveryInfo = ({ childName, admissionNumber, grade, school }) => {
  return (
    <div className="delivery-info">
      <h3>Delivery Information</h3>
      <div className="info-grid">
        <div className="info-item">
          <label>Child's Name</label>
          <p>{childName}</p>
        </div>
        <div className="info-item">
          <label>Admission Number</label>
          <p>{admissionNumber}</p>
        </div>
        <div className="info-item">
          <label>Grade</label>
          <p>{grade}</p>
        </div>
        <div className="info-item">
          <label>School</label>
          <p>{school}</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;  // This is the crucial default export