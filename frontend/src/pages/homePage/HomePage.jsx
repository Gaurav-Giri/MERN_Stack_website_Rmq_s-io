
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../AuthContext'; // Import auth context
// import CarouselBanner from '../../elements/CarouselSlider/CarouselSlider';
// import SearchBar from '../../elements/SearchBar/SearchBar';
// import SchoolCard from '../../elements/SchoolCard/SchoolCard';
// import './HomePage.css';

// const HomePage = () => {
//   const { isAuthenticated, user } = useAuth(); // Get auth state from context
//   const [isDarkMode, setIsDarkMode] = useState(false);
  
//   useEffect(() => {
//     const checkDarkMode = () => {
//       setIsDarkMode(document.body.classList.contains('dark-mode'));
//     };
    
//     checkDarkMode();
    
//     const observer = new MutationObserver(checkDarkMode);
//     observer.observe(document.body, {
//       attributes: true,
//       attributeFilter: ['class']
//     });
    
//     return () => observer.disconnect();
//   }, []);

//   const [schools] = useState([
//     {
//       id: 1,
//       name: 'Greenwood High',
//       location: 'Bangalore, Karnataka',
//       mealOptions: 5,
//       image: "../../../public/images/default.jpg"
//     },
//     {
//       id: 2,
//       name: 'Sunshine Public School',
//       location: 'Delhi',
//       mealOptions: 3,
//       image: "../../../public/images/default.jpg"
//     },

//     {
//       id: 3,
//       name: 'Sunglow Public School',
//       location: 'Delhi',
//       mealOptions: 4,
//       image: "../../../public/images/default.jpg"
//     },
//     // More schools...
//   ]);

//   const handleSearch = (searchTerm) => {
//     // In a real app, this would call an API
//     console.log('Searching for:', searchTerm);
//   };
  
//   return (
//     <div className={`home-page ${isDarkMode ? 'dark' : ''}`}>
//       <main className="main-content">
//         <section className="hero-section">
//           <section className="promo-section">
//             <CarouselBanner />
//           </section>
//           <div className="container">
//             <h1>Fresh Meals Delivered to Your Child's School</h1>
//             <p>Order nutritious lunch for your child with easy delivery to school</p>
//             {isAuthenticated ? (
//               <div className="welcome-message">
//                 <p>Welcome back, {user?.name}! Ready to order?</p>
//                 <Link to="/SchoolList" className="cta-button">
//                   Browse Schools
//                 </Link>
//               </div>
//             ) : (
//               <div className="auth-options">
//                 <Link to="/login" className="cta-button primary">
//                   Login to Order
//                 </Link>
//                 {/* <Link to="/login" className="cta-button secondary">
//                   Create Account
//                 </Link> */}
//               </div>
//             )}
//           </div>
//         </section>

//         <section className="school-search-section">
//           <div className="container">
//             <h2>Find Your School</h2>
//             <SearchBar onSearch={handleSearch} />
//           </div>
//         </section>

//         <section className="school-list-section">
//           <div className="container">
//             <h2>Available Schools</h2>
//             <div className="school-grid">
//               {schools.map(school => (
//                 <SchoolCard 
//                   key={school.id} 
//                   school={school} 
//                 />
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Additional sections for better UX */}
//         <section className="features-section">
//           <div className="container">
//             <h2>Why Choose Our Service?</h2>
//             <div className="features-grid">
//               <div className="feature-card">
//                 <h3>🍎 Nutritious Meals</h3>
//                 <p>Healthy, balanced meals prepared by certified nutritionists</p>
//               </div>
//               <div className="feature-card">
//                 <h3>⏰ Convenient Delivery</h3>
//                 <p>Fresh meals delivered directly to your child's school</p>
//               </div>
//               <div className="feature-card">
//                 <h3>📱 Easy Ordering</h3>
//                 <p>Order and manage meals through our simple platform</p>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default HomePage;


// --------------------------------------------------------------------------------------------------------------------------
// HomePage.jsx
import React, { useState, useEffect } from 'react';
import TestNotificationButton from "../../elements/TestNotificationButton/TestNotificationButton.jsx";
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext'; // Import auth context
import CarouselBanner from '../../elements/CarouselSlider/CarouselSlider';
import SearchBar from '../../elements/SearchBar/SearchBar';
import SchoolCard from '../../elements/SchoolCard/SchoolCard';
import styles from './HomePage.module.css';

const HomePage = () => {
  const { isAuthenticated, user } = useAuth(); // Get auth state from context
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.body.classList.contains('dark-mode'));
    };
    
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  const [schools] = useState([
    {
      id: 1,
      name: 'Greenwood High',
      location: 'Bangalore, Karnataka',
      mealOptions: 5,
      image: "../../../public/images/default.jpg"
    },
    {
      id: 2,
      name: 'Sunshine Public School',
      location: 'Delhi',
      mealOptions: 3,
      image: "../../../public/images/default.jpg"
    },
    {
      id: 3,
      name: 'Sunglow Public School',
      location: 'Delhi',
      mealOptions: 4,
      image: "../../../public/images/default.jpg"
    },
    // More schools...
  ]);

  const handleSearch = (searchTerm) => {
    // In a real app, this would call an API
    console.log('Searching for:', searchTerm);
  };
  
  return (
    <div className={`${styles.homePage} ${isDarkMode ? styles.dark : ''}`}>
      <main className={styles.mainContent}>
        <section className={styles.heroSection}>
          <section className={styles.promoSection}>
            <CarouselBanner />
          </section>
          <div className={styles.container}>
            <h1>Fresh Meals Delivered to Your Child's School</h1>
            <p>Order nutritious lunch for your child with easy delivery to school</p>
            {isAuthenticated ? (
              <div className={styles.welcomeMessage}>
                <p>Welcome back, {user?.name}! Ready to order?</p>
                <Link to="/SchoolList" className={styles.ctaButton}>
                  Browse Schools
                </Link>
              </div>
            ) : (
              <div className={styles.authOptions}>
                <Link to="/login" className={`${styles.ctaButton} ${styles.primary}`}>
                  Login to Order
                </Link>
              </div>
            )}
          </div>
        </section>

        <section>
            <TestNotificationButton/>

        </section>
        {/* <section className={styles.schoolSearchSection}>
          <div className={styles.container}>
            <h2>Find Your School</h2>
            <SearchBar onSearch={handleSearch} />
          </div>
        </section>

        <section className={styles.schoolListSection}>
          <div className={styles.container}>
            <h2>Available Schools</h2>
            <div className={styles.schoolGrid}>
              {schools.map(school => (
                <SchoolCard 
                  key={school.id} 
                  school={school} 
                />
              ))}
            </div>
          </div>
        </section> */}

        {/* Additional sections for better UX */}
        <section className={styles.featuresSection}>
          <div className={styles.container}>
            <h2>Why Choose Our Service?</h2>
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <h3>🍎 Nutritious Meals</h3>
                <p>Healthy, balanced meals prepared by certified nutritionists</p>
              </div>
              <div className={styles.featureCard}>
                <h3>⏰ Convenient Delivery</h3>
                <p>Fresh meals delivered directly to your child's school</p>
              </div>
              <div className={styles.featureCard}>
                <h3>📱 Easy Ordering</h3>
                <p>Order and manage meals through our simple platform</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;