// UserDashboardPage.jsx
import React from 'react';
import { useThemeTrigger } from '../../../ThemeTrigger';
import styles from './userDashboardPage.module.css';

const UserDashboardPage = () => {
  const { darkMode } = useThemeTrigger();

  return (
    <div className={`${styles.dashboard} ${darkMode ? styles.dark : ''}`}>
      <header className={styles.header}>
        <h1>User Dashboard</h1>
        <p>Welcome back! Here's your activity summary.</p>
      </header>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Completed Tasks</h3>
          <p className={styles.statNumber}>42</p>
          <span className={styles.statTrend}>↑ 12% this week</span>
        </div>
        
        <div className={styles.statCard}>
          <h3>Projects</h3>
          <p className={styles.statNumber}>7</p>
          <span className={styles.statTrend}>2 ongoing</span>
        </div>
        
        <div className={styles.statCard}>
          <h3>Messages</h3>
          <p className={styles.statNumber}>23</p>
          <span className={styles.statTrend}>5 unread</span>
        </div>
        
        <div className={styles.statCard}>
          <h3>Weekly Goal</h3>
          <p className={styles.statNumber}>78%</p>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{width: '78%'}}></div>
          </div>
        </div>
      </div>
      
      <div className={styles.content}>
        <section className={styles.section}>
          <h2>Recent Activity</h2>
          <ul className={styles.activityList}>
            <li className={styles.activityItem}>
              <div className={styles.activityIcon}>✓</div>
              <div className={styles.activityDetails}>
                <p>Completed task "Update documentation"</p>
                <span className={styles.activityTime}>2 hours ago</span>
              </div>
            </li>
            <li className={styles.activityItem}>
              <div className={styles.activityIcon}>📊</div>
              <div className={styles.activityDetails}>
                <p>Added data to quarterly report</p>
                <span className={styles.activityTime}>Yesterday</span>
              </div>
            </li>
            <li className={styles.activityItem}>
              <div className={styles.activityIcon}>👥</div>
              <div className={styles.activityDetails}>
                <p>Joined "Website Redesign" project</p>
                <span className={styles.activityTime}>2 days ago</span>
              </div>
            </li>
          </ul>
        </section>
        
        <section className={styles.section}>
          <h2>Upcoming Tasks</h2>
          <div className={styles.taskList}>
            <div className={styles.taskItem}>
              <div className={styles.taskCheckbox}>
                <input type="checkbox" id="task1" />
              </div>
              <label htmlFor="task1" className={styles.taskLabel}>
                <span>Review team proposals</span>
                <span className={styles.taskDue}>Tomorrow</span>
              </label>
            </div>
            <div className={styles.taskItem}>
              <div className={styles.taskCheckbox}>
                <input type="checkbox" id="task2" />
              </div>
              <label htmlFor="task2" className={styles.taskLabel}>
                <span>Schedule meeting with clients</span>
                <span className={styles.taskDue}>In 3 days</span>
              </label>
            </div>
            <div className={styles.taskItem}>
              <div className={styles.taskCheckbox}>
                <input type="checkbox" id="task3" />
              </div>
              <label htmlFor="task3" className={styles.taskLabel}>
                <span>Prepare presentation slides</span>
                <span className={styles.taskDue}>Next week</span>
              </label>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserDashboardPage;