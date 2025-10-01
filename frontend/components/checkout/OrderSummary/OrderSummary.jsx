import React from 'react';
import './OrderSummary.css';

const OrderSummary = ({ items, subtotal, deliveryFee, total, deliveryDate }) => {
  return (
    <div className="order-summary">
      <h3>Order Summary</h3>
      
      <div className="order-items">
        {items.map(item => (
          <div key={item.id} className="order-item">
            <span className="item-name">{item.name} × {item.quantity}</span>
            <span className="item-price">₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>
      
      <div className="price-breakdown">
        <div className="price-row">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="price-row">
          <span>Delivery Fee</span>
          <span>₹{deliveryFee}</span>
        </div>
        <div className="price-row total">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>
      
      <div className="delivery-date">
        <strong>Delivery Date:</strong> {deliveryDate}
      </div>
    </div>
  );
};

export default OrderSummary;