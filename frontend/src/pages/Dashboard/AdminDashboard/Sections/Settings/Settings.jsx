import React from 'react';
import styles from '../../AdminDashboardPage.module.css';

const Settings = ({ 
  darkMode, 
  toggleTheme, 
  socket, 
  onlineAdmins 
}) => {
  return (
    <div className={styles.settings}>
      <h2>Settings</h2>
      <div className={styles.settingsSection}>
        <h3>Theme Preferences</h3>
        <div className={styles.themeSettings}>
          <label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleTheme}
            />
            Dark Mode
          </label>
        </div>
      </div>
      <div className={styles.settingsSection}>
        <h3>Real-time Updates</h3>
        <div className={styles.realtimeSettings}>
          <p>Status: {socket ? 'Connected' : 'Disconnected'}</p>
          {onlineAdmins.length > 0 && (
            <div className={styles.adminList}>
              <h4>Online Administrators:</h4>
              <ul>
                {onlineAdmins.map(admin => (
                  <li key={admin.id}>{admin.name || 'Admin'}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;