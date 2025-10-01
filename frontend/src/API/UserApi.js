// UserApi.js
import API from "./api";

// Get all users
export const getUsers = async () => {
  try {
    const res = await API.get("/users");
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch users");
  }
};

// Get user by email
export const getUserByEmail = async (email) => {
  try {
    const res = await API.get(`/users?email=${encodeURIComponent(email)}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user");
  }
};

// Update user details
export const updateUser = async (email, userData) => {
  try {
    const res = await API.put(`/users/${email}`, userData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update user");
  }
};

// Delete user
export const deleteUser = async (email) => {
  try {
    const res = await API.delete(`/users/${email}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete user");
  }
};

// Get user statistics
export const getUserStats = async () => {
  try {
    const res = await API.get("/users/stats/overview");
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user statistics");
  }
};

export default {
  getUsers,
  getUserByEmail,
  updateUser,
  deleteUser,
  getUserStats
};