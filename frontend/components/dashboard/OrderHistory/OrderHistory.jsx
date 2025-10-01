import React from 'react';
import './OrderHistory.css';

const OrderHistory = ({ orders }) => {
  return (
    <div className="order-history">
      <div className="order-history-header">
        <h2>Order History</h2>
        <div className="date-filter">
          <select>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last 6 months</option>
            <option>All orders</option>
          </select>
        </div>
      </div>

      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div>
                <h3>Order #{order.id}</h3>
                <p className="order-date">{order.date}</p>
              </div>
              <span className={`order-status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>
            
            <div className="order-details">
              <div className="order-items">
                {order.items.map((item, index) => (
                  <span key={index} className="order-item">
                    {item}
                    {index < order.items.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
              <div className="order-total">₹{order.total}</div>
            </div>

            <div className="order-actions">
              <button className="reorder-button">Reorder</button>
              <button className="details-button">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;  // This is the crucial default export