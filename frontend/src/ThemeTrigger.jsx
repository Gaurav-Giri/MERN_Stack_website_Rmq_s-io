import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the ThemeTrigger context
const ThemeTriggerContext = createContext();

// Custom hook to use the ThemeTrigger context
export const useThemeTrigger = () => {
  const context = useContext(ThemeTriggerContext);
  if (!context) {
    throw new Error('useThemeTrigger must be used within a ThemeTriggerProvider');
  }
  return context;
};

// ThemeTrigger Provider component
export const ThemeTriggerProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setDarkMode(initialDark);
    document.body.classList.toggle('dark-mode', initialDark);
  }, []);

  // Toggle function
  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle('dark-mode', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  // Context value
  const value = {
    darkMode,
    toggleTheme
  };

  return (
    <ThemeTriggerContext.Provider value={value}>
      {children}
    </ThemeTriggerContext.Provider>
  );
};