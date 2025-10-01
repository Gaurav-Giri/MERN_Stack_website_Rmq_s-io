

// import React, { useState, useEffect, lazy, Suspense } from 'react';
// import { useThemeTrigger } from '../../../ThemeTrigger';
// import * as SchoolApi from '../../../API/School_api';
// import { useSocket } from '../../../SocketContext';
// import styles from './AdminDashboardPage.module.css';

// // Lazy load all components
// const Overview = lazy(() => import('./Sections/overview/Overview'));
// const MealsManagement = lazy(() => import('./Sections/Meal/Meal'));
// const UsersManagement = lazy(() => import('./sections/User/User'));
// const SchoolManagement = lazy(() => import('./Sections/School/School'));
// const Settings = lazy(() => import('./sections/Settings/Settings'));

// const AdminDashboardPage = () => {
//   const { darkMode, toggleTheme } = useThemeTrigger();
//   const [activeTab, setActiveTab] = useState('overview');
//   const [schools, setSchools] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editingUser, setEditingUser] = useState(null);
//   const [showUserForm, setShowUserForm] = useState(false);
//   const [error, setError] = useState('');

//   // Get socket instance
//   const socket = useSocket();
//   const [notifications, setNotifications] = useState([]);
//   const [onlineAdmins, setOnlineAdmins] = useState([]);

//   useEffect(() => {
//     fetchData();
    
//     // Set up socket listeners if socket is available
//     if (socket) {
//       // Listen for real-time school updates
//       socket.on('school-updated', (updatedSchool) => {
//         setSchools(prev => prev.map(school => 
//           school._id === updatedSchool._id ? updatedSchool : school
//         ));
//         addNotification(`School "${updatedSchool.name}" was updated by another admin`);
//       });
      
//       socket.on('school-created', (newSchool) => {
//         setSchools(prev => [...prev, newSchool]);
//         addNotification(`New school "${newSchool.name}" was created by another admin`);
//       });
      
//       socket.on('school-deleted', (deletedSchoolId) => {
//         setSchools(prev => prev.filter(school => school._id !== deletedSchoolId));
//         addNotification('A school was deleted by another admin');
//       });
            
//       // Listen for admin online status
//       socket.on('admin-online', (adminData) => {
//         setOnlineAdmins(prev => {
//           if (!prev.find(admin => admin.id === adminData.id)) {
//             return [...prev, adminData];
//           }
//           return prev;
//         });
//       });
      
//       socket.on('admin-offline', (adminId) => {
//         setOnlineAdmins(prev => prev.filter(admin => admin.id !== adminId));
//       });
      
//       socket.on('online-admins', (admins) => {
//         setOnlineAdmins(admins);
//       });
      
//       // Join admin room
//       socket.emit('join-admin-room');
      
//       // Clean up listeners on unmount
//       return () => {
//         socket.off('school-updated');
//         socket.off('school-created');
//         socket.off('school-deleted');
//         socket.off('admin-online');
//         socket.off('admin-offline');
//         socket.off('online-admins');
//       };
//     }
//   }, [socket]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       setError('');
//       const [schoolsResponse, statsResponse] = await Promise.all([
//         SchoolApi.getSchools(),
//         SchoolApi.getSchoolStats()
//       ]);
//       setSchools(schoolsResponse.data || []);
//       setStats(statsResponse.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setError('Failed to fetch data: ' + (error.message || 'Please check your connection'));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addNotification = (message) => {
//     const newNotification = {
//       id: Date.now(),
//       message,
//       timestamp: new Date(),
//       type: 'info'
//     };
    
//     setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
    
//     setTimeout(() => {
//       setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
//     }, 5000);
//   };

//   if (loading) {
//     return (
//       <div className={`${styles.adminDashboard} ${darkMode ? styles.dark : styles.light}`}>
//         <div className={styles.loading}>Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className={`${styles.adminDashboard} ${darkMode ? styles.dark : styles.light}`}>
//       {/* Header */}
//       <header className={styles.adminHeader}>
//         <div className={styles.headerLeft}>
//           <h1>Admin Dashboard</h1>
//           {socket && (
//             <div className={styles.connectionStatus}>
//               <span className={styles.statusIndicator}></span>
//               Real-time updates enabled
//             </div>
//           )}
//         </div>
//         <div className={styles.headerRight}>
//           {onlineAdmins.length > 0 && (
//             <div className={styles.onlineAdmins}>
//               <span>{onlineAdmins.length} admin(s) online</span>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Notifications */}
//       {notifications.length > 0 && (
//         <div className={styles.notificationsContainer}>
//           {notifications.map(notification => (
//             <div key={notification.id} className={styles.notification}>
//               <span>{notification.message}</span>
//               <button 
//                 onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))} 
//                 className={styles.closeNotification}
//               >
//                 ×
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Error Message */}
//       {error && (
//         <div className={styles.errorBanner}>
//           <span>{error}</span>
//           <button onClick={() => setError('')} className={styles.closeError}>×</button>
//         </div>
//       )}

