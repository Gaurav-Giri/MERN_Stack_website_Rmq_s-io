import React from 'react';
import './PaymentOptions.css';

const PaymentOptions = ({ selectedMethod, onSelectMethod }) => {
  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: '💸' },
    { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
    { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
    { id: 'wallet', name: 'Wallet', icon: '💰' }
  ];

  return (
    <div className="payment-options">
      <h3>Payment Method</h3>
      <div className="methods-grid">
        {paymentMethods.map(method => (
          <div 
            key={method.id}
            className={`method-card ${selectedMethod === method.id ? 'selected' : ''}`}
            onClick={() => onSelectMethod(method.id)}
          >
            <span className="method-icon">{method.icon}</span>
            <span className="method-name">{method.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentOptions;