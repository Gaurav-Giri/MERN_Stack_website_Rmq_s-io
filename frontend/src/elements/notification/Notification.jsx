import React, { useState, useEffect } from 'react';
import styles from './Notification.module.css';
import { useThemeTrigger } from '../../ThemeTrigger'; // adjust path

const Notification = () => {
  const { darkMode } = useThemeTrigger();
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const mockNotifications = [
      { id: 1, message: 'Your order has been confirmed and is being prepared', read: false, time: '2 minutes ago' },
      { id: 2, message: 'New menu items available for this week! Check them out', read: true, time: '1 hour ago' },
      { id: 3, message: 'Special discount this weekend - 20% off all orders', read: false, time: '3 hours ago' }
    ];
    setNotifications(mockNotifications);
  }, []);

  const unreadCount = notifications.filter(notif => !notif.read).length;

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const closeDropdown = () => setShowDropdown(false);
  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className={`${styles.notificationContainer} ${darkMode ? styles.dark : styles.light}`}>
      <button 
        className={styles.notificationBell}
        onClick={toggleDropdown}
        aria-label="Notifications"
      >
        <span className={styles.bellIcon}>🔔</span>
        {unreadCount > 0 && (
          <span className={styles.notificationBadge}>{unreadCount}</span>
        )}
      </button>

      {showDropdown && (
        <>
          <div className={styles.notificationBackdrop} onClick={closeDropdown} />
          <div className={styles.notificationDropdown}>
            <div className={styles.dropdownHeader}>
              <h3>Notifications</h3>
              {unreadCount > 0 && (
                <button 
                  className={styles.markAllRead}
                  onClick={markAllAsRead}
                >
                  Mark all read
                </button>
              )}
              <button 
                className={styles.closeButton}
                onClick={closeDropdown}
                aria-label="Close notifications"
              >
                ✕
              </button>
            </div>

            {notifications.length === 0 ? (
              <p className={styles.noNotifications}>No notifications yet</p>
            ) : (
              <div className={styles.notificationList}>
                {notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`${styles.notificationItem} ${!notification.read ? styles.unread : ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className={styles.notificationContent}>
                      <p className={styles.notificationMessage}>
                        {notification.message}
                      </p>
                      <span className={styles.notificationTime}>
                        {notification.time}
                      </span>
                      {!notification.read && (
                        <div className={styles.unreadIndicator}>
                          <span className={styles.unreadDot}></span>
                          <span className={styles.unreadText}>Unread</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Notification;
