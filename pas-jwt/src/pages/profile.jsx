import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user info on component mount
  useEffect(() => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    console.log(token);

    if (!token) {
      navigate("/login", {
        state: { errorMessage: "You need to log in first !" },
      }); // Redirect to login if no token found
    } else {
      // If token exists, fetch the user details from the back-end
      const fetchUserProfile = async () => {
        try {
          const response = await fetch("http://localhost:6001/auth/profile", {
            headers: {
              Authorization: token, //`Bearer ${token}`
            },
          });
          const data = await response.json();
          console.log(data.username);

          if (data.username) {
            setUser(data.username);
            // Set user state if authentication is successful
          } else {
            navigate("/login", {
              state: {
                errorMessage: "Invalid session/TOKEN, please log in again!",
              },
            }); // Redirect to login if user info is not found
            localStorage.removeItem("token"); //JODI MANUALY KEW TOKEN CHANGE KORE FAKE DEY TAHOLE CLEAR KORBE KARON CLEARN NA KORLE TOKEN TAKLE REGISTER/LOGIN JAWA JABE NA JODIO FAKE TOKEN TAKE
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          navigate("/auth/login"); // Redirect to login on error
        }
      };

      fetchUserProfile();
    }
  }, [navigate]);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome, {user}</h1>
      <p className={styles.description}>
        This is your profile page. You can manage your account settings here.
      </p>
      <button
        className={styles.logout}
        onClick={() => {
          localStorage.removeItem("token"); // Remove token on logout
          navigate("/logout"); // Redirect to login
        }}
      >
        Log out
      </button>
    </div>
  );
}
