import React, { useState } from "react";
import { sendOTP } from "../../../API/api";
import { useThemeTrigger } from "../../../ThemeTrigger"; // Import the theme hook
import styles from "./EmailForm.module.css"; // Specific CSS Module

function EmailForm({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { darkMode } = useThemeTrigger(); // Get theme state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await sendOTP(email);
      if (response.success) {
        onSuccess(email);
      } else {
        setError(response.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error("Send OTP error:", err.response?.data || err.message);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.emailFormContainer}>
      <h2>Enter Your Email</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.emailFormGroup}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <button 
          type="submit" 
          disabled={loading}
          className={styles.formButton}
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
}

export default EmailForm;