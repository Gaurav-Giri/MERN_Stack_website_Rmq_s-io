import API from "./api";

// Get all meals
export const getMeals = async () => {
  try {
    const res = await API.get("/meals");
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch meals");
  }
};

// Search meals by query
export const searchMeals = async (query) => {
  try {
    const res = await API.get(`/meals/search?q=${encodeURIComponent(query)}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to search meals");
  }
};

// Get meal by ID
export const getMealById = async (id) => {
  try {
    const res = await API.get(`/meals/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch meal");
  }
};

// Create new meal (admin only)
export const createMeal = async (mealData) => {
  try {
    const res = await API.post("/meals", mealData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create meal");
  }
};

// Update meal (admin only)
export const updateMeal = async (id, mealData) => {
  try {
    const res = await API.put(`/meals/${id}`, mealData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update meal");
  }
};

// Delete meal (admin only) - soft delete
export const deleteMeal = async (id) => {
  try {
    const res = await API.delete(`/meals/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete meal");
  }
};

// Get meals with pagination
export const getMealsPaginated = async (page = 1, limit = 12) => {
  try {
    const res = await API.get(`/meals?page=${page}&limit=${limit}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch meals");
  }
};

// Get meals by filter (category, price range, calories, allergens)
export const getMealsByFilter = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    // Add filters to query params
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        if (Array.isArray(filters[key])) {
          // Handle array parameters (like multiple allergens)
          filters[key].forEach(value => {
            queryParams.append(key, value);
          });
        } else {
          queryParams.append(key, filters[key]);
        }
      }
    });
    
    const res = await API.get(`/meals/filter?${queryParams.toString()}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to filter meals");
  }
};

// Get meal statistics
export const getMealStats = async () => {
  try {
    const res = await API.get("/meals/stats/overview");
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch meal statistics");
  }
};

// Get meals by category
export const getMealsByCategory = async (category) => {
  try {
    const res = await API.get(`/meals/filter?category=${encodeURIComponent(category)}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch meals by category");
  }
};

// Get meals by price range
export const getMealsByPriceRange = async (minPrice, maxPrice) => {
  try {
    const res = await API.get(`/meals/filter?minPrice=${minPrice}&maxPrice=${maxPrice}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch meals by price range");
  }
};

// Get meals by calorie range
export const getMealsByCalorieRange = async (minCalories, maxCalories) => {
  try {
    const res = await API.get(`/meals/filter?minCalories=${minCalories}&maxCalories=${maxCalories}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch meals by calorie range");
  }
};

// Get meals excluding specific allergens
export const getMealsExcludingAllergens = async (allergens) => {
  try {
    const allergenParams = Array.isArray(allergens) 
      ? allergens.map(allergen => `excludeAllergens=${encodeURIComponent(allergen)}`).join('&')
      : `excludeAllergens=${encodeURIComponent(allergens)}`;
    
    const res = await API.get(`/meals/filter?${allergenParams}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch meals excluding allergens");
  }
};

// Toggle meal availability (admin only)
export const toggleMealAvailability = async (id, isAvailable) => {
  try {
    const res = await API.put(`/meals/${id}`, { isAvailable });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to toggle meal availability");
  }
};

// Bulk update meals (admin only)
export const bulkUpdateMeals = async (mealIds, updates) => {
  try {
    // Note: This would require a custom endpoint or using individual updates
    // For now, we'll handle this by making multiple requests
    const promises = mealIds.map(mealId => updateMeal(mealId, updates));
    const results = await Promise.allSettled(promises);
    
    return {
      success: true,
      results: results.map((result, index) => ({
        mealId: mealIds[index],
        status: result.status,
        data: result.status === 'fulfilled' ? result.value : result.reason
      }))
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to bulk update meals");
  }
};

// Get featured meals (custom implementation)
export const getFeaturedMeals = async (limit = 6) => {
  try {
    // This could be implemented with a featured field in the model
    // For now, we'll get the most recent meals
    const res = await API.get(`/meals?limit=${limit}&sort=-createdAt`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch featured meals");
  }
};

// Get popular meals (based on orders - would require order integration)
export const getPopularMeals = async (limit = 6) => {
  try {
    // This would require integration with order statistics
    // For now, return random meals as placeholder
    const res = await API.get(`/meals?limit=${limit}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch popular meals");
  }
};

export default {
  getMeals,
  searchMeals,
  getMealById,
  createMeal,
  updateMeal,
  deleteMeal,
  getMealsPaginated,
  getMealsByFilter,
  getMealStats,
  getMealsByCategory,
  getMealsByPriceRange,
  getMealsByCalorieRange,
  getMealsExcludingAllergens,
  toggleMealAvailability,
  bulkUpdateMeals,
  getFeaturedMeals,
  getPopularMeals
};