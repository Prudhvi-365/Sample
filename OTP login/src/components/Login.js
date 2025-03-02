import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase.js"; // Ensure Firebase is correctly configured

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: () => console.log("reCAPTCHA verified"),
      });
    }
  }, []);

  const sendOTP = async () => {
    setMessage("");
    if (!phoneNumber.startsWith("+")) {
      setMessage("❌ Please enter a valid phone number with country code.");
      return;
    }

    try {
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      setMessage("✅ OTP sent successfully. Check your phone.");
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to send OTP. Please try again.");
    }
  };

  const verifyOTP = async () => {
    setMessage("");
    if (!otp) {
      setMessage("❌ Please enter the OTP.");
      return;
    }

    try {
      await confirmationResult.confirm(otp);
      setMessage("✅ Login successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      console.error(error);
      setMessage("❌ Incorrect OTP. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {message && <p style={{ color: message.includes("❌") ? "red" : "green" }}>{message}</p>}
      
      {/* Phone Number Input */}
      <input
        type="text"
        placeholder="Enter phone number (+91XXXXXXX)"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      
      {/* Send OTP Button */}
      <button onClick={sendOTP}>Send OTP</button>

      {/* Resend OTP Button (Disabled until OTP is sent) */}
      <button onClick={sendOTP} disabled={confirmationResult === null}>
        Resend OTP
      </button>

      <div id="recaptcha-container"></div>

      {/* OTP Input */}
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      
      {/* Verify OTP Button */}
      <button onClick={verifyOTP}>Verify OTP</button>
    </div>
  );
};

export default Login;
