// src/components/AdminDashboardPage/Sections/Overview/Overview.jsx
import React from 'react';
import styles from '../../AdminDashboardPage.module.css';

const Overview = ({ darkMode, stats }) => {
  return (
    <div className={styles.overview}>
      <h2>Dashboard Overview</h2>
      {stats ? (
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Total Schools</h3>
            <p className={styles.statNumber}>{stats.totalSchools}</p>
          </div>
          <div className={styles.statCard}>
            <h3>Total Meal Options</h3>
            <p className={styles.statNumber}>{stats.mealOptions?.totalMealOptions || 0}</p>
          </div>
          <div className={styles.statCard}>
            <h3>Average Meals per School</h3>
            <p className={styles.statNumber}>
              {stats.mealOptions ? Math.round(stats.mealOptions.avgMealOptions) : 0}
            </p>
          </div>
          <div className={styles.statCard}>
            <h3>School Types</h3>
            <div className={styles.typeStats}>
              {stats.schoolsByType?.map(type => (
                <div key={type._id} className={styles.typeStat}>
                  <span>{type._id}: </span>
                  <strong>{type.count}</strong>
                </div>
              )) || <div>No data available</div>}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.noData}>No statistics data available</div>
      )}
    </div>
  );
};

export default Overview;