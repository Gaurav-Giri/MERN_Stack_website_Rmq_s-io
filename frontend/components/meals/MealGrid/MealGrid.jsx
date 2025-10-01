import React from 'react';
import MealCard from '../MealCard/MealCard';
import './MealGrid.css';

const MealGrid = ({ meals, onAddToCart, isDarkMode }) => {
  return (
    <div className="meal-grid">
      {meals.map(meal => (
        <MealCard 
          key={meal.id} 
          meal={meal} 
          onAddToCart={onAddToCart}
          isDarkMode={isDarkMode}
        />
      ))}
    </div>
  );
};

export default MealGrid;