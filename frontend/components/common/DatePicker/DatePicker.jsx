// DatePicker.jsx
// DatePicker.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './DatePicker.css';

const DatePicker = ({ selectedDate, onChange, minDate }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    // Check if dark mode is enabled on the body element
    const checkDarkMode = () => {
      setIsDarkMode(document.body.classList.contains('dark-mode'));
    };
    
    checkDarkMode();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (date) => {
    onChange(date);
    setShowCalendar(false);
  };

  const formatDisplayDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '.');
  };

  return (
    <div className={`date-picker-container ${isDarkMode ? 'dark' : ''}`}>
      <div className="date-input" onClick={toggleCalendar}>
        <span>Choose a date</span>
        <div className="selected-date">{formatDisplayDate(selectedDate)}</div>
      </div>
      
      {showCalendar && (
        <div className="calendar-dropdown">
          <Calendar 
            selectedDate={selectedDate} 
            onDateSelect={handleDateSelect}
            minDate={minDate}
            isDarkMode={isDarkMode}
          />
        </div>
      )}
    </div>
  );
};

const Calendar = ({ selectedDate, onDateSelect, minDate, isDarkMode }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));
  
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };
  
  const isDisabled = (date) => {
    return date < new Date(minDate.setHours(0, 0, 0, 0));
  };
  
  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const disabled = isDisabled(date);
      const isSelected = isSameDay(date, selectedDate);
      
      days.push(
        <div
          key={`day-${day}`}
          className={`calendar-day ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
          onClick={() => !disabled && onDateSelect(date)}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };
  
  return (
    <div className={`calendar ${isDarkMode ? 'dark' : ''}`}>
      <div className="calendar-header">
        <button onClick={prevMonth} className="nav-button">&lt;</button>
        <div className="month-name">{monthName}</div>
        <button onClick={nextMonth} className="nav-button">&gt;</button>
      </div>
      
      <div className="calendar-weekdays">
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
          <div key={day} className="weekday">{day}</div>
        ))}
      </div>
      
      <div className="calendar-days">
        {renderDays()}
      </div>
    </div>
  );
};

DatePicker.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
  minDate: PropTypes.instanceOf(Date).isRequired
};

Calendar.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onDateSelect: PropTypes.func.isRequired,
  minDate: PropTypes.instanceOf(Date).isRequired,
  isDarkMode: PropTypes.bool.isRequired
};

export default DatePicker;