import React from 'react';
import { Link } from 'react-router-dom';

const SchoolCard = ({ school }) => {
  return (
    <div className="school-card">
      <Link to={`/school/${school.id}/meals`}>
        
        <div className="school-info">
        <div className="school-image">
          <img src={school.image || '../../../../public/assets/images/default.jpg'} 
          alt={school.name} />
        </div>

          <h3>{school.name}</h3>
          <p className="location">
            <span className="icon">📍</span> {school.location}
          </p>
          <p className="meals-available">{school.mealOptions} meal options available</p>
          <button className="order-now-btn">Order Now</button>
        </div>
      </Link>
    </div>
  );
};

export default SchoolCard;