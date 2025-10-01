

// CartItem.jsx
import React from 'react';
import './CartItem.css';

const CartItem = ({ item, onRemove, onQuantityChange, isDarkMode }) => {
  return (
    <div className={`cart-item ${isDarkMode ? 'dark' : ''}`}>
      <div className="item-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="item-details">
        <h4>{item.name}</h4>
        <div className="item-price">₹{item.price}</div>
        
        <div className="item-controls">
          <div className="quantity-selector">
            <button 
              onClick={() => onQuantityChange(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => onQuantityChange(item.id, item.quantity + 1)}>
              +
            </button>
          </div>
          
          <button 
            className="remove-button"
            onClick={() => onRemove(item.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;