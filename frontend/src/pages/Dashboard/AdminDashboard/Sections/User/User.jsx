import React, { useState, useEffect } from 'react';
import * as UserApi from '../../../../../API/UserApi';
import styles from '../../AdminDashboardPage.module.css';

const UsersManagement = ({ 
  darkMode, 
  socket, 
  addNotification,
  showUserForm,
  setShowUserForm,
  editingUser,
  setEditingUser
}) => {
  const [users, setUsers] = useState([]);
  const [userStats, setUserStats] = useState(null);
  const [error, setError] = useState('');
  const [userFormData, setUserFormData] = useState({
    name: '',
    email: '',
    phone: '',
    A: '',
    B: '',
    C: '',
    role: ''
  });

  useEffect(() => {
    fetchUserData();
    
    // Set up socket listeners if socket is available
    if (socket) {
      // Listen for real-time user updates
      socket.on('user-updated', (updatedUser) => {
        setUsers(prev => prev.map(user => 
          user._id === updatedUser._id ? updatedUser : user
        ));
        addNotification(`User "${updatedUser.name}" was updated by another admin`);
      });
      
      socket.on('user-deleted', (deletedUserId) => {
        setUsers(prev => prev.filter(user => user._id !== deletedUserId));
        addNotification('A user was deleted by another admin');
      });
      
      // Clean up listeners on unmount
      return () => {
        socket.off('user-updated');
        socket.off('user-deleted');
      };
    }
  }, [socket, addNotification]);

  const fetchUserData = async () => {
    try {
      setError('');
      const [usersResponse, userStatsResponse] = await Promise.all([
        UserApi.getUsers(),
        UserApi.getUserStats()
      ]);
      setUsers(usersResponse.data || []);
      setUserStats(userStatsResponse.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to fetch user data: ' + (error.message || 'Please check your connection'));
    }
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    try {
      setError('');
      let response;
      
      if (editingUser) {
        response = await UserApi.updateUser(editingUser.email, userFormData);
        alert('User updated successfully!');
        
        if (socket) {
          socket.emit('user-update', response.data);
        }
      }
      
      setShowUserForm(false);
      setEditingUser(null);
      setUserFormData({
        name: '',
        email: '',
        phone: '',
        A: '',
        B: '',
        C: '',
        role: ''
      });
      fetchUserData();
    } catch (error) {
      console.error('Error saving user:', error);
      setError('Failed to save user: ' + (error.message || 'Please check your input'));
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUserFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      A: user.A || '',
      B: user.B || '',
      C: user.C || '',
      role: user.role || ''
    });
    setShowUserForm(true);
  };

  const handleDeleteUser = async (email) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        setError('');
        const userToDelete = users.find(u => u.email === email);
        await UserApi.deleteUser(email);
        alert('User deleted successfully!');
        
        if (socket && userToDelete) {
          socket.emit('user-delete', userToDelete._id);
        }
        
        fetchUserData();
      } catch (error) {
        console.error('Error deleting user:', error);
        setError('Failed to delete user: ' + (error.message || 'Invalid user email'));
      }
    }
  };

  return (
    <div className={styles.usersManagement}>
      <div className={styles.sectionHeader}>
        <h2>Users Management</h2>
        <div className={styles.userStats}>
          {userStats && (
            <>
              <span>Total Users: <strong>{userStats.totalUsers}</strong></span>
              <span>With Details: <strong>{userStats.usersWithDetails}</strong></span>
              <span>Without Details: <strong>{userStats.usersWithoutDetails}</strong></span>
            </>
          )}
        </div>
      </div>

      {showUserForm && (
        <div className={styles.userFormModal}>
          <div className={styles.modalContent}>
            <h3>{editingUser ? 'Edit User' : 'Add New User'}</h3>
            <form onSubmit={handleSubmitUser}>
              <div className={styles.formGroup}>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={userFormData.name}
                  onChange={handleUserInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={userFormData.email}
                  onChange={handleUserInputChange}
                  required
                  disabled={!!editingUser}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={userFormData.phone}
                  onChange={handleUserInputChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Data A</label>
                <input
                  type="text"
                  name="A"
                  value={userFormData.A}
                  onChange={handleUserInputChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Data B</label>
                <input
                  type="text"
                  name="B"
                  value={userFormData.B}
                  onChange={handleUserInputChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Data C</label>
                <input
                  type="text"
                  name="C"
                  value={userFormData.C}
                  onChange={handleUserInputChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Role</label>
                <input
                  type="text"
                  name="role"
                  value={userFormData.role}
                  onChange={handleUserInputChange}
                />
              </div>
              <div className={styles.formActions}>
                <button type="submit">
                  {editingUser ? 'Update' : 'Create'} User
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowUserForm(false);
                    setEditingUser(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className={styles.errorBanner}>
          <span>{error}</span>
          <button onClick={() => setError('')} className={styles.closeError}>×</button>
        </div>
      )}

      <div className={styles.usersList}>
        {users.length > 0 ? (
          <table className={styles.usersTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Data A</th>
                <th>Data B</th>
                <th>Data C</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.name || 'N/A'}</td>
                  <td>{user.email}</td>
                  <td>{user.phone || 'N/A'}</td>
                  <td>{user.A || 'N/A'}</td>
                  <td>{user.B || 'N/A'}</td>
                  <td>{user.C || 'N/A'}</td>
                  <td>{user.role || 'N/A'}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className={styles.actions}>
                    <button 
                      onClick={() => handleEditUser(user)}
                      className={styles.editBtn}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(user.email)}
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
          <div className={styles.noData}>No users found</div>
        )}
      </div>
    </div>
  );
};

export default UsersManagement;