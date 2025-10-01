// import React, { useState, useEffect } from 'react';
// import './auth.css';

// const OTPVerification = ({ phone, onVerify, onResend, onBack }) => {
//   const [otp, setOtp] = useState('');
//   const [timer, setTimer] = useState(30);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onVerify(otp);
//   };

//   return (
//     <div className="auth-form-container">
//       <h2>Verify OTP</h2>
//       <p className="otp-sent-text">OTP sent to {phone}</p>
      
//       <form onSubmit={handleSubmit} className="auth-form">
//         <input
//           type="text"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           placeholder="Enter 6-digit OTP"
//           required
//           pattern="[0-9]{6}"
//           className="otp-input"
//         />
        
//         <button type="submit" className="auth-button">
//           Verify OTP
//         </button>

//         <div className="otp-actions">
//           {timer > 0 ? (
//             <span className="timer">Resend OTP in {timer}s</span>
//           ) : (
//             <button 
//               type="button" 
//               className="resend-button"
//               onClick={onResend}
//             >
//               Resend OTP
//             </button>
//           )}
//           <button 
//             type="button" 
//             className="back-button"
//             onClick={onBack}
//           >
//             Change Number
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default OTPVerification;





// import React, { useState, useEffect } from 'react';
// import './auth.css';

// const OTPVerification = ({ phone, onVerify, onResend, onBack, loading }) => {
//   const [otp, setOtp] = useState('');
//   const [timer, setTimer] = useState(30);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     if (!otp || otp.length !== 6) {
//       setError('Please enter a valid 6-digit OTP');
//       return;
//     }

//     try {
//       await onVerify(otp);
//     } catch (err) {
//       setError('OTP verification failed');
//     }
//   };

//   const handleResendClick = async () => {
//     setError('');
//     try {
//       await onResend();
//       setTimer(30);
//     } catch (err) {
//       setError('Failed to resend OTP');
//     }
//   };

//   return (
//     <div className="auth-form-container">
//       <h2>Verify OTP</h2>
//       <p className="otp-sent-text">OTP sent to {phone}</p>
//       {error && <div className="error-message">{error}</div>}
      
//       <form onSubmit={handleSubmit} className="auth-form">
//         <input
//           type="text"
//           value={otp}
//           onChange={(e) => {
//             const val = e.target.value.replace(/\D/g, '');
//             if (val.length <= 6) setOtp(val);
//           }}
//           placeholder="Enter 6-digit OTP"
//           required
//           pattern="[0-9]{6}"
//           className="otp-input"
//           disabled={loading}
//         />
        
//         <button 
//           type="submit" 
//           className="auth-button"
//           disabled={loading}
//         >
//           {loading ? 'Verifying...' : 'Verify OTP'}
//         </button>

//         <div className="otp-actions">
//           {timer > 0 ? (
//             <span className="timer">Resend OTP in {timer}s</span>
//           ) : (
//             <button 
//               type="button" 
//               className="resend-button"
//               onClick={handleResendClick}
//               disabled={loading}
//             >
//               Resend OTP
//             </button>
//           )}
//           <button 
//             type="button" 
//             className="back-button"
//             onClick={onBack}
//             disabled={loading}
//           >
//             Change Number
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default OTPVerification;



// import { useState, useRef, useEffect } from 'react';
// import { FaArrowLeft, FaCheck } from 'react-icons/fa';

// export default function OTPVerification({ phoneNumber, onVerify, onBack }) {
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [loading, setLoading] = useState(false);
//   const [countdown, setCountdown] = useState(30);
//   const inputRefs = useRef([]);

//   useEffect(() => {
//     const timer = countdown > 0 && setInterval(() => {
//       setCountdown(countdown - 1);
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [countdown]);

//   const handleChange = (e, index) => {
//     const value = e.target.value;
//     if (isNaN(value)) return;
    
//     const newOtp = [...otp];
//     newOtp[index] = value.substring(value.length - 1);
//     setOtp(newOtp);
    
//     // Move to next input
//     if (value && index < 5) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === 'Backspace' && !otp[index] && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     await onVerify(otp.join(''));
//     setLoading(false);
//   };

//   const handleResend = async () => {
//     setCountdown(30);
//     // In a real app, you would resend OTP here
//   };

//   return (
//     <div className="space-y-6">
//       <button 
//         onClick={onBack}
//         className="flex items-center text-sm text-indigo-600 hover:text-indigo-500"
//       >
//         <FaArrowLeft className="mr-1" /> Change phone number
//       </button>
      
//       <div>
//         <h2 className="text-2xl font-bold text-center text-gray-800">Verify OTP</h2>
//         <p className="mt-2 text-center text-gray-600">
//           Enter the 6-digit code sent to {phoneNumber}
//         </p>
//       </div>
      
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="flex justify-center space-x-2">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               ref={(el) => (inputRefs.current[index] = el)}
//               type="text"
//               value={digit}
//               onChange={(e) => handleChange(e, index)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//               maxLength="1"
//               className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//             />
//           ))}
//         </div>
        
//         <div className="text-center">
//           {countdown > 0 ? (
//             <p className="text-sm text-gray-500">
//               Resend OTP in {countdown}s
//             </p>
//           ) : (
//             <button
//               type="button"
//               onClick={handleResend}
//               className="text-sm text-indigo-600 hover:text-indigo-500"
//             >
//               Resend OTP
//             </button>
//           )}
//         </div>
        
//         <div>
//           <button
//             type="submit"
//             disabled={loading || otp.some(d => d === '')}
//             className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
//           >
//             {loading ? 'Verifying...' : (
//               <>
//                 <FaCheck className="mr-2" /> Verify
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }


import { useState } from 'react'

export const OtpForm = ({ phone, confirmation, onSuccess }) => {
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await confirmation.confirm(otp)
      const idToken = await result.user.getIdToken()
      onSuccess(idToken)
    } catch {
      setError('Invalid OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-form">
      <h2>Verify OTP</h2>
      <p>Enter the OTP sent to {phone}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit OTP"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  )
}

export default OtpForm;