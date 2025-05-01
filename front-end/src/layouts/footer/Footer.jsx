import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>
          © {new Date().getFullYear()} YourWebsiteName. All rights reserved.
        </p>
        <div className={styles.links}>
          <a href="/privacy-policy" className={styles.link}>
            Privacy Policy
          </a>
          <a href="/terms" className={styles.link}>
            Terms of Service
          </a>
          <a href="/contact" className={styles.link}>
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}
