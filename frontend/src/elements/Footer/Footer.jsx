// import React from 'react';
// import { useThemeTrigger } from '../../ThemeTrigger'; // Import the custom hook
// import './Footer.css';

// const Footer = () => {
//   const { darkMode, toggleTheme } = useThemeTrigger(); // Use the ThemeTrigger context

//   return (
//     <footer className={`footer ${darkMode ? 'dark' : ''}`}>
//       <div className="container">
//         <div className="footer-content">
//           <div className="footer-section">
//             <h3>Company</h3>
//             <p>Fresh meals delivered to your child's school</p>
//           </div>
//           <div className="footer-section">
//             <h3>Quick Links</h3>
//             <ul>
//               <li><a href="/AboutUs">About Us</a></li>
//               <li><a href="/ContactUs">Contact</a></li>
//               <li><a href="/PrivacyPolicy">Privacy Policy</a></li>
//               <li><a href="/Terms&Conditions">Terms & Conditions</a></li>
//             </ul>
//           </div>
//           <div className="footer-section">
//             <h3>Contact</h3>
//             <p>support@schoollunchbox.com</p>
//             <p>+91 9876543210</p>
//             <button
//               onClick={toggleTheme}
//               className="theme-toggle-footer"
//               aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
//             >
//               {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
//             </button>
//           </div>
//         </div>
//         <div className="copyright">
//           <p>© 2023 School Lunch Box. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { useThemeTrigger } from '../../ThemeTrigger';
import './Footer.css';

const Footer = () => {
  const { darkMode, toggleTheme } = useThemeTrigger();

  return (
    <footer className={`footer ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Company</h3>
            <p>Fresh meals delivered to your child's school</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              {/* Replace <a> tags with <Link> components */}
              <li><Link to="/AboutUs">About Us</Link></li>
              <li><Link to="/ContactUs">Contact</Link></li>
              <li><Link to="/PrivacyPolicy">Privacy Policy</Link></li>
              <li><Link to="/Terms&Conditions">Terms & Conditions</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>support@schoollunchbox.com</p>
            <p>+91 9876543210</p>
            <button
              onClick={toggleTheme}
              className="theme-toggle-footer"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
          </div>
        </div>
        <div className="copyright">
          <p>© 2023 School Lunch Box. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;