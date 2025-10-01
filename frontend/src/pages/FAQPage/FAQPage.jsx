// import React, { useState } from 'react';
// import { useThemeTrigger } from '../../ThemeTrigger';
// import './FAQPage.module.css';

// const FAQPage = () => {
//   const { darkMode } = useThemeTrigger();
//   const [openItems, setOpenItems] = useState(new Set());
//   const [activeCategory, setActiveCategory] = useState('general');
//   const [searchTerm, setSearchTerm] = useState('');
  
//   const faqData = {
//     general: [
//       {
//         question: "What services do you offer?",
//         answer: "We provide comprehensive digital solutions including web development, mobile applications, cloud services, and digital consulting. Our services are tailored to meet the specific needs of businesses of all sizes."
//       },
//       {
//         question: "How do I create an account?",
//         answer: "Click on the 'Sign Up' button in the top navigation, fill in your details including email and password, verify your email address through the confirmation link we send, and you're ready to start using our services."
//       },
//       {
//         question: "Is there a free trial available?",
//         answer: "Yes, we offer a 14-day free trial for all our premium plans. No credit card is required to start your trial. You can upgrade to a paid plan at any time during or after your trial period."
//       },
//       {
//         question: "What payment methods do you accept?",
//         answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and in some regions, we also support digital payment methods like Apple Pay and Google Pay."
//       }
//     ],
//     account: [
//       {
//         question: "How do I reset my password?",
//         answer: "Click on 'Forgot Password' on the login page, enter your email address, check your inbox for a password reset link, click the link and follow the instructions to create a new secure password."
//       },
//       {
//         question: "Can I change my account email address?",
//         answer: "Yes, you can change your email address from the account settings page. You'll need to verify the new email address before it becomes active. This helps us maintain account security."
//       },
//       {
//         question: "How do I delete my account?",
//         answer: "Go to Account Settings > Privacy & Data > Delete Account. Please note that account deletion is permanent and all your data will be irrecoverably removed after 30 days."
//       },
//       {
//         question: "Why is my account temporarily suspended?",
//         answer: "Accounts may be suspended due to suspicious activity, violation of terms of service, or payment issues. Contact our support team with your account details to resolve this quickly."
//       }
//     ],
//     billing: [
//       {
//         question: "How does billing work?",
//         answer: "We operate on a subscription basis with monthly or annual billing cycles. Payments are automatically charged at the beginning of each billing period. You can view and download invoices from your account dashboard."
//       },
//       {
//         question: "Can I upgrade or downgrade my plan?",
//         answer: "Yes, you can change your plan at any time from the Billing section of your account. Downgrades will take effect at the next billing cycle, while upgrades are immediate with pro-rated charges."
//       },
//       {
//         question: "What is your refund policy?",
//         answer: "We offer a 30-day money-back guarantee for annual plans. Monthly plans can be canceled at any time with no further charges. Refunds are processed within 5-7 business days to the original payment method."
//       },
//       {
//         question: "How do I update my payment information?",
//         answer: "Navigate to Billing > Payment Methods in your account dashboard. You can add, remove, or set default payment methods. All payment information is encrypted and securely stored."
//       }
//     ],
//     technical: [
//       {
//         question: "What are the system requirements?",
//         answer: "Our platform works on modern browsers (Chrome, Firefox, Safari, Edge) and requires JavaScript to be enabled. Mobile apps are available for iOS 13+ and Android 8+. No special hardware is required."
//       },
//       {
//         question: "How do I integrate with your API?",
//         answer: "We provide comprehensive API documentation with code examples in multiple languages. API keys can be generated from your developer settings. Rate limits and authentication methods are detailed in our developer portal."
//       },
//       {
//         question: "Is my data backed up?",
//         answer: "Yes, we perform automatic daily backups with 30-day retention. All data is encrypted both in transit and at rest. We maintain multiple redundant copies across geographically distributed data centers."
//       },
//       {
//         question: "What security measures are in place?",
//         answer: "We employ industry-standard security including SSL/TLS encryption, regular security audits, two-factor authentication, SOC 2 compliance, and continuous monitoring for suspicious activities."
//       }
//     ]
//   };

//   const toggleItem = (index) => {
//     const newOpenItems = new Set(openItems);
//     if (newOpenItems.has(index)) {
//       newOpenItems.delete(index);
//     } else {
//       newOpenItems.add(index);
//     }
//     setOpenItems(newOpenItems);
//   };

//   const categories = [
//     { id: 'general', name: 'General', icon: '📋' },
//     { id: 'account', name: 'Account', icon: '👤' },
//     { id: 'billing', name: 'Billing', icon: '💳' },
//     { id: 'technical', name: 'Technical', icon: '⚙️' }
//   ];

