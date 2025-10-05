
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FiMenu, FiX, FiSun, FiMoon, FiUser, FiLogOut } from 'react-icons/fi';
// import { useThemeTrigger } from '../../ThemeTrigger'; // Import the custom hook
// import { useAuth } from '../../AuthContext';

// import logo from './logo.jpg';
// import './Header.css';

// const Header = () => {
//   const navigate = useNavigate();
//   const { darkMode, toggleTheme } = useThemeTrigger(); // Use the ThemeTrigger context
//   const {isAuthenticated, user, logout} = useAuth();

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   const handleResize = () => {
//     setIsMobile(window.innerWidth < 768);
//     if (window.innerWidth >= 768) {
//       setMobileMenuOpen(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleLogin = () => {
//     navigate('/login');
//   };

//   const handleLogout = ()=>{
//     logout();
//     navigate('/');
//   };


//   return (
//     <header className={`header ${darkMode ? 'dark' : ''}`}>
//       <div className="container">
//         <nav className="header-nav">
//           <Link to="/" className="logo">
//             <img src={logo} alt="School Lunch Box Logo" />
//           </Link>

//           {isMobile && (
//             <button
//               className="mobile-menu-toggle"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//             </button>
//           )}

//           <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
//             <Link to="/AboutUs">About Us</Link>
//             <Link to="/ContactUs">Contact</Link>
//             <Link to="/FAQ">FAQ</Link>

//             {isAuthenticated ?(
//               <div className="user-menu">
//                 <span className="user-greeting">
//                   <FiUser size={16} /> Hello, {user?.name}
//                 </span>
//                 <button onClick={handleLogout} className='btn logout-btn'>
//                   <FiLogOut size={16}/>Logout
//                 </button>
//               </div>
//             ):(
//               <button onClick={handleLogin} className="btn login-btn">
//               Login
//             </button>
//             )}


//             <button
//               onClick={toggleTheme}
//               className="theme-toggle"
//               aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
//             >
//               {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
//             </button>
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;


// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FiMenu, FiX, FiSun, FiMoon, FiUser, FiLogOut, FiGrid } from 'react-icons/fi';
// import { useThemeTrigger } from '../../ThemeTrigger';
// import { useAuth } from '../../AuthContext';

// import logo from './logo.jpg';
// import './Header.css';

// const Header = () => {
//   const navigate = useNavigate();
//   const { darkMode, toggleTheme } = useThemeTrigger();
//   const { isAuthenticated, user, logout, isAdmin } = useAuth();

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   const handleResize = () => {
//     setIsMobile(window.innerWidth < 768);
//     if (window.innerWidth >= 768) {
//       setMobileMenuOpen(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleLogin = () => {
//     navigate('/login');
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   // Function to determine dashboard link based on user role
//   const getDashboardLink = () => {
//     if (!user) return null;
    
//     switch (user.role) {
//       case 'admin':
//         return '/AdminDashboard';
//       case 'vendor':
//         return '/VendorDashboard';
//       case 'user':
//         return'/UserDashboard';
//       // default:
//       //   return '/SchoolList'; // Default dashboard for regular users
//     }
//   };

//   // Function to determine dashboard label based on user role
//   const getDashboardLabel = () => {
//     if (!user) return 'Dashboard';
    
//     switch (user.role) {
//       case 'admin':
//         return 'Admin Dashboard';
//       case 'vendor':
//         return 'Vendor Dashboard';
//       case 'user':
//       default:
//         return 'My Dashboard';
//     }
//   };

//   return (
//     <header className={`header ${darkMode ? 'dark' : ''}`}>
//       <div className="container">
//         <nav className="header-nav">
//           <Link to="/" className="logo">
//             <img src={logo} alt="School Lunch Box Logo" />
//           </Link>

//           {isMobile && (
//             <button
//               className="mobile-menu-toggle"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//             </button>
//           )}

//           <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
//             <Link to="/AboutUs">About Us</Link>
//             <Link to="/ContactUs">Contact</Link>
//             <Link to="/FAQ">FAQ</Link>

//             {isAuthenticated ? (
//               <div className="user-menu">
//                 {/* Dashboard Link - Only show if user has a role */}
//                 {user?.role && (
//                   <Link to={getDashboardLink()} className="dashboard-link">
//                     <FiGrid size={16} /> {getDashboardLabel()}
//                   </Link>
//                 )}
                
//                 <span className="user-greeting">
//                   <FiUser size={16} /> Hello, {user?.name}
//                 </span>
//                 <button onClick={handleLogout} className='btn logout-btn'>
//                   <FiLogOut size={16}/>Logout
//                 </button>
//               </div>
//             ) : (
//               <button onClick={handleLogin} className="btn login-btn">
//                 Login
//               </button>
//             )}

//             <button
//               onClick={toggleTheme}
//               className="theme-toggle"
//               aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
//             >
//               {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
//             </button>
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;



// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FiMenu, FiX, FiSun, FiMoon, FiUser, FiLogOut, FiGrid, FiBell } from 'react-icons/fi';
// import { useThemeTrigger } from '../../ThemeTrigger';
// import { useAuth } from '../../AuthContext';
// import Notification from '../notification/Notification';
// import styles from './Header.module.css';

// import logo from './logo.jpg';

// const Header = () => {
//   const navigate = useNavigate();
//   const { darkMode, toggleTheme } = useThemeTrigger();
//   const { isAuthenticated, user, logout, isAdmin } = useAuth();

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   const handleResize = () => {
//     setIsMobile(window.innerWidth < 768);
//     if (window.innerWidth >= 768) {
//       setMobileMenuOpen(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleLogin = () => {
//     navigate('/login');
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const getDashboardLink = () => {
//     if (!user) return null;
    
//     switch (user.role) {
//       case 'admin':
//         return '/AdminDashboard';
//       case 'vendor':
//         return '/VendorDashboard';
//       case 'user':
//         return '/UserDashboard';
//     }
//   };

//   const getDashboardLabel = () => {
//     if (!user) return 'Dashboard';
    
//     switch (user.role) {
//       case 'admin':
//         return 'Admin Dashboard';
//       case 'vendor':
//         return 'Vendor Dashboard';
//       case 'user':
//       default:
//         return 'My Dashboard';
//     }
//   };

//   return (
//     <header className={`${styles.header} ${darkMode ? styles.dark : ''}`}>
//       <div className={styles.container}>
//         <nav className={styles.headerNav}>
//           <Link to="/" className={styles.logo}>
//             <img src={logo} alt="School Lunch Box Logo" />
//           </Link>

//           {isMobile && (
//             <button
//               className={styles.mobileMenuToggle}
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//             </button>
//           )}
//           {isAuthenticated && (
//               <div className={styles.notificationWrapper}>
//                 <Notification />
//               </div>
//           )}

//           <div className={`${styles.navLinks} ${mobileMenuOpen ? styles.open : ''}`}>
//             <Link to="/AboutUs" className={styles.navLink}>About Us</Link>
//             <Link to="/ContactUs" className={styles.navLink}>Contact</Link>
//             <Link to="/FAQ" className={styles.navLink}>FAQ</Link>

            

//             {isAuthenticated ? (
//               <div className={styles.userMenu}>
//                 {user?.role && (
//                   <Link to={getDashboardLink()} className={styles.dashboardLink}>
//                     <FiGrid size={16} /> {getDashboardLabel()}
//                   </Link>
//                 )}
                
//                 <span className={styles.userGreeting}>
//                   <FiUser size={16} /> Hello, {user?.name}
//                 </span>
//                 <button onClick={handleLogout} className={`${styles.btn} ${styles.logoutBtn}`}>
//                   <FiLogOut size={16}/>Logout
//                 </button>
//               </div>
//             ) : (
//               <button onClick={handleLogin} className={`${styles.btn} ${styles.loginBtn}`}>
//                 Login
//               </button>
//             )}

//             <button
//               onClick={toggleTheme}
//               className={styles.themeToggle}
//               aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
//             >
//               {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
//             </button>
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;




// --------------------------------------after implementing api--------------------------------------------------------------------




// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FiMenu, FiX, FiSun, FiMoon, FiUser, FiLogOut, FiGrid, FiBell } from 'react-icons/fi';
// import { useThemeTrigger } from '../../ThemeTrigger';
// import { useAuth } from '../../AuthContext';
// import Notification from '../notification/Notification';
// import styles from './Header.module.css';

// import logo from './logo.jpg';

// const Header = () => {
//   const navigate = useNavigate();
//   const { darkMode, toggleTheme } = useThemeTrigger();
//   const { isAuthenticated, user, logout, isAdmin } = useAuth();

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   const handleResize = () => {
//     setIsMobile(window.innerWidth < 768);
//     if (window.innerWidth >= 768) {
//       setMobileMenuOpen(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleLogin = () => {
//     navigate('/login');
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const getDashboardLink = () => {
//     if (!user) return null;
    
//     switch (user.role) {
//       case 'admin':
//         return '/AdminDashboard';
//       case 'vendor':
//         return '/VendorDashboard';
//       case 'user':
//         return '/UserDashboard';
//     }
//   };

//   const getDashboardLabel = () => {
//     if (!user) return 'Dashboard';
    
//     switch (user.role) {
//       case 'admin':
//         return 'Admin Dashboard';
//       case 'vendor':
//         return 'Vendor Dashboard';
//       case 'user':
//       default:
//         return 'My Dashboard';
//     }
//   };

//   return (
//     <header className={`${styles.header} ${darkMode ? styles.dark : ''}`}>
//       <div className={styles.container}>
//         <nav className={styles.headerNav}>
//           <Link to="/" className={styles.logo}>
//             <img src={logo} alt="School Lunch Box Logo" />
//           </Link>

//           {/* Mobile controls - placed on the right side */}
//           <div className={styles.mobileControls}>
//             {isAuthenticated && isMobile && (
//               <div className={styles.mobileNotification}>
//                 <Notification />
//               </div>
//             )}
            
//             {isMobile && (
//               <button
//                 className={styles.mobileMenuToggle}
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               >
//                 {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//               </button>
//             )}
//           </div>

//           <div className={`${styles.navLinks} ${mobileMenuOpen ? styles.open : ''}`}>
//             <Link to="/AboutUs" className={styles.navLink}>About Us</Link>
//             <Link to="/ContactUs" className={styles.navLink}>Contact</Link>
//             <Link to="/FAQ" className={styles.navLink}>FAQ</Link>

//             {isAuthenticated && !isMobile && <Notification />}

//             {isAuthenticated ? (
//               <div className={styles.userMenu}>
//                 {user?.role && (
//                   <Link to={getDashboardLink()} className={styles.dashboardLink}>
//                     <FiGrid size={16} /> {getDashboardLabel()}
//                   </Link>
//                 )}
                
//                 <span className={styles.userGreeting}>
//                   <FiUser size={16} /> Hello, {user?.name}
//                 </span>
//                 <button onClick={handleLogout} className={`${styles.btn} ${styles.logoutBtn}`}>
//                   <FiLogOut size={16}/>Logout
//                 </button>
//               </div>
//             ) : (
//               <button onClick={handleLogin} className={`${styles.btn} ${styles.loginBtn}`}>
//                 Login
//               </button>
//             )}

//             <button
//               onClick={toggleTheme}
//               className={styles.themeToggle}
//               aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
//             >
//               {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
//             </button>
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;






import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiSun, FiMoon, FiUser, FiLogOut, FiGrid, FiBell } from 'react-icons/fi';
import { useThemeTrigger } from '../../ThemeTrigger';
import { useAuth } from '../../AuthContext';
import Notification from '../notification/Notification';
import HeaderApi from '../../API/ContentApi/HeaderApi.js';
import styles from './Header.module.css';

// Default logo - will be overridden by API data if available
import defaultLogo from './logo.jpg';

const Header = () => {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useThemeTrigger();
  const { isAuthenticated, user, logout, isAdmin } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [headerContent, setHeaderContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch header content on component mount
  useEffect(() => {
    fetchHeaderContent();
  }, []);

  const fetchHeaderContent = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await HeaderApi.getHeader();
      setHeaderContent(response.data);
    } catch (err) {
      console.error('Error fetching header content:', err);
      setError(err.message);
      // Continue with default header structure if API fails
      setHeaderContent(getDefaultHeaderContent());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultHeaderContent = () => {
    return {
      companyName: 'School Lunch Box',
      logo: {
        url: defaultLogo,
        altText: 'School Lunch Box Logo'
      },
      navigationLinks: [
        { text: 'About Us', url: '/AboutUs', external: false, order: 0, isActive: true },
        { text: 'Contact', url: '/ContactUs', external: false, order: 1, isActive: true },
        { text: 'FAQ', url: '/FAQ', external: false, order: 2, isActive: true }
      ],
      authSettings: {
        showAuthButtons: true,
        dashboardRoles: {
          admin: { label: 'Admin Dashboard', path: '/AdminDashboard' },
          vendor: { label: 'Vendor Dashboard', path: '/VendorDashboard' },
          user: { label: 'My Dashboard', path: '/UserDashboard' }
        }
      },
      themeSettings: {
        allowThemeToggle: true,
        defaultTheme: 'light'
      },
      notificationSettings: {
        showNotifications: true,
        position: 'right'
      },
      mobileSettings: {
        breakpoint: 768,
        showMobileMenu: true
      }
    };
  };

  const handleResize = () => {
    const breakpoint = headerContent?.mobileSettings?.breakpoint || 768;
    setIsMobile(window.innerWidth < breakpoint);
    if (window.innerWidth >= breakpoint) {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [headerContent]);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user || !headerContent) return null;
    
    const dashboardSettings = headerContent.authSettings.dashboardRoles[user.role];
    return dashboardSettings?.path || '/UserDashboard';
  };

  const getDashboardLabel = () => {
    if (!user || !headerContent) return 'Dashboard';
    
    const dashboardSettings = headerContent.authSettings.dashboardRoles[user.role];
    return dashboardSettings?.label || 'My Dashboard';
  };

  const getLogoUrl = () => {
    return headerContent?.logo?.url || defaultLogo;
  };

  const getLogoAltText = () => {
    return headerContent?.logo?.altText || 'School Lunch Box Logo';
  };

  const getActiveNavigationLinks = () => {
    if (!headerContent?.navigationLinks) return [];
    
    return headerContent.navigationLinks
      .filter(link => link.isActive)
      .sort((a, b) => a.order - b.order);
  };

  const shouldShowThemeToggle = () => {
    return headerContent?.themeSettings?.allowThemeToggle !== false;
  };

  const shouldShowNotifications = () => {
    return headerContent?.notificationSettings?.showNotifications !== false;
  };

  const shouldShowMobileMenu = () => {
    return headerContent?.mobileSettings?.showMobileMenu !== false;
  };

  const shouldShowAuthButtons = () => {
    return headerContent?.authSettings?.showAuthButtons !== false;
  };

  // Show loading state or fallback to default header if still loading
  if (loading && !headerContent) {
    return (
      <header className={`${styles.header} ${darkMode ? styles.dark : ''}`}>
        <div className={styles.container}>
          <nav className={styles.headerNav}>
            <Link to="/" className={styles.logo}>
              <img src={defaultLogo} alt="School Lunch Box Logo" />
            </Link>
            <div className={styles.navLinks}>
              <div className={styles.loadingText}>Loading...</div>
            </div>
          </nav>
        </div>
      </header>
    );
  }

  // Use headerContent if available, otherwise use default
  const currentHeader = headerContent || getDefaultHeaderContent();
  const activeLinks = getActiveNavigationLinks();

  return (
    <header className={`${styles.header} ${darkMode ? styles.dark : ''}`}>
      <div className={styles.container}>
        <nav className={styles.headerNav}>
          <Link to="/" className={styles.logo}>
            <img src={getLogoUrl()} alt={getLogoAltText()} />
          </Link>

          {/* Mobile controls - placed on the right side */}
          <div className={styles.mobileControls}>
            {isAuthenticated && isMobile && shouldShowNotifications() && (
              <div className={styles.mobileNotification}>
                <Notification />
              </div>
            )}
            
            {isMobile && shouldShowMobileMenu() && (
              <button
                className={styles.mobileMenuToggle}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            )}
          </div>

          <div className={`${styles.navLinks} ${mobileMenuOpen ? styles.open : ''}`}>
            {/* Dynamic navigation links from API */}
            {activeLinks.map((link) => (
              <Link 
                key={link._id || link.text} 
                to={link.url} 
                className={styles.navLink}
                target={link.external ? '_blank' : '_self'}
                rel={link.external ? 'noopener noreferrer' : ''}
              >
                {link.text}
              </Link>
            ))}

            {/* Notifications */}
            {isAuthenticated && !isMobile && shouldShowNotifications() && <Notification />}

            {/* Authentication section */}
            {shouldShowAuthButtons() && (
              isAuthenticated ? (
                <div className={styles.userMenu}>
                  {user?.role && (
                    <Link to={getDashboardLink()} className={styles.dashboardLink}>
                      <FiGrid size={16} /> {getDashboardLabel()}
                    </Link>
                  )}
                  
                  <span className={styles.userGreeting}>
                    <FiUser size={16} /> Hello, {user?.name}
                  </span>
                  <button onClick={handleLogout} className={`${styles.btn} ${styles.logoutBtn}`}>
                    <FiLogOut size={16}/>Logout
                  </button>
                </div>
              ) : (
                <button onClick={handleLogin} className={`${styles.btn} ${styles.loginBtn}`}>
                  Login
                </button>
              )
            )}

            {/* Theme toggle */}
            {shouldShowThemeToggle() && (
              <button
                onClick={toggleTheme}
                className={styles.themeToggle}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
              </button>
            )}
          </div>

          {/* Error message for admin users */}
          {error && isAdmin && (
            <div className={styles.errorBanner}>
              Header API Error: {error}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;