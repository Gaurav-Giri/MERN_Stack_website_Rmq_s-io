// import React from 'react';
// import { Link } from 'react-router-dom';
// import './SchoolCard.css'
// const SchoolCard = ({ school }) => {
//   return (
//     <div className="school-card">
//       <Link to="/SchoolMeal">
        
//         <div className="school-info">
//         <div className="school-image">
//           <img src={school.image || '../../../../public/assets/images/default.jpg'} 
//           alt={school.name} />
//         </div>

//           <h3>{school.name}</h3>
//           <p className="location">
//             <span className="icon">📍</span> {school.location}
//           </p>
//           <p className="meals-available">{school.mealOptions} meal options available</p>
//           <button className="order-now-btn">Order Now</button>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default SchoolCard;


// Updated SchoolCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SchoolCard.module.css';
import { useThemeTrigger } from "../../ThemeTrigger"; // adjust path if needed

const SchoolCard = ({ school }) => {
  const { darkMode } = useThemeTrigger();
  
  return (
    <div className={`${styles.schoolCard} ${darkMode ? styles.darkMode : ''}`}>
      <Link to="/SchoolMeal">
        <div className={styles.schoolInfo}>
          <div className={styles.schoolImage}>
            <img src={school.image || '../../../../public/assets/images/default.jpg'} 
            alt={school.name} />
          </div>

          <h3>{school.name}</h3>
          <p className={styles.location}>
            <span className={styles.icon}>📍</span> {school.location}
          </p>
          <p className={styles.mealsAvailable}>{school.mealOptions} meal options available</p>
          <button className={styles.orderNowBtn}>Order Now</button>
        </div>
      </Link>
    </div>
  );
};

export default SchoolCard;