// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FiMenu, FiX, FiSun, FiMoon, FiUser } from 'react-icons/fi';
// import { ROUTES } from '../../../routes';
// import logo from '../../../../public/assets/logo/logo.jpg';
// import './Header.css';
// const Header = ({ isAuthenticated, onLogout }) => {
//   const navigate = useNavigate();
//   const [darkMode, setDarkMode] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth >= 768) {
//         setMobileMenuOpen(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     document.body.classList.toggle('dark-mode');
//   };

//   const handleLogin = () => {
//     navigate(ROUTES.LOGIN, { state: { from: window.location.pathname } });
//   };

//   const handleRegister = () => {
//     navigate(ROUTES.REGISTER);
//   };

//   return (
//     <header className={`header ${darkMode ? 'dark' : ''}`}>
//       <div className="container">
//         <nav className="header-nav">
//           <Link to={ROUTES.HOME} className="logo">
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
//             <Link to={ROUTES.ABOUT}>About Us</Link>
//             <Link to={ROUTES.CONTACT}>Contact</Link>
//             <Link to={ROUTES.FAQ}>FAQ</Link>
            
//             {isAuthenticated ? (
//               <>
//                 <Link to={ROUTES.DASHBOARD} className="dashboard-btn">
//                   <FiUser size={18} />
//                   {!isMobile && 'Dashboard'}
//                 </Link>
//                 <button onClick={onLogout} className="logout-button">Logout</button>
//               </>
//             ) : (
//               <>
//                 <button onClick={handleLogin} className="btn login-btn">Login</button>
//                 <button onClick={handleRegister} className="btn register-btn">Register</button>
//               </>
//             )}
            
//             <button 
//               onClick={toggleDarkMode} 
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




import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiSun, FiMoon, FiUser } from 'react-icons/fi';
import { ROUTES } from '../../../routes';
import logo from '../../../../public/assets/logo/logo.jpg';
import './Header.css';

const Header = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // ✅ Detect and apply stored or system theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme'); // 'dark' | 'light' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setDarkMode(initialDark);
    document.body.classList.toggle('dark-mode', initialDark);

    // ✅ Watch system theme change only if user hasn't set preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setDarkMode(e.matches);
        document.body.classList.toggle('dark-mode', e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  // ✅ Handle manual theme toggle
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle('dark-mode', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
    if (window.innerWidth >= 768) {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = () => {
    navigate(ROUTES.LOGIN, { state: { from: window.location.pathname } });
  };

  // const handleRegister = () => {
  //   navigate(ROUTES.REGISTER);
  // };

  return (
    <header className={`header ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        <nav className="header-nav">
          <Link to={ROUTES.HOME} className="logo">
            <img src={logo} alt="School Lunch Box Logo" />
          </Link>

          {isMobile && (
            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          )}

          <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            <Link to={ROUTES.ABOUT}>About Us</Link>
            <Link to={ROUTES.CONTACT}>Contact</Link>
            <Link to={ROUTES.FAQ}>FAQ</Link>

            {isAuthenticated ? (
              <>
                <Link to={ROUTES.DASHBOARD} className="dashboard-btn">
                  <FiUser size={18} />
                  {!isMobile && 'Dashboard'}
                </Link>
                <button onClick={onLogout} className="logout-button">
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={handleLogin} className="btn login-btn">
                  Login
                </button>
                {/* <button onClick={handleRegister} className="btn register-btn">
                  Register
                </button> */}
              </>
            )}

            <button
              onClick={toggleDarkMode}
              className="theme-toggle"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
