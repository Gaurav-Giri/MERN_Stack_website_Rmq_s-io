import React, { useState } from 'react';
import { useThemeTrigger } from '../../../ThemeTrigger';
import styles from './VendorDashboardPage.module.css';

const VendorDashboardPage = () => {
  const { darkMode, toggleTheme } = useThemeTrigger();
  const [activeSection, setActiveSection] = useState('dashboard');

  // Mock data for dashboard overview
  const dashboardStats = {
    revenue: '₹1,24,567',
    orders: 342,
    products: 156,
    customers: 289
  };

  // Navigation sections
  const sections = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: '📊' },
    { id: 'profile', label: 'Profile / Account', icon: '👤' },
    { id: 'products', label: 'Product Management', icon: '📦' },
    { id: 'orders', label: 'Orders Management', icon: '📋' },
    { id: 'sales', label: 'Sales & Analytics', icon: '💰' },
    { id: 'payments', label: 'Payments / Payouts', icon: '💳' },
    { id: 'marketing', label: 'Marketing / Engagement', icon: '🎯' },
    { id: 'support', label: 'Support / Help', icon: '🛟' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className={styles.dashboardContent}>
            <h2>Dashboard Overview</h2>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>💰</div>
                <div className={styles.statInfo}>
                  <h3>Total Revenue</h3>
                  <p>{dashboardStats.revenue}</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>📦</div>
                <div className={styles.statInfo}>
                  <h3>Total Orders</h3>
                  <p>{dashboardStats.orders}</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>🏷️</div>
                <div className={styles.statInfo}>
                  <h3>Products</h3>
                  <p>{dashboardStats.products}</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>👥</div>
                <div className={styles.statInfo}>
                  <h3>Customers</h3>
                  <p>{dashboardStats.customers}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className={styles.sectionContent}>
            <h2>Profile / Account</h2>
            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>View & Edit Profile</div>
              <div className={styles.featureCard}>Business Details</div>
              <div className={styles.featureCard}>Address Management</div>
              <div className={styles.featureCard}>Connected Accounts</div>
            </div>
          </div>
        );

      case 'products':
        return (
          <div className={styles.sectionContent}>
            <h2>Product Management</h2>
            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>Add New Product / Service</div>
              <div className={styles.featureCard}>Manage Products</div>
              <div className={styles.featureCard}>Inventory / Stock Management</div>
              <div className={styles.featureCard}>Product Categories & Tags</div>
              <div className={styles.featureCard}>Bulk Upload / Import Products</div>
              <div className={styles.featureCard}>Discounts / Coupons / Promotions</div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className={styles.sectionContent}>
            <h2>Orders Management</h2>
            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>New Orders</div>
              <div className={styles.featureCard}>Active Orders</div>
              <div className={styles.featureCard}>Completed Orders</div>
              <div className={styles.featureCard}>Cancelled / Returned Orders</div>
              <div className={styles.featureCard}>Order Details & Invoice Download</div>
              <div className={styles.featureCard}>Refund / Dispute Handling</div>
            </div>
          </div>
        );

      case 'sales':
        return (
          <div className={styles.sectionContent}>
            <h2>Sales & Analytics</h2>
            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>Dashboard Overview</div>
              <div className={styles.featureCard}>Sales Reports</div>
              <div className={styles.featureCard}>Best-Selling Products</div>
              <div className={styles.featureCard}>Customer Insights</div>
              <div className={styles.featureCard}>Traffic & Performance Analytics</div>
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className={styles.sectionContent}>
            <h2>Payments / Payouts</h2>
            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>Wallet / Balance</div>
              <div className={styles.featureCard}>Payout History</div>
              <div className={styles.featureCard}>Pending Payouts</div>
              <div className={styles.featureCard}>Payment Methods</div>
              <div className={styles.featureCard}>Commission / Fee Breakdown</div>
            </div>
          </div>
        );

      case 'marketing':
        return (
          <div className={styles.sectionContent}>
            <h2>Marketing / Engagement</h2>
            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>Manage Discounts / Offers / Coupons</div>
              <div className={styles.featureCard}>Ads & Promotions</div>
              <div className={styles.featureCard}>Reviews & Ratings Management</div>
              <div className={styles.featureCard}>Messages / Customer Communication</div>
            </div>
          </div>
        );

      case 'support':
        return (
          <div className={styles.sectionContent}>
            <h2>Support / Help</h2>
            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>Raise Ticket / Contact Platform Support</div>
              <div className={styles.featureCard}>FAQs & Guidelines</div>
              <div className={styles.featureCard}>Policy Documents</div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className={styles.sectionContent}>
            <h2>Settings</h2>
            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>Store Settings</div>
              <div className={styles.featureCard}>Notification Settings</div>
              <div className={styles.featureCard}>Security</div>
            </div>
          </div>
        );

      default:
        return <div>Select a section to view content</div>;
    }
  };

  return (
    <div className={`${styles.vendorDashboard} ${darkMode ? styles.dark : ''}`}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Vendor Dashboard</h1>
          <span className={styles.welcomeText}>Welcome back, Vendor!</span>
        </div>
        <div className={styles.headerRight}>
          <button 
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <div className={styles.userProfile}>
            <span>Vendor Name</span>
            <div className={styles.avatar}>V</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Sidebar Navigation */}
        <nav className={styles.sidebar}>
          <ul className={styles.navList}>
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  className={`${styles.navButton} ${
                    activeSection === section.id ? styles.active : ''
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <span className={styles.navIcon}>{section.icon}</span>
                  <span className={styles.navLabel}>{section.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content Area */}
        <main className={styles.contentArea}>
          {renderSectionContent()}
        </main>
      </div>
    </div>
  );
};

export default VendorDashboardPage;