//   return (
//     <div className={`${styles.faqContainer} ${darkMode ? 'dark-mode' : ''}`}>
//       <div className={styles.faqContent}>
//         {/* Header Section */}
//         <header className="faq-header">
//           <h1>Frequently Asked Questions</h1>
//           <p className="faq-subtitle">
//             Find quick answers to common questions about our products and services.
//           </p>
//           <div className="search-bar">
//             <input
//               type="text"
//               placeholder="Search FAQs..."
//               className="search-input"
//             />
//             <button className="search-button">Search</button>
//           </div>
//         </header>

//         {/* Category Navigation */}
//         <nav className="category-nav">
//           {categories.map(category => (
//             <button
//               key={category.id}
//               className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
//               onClick={() => setActiveCategory(category.id)}
//             >
//               <span className="category-icon">{category.icon}</span>
//               {category.name}
//             </button>
//           ))}
//         </nav>

//         {/* FAQ Items */}
//         <div className="faq-items">
//           {faqData[activeCategory].map((item, index) => (
//             <div
//               key={index}
//               className={`faq-item ${openItems.has(index) ? 'open' : ''}`}
//             >
//               <button
//                 className="faq-question"
//                 onClick={() => toggleItem(index)}
//               >
//                 <span className="question-text">{item.question}</span>
//                 <span className="toggle-icon">
//                   {openItems.has(index) ? '−' : '+'}
//                 </span>
//               </button>
//               <div className="faq-answer">
//                 <p>{item.answer}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Support Section */}
//         <div className="support-section">
//           <div className="support-content">
//             <h2>Still need help?</h2>
//             <p>Our support team is here to assist you with any questions or issues.</p>
//             <div className="support-options">
//               <div className="support-option">
//                 <div className="option-icon">📧</div>
//                 <h3>Email Support</h3>
//                 <p>support@yourcompany.com</p>
//                 <p>Typically responds within 2 hours</p>
//               </div>
//               <div className="support-option">
//                 <div className="option-icon">💬</div>
//                 <h3>Live Chat</h3>
//                 <p>Available 24/7</p>
//                 <p>Instant help from our team</p>
//               </div>
//               <div className="support-option">
//                 <div className="option-icon">📞</div>
//                 <h3>Phone Support</h3>
//                 <p>+1 (555) 123-HELP</p>
//                 <p>Mon-Fri, 9AM-6PM EST</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Quick Links */}
//         <div className="quick-links">
//           <h3>Quick Links</h3>
//           <div className="link-buttons">
//             <button className="link-button">Documentation</button>
//             <button className="link-button">Video Tutorials</button>
//             <button className="link-button">Community Forum</button>
//             <button className="link-button">Status Page</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FAQPage;





// import React, { useState, useMemo } from 'react';
// import { useThemeTrigger } from '../../ThemeTrigger';
// import styles from './FAQPage.module.css';
// import SearchBar from '../../elements/SearchBar/SearchBar';

// const FAQPage = () => {
//   const { darkMode } = useThemeTrigger();
//   const [openItems, setOpenItems] = useState(new Set());
//   const [activeCategory, setActiveCategory] = useState('general');
//   const [searchTerm, setSearchTerm] = useState('');
  
