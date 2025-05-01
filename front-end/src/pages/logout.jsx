import React from "react";
import styles from "./logout.module.css";

export default function Logout() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>You have successfully logged out!</h1>
      <p className={styles.message}>We hope to see you again soon.</p>
      <a className={styles.homeLink} href="/">
        Go to Homepage
      </a>
    </div>
  );
}
