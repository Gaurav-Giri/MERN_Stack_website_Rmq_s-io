import React, { useState } from 'react';
import { useThemeTrigger } from '../../../ThemeTrigger'; // Adjust path as needed
import styles from './UserDashboardPage.module.css'; // Import CSS Module

const UserDashboardPage = () => {
  const { darkMode, toggleTheme } = useThemeTrigger();
  const [activeSection, setActiveSection] = useState('profile');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sample user data (replace with actual data from your backend)
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    addresses: [],
    paymentMethods: [],
    preferences: {
      language: 'en',
      theme: 'system',
      communication: true
    }
  });

  // Navigation sections
  const sections = [
    { id: 'profile', label: 'Profile / Account', icon: '👤' },
    { id: 'orders', label: 'Orders / Bookings', icon: '📦' },
    { id: 'wallet', label: 'Wallet / Payments', icon: '💰' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'support', label: 'Support / Help', icon: '💬' }
  ];

  // Render different sections based on activeSection
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection userData={userData} setUserData={setUserData} />;
      case 'orders':
        return <OrdersSection />;
      case 'wallet':
        return <WalletSection />;
      case 'settings':
        return <SettingsSection darkMode={darkMode} toggleTheme={toggleTheme} />;
      case 'support':
        return <SupportSection />;
      default:
        return <ProfileSection userData={userData} setUserData={setUserData} />;
    }
  };

  return (
    <div className={`${styles.userDashboard} ${darkMode ? styles.darkMode : styles.lightMode}`}>
      {/* Mobile Header */}
      <div className={styles.dashboardMobileHeader}>
        <button 
          className={styles.mobileMenuBtn}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
        <h1>User Dashboard</h1>
        <button 
          className={styles.themeToggleBtn}
          onClick={toggleTheme}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      <div className={styles.dashboardContainer}>
        {/* Sidebar Navigation */}
        <aside className={`${styles.dashboardSidebar} ${mobileMenuOpen ? styles.mobileOpen : ''}`}>
          <div className={styles.sidebarHeader}>
            <h2>Dashboard</h2>
            <button 
              className={styles.closeMobileMenu}
              onClick={() => setMobileMenuOpen(false)}
            >
              ×
            </button>
          </div>
          
          <nav className={styles.sidebarNav}>
            {sections.map(section => (
              <button
                key={section.id}
                className={`${styles.navItem} ${activeSection === section.id ? styles.active : ''}`}
                onClick={() => {
                  setActiveSection(section.id);
                  setMobileMenuOpen(false);
                }}
              >
                <span className={styles.navIcon}>{section.icon}</span>
                <span className={styles.navLabel}>{section.label}</span>
              </button>
            ))}
          </nav>

          <div className={styles.sidebarFooter}>
            <div className={styles.userInfo}>
              <div className={styles.userAvatar}>{userData.name.charAt(0)}</div>
              <div className={styles.userDetails}>
                <span className={styles.userName}>{userData.name}</span>
                <span className={styles.userEmail}>{userData.email}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles.dashboardMain}>
          <div className={styles.dashboardHeader}>
            <h2>{sections.find(s => s.id === activeSection)?.label}</h2>
            <div className={styles.headerActions}>
              <button 
                className={`${styles.themeToggleBtn} ${styles.desktop}`}
                onClick={toggleTheme}
              >
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>

          <div className={styles.dashboardContent}>
            {renderSectionContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

// Profile Section Component
const ProfileSection = ({ userData, setUserData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

  const handleSave = () => {
    setUserData(formData);
    setIsEditing(false);
    // Add API call to update user data
  };

  return (
    <div className={styles.profileSection}>
      <div className={styles.sectionHeader}>
        <h3>Profile Information</h3>
        <button 
          className={styles.editBtn}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {isEditing ? (
        <div className={styles.editForm}>
          <div className={styles.formGroup}>
            <label>Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <button className={styles.saveBtn} onClick={handleSave}>Save Changes</button>
        </div>
      ) : (
        <div className={styles.profileInfo}>
          <div className={styles.infoItem}>
            <label>Name:</label>
            <span>{userData.name}</span>
          </div>
          <div className={styles.infoItem}>
            <label>Email:</label>
            <span>{userData.email}</span>
          </div>
          <div className={styles.infoItem}>
            <label>Phone:</label>
            <span>{userData.phone}</span>
          </div>
        </div>
      )}

      <div className={styles.profileActions}>
        <button className={styles.actionBtn}>Change Password</button>
        <button className={styles.actionBtn}>Manage Address</button>
        <button className={styles.actionBtn}>Payment Methods</button>
        <button className={styles.actionBtn}>Preferences</button>
        <button className={styles.actionBtn}>Connected Accounts</button>
      </div>
    </div>
  );
};

// Orders Section Component
const OrdersSection = () => {
  return (
    <div className={styles.ordersSection}>
      <h3>Order History</h3>
      <div className={styles.ordersList}>
        <div className={styles.orderCard}>
          <div className={styles.orderHeader}>
            <span>Order #12345</span>
            <span className={`${styles.status} ${styles.delivered}`}>Delivered</span>
          </div>
          <div className={styles.orderDetails}>
            <p>Product Name × 2</p>
            <p>Total: $99.99</p>
            <p>Date: Jan 15, 2024</p>
          </div>
          <div className={styles.orderActions}>
            <button>View Details</button>
            <button>Reorder</button>
            <button>Download Invoice</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wallet Section Component
const WalletSection = () => {
  return (
    <div className={styles.walletSection}>
      <div className={styles.walletBalance}>
        <h3>Wallet Balance</h3>
        <p className={styles.balanceAmount}>$250.00</p>
        <div className={styles.walletActions}>
          <button>Add Money</button>
          <button>Withdraw</button>
        </div>
      </div>
      
      <div className={styles.transactionHistory}>
        <h4>Transaction History</h4>
        {/* Transaction list would go here */}
      </div>
    </div>
  );
};

// Settings Section Component
const SettingsSection = ({ darkMode, toggleTheme }) => {
  return (
    <div className={styles.settingsSection}>
      <div className={styles.settingGroup}>
        <h4>Theme Settings</h4>
        <div className={styles.settingItem}>
          <label>Dark Mode</label>
          <button 
            className={`${styles.toggleSwitch} ${darkMode ? styles.active : ''}`}
            onClick={toggleTheme}
          >
            <div className={styles.toggleSlider}></div>
          </button>
        </div>
      </div>

      <div className={styles.settingGroup}>
        <h4>Notification Settings</h4>
        <div className={styles.settingItem}>
          <label>Email Notifications</label>
          <input type="checkbox" defaultChecked />
        </div>
        <div className={styles.settingItem}>
          <label>Push Notifications</label>
          <input type="checkbox" defaultChecked />
        </div>
      </div>

      <div className={styles.settingGroup}>
        <h4>Privacy Settings</h4>
        <div className={styles.settingItem}>
          <label>Data Sharing</label>
          <select>
            <option>Limited</option>
            <option>Standard</option>
            <option>Enhanced</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// Support Section Component
const SupportSection = () => {
  return (
    <div className={styles.supportSection}>
      <div className={styles.supportOptions}>
        <button className={styles.supportOption}>Raise a Ticket</button>
        <button className={styles.supportOption}>Live Chat</button>
        <button className={styles.supportOption}>FAQs</button>
      </div>
      
      <div className={styles.contactInfo}>
        <h4>Contact Support</h4>
        <p>Email: support@yourapp.com</p>
        <p>Phone: 1-800-HELP-NOW</p>
      </div>
    </div>
  );
};

export default UserDashboardPage;