//   const faqData = {
//     general: [
//       {
//         question: "What services do you offer?",
//         answer: "We provide comprehensive digital solutions including web development, mobile applications, cloud services, and digital consulting. Our services are tailored to meet the specific needs of businesses of all sizes."
//       },
//       {
//         question: "How do I create an account?",
//         answer: "Click on the 'Sign Up' button in the top navigation, fill in your details including email and password, verify your email address through the confirmation link we send, and you're ready to start using our services."
//       },
//       {
//         question: "Is there a free trial available?",
//         answer: "Yes, we offer a 14-day free trial for all our premium plans. No credit card is required to start your trial. You can upgrade to a paid plan at any time during or after your trial period."
//       },
//       {
//         question: "What payment methods do you accept?",
//         answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and in some regions, we also support digital payment methods like Apple Pay and Google Pay."
//       }
//     ],
//     account: [
//       {
//         question: "How do I reset my password?",
//         answer: "Click on 'Forgot Password' on the login page, enter your email address, check your inbox for a password reset link, click the link and follow the instructions to create a new secure password."
//       },
//       {
//         question: "Can I change my account email address?",
//         answer: "Yes, you can change your email address from the account settings page. You'll need to verify the new email address before it becomes active. This helps us maintain account security."
//       },
//       {
//         question: "How do I delete my account?",
//         answer: "Go to Account Settings > Privacy & Data > Delete Account. Please note that account deletion is permanent and all your data will be irrecoverably removed after 30 days."
//       },
//       {
//         question: "Why is my account temporarily suspended?",
//         answer: "Accounts may be suspended due to suspicious activity, violation of terms of service, or payment issues. Contact our support team with your account details to resolve this quickly."
//       }
//     ],
//     billing: [
//       {
//         question: "How does billing work?",
//         answer: "We operate on a subscription basis with monthly or annual billing cycles. Payments are automatically charged at the beginning of each billing period. You can view and download invoices from your account dashboard."
//       },
//       {
//         question: "Can I upgrade or downgrade my plan?",
//         answer: "Yes, you can change your plan at any time from the Billing section of your account. Downgrades will take effect at the next billing cycle, while upgrades are immediate with pro-rated charges."
//       },
//       {
//         question: "What is your refund policy?",
//         answer: "We offer a 30-day money-back guarantee for annual plans. Monthly plans can be canceled at any time with no further charges. Refunds are processed within 5-7 business days to the original payment method."
//       },
//       {
//         question: "How do I update my payment information?",
//         answer: "Navigate to Billing > Payment Methods in your account dashboard. You can add, remove, or set default payment methods. All payment information is encrypted and securely stored."
//       }
//     ],
//     technical: [
//       {
//         question: "What are the system requirements?",
//         answer: "Our platform works on modern browsers (Chrome, Firefox, Safari, Edge) and requires JavaScript to be enabled. Mobile apps are available for iOS 13+ and Android 8+. No special hardware is required."
//       },
//       {
//         question: "How do I integrate with your API?",
//         answer: "We provide comprehensive API documentation with code examples in multiple languages. API keys can be generated from your developer settings. Rate limits and authentication methods are detailed in our developer portal."
//       },
//       {
//         question: "Is my data backed up?",
//         answer: "Yes, we perform automatic daily backups with 30-day retention. All data is encrypted both in transit and at rest. We maintain multiple redundant copies across geographically distributed data centers."
//       },
//       {
//         question: "What security measures are in place?",
//         answer: "We employ industry-standard security including SSL/TLS encryption, regular security audits, two-factor authentication, SOC 2 compliance, and continuous monitoring for suspicious activities."
//       }
//     ]
//   };

//   const toggleItem = (index) => {
//     const newOpenItems = new Set(openItems);
//     if (newOpenItems.has(index)) {
//       newOpenItems.delete(index);
//     } else {
//       newOpenItems.add(index);
//     }
//     setOpenItems(newOpenItems);
//   };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const filteredFaqData = useMemo(() => {
//     if (!searchTerm) return faqData[activeCategory];
    
//     return faqData[activeCategory].filter(item => 
//       item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
//       item.answer.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [searchTerm, activeCategory, faqData]);

//   const categories = [
//     { id: 'general', name: 'General', icon: '📋' },
//     { id: 'account', name: 'Account', icon: '👤' },
//     { id: 'billing', name: 'Billing', icon: '💳' },
//     { id: 'technical', name: 'Technical', icon: '⚙️' }
//   ];

//   return (
//     <div className={`${styles.faqContainer} ${darkMode ? styles.darkMode : ''}`}>
//       <div className={styles.faqContent}>
//         {/* Header Section */}
//         <header className={styles.faqHeader}>
//           <h1>Frequently Asked Questions</h1>
//           <p className={styles.faqSubtitle}>
//             Find quick answers to common questions about our products and services.
//           </p>
//           <div className={styles.searchBar}>
//             <input
//               type="text"
//               placeholder="Search FAQs..."
//               className={styles.searchInput}
//               value={searchTerm}
//               onChange={handleSearch}
//             />
//           </div>
//         </header>

//         {/* Category Navigation */}
//         <nav className={styles.categoryNav}>
//           {categories.map(category => (
//             <button
//               key={category.id}
//               className={`${styles.categoryButton} ${activeCategory === category.id ? styles.active : ''}`}
//               onClick={() => {
//                 setActiveCategory(category.id);
//                 setOpenItems(new Set()); // Close all open items when changing category
//               }}
//             >
//               <span className={styles.categoryIcon}>{category.icon}</span>
//               {category.name}
//             </button>
//           ))}
//         </nav>

