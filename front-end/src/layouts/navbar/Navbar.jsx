import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <div>
      <nav className={styles.navbar}>
        <ul className={styles.navbarList}>
          <li className={styles.navbarItem}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Home
            </NavLink>
          </li>
          <li className={styles.navbarItem}>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Register
            </NavLink>
          </li>
          <li className={styles.navbarItem}>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Log-in
            </NavLink>
          </li>
          <li className={styles.navbarItem}>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Profile
            </NavLink>
          </li>
          <li className={styles.navbarItem}>
            <NavLink
              to="/logout"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Log-out
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
