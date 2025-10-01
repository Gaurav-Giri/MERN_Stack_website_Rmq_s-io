// import React, { useState } from 'react';
// import './auth.css';

// const PhoneInput = ({ onSendOtp }) => {
//   const [phone, setPhone] = useState('');
//   const [countryCode, setCountryCode] = useState('+91');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSendOtp(`${countryCode}${phone}`);
//   };

//   return (
//     <div className="auth-form-container">
//       <h2>Login with Phone</h2>
//       <form onSubmit={handleSubmit} className="auth-form">
//         <div className="input-group">
//           <select 
//             value={countryCode}
//             onChange={(e) => setCountryCode(e.target.value)}
//             className="country-code"
//           >
//             <option value="+91">+91 (IN)</option>
//             <option value="+1">+1 (US)</option>
//           </select>
//           <input
//             type="tel"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             placeholder="Enter phone number"
//             required
//             pattern="[0-9]{10}"
//             className="phone-input"
//           />
//         </div>
//         <button type="submit" className="auth-button">
//           Send OTP
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PhoneInput;





// import React, { useState } from 'react';
// import './auth.css';

// const PhoneInput = ({ onSendOtp, loading }) => {
//   const [phone, setPhone] = useState('');
//   const [countryCode, setCountryCode] = useState('+91');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     if (!phone || phone.length !== 10) {
//       setError('Please enter a valid 10-digit phone number');
//       return;
//     }

//     try {
//       await onSendOtp(`${countryCode}${phone}`);
//     } catch (err) {
//       setError('Failed to send OTP. Please try again.');
//     }
//   };

//   return (
//     <div className="auth-form-container">
//       <h2>Login with Phone</h2>
//       {error && <div className="error-message">{error}</div>}
//       <form onSubmit={handleSubmit} className="auth-form">
//         <div className="input-group">
//           <select 
//             value={countryCode}
//             onChange={(e) => setCountryCode(e.target.value)}
//             className="country-code"
//             disabled={loading}
//           >
//             <option value="+91">+91 (IN)</option>
//             <option value="+1">+1 (US)</option>
//           </select>
//           <input
//             type="tel"
//             value={phone}
//             onChange={(e) => {
//               const val = e.target.value.replace(/\D/g, '');
//               if (val.length <= 10) setPhone(val);
//             }}
//             placeholder="Enter phone number"
//             required
//             pattern="[0-9]{10}"
//             className="phone-input"
//             disabled={loading}
//           />
//         </div>
//         <button 
//           type="submit" 
//           className="auth-button"
//           disabled={loading}
//         >
//           {loading ? 'Sending...' : 'Send OTP'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PhoneInput;




// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { FaPhone } from 'react-icons/fa';

// export default function PhoneInput({ onSubmit }) {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [loading, setLoading] = useState(false);

//   const submitHandler = async (data) => {
//     setLoading(true);
//     await onSubmit(data.phoneNumber);
//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold text-center text-gray-800">Login with Phone</h2>
//         <p className="mt-2 text-center text-gray-600">
//           We'll send you an OTP to verify your number
//         </p>
//       </div>
      
//       <div>
//         <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
//           Phone Number
//         </label>
//         <div className="mt-1 relative rounded-md shadow-sm">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <FaPhone className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             id="phoneNumber"
//             type="tel"
//             {...register('phoneNumber', { 
//               required: 'Phone number is required',
//               pattern: {
//                 value: /^[0-9]{10}$/,
//                 message: 'Please enter a valid 10-digit phone number'
//               }
//             })}
//             className="block w-full pl-10 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="9876543210"
//           />
//         </div>
//         {errors.phoneNumber && (
//           <p className="mt-2 text-sm text-red-600">{errors.phoneNumber.message}</p>
//         )}
//       </div>
      
//       <div>
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
//         >
//           {loading ? 'Sending OTP...' : 'Send OTP'}
//         </button>
//       </div>
//     </form>
//   );
// }



import { useState } from 'react'
import { auth } from '../../services/firebaseAuth'
import { signInWithPhoneNumber } from 'firebase/auth'

export const PhoneNumberForm = ({ onSuccess }) => {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const formattedPhone = `+${phone.replace(/\D/g, '')}`
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        window.recaptchaVerifier
      )
      onSuccess(formattedPhone, confirmation)
    } catch (err) {
      setError(err.message || 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-form">
      <h2>Enter Your Phone Number</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number with country code"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send OTP'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      <div id="recaptcha-container"></div>
    </div>
  )
}

export default PhoneNumberForm;