//       {/* Navigation */}
//       <nav className={styles.adminNav}>
//         <button 
//           className={`${styles.navButton} ${activeTab === 'overview' ? styles.active : ''}`}
//           onClick={() => setActiveTab('overview')}
//         >
//           Overview
//         </button>
//         <button 
//           className={`${styles.navButton} ${activeTab === 'schools' ? styles.active : ''}`}
//           onClick={() => setActiveTab('schools')}
//         >
//           Schools
//         </button>
//         <button 
//           className={`${styles.navButton} ${activeTab === 'meals' ? styles.active : ''}`}
//           onClick={() => setActiveTab('meals')}
//         >
//           Meals
//         </button>
//         <button 
//           className={`${styles.navButton} ${activeTab === 'users' ? styles.active : ''}`}
//           onClick={() => setActiveTab('users')}
//         >
//           Users
//         </button>
//         <button 
//           className={`${styles.navButton} ${activeTab === 'settings' ? styles.active : ''}`}
//           onClick={() => setActiveTab('settings')}
//         >
//           Settings
//         </button>
//       </nav>

//       {/* Main Content */}
//       <main className={styles.adminContent}>
//         {/* Overview Tab - Lazy Loaded */}
//         {activeTab === 'overview' && (
//           <Suspense fallback={<div className={styles.loading}>Loading overview...</div>}>
//             <Overview 
//               darkMode={darkMode}
//               stats={stats}
//             />
//           </Suspense>
//         )}

//         {/* Schools Tab - Lazy Loaded */}
//         {activeTab === 'schools' && (
//           <Suspense fallback={<div className={styles.loading}>Loading schools management...</div>}>
//             <SchoolManagement 
//               darkMode={darkMode}
//               socket={socket}
//               addNotification={addNotification}
//               schools={schools}
//               setSchools={setSchools}
//               fetchData={fetchData}
//             />
//           </Suspense>
//         )}

//         {/* Meals Tab - Lazy Loaded */}
//         {activeTab === 'meals' && (
//           <Suspense fallback={<div className={styles.loading}>Loading meals...</div>}>
//             <MealsManagement 
//               darkMode={darkMode}
//               socket={socket}
//               addNotification={addNotification}
//             />
//           </Suspense>
//         )}

//         {/* Users Tab - Lazy Loaded */}
//         {activeTab === 'users' && (
//           <Suspense fallback={<div className={styles.loading}>Loading users...</div>}>
//             <UsersManagement 
//               darkMode={darkMode}
//               socket={socket}
//               addNotification={addNotification}
//               showUserForm={showUserForm}
//               setShowUserForm={setShowUserForm}
//               editingUser={editingUser}
//               setEditingUser={setEditingUser}
//             />
//           </Suspense>
//         )}

//         {/* Settings Tab - Lazy Loaded */}
//         {activeTab === 'settings' && (
//           <Suspense fallback={<div className={styles.loading}>Loading settings...</div>}>
//             <Settings 
//               darkMode={darkMode}
//               toggleTheme={toggleTheme}
//               socket={socket}
//               onlineAdmins={onlineAdmins}
//             />
//           </Suspense>
//         )}
//       </main>
//     </div>
//   );
// };

// export default AdminDashboardPage;




// -------------------School completely separated----------------------------




import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useThemeTrigger } from '../../../ThemeTrigger';
import * as SchoolApi from '../../../API/School_api';
import { useSocket } from '../../../SocketContext';
import styles from './AdminDashboardPage.module.css';

// Lazy load all components
const Overview = lazy(() => import('./Sections/overview/Overview'));
const MealsManagement = lazy(() => import('./Sections/Meal/Meal'));
const UsersManagement = lazy(() => import('./sections/User/User'));
const SchoolManagement = lazy(() => import('./Sections/School/School'));
const Settings = lazy(() => import('./sections/Settings/Settings'));

