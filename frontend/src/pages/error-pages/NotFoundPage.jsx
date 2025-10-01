import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeTrigger } from '../../ThemeTrigger'; // Import your theme hook
import './NotFoundPage.css';

const NotFoundPage = () => {
  const { darkMode } = useThemeTrigger(); // Get theme state

  return (
    <div className={`not-found-page ${darkMode ? 'dark' : ''}`}>
      <div className="not-found-container">
        <div className="not-found-content">
          <div className="not-found-illustration">
            <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
              <path d="M100,150 C150,100 250,100 300,150 C350,200 250,250 200,200 C150,150 100,200 100,150 Z" 
                    fill="#f0f0f0" stroke="#ddd" strokeWidth="2" />
              <circle cx="150" cy="120" r="20" fill="#e74c3c" />
              <circle cx="350" cy="120" r="20" fill="#e74c3c" />
              <path d="M200,200 Q250,220 300,200" stroke="#333" strokeWidth="3" fill="none" />
              <text x="250" y="280" textAnchor="middle" fontSize="24" fill="#333">404</text>
            </svg>
          </div>
          
          <h1>Page Not Found</h1>
          <p>Oops! The page you're looking for seems to have gone missing.</p>
          
          <div className="not-found-actions">
            <Link to="/" className="home-button">
              Go Back Home
            </Link>
            <Link to="/schools" className="schools-button">
              Browse Schools
            </Link>
            <button onClick={() => window.history.back()} className="back-button">
              Go Back
            </button>
          </div>
          
          <div className="not-found-search">
            <p>Or try searching for what you need:</p>
            <div className="search-container">
              <input type="text" placeholder="Search..." />
              <button>Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;