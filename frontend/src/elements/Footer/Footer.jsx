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

// -------------------------------------------------------------------------------------------------------
// import React from 'react';
// import { Link } from 'react-router-dom'; // Import Link
// import { useThemeTrigger } from '../../ThemeTrigger';
// import './Footer.css';

// const Footer = () => {
//   const { darkMode, toggleTheme } = useThemeTrigger();

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
//               {/* Replace <a> tags with <Link> components */}
//               <li><Link to="/AboutUs">About Us</Link></li>
//               <li><Link to="/ContactUs">Contact</Link></li>
//               <li><Link to="/PrivacyPolicy">Privacy Policy</Link></li>
//               <li><Link to="/Terms&Conditions">Terms & Conditions</Link></li>
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



// ------------------------------------------updated using api---------------------------------------------------------


// Footer.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useThemeTrigger } from '../../ThemeTrigger';
import FooterApi from '../../API/ContentApi/FooterApi.js';
import './Footer.css';

const Footer = () => {
  const { darkMode, toggleTheme } = useThemeTrigger();
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFooterContent();
  }, []);

  const fetchFooterContent = async () => {
    try {
      setLoading(true);
      const response = await FooterApi.getFooter();
      setFooterData(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching footer content:', err);
      setError(err.message);
      // Use default data if API fails
      setFooterData(getDefaultFooterData());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultFooterData = () => ({
    companyName: 'School Lunch Box',
    tagline: 'Fresh meals delivered to your child\'s school',
    sections: [
      {
        title: 'Company',
        content: 'Fresh meals delivered to your child\'s school',
        isActive: true
      },
      {
        title: 'Quick Links',
        links: [
          { text: 'About Us', url: '/AboutUs', external: false },
          { text: 'Contact', url: '/ContactUs', external: false },
          { text: 'Privacy Policy', url: '/PrivacyPolicy', external: false },
          { text: 'Terms & Conditions', url: '/Terms&Conditions', external: false }
        ],
        isActive: true
      },
      {
        title: 'Contact',
        contactInfo: {
          email: 'support@schoollunchbox.com',
          phone: '+91 9876543210'
        },
        isActive: true
      }
    ],
    socialLinks: {},
    copyrightText: '© 2025 School Lunch Box. All rights reserved.',
    themeSettings: {
      allowThemeToggle: true,
      defaultTheme: 'light'
    }
  });

  const renderSectionContent = (section) => {
    if (section.links && section.links.length > 0) {
      return (
        <ul>
          {section.links.map((link, index) => (
            <li key={index}>
              {link.external ? (
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.text}
                </a>
              ) : (
                <Link to={link.url}>{link.text}</Link>
              )}
            </li>
          ))}
        </ul>
      );
    }

    if (section.contactInfo) {
      return (
        <>
          {section.contactInfo.email && <p>{section.contactInfo.email}</p>}
          {section.contactInfo.phone && <p>{section.contactInfo.phone}</p>}
          {section.contactInfo.address && <p>{section.contactInfo.address}</p>}
        </>
      );
    }

    return section.content && <p>{section.content}</p>;
  };

  const renderSocialLinks = () => {
    if (!footerData?.socialLinks) return null;

    const { facebook, twitter, instagram, linkedin } = footerData.socialLinks;
    const socialLinks = [];

    if (facebook) socialLinks.push({ name: 'Facebook', url: facebook, icon: '📘' });
    if (twitter) socialLinks.push({ name: 'Twitter', url: twitter, icon: '🐦' });
    if (instagram) socialLinks.push({ name: 'Instagram', url: instagram, icon: '📷' });
    if (linkedin) socialLinks.push({ name: 'LinkedIn', url: linkedin, icon: '💼' });

    if (socialLinks.length === 0) return null;

    return (
      <div className="footer-social-links">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label={social.name}
          >
            {social.icon}
          </a>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <footer className={`footer ${darkMode ? 'dark' : ''} loading`}>
        <div className="container">
          <div className="footer-content">
            <p>Loading footer...</p>
          </div>
        </div>
      </footer>
    );
  }

  const displayData = footerData || getDefaultFooterData();

  return (
    <footer className={`footer ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        <div className="footer-content">
          {displayData.sections
            ?.filter(section => section.isActive)
            .map((section, index) => (
              <div key={index} className="footer-section">
                <h3>{section.title}</h3>
                {renderSectionContent(section)}
                {/* Add theme toggle to the last section if allowed */}
                {index === displayData.sections.length - 1 && 
                 displayData.themeSettings?.allowThemeToggle && (
                  <button
                    onClick={toggleTheme}
                    className="theme-toggle-footer"
                    aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                  >
                    {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  </button>
                )}
              </div>
            ))}
          
          {/* Social Links Section */}
          {renderSocialLinks() && (
            <div className="footer-section">
              <h3>Follow Us</h3>
              {renderSocialLinks()}
            </div>
          )}
        </div>
        
        <div className="copyright">
          <p>{displayData.copyrightText}</p>
          {error && (
            <div className="footer-error">
              <small>Note: Using default footer content due to loading error</small>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;