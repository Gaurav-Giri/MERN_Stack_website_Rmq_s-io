
// import React, { useState } from "react";
// import { updateUserDetails } from "../../../api";
// import { useAuth } from "../../../AuthContext";
// import styles from "./login.module.css"; // ✅ CSS Module import

// function UserDetailsForm({ email, onSuccess }) {
//   const { login } = useAuth();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [name, setName] = useState(user?.name || "");
//   const [phone, setPhone] = useState(user?.phone || "");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSave = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await updateUserDetails({
//         email: email || user.email,
//         name,
//         phone,
//       });

//       if (res.success) {
//         setMessage("Details saved successfully! Redirecting...");
//         localStorage.setItem("user", JSON.stringify(res.user));
//         localStorage.setItem("token", res.token);
//         login(res.token, res.user);

//         if (onSuccess && typeof onSuccess === "function") {
//           onSuccess(res.token, res.user);
//         }
//       } else {
//         setMessage(res.message || "Failed to save details");
//       }
//     } catch (err) {
//       console.error("Error saving details:", err);
//       setMessage("Error saving details. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles["user-details-container"]}>
//       <h2>Complete Your Profile</h2>
//       <form onSubmit={handleSave}>
//         <div className={styles["form-group"]}>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="text"
//             id="email"
//             value={email || user?.email}
//             disabled
//           />
//         </div>

//         <div className={styles["form-group"]}>
//           <label htmlFor="name">Full Name:</label>
//           <input
//             type="text"
//             id="name"
//             placeholder="Enter your name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>

//         <div className={styles["form-group"]}>
//           <label htmlFor="phone">Phone Number:</label>
//           <input
//             type="tel"
//             id="phone"
//             placeholder="Enter your phone number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className={styles["save-btn"]}
//         >
//           {loading ? "Saving..." : "Save & Continue"}
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

// export default UserDetailsForm;



import React, { useState } from "react";
import { updateUserDetails } from "../../../API/api";
import { useAuth } from "../../../AuthContext";
import { useThemeTrigger } from "../../../ThemeTrigger"; // Import the theme hook
import styles from "./UserDetailsForm.module.css"; // Specific CSS Module

function UserDetailsForm({ email, onSuccess }) {
  const { login } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { darkMode } = useThemeTrigger(); // Get theme state

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await updateUserDetails({
        email: email || user.email,
        name,
        phone,
      });

      if (res.success) {
        setMessage("Details saved successfully! Redirecting...");
        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("token", res.token);
        login(res.token, res.user);

        if (onSuccess && typeof onSuccess === "function") {
          onSuccess(res.token, res.user);
        }
      } else {
        setMessage(res.message || "Failed to save details");
      }
    } catch (err) {
      console.error("Error saving details:", err);
      setMessage("Error saving details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.userDetailsContainer}>
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSave}>
        <div className={styles.userDetailsFormGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email || user?.email}
            disabled
          />
        </div>

        <div className={styles.userDetailsFormGroup}>
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className={styles.userDetailsFormGroup}>
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={styles.saveButton}
        >
          {loading ? "Saving..." : "Save & Continue"}
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

export default UserDetailsForm;