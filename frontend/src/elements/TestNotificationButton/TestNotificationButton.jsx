// components/TestNotificationButton.jsx
import React, { useState } from "react";
import { createNotification } from "../../Api/NotificationApi.js";
import styles from "./TestNotificationButton.module.css";

const TestNotificationButton = () => {
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleGenerateNotification = async () => {
    if (!user?._id) {
      alert("❌ User not found. Please log in first.");
      return;
    }

    setLoading(true);
    try {
      const notificationData = {
        user: user._id,
        message: "🔔 This is a test notification from TestNotificationButton!",
        type: "system",
        priority: "high",
      };

      const res = await createNotification(notificationData);
      console.log("✅ Notification created successfully:", res);
      alert("✅ Test notification created successfully!");
    } catch (error) {
      console.error("❌ Error creating notification:", error);
      alert(`Failed to create notification: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGenerateNotification}
      disabled={loading}
      className={styles.testNotificationButton}
    >
      {loading ? "Creating..." : "Generate Test Notification"}
    </button>
  );
};

export default TestNotificationButton;