//         {/* FAQ Items */}
//         <div className={styles.faqItems}>
//           {filteredFaqData.length > 0 ? (
//             filteredFaqData.map((item, index) => (
//               <div
//                 key={index}
//                 className={`${styles.faqItem} ${openItems.has(index) ? styles.open : ''}`}
//               >
//                 <button
//                   className={styles.faqQuestion}
//                   onClick={() => toggleItem(index)}
//                 >
//                   <span className={styles.questionText}>{item.question}</span>
//                   <span className={styles.toggleIcon}>
//                     {openItems.has(index) ? '−' : '+'}
//                   </span>
//                 </button>
//                 <div className={styles.faqAnswer}>
//                   <p>{item.answer}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className={styles.noResults}>
//               <p>No results found for "{searchTerm}"</p>
//             </div>
//           )}
//         </div>

//         {/* Support Section */}
//         <div className={styles.supportSection}>
//           <div className={styles.supportContent}>
//             <h2>Still need help?</h2>
//             <p>Our support team is here to assist you with any questions or issues.</p>
//             <div className={styles.supportOptions}>
//               <div className={styles.supportOption}>
//                 <div className={styles.optionIcon}>📧</div>
//                 <h3>Email Support</h3>
//                 <p>support@yourcompany.com</p>
//                 <p>Typically responds within 2 hours</p>
//               </div>
//               <div className={styles.supportOption}>
//                 <div className={styles.optionIcon}>💬</div>
//                 <h3>Live Chat</h3>
//                 <p>Available 24/7</p>
//                 <p>Instant help from our team</p>
//               </div>
//               <div className={styles.supportOption}>
//                 <div className={styles.optionIcon}>📞</div>
//                 <h3>Phone Support</h3>
//                 <p>+1 (555) 123-HELP</p>
//                 <p>Mon-Fri, 9AM-6PM EST</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Quick Links */}
//         <div className={styles.quickLinks}>
//           <h3>Quick Links</h3>
//           <div className={styles.linkButtons}>
//             <button className={styles.linkButton}>Documentation</button>
//             <button className={styles.linkButton}>Video Tutorials</button>
//             <button className={styles.linkButton}>Community Forum</button>
//             <button className={styles.linkButton}>Status Page</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FAQPage;


import React, { useState, useMemo } from 'react';
import { useThemeTrigger } from '../../ThemeTrigger';
import SearchBar from '../../elements/SearchBar/SearchBar'; // Adjust the path as needed
import styles from './FAQPage.module.css';

