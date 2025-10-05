// Api/NotificationApi.js
import API from "../API/api.js";

// Get notifications for a user
export const getUserNotifications = async (userId, page = 1, limit = 20) => {
  try {
    const res = await API.get(`/notifications/user/${userId}?page=${page}&limit=${limit}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch notifications");
  }
};

// Get notification by ID
export const getNotificationById = async (id) => {
  try {
    const res = await API.get(`/notifications/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch notification");
  }
};

// Create new notification
export const createNotification = async (notificationData) => {
  try {
    const res = await API.post("/notifications", notificationData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create notification");
  }
};

// Send bulk notifications to multiple users
export const sendBulkNotifications = async (bulkData) => {
  try {
    const res = await API.post("/notifications/bulk", bulkData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to send bulk notifications");
  }
};

// Update notification
export const updateNotification = async (id, notificationData) => {
  try {
    const res = await API.put(`/notifications/${id}`, notificationData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update notification");
  }
};

// Mark notification as read
export const markAsRead = async (id) => {
  try {
    const res = await API.patch(`/notifications/${id}/read`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to mark notification as read");
  }
};

// Mark all user notifications as read
export const markAllAsRead = async (userId) => {
  try {
    const res = await API.patch(`/notifications/user/${userId}/read-all`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to mark all notifications as read");
  }
};

// Delete notification
export const deleteNotification = async (id) => {
  try {
    const res = await API.delete(`/notifications/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete notification");
  }
};

// Delete all read notifications for a user
export const deleteReadNotifications = async (userId) => {
  try {
    const res = await API.delete(`/notifications/user/${userId}/read`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete read notifications");
  }
};

// Get notification statistics (admin)
export const getNotificationStats = async () => {
  try {
    const res = await API.get("/notifications/admin/stats/overview");
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch notification statistics");
  }
};

// Search notifications (admin)
export const searchNotifications = async (query) => {
  try {
    const res = await API.get(`/notifications/admin/search?q=${encodeURIComponent(query)}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to search notifications");
  }
};

// Get notifications with filters
export const getNotificationsByFilter = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    // Add filters to query params
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        if (Array.isArray(filters[key])) {
          // Handle array parameters
          filters[key].forEach(value => {
            queryParams.append(key, value);
          });
        } else {
          queryParams.append(key, filters[key]);
        }
      }
    });
    
    const res = await API.get(`/notifications/admin/filter?${queryParams.toString()}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to filter notifications");
  }
};

// Get notifications by type
export const getNotificationsByType = async (type) => {
  try {
    const res = await API.get(`/notifications/admin/filter?type=${encodeURIComponent(type)}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch notifications by type");
  }
};

// Get notifications by priority
export const getNotificationsByPriority = async (priority) => {
  try {
    const res = await API.get(`/notifications/admin/filter?priority=${encodeURIComponent(priority)}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch notifications by priority");
  }
};

// Get unread notifications count for user
export const getUnreadCount = async (userId) => {
  try {
    const res = await API.get(`/notifications/user/${userId}?limit=1`);
    return res.data.pagination?.unreadCount || 0;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch unread count");
  }
};

// Get notifications by date range
export const getNotificationsByDateRange = async (startDate, endDate) => {
  try {
    const res = await API.get(`/notifications/admin/filter?startDate=${startDate}&endDate=${endDate}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch notifications by date range");
  }
};

// Bulk update notifications
export const bulkUpdateNotifications = async (notificationIds, updates) => {
  try {
    // Handle bulk updates by making multiple requests
    const promises = notificationIds.map(notificationId => 
      updateNotification(notificationId, updates)
    );
    const results = await Promise.allSettled(promises);
    
    return {
      success: true,
      results: results.map((result, index) => ({
        notificationId: notificationIds[index],
        status: result.status,
        data: result.status === 'fulfilled' ? result.value : result.reason
      }))
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to bulk update notifications");
  }
};

// Get recent notifications for user
export const getRecentNotifications = async (userId, limit = 10) => {
  try {
    const res = await API.get(`/notifications/user/${userId}?limit=${limit}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch recent notifications");
  }
};

// Get urgent notifications (high priority + unread)
export const getUrgentNotifications = async (userId) => {
  try {
    const res = await API.get(`/notifications/user/${userId}?priority=high&read=false`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch urgent notifications");
  }
};

export default {
  getUserNotifications,
  getNotificationById,
  createNotification,
  sendBulkNotifications,
  updateNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteReadNotifications,
  getNotificationStats,
  searchNotifications,
  getNotificationsByFilter,
  getNotificationsByType,
  getNotificationsByPriority,
  getUnreadCount,
  getNotificationsByDateRange,
  bulkUpdateNotifications,
  getRecentNotifications,
  getUrgentNotifications
};