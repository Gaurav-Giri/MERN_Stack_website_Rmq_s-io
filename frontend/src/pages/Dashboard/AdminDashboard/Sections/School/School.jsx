// // School.jsx
// import React, { useState } from 'react';
// import * as SchoolApi from '../../../../../API/School_api';
// import styles from '../../AdminDashboardPage.module.css';

// const School = ({ 
//   darkMode, 
//   socket, 
//   addNotification,
//   schools,
//   setSchools,
//   fetchData 
// }) => {
//   const [editingSchool, setEditingSchool] = useState(null);
//   const [showSchoolForm, setShowSchoolForm] = useState(false);
//   const [error, setError] = useState('');
//   const [formData, setFormData] = useState({
//     name: '',
//     location: '',
//     type: 'Public',
//     mealOptions: 0,
//     image: ''
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmitSchool = async (e) => {
//     e.preventDefault();
//     try {
//       setError('');
//       let response;
      
//       if (editingSchool) {
//         response = await SchoolApi.updateSchool(editingSchool._id, formData);
//         alert('School updated successfully!');
        
//         if (socket) {
//           socket.emit('school-update', response.data);
//         }
//       } else {
//         response = await SchoolApi.createSchool(formData);
//         alert('School created successfully!');
        
//         if (socket) {
//           socket.emit('school-create', response.data);
//         }
//       }
      
//       setShowSchoolForm(false);
//       setEditingSchool(null);
//       setFormData({
//         name: '',
//         location: '',
//         type: 'Public',
//         mealOptions: 0,
//         image: ''
//       });
//       fetchData();
//     } catch (error) {
//       console.error('Error saving school:', error);
//       setError('Failed to save school: ' + (error.message || 'Please check your input'));
//     }
//   };

//   const handleEditSchool = (school) => {
//     setEditingSchool(school);
//     setFormData({
//       name: school.name,
//       location: school.location,
//       type: school.type,
//       mealOptions: school.mealOptions,
//       image: school.image
//     });
//     setShowSchoolForm(true);
//   };

//   const handleDeleteSchool = async (id) => {
//     if (window.confirm('Are you sure you want to delete this school?')) {
//       try {
//         setError('');
//         const schoolToDelete = schools.find(s => s._id === id);
//         await SchoolApi.deleteSchool(id);
//         alert('School deleted successfully!');
        
//         if (socket) {
//           socket.emit('school-delete', id);
//         }
        
//         fetchData();
//       } catch (error) {
//         console.error('Error deleting school:', error);
//         setError('Failed to delete school: ' + (error.message || 'Invalid school ID'));
//       }
//     }
//   };

//   return (
//     <div className={styles.schoolsManagement}>
//       <div className={styles.sectionHeader}>
//         <h2>Schools Management</h2>
//         <button 
//           className={styles.addSchoolBtn}
//           onClick={() => setShowSchoolForm(true)}
//         >
//           Add New School
//         </button>
//       </div>

//       {error && (
//         <div className={styles.errorBanner}>
//           <span>{error}</span>
//           <button onClick={() => setError('')} className={styles.closeError}>×</button>
//         </div>
//       )}

//       {showSchoolForm && (
//         <div className={styles.schoolFormModal}>
//           <div className={styles.modalContent}>
//             <h3>{editingSchool ? 'Edit School' : 'Add New School'}</h3>
//             <form onSubmit={handleSubmitSchool}>
//               <div className={styles.formGroup}>
//                 <label>School Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className={styles.formGroup}>
//                 <label>Location</label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className={styles.formGroup}>
//                 <label>Type</label>
//                 <select
//                   name="type"
//                   value={formData.type}
//                   onChange={handleInputChange}
//                   required
//                 >
//                   <option value="Public">Public</option>
//                   <option value="Private">Private</option>
//                   <option value="International">International</option>
//                   <option value="Government">Government</option>
//                 </select>
//               </div>
//               <div className={styles.formGroup}>
//                 <label>Meal Options</label>
//                 <input
//                   type="number"
//                   name="mealOptions"
//                   value={formData.mealOptions}
//                   onChange={handleInputChange}
//                   min="0"
//                   required
//                 />
//               </div>
//               <div className={styles.formGroup}>
//                 <label>Image URL</label>
//                 <input
//                   type="url"
//                   name="image"
//                   value={formData.image}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className={styles.formActions}>
//                 <button type="submit">
//                   {editingSchool ? 'Update' : 'Create'} School
//                 </button>
//                 <button 
//                   type="button" 
//                   onClick={() => {
//                     setShowSchoolForm(false);
//                     setEditingSchool(null);
//                   }}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className={styles.schoolsList}>
//         {schools.length > 0 ? (
//           <table className={styles.schoolsTable}>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Location</th>
//                 <th>Type</th>
//                 <th>Meal Options</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {schools.map(school => (
//                 <tr key={school._id}>
//                   <td>{school.name}</td>
//                   <td>{school.location}</td>
//                   <td>{school.type}</td>
//                   <td>{school.mealOptions}</td>
//                   <td className={styles.actions}>
//                     <button 
//                       onClick={() => handleEditSchool(school)}
//                       className={styles.editBtn}
//                     >
//                       Edit
//                     </button>
//                     <button 
//                       onClick={() => handleDeleteSchool(school._id)}
//                       className={styles.deleteBtn}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <div className={styles.noData}>No schools found</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default School;















// -------------------completely separated-------------------------



import React, { useState, useEffect } from 'react';
import * as SchoolApi from '../../../../../API/School_api';
import styles from '../../AdminDashboardPage.module.css';

const School = ({ 
  darkMode, 
  socket, 
  onNotification 
}) => {
  const [schools, setSchools] = useState([]);
  const [editingSchool, setEditingSchool] = useState(null);
  const [showSchoolForm, setShowSchoolForm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    type: 'Public',
    mealOptions: 0,
    image: ''
  });

  // Fetch schools data independently
  useEffect(() => {
    fetchSchools();
    
    // Set up socket listeners for real-time updates
    if (socket) {
      socket.on('school-updated', (updatedSchool) => {
        setSchools(prev => prev.map(school => 
          school._id === updatedSchool._id ? updatedSchool : school
        ));
      });
      
      socket.on('school-created', (newSchool) => {
        setSchools(prev => [...prev, newSchool]);
      });
      
      socket.on('school-deleted', (deletedSchoolId) => {
        setSchools(prev => prev.filter(school => school._id !== deletedSchoolId));
      });
      
      return () => {
        socket.off('school-updated');
        socket.off('school-created');
        socket.off('school-deleted');
      };
    }
  }, [socket]);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      setError('');
      const schoolsResponse = await SchoolApi.getSchools();
      setSchools(schoolsResponse.data || []);
    } catch (error) {
      console.error('Error fetching schools:', error);
      setError('Failed to fetch schools: ' + (error.message || 'Please check your connection'));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitSchool = async (e) => {
    e.preventDefault();
    try {
      setError('');
      let response;
      
      if (editingSchool) {
        response = await SchoolApi.updateSchool(editingSchool._id, formData);
        if (onNotification) {
          onNotification(`School "${formData.name}" updated successfully!`);
        }
        
        if (socket) {
          socket.emit('school-update', response.data);
        }
      } else {
        response = await SchoolApi.createSchool(formData);
        if (onNotification) {
          onNotification(`School "${formData.name}" created successfully!`);
        }
        
        if (socket) {
          socket.emit('school-create', response.data);
        }
      }if (onNotification) {
        if (editingSchool) {
            onNotification(`School "${formData.name}" was updated${socket ? ' and other admins were notified' : ''}`);
        } else {
            onNotification(`School "${formData.name}" was created${socket ? ' and other admins were notified' : ''}`);
        }
    };
      
      setShowSchoolForm(false);
      setEditingSchool(null);
      setFormData({
        name: '',
        location: '',
        type: 'Public',
        mealOptions: 0,
        image: ''
      });
      fetchSchools();
    } catch (error) {
      console.error('Error saving school:', error);
      setError('Failed to save school: ' + (error.message || 'Please check your input'));
    }
  };

  const handleEditSchool = (school) => {
    setEditingSchool(school);
    setFormData({
      name: school.name,
      location: school.location,
      type: school.type,
      mealOptions: school.mealOptions,
      image: school.image || ''
    });
    setShowSchoolForm(true);
  };

  const handleDeleteSchool = async (id) => {
    if (window.confirm('Are you sure you want to delete this school?')) {
      try {
        setError('');
        const schoolToDelete = schools.find(s => s._id === id);
        await SchoolApi.deleteSchool(id);
        
        if (onNotification) {
          onNotification(`School "${schoolToDelete?.name}" deleted successfully!`);
        }
        
        if (socket) {
          socket.emit('school-delete', id);
        }
        
        fetchSchools();
      } catch (error) {
        console.error('Error deleting school:', error);
        setError('Failed to delete school: ' + (error.message || 'Invalid school ID'));
      }
    }
  };

  const resetForm = () => {
    setShowSchoolForm(false);
    setEditingSchool(null);
    setFormData({
      name: '',
      location: '',
      type: 'Public',
      mealOptions: 0,
      image: ''
    });
  };

  if (loading) {
    return <div className={styles.loading}>Loading schools...</div>;
  }

  return (
    <div className={styles.schoolsManagement}>
      <div className={styles.sectionHeader}>
        <h2>Schools Management</h2>
        <button 
          className={styles.addSchoolBtn}
          onClick={() => setShowSchoolForm(true)}
        >
          Add New School
        </button>
      </div>

      {error && (
        <div className={styles.errorBanner}>
          <span>{error}</span>
          <button onClick={() => setError('')} className={styles.closeError}>×</button>
        </div>
      )}

      {showSchoolForm && (
        <div className={styles.schoolFormModal}>
          <div className={styles.modalContent}>
            <h3>{editingSchool ? 'Edit School' : 'Add New School'}</h3>
            <form onSubmit={handleSubmitSchool}>
              <div className={styles.formGroup}>
                <label>School Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                  <option value="International">International</option>
                  <option value="Government">Government</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Meal Options</label>
                <input
                  type="number"
                  name="mealOptions"
                  value={formData.mealOptions}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className={styles.formActions}>
                <button type="submit">
                  {editingSchool ? 'Update' : 'Create'} School
                </button>
                <button 
                  type="button" 
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={styles.schoolsList}>
        {schools.length > 0 ? (
          <table className={styles.schoolsTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Type</th>
                <th>Meal Options</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {schools.map(school => (
                <tr key={school._id}>
                  <td>{school.name}</td>
                  <td>{school.location}</td>
                  <td>{school.type}</td>
                  <td>{school.mealOptions}</td>
                  <td className={styles.actions}>
                    <button 
                      onClick={() => handleEditSchool(school)}
                      className={styles.editBtn}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteSchool(school._id)}
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
          <div className={styles.noData}>No schools found</div>
        )}
      </div>
    </div>
  );
};

export default School;