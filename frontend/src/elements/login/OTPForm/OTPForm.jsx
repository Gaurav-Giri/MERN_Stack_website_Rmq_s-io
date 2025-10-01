

// import React, { useState } from "react";
// import { verifyOTP } from "../../../api";
// import styles from "./login.module.css"; // ✅ CSS Module import

// function OTPVerification({ email, onSuccess }) {
//   const [otp, setOtp] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await verifyOTP(email, otp);

//       if (res.success) {
//         setMessage("OTP verified successfully!");
//         localStorage.setItem("user", JSON.stringify(res.user));
//         localStorage.setItem("token", res.token);
//         onSuccess(res.requiresDetails, res.token, res.user);
//       } else {
//         setMessage(res.message || "OTP verification failed");
//       }
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//       setMessage("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles["otp-container"]}>
//       <h2>Enter Verification Code</h2>
//       <p>We've sent a verification code to {email}</p>
//       <form onSubmit={handleVerify}>
//         <div className={styles["form-group"]}>
//           <label htmlFor="otp">Verification Code</label>
//           <input
//             type="text"
//             id="otp"
//             placeholder="Enter 6-digit code"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             required
//             maxLength="6"
//           />
//         </div>
//         <button type="submit" disabled={loading}>
//           {loading ? "Verifying..." : "Verify Code"}
//         </button>
//       </form>
//       {message && (
//         <p
//           className={
//             message.includes("successfully")
//               ? styles["success"]
//               : styles["error"]
//           }
//         >
//           {message}
//         </p>
//       )}
//     </div>
//   );
// }

// export default OTPVerification;



import React, { useState } from "react";
import { verifyOTP } from "../../../API/api";
import { useThemeTrigger } from "../../../ThemeTrigger"; // Import the theme hook
import styles from "./OTPForm.module.css"; // Specific CSS Module

function OTPVerification({ email, onSuccess }) {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { darkMode } = useThemeTrigger(); // Get theme state

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await verifyOTP(email, otp);

      if (res.success) {
        setMessage("OTP verified successfully!");
        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("token", res.token);
        onSuccess(res.requiresDetails, res.token, res.user);
      } else {
        setMessage(res.message || "OTP verification failed");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.otpContainer}>
      <h2>Enter Verification Code</h2>
      <p>We've sent a verification code to {email}</p>
      <form onSubmit={handleVerify}>
        <div className={styles.otpFormGroup}>
          <label htmlFor="otp">Verification Code</label>
          <input
            type="text"
            id="otp"
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            maxLength="6"
            className={styles.otpInput}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className={styles.formButton}
        >
          {loading ? "Verifying..." : "Verify Code"}
        </button>
      </form>
      {message && (
        <p className={message.includes("successfully") ? styles.successMessage : styles.errorMessage}>
          {message}
        </p>
      )}
    </div>
  );
}

export default OTPVerification;