import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ROUTES } from '../../routes';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { orderId } = useParams();

  // Mock order data - replace with actual data from API/context
  const order = {
    id: orderId,
    date: new Date().toLocaleDateString(),
    items: [
      { name: 'Vegetable Meal', quantity: 2, price: 120 },
      { name: 'Fruit Juice', quantity: 1, price: 50 }
    ],
    deliveryInfo: {
      school: 'Greenwood High',
      date: 'Monday, June 5, 2023',
      time: '12:00 PM - 1:00 PM'
    },
    payment: {
      method: 'UPI',
      amount: 290
    }
  };

  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  return (
    <div className="order-confirmation">
      <div className="confirmation-header">
        <div className="confirmation-icon">✓</div>
        <h1>Order Confirmed!</h1>
        <p className="confirmation-message">
          Thank you for your order. We've sent a confirmation to your email.
        </p>
        <p className="order-number">Order #: {order.id}</p>
      </div>

      <div className="confirmation-details">
        <div className="order-summary">
          <h2>Order Summary</h2>
          <ul className="order-items">
            {order.items.map((item, index) => (
              <li key={index}>
                <span className="item-name">{item.name} × {item.quantity}</span>
                <span className="item-price">₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="total-row">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>
            <div className="total-row grand-total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>

        <div className="delivery-info">
          <h2>Delivery Information</h2>
          <p><strong>School:</strong> {order.deliveryInfo.school}</p>
          <p><strong>Delivery Date:</strong> {order.deliveryInfo.date}</p>
          <p><strong>Time Window:</strong> {order.deliveryInfo.time}</p>
          <div className="delivery-instructions">
            <h3>Important Instructions</h3>
            <ul>
              <li>Student must present school ID for meal collection</li>
              <li>Contact school reception if any issues</li>
              <li>No refunds for unclaimed meals</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="confirmation-actions">
        <Link to={ROUTES.DASHBOARD} className="dashboard-button">
          View in Dashboard
        </Link>
        <Link to={ROUTES.HOME} className="home-button">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation; // This is the crucial default export