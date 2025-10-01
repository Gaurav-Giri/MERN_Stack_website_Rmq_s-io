// VendorPage.jsx
import React, { useState } from 'react';
import { useThemeTrigger } from '../../../ThemeTrigger';
import styles from './vendorDashboardPage.module.css';

const VendorPage = () => {
  const { darkMode } = useThemeTrigger();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([
    { id: 1, customer: 'John Doe', product: 'Wireless Headphones', price: '$89.99', status: 'Pending', date: '2023-05-15' },
    { id: 2, customer: 'Jane Smith', product: 'Smart Watch', price: '$149.99', status: 'Confirmed', date: '2023-05-14' },
    { id: 3, customer: 'Robert Johnson', product: 'Bluetooth Speaker', price: '$59.99', status: 'Rejected', date: '2023-05-13' },
    { id: 4, customer: 'Emily Davis', product: 'Phone Case', price: '$24.99', status: 'Pending', date: '2023-05-12' },
    { id: 5, customer: 'Michael Wilson', product: 'USB-C Cable', price: '$19.99', status: 'Shipped', date: '2023-05-11' },
  ]);

  const [products] = useState([
    { id: 1, name: 'Wireless Headphones', stock: 42, price: '$89.99', sales: 128 },
    { id: 2, name: 'Smart Watch', stock: 15, price: '$149.99', sales: 75 },
    { id: 3, name: 'Bluetooth Speaker', stock: 23, price: '$59.99', sales: 93 },
    { id: 4, name: 'Phone Case', stock: 87, price: '$24.99', sales: 215 },
    { id: 5, name: 'USB-C Cable', stock: 56, price: '$19.99', sales: 187 },
  ]);

  const stats = {
    totalSales: '$12,487',
    totalOrders: 184,
    conversionRate: '4.3%',
    inventoryItems: 32
  };

  const handleConfirmOrder = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'Confirmed' } : order
    ));
  };

  const handleRejectOrder = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'Rejected' } : order
    ));
  };

  const renderDashboard = () => (
    <div className={styles.dashboard}>
      <h2>Dashboard Overview</h2>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Sales</h3>
          <p className={styles.statValue}>{stats.totalSales}</p>
          <span className={styles.statTrend}>+12% from last month</span>
        </div>
        <div className={styles.statCard}>
          <h3>Total Orders</h3>
          <p className={styles.statValue}>{stats.totalOrders}</p>
          <span className={styles.statTrend}>+8% from last month</span>
        </div>
        <div className={styles.statCard}>
          <h3>Conversion Rate</h3>
          <p className={styles.statValue}>{stats.conversionRate}</p>
          <span className={styles.statTrend}>+2.1% from last month</span>
        </div>
        <div className={styles.statCard}>
          <h3>Inventory Items</h3>
          <p className={styles.statValue}>{stats.inventoryItems}</p>
          <span className={styles.statTrend}>5 low in stock</span>
        </div>
      </div>

      <div className={styles.chartPlaceholder}>
        <h3>Sales Overview</h3>
        <div className={styles.chart}>
          <p>Sales chart visualization would appear here</p>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className={styles.orders}>
      <h2>Order Management</h2>
      <div className={styles.tableContainer}>
        <table className={styles.ordersTable}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Price</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.product}</td>
                <td>{order.price}</td>
                <td>{order.date}</td>
                <td>
                  <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  {order.status === 'Pending' && (
                    <div className={styles.actionButtons}>
                      <button 
                        className={styles.confirmBtn}
                        onClick={() => handleConfirmOrder(order.id)}
                      >
                        Confirm
                      </button>
                      <button 
                        className={styles.rejectBtn}
                        onClick={() => handleRejectOrder(order.id)}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className={styles.products}>
      <h2>Product Management</h2>
      <div className={styles.productsHeader}>
        <button className={styles.addProductBtn}>+ Add New Product</button>
        <div className={styles.searchBox}>
          <input type="text" placeholder="Search products..." />
        </div>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.productsTable}>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Total Sales</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>
                  <div className={styles.productInfo}>
                    <div className={styles.productImage}></div>
                    <span>{product.name}</span>
                  </div>
                </td>
                <td>
                  <span className={product.stock < 20 ? styles.lowStock : styles.inStock}>
                    {product.stock} {product.stock < 20 ? '(Low)' : ''}
                  </span>
                </td>
                <td>{product.price}</td>
                <td>{product.sales}</td>
                <td>
                  <div className={styles.productActions}>
                    <button className={styles.editBtn}>Edit</button>
                    <button className={styles.deleteBtn}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className={`${styles.vendorPage} ${darkMode ? styles.dark : ''}`}>
      <div className={styles.sidebar}>
        <div className={styles.logo}>
          <h2>Vendor Dashboard</h2>
        </div>
        <nav className={styles.nav}>
          <ul>
            <li>
              <button 
                className={activeTab === 'dashboard' ? styles.active : ''}
                onClick={() => setActiveTab('dashboard')}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button 
                className={activeTab === 'orders' ? styles.active : ''}
                onClick={() => setActiveTab('orders')}
              >
                Orders
              </button>
            </li>
            <li>
              <button 
                className={activeTab === 'products' ? styles.active : ''}
                onClick={() => setActiveTab('products')}
              >
                Products
              </button>
            </li>
            <li>
              <button 
                className={activeTab === 'analytics' ? styles.active : ''}
                onClick={() => setActiveTab('analytics')}
              >
                Analytics
              </button>
            </li>
            <li>
              <button 
                className={activeTab === 'settings' ? styles.active : ''}
                onClick={() => setActiveTab('settings')}
              >
                Settings
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.searchBar}>
            <input type="text" placeholder="Search..." />
          </div>
          <div className={styles.userMenu}>
            <div className={styles.notifications}></div>
            <div className={styles.userProfile}>
              <div className={styles.avatar}></div>
              <span>Vendor Name</span>
            </div>
          </div>
        </header>

        <div className={styles.content}>
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'analytics' && <div className={styles.placeholder}><h2>Analytics</h2><p>Analytics content goes here</p></div>}
          {activeTab === 'settings' && <div className={styles.placeholder}><h2>Settings</h2><p>Settings content goes here</p></div>}
        </div>
      </div>
    </div>
  );
};

export default VendorPage;