const FAQPage = () => {
  const { darkMode } = useThemeTrigger();
  const [openItems, setOpenItems] = useState(new Set());
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  
  const faqData = {
    general: [
      {
        question: "What services do you offer?",
        answer: "We provide comprehensive digital solutions including web development, mobile applications, cloud services, and digital consulting. Our services are tailored to meet the specific needs of businesses of all sizes."
      },
      {
        question: "How do I create an account?",
        answer: "Click on the 'Sign Up' button in the top navigation, fill in your details including email and password, verify your email address through the confirmation link we send, and you're ready to start using our services."
      },
      {
        question: "Is there a free trial available?",
        answer: "Yes, we offer a 14-day free trial for all our premium plans. No credit card is required to start your trial. You can upgrade to a paid plan at any time during or after your trial period."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and in some regions, we also support digital payment methods like Apple Pay and Google Pay."
      }
    ],
    account: [
      {
        question: "How do I reset my password?",
        answer: "Click on 'Forgot Password' on the login page, enter your email address, check your inbox for a password reset link, click the link and follow the instructions to create a new secure password."
      },
      {
        question: "Can I change my account email address?",
        answer: "Yes, you can change your email address from the account settings page. You'll need to verify the new email address before it becomes active. This helps us maintain account security."
      },
      {
        question: "How do I delete my account?",
        answer: "Go to Account Settings > Privacy & Data > Delete Account. Please note that account deletion is permanent and all your data will be irrecoverably removed after 30 days."
      },
      {
        question: "Why is my account temporarily suspended?",
        answer: "Accounts may be suspended due to suspicious activity, violation of terms of service, or payment issues. Contact our support team with your account details to resolve this quickly."
      }
    ],
    billing: [
      {
        question: "How does billing work?",
        answer: "We operate on a subscription basis with monthly or annual billing cycles. Payments are automatically charged at the beginning of each billing period. You can view and download invoices from your account dashboard."
      },
      {
        question: "Can I upgrade or downgrade my plan?",
        answer: "Yes, you can change your plan at any time from the Billing section of your account. Downgrades will take effect at the next billing cycle, while upgrades are immediate with pro-rated charges."
      },
      {
        question: "What is your refund policy?",
        answer: "We offer a 30-day money-back guarantee for annual plans. Monthly plans can be canceled at any time with no further charges. Refunds are processed within 5-7 business days to the original payment method."
      },
      {
        question: "How do I update my payment information?",
        answer: "Navigate to Billing > Payment Methods in your account dashboard. You can add, remove, or set default payment methods. All payment information is encrypted and securely stored."
      }
    ],
    technical: [
      {
        question: "What are the system requirements?",
        answer: "Our platform works on modern browsers (Chrome, Firefox, Safari, Edge) and requires JavaScript to be enabled. Mobile apps are available for iOS 13+ and Android 8+. No special hardware is required."
      },
      {
        question: "How do I integrate with your API?",
        answer: "We provide comprehensive API documentation with code examples in multiple languages. API keys can be generated from your developer settings. Rate limits and authentication methods are detailed in our developer portal."
      },
      {
        question: "Is my data backed up?",
        answer: "Yes, we perform automatic daily backups with 30-day retention. All data is encrypted both in transit and at rest. We maintain multiple redundant copies across geographically distributed data centers."
      },
      {
        question: "What security measures are in place?",
        answer: "We employ industry-standard security including SSL/TLS encryption, regular security audits, two-factor authentication, SOC 2 compliance, and continuous monitoring for suspicious activities."
      }
    ]
  };

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredFaqData = useMemo(() => {
    if (!searchTerm) return faqData[activeCategory];
    
    return faqData[activeCategory].filter(item => 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, activeCategory, faqData]);

  const categories = [
    { id: 'general', name: 'General', icon: '📋' },
    { id: 'account', name: 'Account', icon: '👤' },
    { id: 'billing', name: 'Billing', icon: '💳' },
    { id: 'technical', name: 'Technical', icon: '⚙️' }
  ];

  return (
    <div className={`${styles.faqContainer} ${darkMode ? styles.darkMode : ''}`}>
      <div className={styles.faqContent}>
        {/* Header Section */}
        <header className={styles.faqHeader}>
          <h1>Frequently Asked Questions</h1>
          <p className={styles.faqSubtitle}>
            Find quick answers to common questions about our products and services.
          </p>
          <div className={styles.searchBar}>
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Search FAQs..." 
            />
          </div>
        </header>

        {/* Category Navigation */}
        <nav className={styles.categoryNav}>
          {categories.map(category => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${activeCategory === category.id ? styles.active : ''}`}
              onClick={() => {
                setActiveCategory(category.id);
                setOpenItems(new Set()); // Close all open items when changing category
                setSearchTerm(''); // Clear search when changing category
              }}
            >
              <span className={styles.categoryIcon}>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </nav>

        {/* FAQ Items */}
        <div className={styles.faqItems}>
          {filteredFaqData.length > 0 ? (
            filteredFaqData.map((item, index) => (
              <div
                key={index}
                className={`${styles.faqItem} ${openItems.has(index) ? styles.open : ''}`}
              >
                <button
                  className={styles.faqQuestion}
                  onClick={() => toggleItem(index)}
                >
                  <span className={styles.questionText}>{item.question}</span>
                  <span className={styles.toggleIcon}>
                    {openItems.has(index) ? '−' : '+'}
                  </span>
                </button>
                <div className={styles.faqAnswer}>
                  <p>{item.answer}</p>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              <p>No results found for "{searchTerm}"</p>
            </div>
          )}
        </div>

        {/* Support Section */}
        <div className={styles.supportSection}>
          <div className={styles.supportContent}>
            <h2>Still need help?</h2>
            <p>Our support team is here to assist you with any questions or issues.</p>
            <div className={styles.supportOptions}>
              <div className={styles.supportOption}>
                <div className={styles.optionIcon}>📧</div>
                <h3>Email Support</h3>
                <p>support@yourcompany.com</p>
                <p>Typically responds within 2 hours</p>
              </div>
              <div className={styles.supportOption}>
                <div className={styles.optionIcon}>💬</div>
                <h3>Live Chat</h3>
                <p>Available 24/7</p>
                <p>Instant help from our team</p>
              </div>
              <div className={styles.supportOption}>
                <div className={styles.optionIcon}>📞</div>
                <h3>Phone Support</h3>
                <p>+1 (555) 123-HELP</p>
                <p>Mon-Fri, 9AM-6PM EST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.quickLinks}>
          <h3>Quick Links</h3>
          <div className={styles.linkButtons}>
            <button className={styles.linkButton}>Documentation</button>
            <button className={styles.linkButton}>Video Tutorials</button>
            <button className={styles.linkButton}>Community Forum</button>
            <button className={styles.linkButton}>Status Page</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;