const AdminDashboardPage = () => {
  const { darkMode, toggleTheme } = useThemeTrigger();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [error, setError] = useState('');

  // Get socket instance
  const socket = useSocket();
  const [notifications, setNotifications] = useState([]);
  const [onlineAdmins, setOnlineAdmins] = useState([]);

  useEffect(() => {
    fetchStats();
    
    // Set up socket listeners if socket is available
    if (socket) {
      // Listen for real-time notifications
      // socket.on('school-updated', (updatedSchool) => {
      //   addNotification(`School "${updatedSchool.name}" was updated by another admin`);
      // });
      
      // socket.on('school-created', (newSchool) => {
      //   addNotification(`New school "${newSchool.name}" was created by another admin`);
      // });
      
      // socket.on('school-deleted', (deletedSchoolId) => {
      //   addNotification('A school was deleted by another admin');
      // });
            
      // Listen for admin online status
      socket.on('admin-online', (adminData) => {
        setOnlineAdmins(prev => {
          if (!prev.find(admin => admin.id === adminData.id)) {
            return [...prev, adminData];
          }
          return prev;
        });
      });
      
      socket.on('admin-offline', (adminId) => {
        setOnlineAdmins(prev => prev.filter(admin => admin.id !== adminId));
      });
      
      socket.on('online-admins', (admins) => {
        setOnlineAdmins(admins);
      });
      
      // Join admin room
      socket.emit('join-admin-room');
      
      // Clean up listeners on unmount
      return () => {
        // socket.off('school-updated');
        // socket.off('school-created');
        // socket.off('school-deleted');
        socket.off('admin-online');
        socket.off('admin-offline');
        socket.off('online-admins');
      };
    }
  }, [socket]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError('');
      const statsResponse = await SchoolApi.getSchoolStats();
      setStats(statsResponse.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError('Failed to fetch stats: ' + (error.message || 'Please check your connection'));
    } finally {
      setLoading(false);
    }
  };

  const addNotification = (message) => {
    const newNotification = {
      id: Date.now(),
      message,
      timestamp: new Date(),
      type: 'info'
    };
    
    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  if (loading) {
    return (
      <div className={`${styles.adminDashboard} ${darkMode ? styles.dark : styles.light}`}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={`${styles.adminDashboard} ${darkMode ? styles.dark : styles.light}`}>
      {/* Header */}
      <header className={styles.adminHeader}>
        <div className={styles.headerLeft}>
          <h1>Admin Dashboard</h1>
          {socket && (
            <div className={styles.connectionStatus}>
              <span className={styles.statusIndicator}></span>
              Real-time updates enabled
            </div>
          )}
        </div>
        <div className={styles.headerRight}>
          {onlineAdmins.length > 0 && (
            <div className={styles.onlineAdmins}>
              <span>{onlineAdmins.length} admin(s) online</span>
            </div>
          )}
        </div>
      </header>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className={styles.notificationsContainer}>
          {notifications.map(notification => (
            <div key={notification.id} className={styles.notification}>
              <span>{notification.message}</span>
              <button 
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))} 
                className={styles.closeNotification}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className={styles.errorBanner}>
          <span>{error}</span>
          <button onClick={() => setError('')} className={styles.closeError}>×</button>
        </div>
      )}

      {/* Navigation */}
      <nav className={styles.adminNav}>
        <button 
          className={`${styles.navButton} ${activeTab === 'overview' ? styles.active : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`${styles.navButton} ${activeTab === 'schools' ? styles.active : ''}`}
          onClick={() => setActiveTab('schools')}
        >
          Schools
        </button>
        <button 
          className={`${styles.navButton} ${activeTab === 'meals' ? styles.active : ''}`}
          onClick={() => setActiveTab('meals')}
        >
          Meals
        </button>
        <button 
          className={`${styles.navButton} ${activeTab === 'users' ? styles.active : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button 
          className={`${styles.navButton} ${activeTab === 'settings' ? styles.active : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </nav>

      {/* Main Content */}
      <main className={styles.adminContent}>
        {/* Overview Tab - Lazy Loaded */}
        {activeTab === 'overview' && (
          <Suspense fallback={<div className={styles.loading}>Loading overview...</div>}>
            <Overview 
              darkMode={darkMode}
              stats={stats}
            />
          </Suspense>
        )}

        {/* Schools Tab - Lazy Loaded - Now completely separated */}
        {activeTab === 'schools' && (
          <Suspense fallback={<div className={styles.loading}>Loading schools management...</div>}>
            <SchoolManagement 
              darkMode={darkMode}
              socket={socket}
              onNotification={addNotification}
            />
          </Suspense>
        )}

        {/* Meals Tab - Lazy Loaded */}
        {activeTab === 'meals' && (
          <Suspense fallback={<div className={styles.loading}>Loading meals...</div>}>
            <MealsManagement 
              darkMode={darkMode}
              socket={socket}
              onNotification={addNotification}
            />
          </Suspense>
        )}

        {/* Users Tab - Lazy Loaded */}
        {activeTab === 'users' && (
          <Suspense fallback={<div className={styles.loading}>Loading users...</div>}>
            <UsersManagement 
              darkMode={darkMode}
              socket={socket}
              onNotification={addNotification}
              showUserForm={showUserForm}
              setShowUserForm={setShowUserForm}
              editingUser={editingUser}
              setEditingUser={setEditingUser}
            />
          </Suspense>
        )}

        {/* Settings Tab - Lazy Loaded */}
        {activeTab === 'settings' && (
          <Suspense fallback={<div className={styles.loading}>Loading settings...</div>}>
            <Settings 
              darkMode={darkMode}
              toggleTheme={toggleTheme}
              socket={socket}
              onlineAdmins={onlineAdmins}
            />
          </Suspense>
        )}
      </main>
    </div>
  );
};

export default AdminDashboardPage;