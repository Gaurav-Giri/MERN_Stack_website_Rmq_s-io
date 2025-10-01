import API from './api';

class NotificationApi {
  // Get all notifications
  async getNotifications(page = 1, limit = 20) {
    try {
      const response = await API.get(`/notifications?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get unread count
  async getUnreadCount() {
    try {
      const response = await API.get('/notifications/unread-count');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Mark notification as read
  async markAsRead(notificationId) {
    try {
      const response = await API.put(`/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Mark all as read
  async markAllAsRead() {
    try {
      const response = await API.put('/notifications/mark-all-read');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete notification
  async deleteNotification(notificationId) {
    try {
      const response = await API.delete(`/notifications/${notificationId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Error handler
  handleError(error) {
    if (error.response) {
      return new Error(error.response.data.error || 'Server error');
    } else if (error.request) {
      return new Error('Network error - please check your connection');
    } else {
      return new Error('An unexpected error occurred');
    }
  }
}

export default new NotificationApi();