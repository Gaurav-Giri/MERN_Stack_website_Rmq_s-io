

import React, { useState, useEffect } from 'react';
import * as MealApi from '../../../../../API/MealApi';
import styles from '../../AdminDashboardPage.module.css';

const MealsManagement = ({ darkMode, socket, addNotification }) => {
  const [meals, setMeals] = useState([]);
  const [mealStats, setMealStats] = useState(null);
  const [editingMeal, setEditingMeal] = useState(null);
  const [showMealForm, setShowMealForm] = useState(false);
  const [error, setError] = useState('');
  const [mealFormData, setMealFormData] = useState({
    name: '',
    image: '',
    description: '',
    nutrition: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    },
    allergens: [],
    price: 0,
    category: 'non-vegetarian',
    preparationTime: 30,
    isAvailable: true
  });

  useEffect(() => {
    fetchMealData();

    // Set up socket listeners for meals
    if (socket) {
      socket.on('meal-updated', (updatedMeal) => {
        setMeals(prev => prev.map(meal => 
          meal._id === updatedMeal._id ? updatedMeal : meal
        ));
        addNotification(`Meal "${updatedMeal.name}" was updated by another admin`);
      });
      
      socket.on('meal-created', (newMeal) => {
        setMeals(prev => [...prev, newMeal]);
        addNotification(`New meal "${newMeal.name}" was created by another admin`);
      });
      
      socket.on('meal-deleted', (deletedMealId) => {
        setMeals(prev => prev.filter(meal => meal._id !== deletedMealId));
        addNotification('A meal was deleted by another admin');
      });
      
      socket.on('meal-availability-toggled', (updatedMeal) => {
        setMeals(prev => prev.map(meal => 
          meal._id === updatedMeal._id ? updatedMeal : meal
        ));
        addNotification(`Meal "${updatedMeal.name}" availability was toggled by another admin`);
      });

      return () => {
        socket.off('meal-updated');
        socket.off('meal-created');
        socket.off('meal-deleted');
        socket.off('meal-availability-toggled');
      };
    }
  }, [socket, addNotification]);

  const fetchMealData = async () => {
    try {
      setError('');
      const [mealsResponse, mealStatsResponse] = await Promise.all([
        MealApi.getMeals(),
        MealApi.getMealStats()
      ]);
      setMeals(mealsResponse.data || []);
      setMealStats(mealStatsResponse.data);
    } catch (error) {
      console.error('Error fetching meal data:', error);
      setError('Failed to fetch meal data: ' + (error.message || 'Please check your connection'));
    }
  };

  const handleMealInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('nutrition.')) {
      const nutritionField = name.split('.')[1];
      setMealFormData(prev => ({
        ...prev,
        nutrition: {
          ...prev.nutrition,
          [nutritionField]: parseFloat(value) || 0
        }
      }));
    } else {
      setMealFormData(prev => ({
        ...prev,
        [name]: name === 'price' || name === 'preparationTime' ? parseFloat(value) || 0 : value
      }));
    }
  };

  const handleAllergenChange = (e) => {
    const { value, checked } = e.target;
    setMealFormData(prev => ({
      ...prev,
      allergens: checked 
        ? [...prev.allergens, value]
        : prev.allergens.filter(allergen => allergen !== value)
    }));
  };

  const handleSubmitMeal = async (e) => {
    e.preventDefault();
    try {
      setError('');
      let response;
      
      if (editingMeal) {
        response = await MealApi.updateMeal(editingMeal._id, mealFormData);
        alert('Meal updated successfully!');
        if (socket) socket.emit('meal-update', response.data);
      } else {
        response = await MealApi.createMeal(mealFormData);
        alert('Meal created successfully!');
        if (socket) socket.emit('meal-create', response.data);
      }
      
      setShowMealForm(false);
      setEditingMeal(null);
      setMealFormData({
        name: '',
        image: '',
        description: '',
        nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 },
        allergens: [],
        price: 0,
        category: 'non-vegetarian',
        preparationTime: 30,
        isAvailable: true
      });
      fetchMealData();
    } catch (error) {
      console.error('Error saving meal:', error);
      setError('Failed to save meal: ' + (error.message || 'Please check your input'));
    }
  };

  const handleEditMeal = (meal) => {
    setEditingMeal(meal);
    setMealFormData({
      name: meal.name,
      image: meal.image,
      description: meal.description,
      nutrition: meal.nutrition,
      allergens: meal.allergens || [],
      price: meal.price,
      category: meal.category,
      preparationTime: meal.preparationTime,
      isAvailable: meal.isAvailable
    });
    setShowMealForm(true);
  };

  const handleDeleteMeal = async (id) => {
    if (window.confirm('Are you sure you want to delete this meal?')) {
      try {
        setError('');
        await MealApi.deleteMeal(id);
        alert('Meal deleted successfully!');
        if (socket) socket.emit('meal-delete', id);
        fetchMealData();
      } catch (error) {
        console.error('Error deleting meal:', error);
        setError('Failed to delete meal: ' + (error.message || 'Invalid meal ID'));
      }
    }
  };

  const handleToggleMealAvailability = async (meal) => {
    try {
      setError('');
      const response = await MealApi.toggleMealAvailability(meal._id, !meal.isAvailable);
      alert(`Meal ${meal.isAvailable ? 'disabled' : 'enabled'} successfully!`);
      if (socket) socket.emit('meal-toggle-availability', meal._id);
      fetchMealData();
    } catch (error) {
      console.error('Error toggling meal availability:', error);
      setError('Failed to toggle meal availability: ' + error.message);
    }
  };

  return (
    <div className={styles.mealsManagement}>
      <div className={styles.sectionHeader}>
        <h2>Meals Management</h2>
        <button 
          className={styles.addMealBtn}
          onClick={() => setShowMealForm(true)}
        >
          Add New Meal
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className={styles.errorBanner}>
          <span>{error}</span>
          <button onClick={() => setError('')} className={styles.closeError}>×</button>
        </div>
      )}

      {/* Meal Form Modal */}
      {showMealForm && (
        <div className={styles.mealFormModal}>
          <div className={styles.modalContent}>
            <h3>{editingMeal ? 'Edit Meal' : 'Add New Meal'}</h3>
            <form onSubmit={handleSubmitMeal}>
              <div className={styles.formGroup}>
                <label>Meal Name</label>
                <input
                  type="text"
                  name="name"
                  value={mealFormData.name}
                  onChange={handleMealInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={mealFormData.image}
                  onChange={handleMealInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  name="description"
                  value={mealFormData.description}
                  onChange={handleMealInputChange}
                  required
                  rows="3"
                />
              </div>
              
              <div className={styles.nutritionSection}>
                <h4>Nutrition Information</h4>
                <div className={styles.nutritionGrid}>
                  <div className={styles.formGroup}>
                    <label>Calories</label>
                    <input
                      type="number"
                      name="nutrition.calories"
                      value={mealFormData.nutrition.calories}
                      onChange={handleMealInputChange}
                      min="0"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Protein (g)</label>
                    <input
                      type="number"
                      name="nutrition.protein"
                      value={mealFormData.nutrition.protein}
                      onChange={handleMealInputChange}
                      min="0"
                      step="0.1"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Carbs (g)</label>
                    <input
                      type="number"
                      name="nutrition.carbs"
                      value={mealFormData.nutrition.carbs}
                      onChange={handleMealInputChange}
                      min="0"
                      step="0.1"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Fat (g)</label>
                    <input
                      type="number"
                      name="nutrition.fat"
                      value={mealFormData.nutrition.fat}
                      onChange={handleMealInputChange}
                      min="0"
                      step="0.1"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={mealFormData.price}
                  onChange={handleMealInputChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Category</label>
                <select
                  name="category"
                  value={mealFormData.category}
                  onChange={handleMealInputChange}
                  required
                >
                  <option value="vegetarian">Vegetarian</option>
                  <option value="non-vegetarian">Non-Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="gluten-free">Gluten-Free</option>
                  <option value="keto">Keto</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Preparation Time (minutes)</label>
                <input
                  type="number"
                  name="preparationTime"
                  value={mealFormData.preparationTime}
                  onChange={handleMealInputChange}
                  min="0"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Allergens</label>
                <div className={styles.allergensCheckbox}>
                  {['gluten', 'dairy', 'nuts', 'peanuts', 'soy', 'eggs', 'fish', 'shellfish'].map(allergen => (
                    <label key={allergen} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        value={allergen}
                        checked={mealFormData.allergens.includes(allergen)}
                        onChange={handleAllergenChange}
                      />
                      {allergen}
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="isAvailable"
                    checked={mealFormData.isAvailable}
                    onChange={(e) => setMealFormData(prev => ({
                      ...prev,
                      isAvailable: e.target.checked
                    }))}
                  />
                  Available for order
                </label>
              </div>

              <div className={styles.formActions}>
                <button type="submit">
                  {editingMeal ? 'Update' : 'Create'} Meal
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowMealForm(false);
                    setEditingMeal(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Meals List */}
      <div className={styles.mealsList}>
        {meals.length > 0 ? (
          <table className={styles.mealsTable}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Calories</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {meals.map(meal => (
                <tr key={meal._id}>
                  <td>
                    <img 
                      src={meal.image} 
                      alt={meal.name}
                      className={styles.mealImage}
                    />
                  </td>
                  <td>
                    <div className={styles.mealName}>{meal.name}</div>
                    <div className={styles.mealDescription}>{meal.description}</div>
                  </td>
                  <td>{meal.category}</td>
                  <td>₹{meal.price}</td>
                  <td>{meal.nutrition.calories}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${
                      meal.isAvailable ? styles.available : styles.unavailable
                    }`}>
                      {meal.isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td className={styles.actions}>
                    <button 
                      onClick={() => handleEditMeal(meal)}
                      className={styles.editBtn}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleToggleMealAvailability(meal)}
                      className={meal.isAvailable ? styles.disableBtn : styles.enableBtn}
                    >
                      {meal.isAvailable ? 'Disable' : 'Enable'}
                    </button>
                    <button 
                      onClick={() => handleDeleteMeal(meal._id)}
                      className={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.noData}>No meals found</div>
        )}
      </div>
    </div>
  );
};

export default MealsManagement;