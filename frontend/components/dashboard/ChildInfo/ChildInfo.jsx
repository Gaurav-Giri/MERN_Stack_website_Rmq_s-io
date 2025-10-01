import React from 'react';
import './ChildInfo.css';

const ChildInfo = ({ child }) => {
  return (
    <div className="child-info-card">
      <div className="child-header">
        <h3>{child.name}</h3>
        <span className="edit-btn">Edit</span>
      </div>
      <div className="child-details">
        <p><strong>School:</strong> {child.school}</p>
        <p><strong>Grade:</strong> {child.grade}</p>
        <p><strong>Admission No:</strong> {child.admissionNumber}</p>
      </div>
    </div>
  );
};

export default ChildInfo;