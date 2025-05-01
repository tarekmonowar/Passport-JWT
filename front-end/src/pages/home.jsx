import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to Our Website!</h1>
      <p className={styles.message}>
        If you're new, you can register now. Already have an account? Login to
        continue!
      </p>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={() => navigate("/register")}>
          Register
        </button>
        <button className={styles.button} onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </div>
  );
}
