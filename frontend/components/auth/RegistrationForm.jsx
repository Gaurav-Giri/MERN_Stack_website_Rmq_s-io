// import React, { useState } from 'react';
// import './auth.css';

// const RegistrationForm = ({ onSubmit, schoolName }) => {
//   const [formData, setFormData] = useState({
//     parentName: '',
//     email: '',
//     childName: '',
//     admissionNumber: '',
//     grade: '',
//     section: '',
//     allergies: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <div className="auth-form-container">
//       <h2>Complete Registration</h2>
//       <form onSubmit={handleSubmit} className="auth-form registration-form">
//         <h3>Parent Information</h3>
//         <input
//           type="text"
//           name="parentName"
//           value={formData.parentName}
//           onChange={handleChange}
//           placeholder="Full Name"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email Address"
//           required
//         />

//         <h3>Child Information</h3>
//         <input
//           type="text"
//           name="childName"
//           value={formData.childName}
//           onChange={handleChange}
//           placeholder="Child's Full Name"
//           required
//         />
//         <div className="school-info">
//           <label>School</label>
//           <p>{schoolName}</p>
//         </div>
//         <input
//           type="text"
//           name="admissionNumber"
//           value={formData.admissionNumber}
//           onChange={handleChange}
//           placeholder="Admission Number"
//           required
//         />
//         <div className="form-row">
//           <select
//             name="grade"
//             value={formData.grade}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Grade</option>
//             {Array.from({ length: 12 }, (_, i) => (
//               <option key={i+1} value={`Grade ${i+1}`}>Grade {i+1}</option>
//             ))}
//           </select>
//           <input
//             type="text"
//             name="section"
//             value={formData.section}
//             onChange={handleChange}
//             placeholder="Section (optional)"
//           />
//         </div>
//         <textarea
//           name="allergies"
//           value={formData.allergies}
//           onChange={handleChange}
//           placeholder="Any food allergies or special requirements (optional)"
//         />

//         <div className="terms-agreement">
//           <input type="checkbox" id="terms" required />
//           <label htmlFor="terms">I agree to the Terms & Conditions</label>
//         </div>

//         <button type="submit" className="auth-button">
//           Complete Registration
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegistrationForm;



// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import './auth.css'; // Make sure to import the CSS

// export default function RegistrationForm({ phoneNumber, onSubmit }) {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [loading, setLoading] = useState(false);

//   const submitHandler = async (data) => {
//     setLoading(true);
//     await onSubmit(data);
//     setLoading(false);
//   };

//   return (
//     <div className="form-container">
//       <div className="form-box">
//         <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
//           <div>
//             <h2 className="text-2xl font-bold text-center text-gray-800">Complete Registration</h2>
//             <p className="mt-2 text-center text-gray-600">
//               Please provide some details to complete your profile
//             </p>
//           </div>
          
//           <div>
//             <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
//               Phone Number
//             </label>
//             <input
//               id="phoneNumber"
//               type="text"
//               value={phoneNumber}
//               readOnly
//               className="mt-1 block w-full bg-gray-100 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//           </div>
          
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//               Full Name *
//             </label>
//             <input
//               id="name"
//               type="text"
//               {...register('name', { required: 'Name is required' })}
//               className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//             {errors.name && (
//               <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
//             )}
//           </div>
          
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email (Optional)
//             </label>
//             <input
//               id="email"
//               type="email"
//               {...register('email', {
//                 pattern: {
//                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                   message: 'Invalid email address'
//                 }
//               })}
//               className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//             {errors.email && (
//               <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
//             )}
//           </div>
          
//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
//             >
//               {loading ? 'Registering...' : 'Complete Registration'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
// //   return (
// //     <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
// //       <div>
// //         <h2 className="text-2xl font-bold text-center text-gray-800">Complete Registration</h2>
// //         <p className="mt-2 text-center text-gray-600">
// //           Please provide some details to complete your profile
// //         </p>
// //       </div>
      
// //       <div>
// //         <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
// //           Phone Number
// //         </label>
// //         <input
// //           id="phoneNumber"
// //           type="text"
// //           value={phoneNumber}
// //           readOnly
// //           className="mt-1 block w-full bg-gray-100 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
// //         />
// //       </div>
      
// //       <div>
// //         <label htmlFor="name" className="block text-sm font-medium text-gray-700">
// //           Full Name *
// //         </label>
// //         <input
// //           id="name"
// //           type="text"
// //           {...register('name', { required: 'Name is required' })}
// //           className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
// //         />
// //         {errors.name && (
// //           <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
// //         )}
// //       </div>
      
// //       <div>
// //         <label htmlFor="email" className="block text-sm font-medium text-gray-700">
// //           Email (Optional)
// //         </label>
// //         <input
// //           id="email"
// //           type="email"
// //           {...register('email', {
// //             pattern: {
// //               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
// //               message: 'Invalid email address'
// //             }
// //           })}
// //           className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
// //         />
// //         {errors.email && (
// //           <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
// //         )}
// //       </div>
      
// //       <div>
// //         <button
// //           type="submit"
// //           disabled={loading}
// //           className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
// //         >
// //           {loading ? 'Registering...' : 'Complete Registration'}
// //         </button>
// //       </div>
// //     </form>
// //   );
// // }



import { useState } from 'react'
import { registerUser } from '../../services/apiClient'

export const UserDetailsForm = ({ phone, onSuccess }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data } = await registerUser({ phone, name, email })
      onSuccess(data.user)
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-form">
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  )
}

export default UserDetailsForm;
