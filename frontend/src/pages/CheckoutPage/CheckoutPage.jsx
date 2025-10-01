import React, { useState } from 'react';
import { useThemeTrigger } from '../../ThemeTrigger'; // Adjust path as needed
import styles from './CheckoutPage.module.css';

const CheckoutPage = () => {
  const { darkMode } = useThemeTrigger();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [cartItems] = useState([
    { id: 1, name: 'Product 1', price: 29.99, quantity: 2 },
    { id: 2, name: 'Product 2', price: 49.99, quantity: 1 }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle checkout logic here
    console.log('Checkout data:', formData);
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const shipping = 5.99;
  const total = subtotal + tax + shipping;

  return (
    <div className={`${styles.checkoutPage} ${darkMode ? styles.dark : styles.light}`}>
      <div className={styles.container}>
        <h1 className={styles.title}>Checkout</h1>
        
        <div className={styles.checkoutContent}>
          {/* Shipping Information */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Shipping Information</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="firstName" className={styles.label}>First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="lastName" className={styles.label}>Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="address" className={styles.label}>Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="city" className={styles.label}>City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="zipCode" className={styles.label}>ZIP Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Payment Information */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Payment Information</h2>
            <div className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="cardNumber" className={styles.label}>Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="expiryDate" className={styles.label}>Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="cvv" className={styles.label}>CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Order Summary</h2>
            <div className={styles.orderSummary}>
              {cartItems.map(item => (
                <div key={item.id} className={styles.orderItem}>
                  <span className={styles.itemName}>{item.name} × {item.quantity}</span>
                  <span className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              
              <div className={styles.summaryRow}>
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.total}`}>
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <button type="submit" className={styles.checkoutButton} onClick={handleSubmit}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;