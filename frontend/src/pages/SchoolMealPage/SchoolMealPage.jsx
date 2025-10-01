import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SchoolHeader from '../../elements/SchoolHeader/SchoolHeader.jsx';
import DatePicker from '../../elements/DatePicker/DatePicker.jsx';
import MealGrid from '../../elements/meals/MealGrid/MealGrid.jsx';
import CartSummary from '../../elements/cart/CartSummary/CartSummary.jsx';
import './SchoolMealPage.css';


const SchoolMealsPage = () => {
  const { schoolId } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meals, setMeals] = useState([]);
  const [school, setSchool] = useState(null);
  const [cart, setCart] = useState([]);
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

  useEffect(() => {
    // Mock data - in real app, this would be an API call
    const fetchSchoolData = async () => {
      const mockSchool = {
        id: schoolId,
        name: 'Greenwood High',
        address: '123 School Street, Bangalore',
        contact: '+91 9876543210',
        deliveryTimings: '12:00 PM - 1:00 PM',
        rating: 4.5
      };
      setSchool(mockSchool);

      const mockMeals = [
        {
          id: '1',
          name: 'Vegetable Meal',
          description: 'Healthy mix of seasonal vegetables with rice and chapati',
          price: 120,
          image: '../../../public/images/VegetableMeal.jpg',
          nutritionalInfo: {
            calories: 450,
            protein: '12g',
            carbs: '60g',
            fat: '10g'
          },
          allergens: ['Gluten']
        },
        {
          id: '2',
          name: 'Chicken Biryani',
          description: 'Fragrant rice with tender chicken pieces and spices',
          price: 150,
          image: '../../../public/images/ChickenBriyani.jpg',
          nutritionalInfo: {
            calories: 520,
            protein: '25g',
            carbs: '65g',
            fat: '15g'
          },
          allergens: []
        },
        {
          id: '3',
          name: 'Paneer Wrap',
          description: 'Whole wheat wrap with spiced paneer and fresh vegetables',
          price: 100,
          image: '../../../public/images/PaneerWrap.jpg',
          nutritionalInfo: {
            calories: 380,
            protein: '18g',
            carbs: '45g',
            fat: '12g'
          },
          allergens: ['Dairy']
        }
      ];
      setMeals(mockMeals);
    };

    fetchSchoolData();
  }, [schoolId]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // In real app, this would fetch meals for the selected date
  };

  const handleAddToCart = (meal) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === meal.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...meal, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (mealId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== mealId));
  };

  const handleQuantityChange = (mealId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(mealId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === mealId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (!school) return <div className="loading">Loading school information...</div>;

  return (
    <div className={`school-meals-page ${isDarkMode ? 'dark' : ''}`}>
      <SchoolHeader school={school} />
      
      <div className="page-container">
        <div className="content-wrapper">
          <div className="meals-content">
            <div className="date-section">
              <h2>Select Date for Delivery</h2>
              <DatePicker 
                selectedDate={selectedDate}
                onChange={handleDateChange}
                minDate={new Date()}
              />
            </div>

            <div className="meals-section">
              <h2>Available Meals for {selectedDate.toLocaleDateString()}</h2>
              {meals.length > 0 ? (
                <MealGrid 
                  meals={meals} 
                  onAddToCart={handleAddToCart}
                  isDarkMode={isDarkMode}
                />
              ) : (
                <p className="no-meals">No meals available for selected date</p>
              )}
            </div>
          </div>

          <div className="cart-sidebar">
            <CartSummary 
              cart={cart}
              onRemove={handleRemoveFromCart}
              onQuantityChange={handleQuantityChange}
              school={school}
              selectedDate={selectedDate}
              isDarkMode={isDarkMode}
              total={getCartTotal()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolMealsPage;