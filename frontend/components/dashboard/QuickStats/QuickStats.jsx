import React from 'react';
import './QuickStats.css';

const QuickStats = ({ stats }) => {
  return (
    <div className="quick-stats">
      <div className="stat-card">
        <h4>Total Orders</h4>
        <p className="stat-value">{stats.totalOrders}</p>
      </div>
      <div className="stat-card">
        <h4>Upcoming</h4>
        <p className="stat-value">{stats.upcomingOrders}</p>
      </div>
      <div className="stat-card">
        <h4>Favorite Meal</h4>
        <p className="stat-value">{stats.favoriteMeal}</p>
      </div>
    </div>
  );
};

export default QuickStats;