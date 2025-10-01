

// CartSummary.jsx
import React, { useEffect, useState } from 'react';
import CartItem from '../CartItem/CartItem';
import './CartSummary.css';
import { Link } from 'react-router-dom';
const CartSummary = ({ cart, onRemove, onQuantityChange, school, selectedDate }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryCharge = 50; // Example fixed delivery charge
  const total = subtotal + deliveryCharge;

  useEffect(() => {
    // Check if dark mode is enabled on the body element
    const checkDarkMode = () => {
      setIsDarkMode(document.body.classList.contains('dark-mode'));
    };
    
    checkDarkMode();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`cart-summary ${isDarkMode ? 'dark' : ''}`}>
      <h2>Your Order</h2>
      
      <div className="order-details">
        <div className="school-info">
          <h3>{school.name}</h3>
          <p>Delivery on: {selectedDate.toLocaleDateString()}</p>
        </div>

        <div className="cart-items">
          {cart.length > 0 ? (
            cart.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={onRemove}
                onQuantityChange={onQuantityChange}
                isDarkMode={isDarkMode}
              />
            ))
          ) : (
            <p className="empty-cart">Your cart is empty</p>
          )}
        </div>

        <div className="order-totals">
          <div className="total-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="total-row">
            <span>Delivery</span>
            <span>₹{deliveryCharge}</span>
          </div>
          <div className="total-row grand-total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        <div className="terms-alert">
          <p><strong>Important:</strong> Orders must be placed before 10:00 AM</p>
          <p>Student must carry school ID for verification</p>
        </div>

        <button className="checkout-button"disabled={cart.length === 0}><Link to="/Checkout">Proceed to Checkout</Link></button>
      </div>
    </div>
  );
};

export default CartSummary;