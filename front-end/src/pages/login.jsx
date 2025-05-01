import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./register.module.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation(); // Used to capture error messages passed via navigation
  const errorFromLocation = location.state?.errorMessage || "";

  // State for form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // State for error and success messages
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if the user is already authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile"); // Redirect to profile if authenticated
    }
  }, [navigate]); // Empty dependencies array ensures this runs only once after the component mounts

  // Handle input change for username and password
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Basic validation for username and password
    if (!username || !password) {
      setErrorMessage("Username and password are required.");
      return;
    }

    try {
      setIsLoading(true); // Start loading

      // Make a POST request to the backend for login
      const response = await axios.post("http://localhost:6001/auth/login", {
        username,
        password,
      });

      // If login is successful, navigate to the profile page
      if (response.status === 200) {
        // Save the token to localStorage and redirect to the profile page
        localStorage.setItem("token", response.data.token);
        navigate("/profile");
      }
    } catch (err) {
      // Check if the error is related to username not being found
      if (err.response?.status === 404 && err.response?.data?.message) {
        setErrorMessage(err.response.data.message); // "User not found, please register first"
      } else {
        setErrorMessage("Invalid username or password. Please try again.");
      }
    } finally {   
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formHeading}>Log-In</h1>

      {errorFromLocation && !errorMessage && (
        <p className={styles.errorMessage}>{errorFromLocation}</p>
      )}
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      {!errorFromLocation && !errorMessage && (
        <p className={styles.successMessage}>
          Please enter your username and password.
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.formLabel}>
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username} // Controlled input
            onChange={handleUsernameChange}
            placeholder="Enter your username"
            className={styles.formInput}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.formLabel}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password} // Controlled input
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            className={styles.formInput}
            required
          />
        </div>

        <button
          type="submit"
          className={styles.formButton}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log-In"}
        </button>
      </form>
    </div>
  );
}
