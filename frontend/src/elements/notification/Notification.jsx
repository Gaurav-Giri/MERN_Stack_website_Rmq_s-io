// import React, { useState, useEffect } from 'react';
// import styles from './Notification.module.css';
// import { useThemeTrigger } from '../../ThemeTrigger'; // adjust path

// const Notification = () => {
//   const { darkMode } = useThemeTrigger();
//   const [notifications, setNotifications] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);

//   useEffect(() => {
//     const mockNotifications = [
//       { id: 1, message: 'Your order has been confirmed and is being prepared', read: false, time: '2 minutes ago' },
//       { id: 2, message: 'New menu items available for this week! Check them out', read: true, time: '1 hour ago' },
//       { id: 3, message: 'Special discount this weekend - 20% off all orders', read: false, time: '3 hours ago' }
//     ];
//     setNotifications(mockNotifications);
//   }, []);

//   const unreadCount = notifications.filter(notif => !notif.read).length;

//   const toggleDropdown = () => setShowDropdown(!showDropdown);
//   const closeDropdown = () => setShowDropdown(false);
//   const markAsRead = (id) => {
//     setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
//   };
//   const markAllAsRead = () => {
//     setNotifications(notifications.map(n => ({ ...n, read: true })));
//   };

//   return (
//     <div className={`${styles.notificationContainer} ${darkMode ? styles.dark : styles.light}`}>
//       <button 
//         className={styles.notificationBell}
//         onClick={toggleDropdown}
//         aria-label="Notifications"
//       >
//         <span className={styles.bellIcon}>🔔</span>
//         {unreadCount > 0 && (
//           <span className={styles.notificationBadge}>{unreadCount}</span>
//         )}
//       </button>

//       {showDropdown && (
//         <>
//           <div className={styles.notificationBackdrop} onClick={closeDropdown} />
//           <div className={styles.notificationDropdown}>
//             <div className={styles.dropdownHeader}>
//               <h3>Notifications</h3>
//               {unreadCount > 0 && (
//                 <button 
//                   className={styles.markAllRead}
//                   onClick={markAllAsRead}
//                 >
//                   Mark all read
//                 </button>
//               )}
//               <button 
//                 className={styles.closeButton}
//                 onClick={closeDropdown}
//                 aria-label="Close notifications"
//               >
//                 ✕
//               </button>
//             </div>

//             {notifications.length === 0 ? (
//               <p className={styles.noNotifications}>No notifications yet</p>
//             ) : (
//               <div className={styles.notificationList}>
//                 {notifications.map(notification => (
//                   <div
//                     key={notification.id}
//                     className={`${styles.notificationItem} ${!notification.read ? styles.unread : ''}`}
//                     onClick={() => markAsRead(notification.id)}
//                   >
//                     <div className={styles.notificationContent}>
//                       <p className={styles.notificationMessage}>
//                         {notification.message}
//                       </p>
//                       <span className={styles.notificationTime}>
//                         {notification.time}
//                       </span>
//                       {!notification.read && (
//                         <div className={styles.unreadIndicator}>
//                           <span className={styles.unreadDot}></span>
//                           <span className={styles.unreadText}>Unread</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Notification;













// -----------------------------------------notification using Api----------------------------------------------------



// Updated Notification.js component using the API
import React, { useState, useEffect } from 'react';
import styles from './Notification.module.css';
import { useThemeTrigger } from '../../ThemeTrigger'; // adjust path
import { 
  getUserNotifications, 
  markAsRead, 
  markAllAsRead,
  getUnreadCount 
} from '../../Api/NotificationApi'; // adjust path

const Notification = ({ userId }) => {
  const { darkMode } = useThemeTrigger();
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch notifications and unread count
  const fetchNotifications = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const [notificationsResponse, unreadCountResponse] = await Promise.all([
        getUserNotifications(userId, 1, 10), // Get first 10 notifications
        getUnreadCount(userId)
      ]);
      
      setNotifications(notificationsResponse.data || []);
      setUnreadCount(unreadCountResponse);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      // Fallback to empty state
      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  const toggleDropdown = async () => {
    if (!showDropdown && userId) {
      await fetchNotifications();
    }
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => setShowDropdown(false);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markAsRead(notificationId);
      setNotifications(prev => 
        prev.map(n => n._id === notificationId ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead(userId);
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  const formatTime = (createdAt) => {
    if (!createdAt) return 'Recently';
    
    const now = new Date();
    const created = new Date(createdAt);
    const diffInMinutes = Math.floor((now - created) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    return created.toLocaleDateString();
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <div className={`${styles.notificationContainer} ${darkMode ? styles.dark : styles.light}`}>
      <button 
        className={styles.notificationBell}
        onClick={toggleDropdown}
        aria-label="Notifications"
        disabled={!userId}
      >
        <span className={styles.bellIcon}>🔔</span>
        {unreadCount > 0 && (
          <span className={styles.notificationBadge}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <>
          <div className={styles.notificationBackdrop} onClick={closeDropdown} />
          <div className={styles.notificationDropdown}>
            <div className={styles.dropdownHeader}>
              <h3>Notifications</h3>
              <div className={styles.headerActions}>
                {unreadCount > 0 && (
                  <button 
                    className={styles.markAllRead}
                    onClick={handleMarkAllAsRead}
                    disabled={loading}
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
            </div>

            {loading ? (
              <div className={styles.loadingState}>
                <p>Loading notifications...</p>
              </div>
            ) : !userId ? (
              <div className={styles.errorState}>
                <p>Please log in to view notifications</p>
              </div>
            ) : notifications.length === 0 ? (
              <p className={styles.noNotifications}>No notifications yet</p>
            ) : (
              <div className={styles.notificationList}>
                {notifications.map(notification => (
                  <div
                    key={notification._id}
                    className={`${styles.notificationItem} ${
                      !notification.read ? styles.unread : ''
                    } ${styles[`priority-${notification.priority}`]}`}
                    onClick={() => !notification.read && handleMarkAsRead(notification._id)}
                  >
                    <div className={styles.notificationContent}>
                      <div className={styles.notificationHeader}>
                        <span className={styles.priorityIcon}>
                          {getPriorityIcon(notification.priority)}
                        </span>
                        <span className={styles.notificationType}>
                          {notification.type}
                        </span>
                      </div>
                      <p className={styles.notificationMessage}>
                        {notification.message}
                      </p>
                      <div className={styles.notificationFooter}>
                        <span className={styles.notificationTime}>
                          {formatTime(notification.createdAt)}
                        </span>
                        {!notification.read && (
                          <div className={styles.unreadIndicator}>
                            <span className={styles.unreadDot}></span>
                            <span className={styles.unreadText}>Unread</span>
                          </div>
                        )}
                      </div>
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