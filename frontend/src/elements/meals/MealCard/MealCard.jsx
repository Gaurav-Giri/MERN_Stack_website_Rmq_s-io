
import React, { useState } from 'react';
import './MealCard.css';
import '../../../../public/images/VegetableMeal.jpg' ;




const MealCard = ({ meal, onAddToCart, isDarkMode }) => {
  const [showNutrition, setShowNutrition] = useState(false);

  return (
    <div className={`meal-card ${isDarkMode ? 'dark' : ''}`}>
      <div className="meal-image">
        <img src={meal.image  } 
        alt={meal.name } />  
      </div>
      <div className="meal-info">
        <h3>{meal.name}</h3>
        <p className="meal-description">{meal.description}</p>
        
        <div className="meal-meta">
          <div className="meal-price">₹{meal.price}</div>
          
          <button 
            className="nutrition-button"
            onClick={() => setShowNutrition(!showNutrition)}
          >
            {showNutrition ? 'Hide Nutrition' : 'Show Nutrition'}
          </button>
        </div>

        {showNutrition && (
          <div className="nutrition-info">
            <h4>Nutritional Information</h4>
            <ul>
              <li>Calories: {meal.nutritionalInfo.calories}</li>
              <li>Protein: {meal.nutritionalInfo.protein}</li>
              <li>Carbs: {meal.nutritionalInfo.carbs}</li>
              <li>Fat: {meal.nutritionalInfo.fat}</li>
            </ul>
            
            {meal.allergens.length > 0 && (
              <div className="allergens">
                <h4>Allergens</h4>
                <p>{meal.allergens.join(', ')}</p>
              </div>
            )}
          </div>
        )}

        <button 
          className="add-to-cart-button"
          onClick={() => onAddToCart(meal)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MealCard;