import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import CreateQuizForm from "../CreateQuiz/CreateQuiz";

const Navbar = (props) => {
  const [selectedButton, setSelectedButton] = useState(props.selectedButton);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    setSelectedButton(null); 
    localStorage.removeItem("UserName");
    navigate("/login");
  };

  const handleAnalytics = (e) => {
    e.preventDefault();
    setSelectedButton("analytics");
    navigate(`/analytics/${userId}`);
  };

  const handleDashboard = (e) => {
    e.preventDefault();
    setSelectedButton("dashboard");
    navigate(`/dashboard/${userId}`);
  };
  const handleCreateQuizSuccess = () => {
    props.onCreateSuccess();
  };
  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.quizze}>Quizzie</div>
        <div className={styles.but}>
          <div>
            <button
              className={
                selectedButton === "dashboard" ? styles.selectedButtonColor : ""
              }
              onClick={handleDashboard}
            >
              Dashboard
            </button>
          </div>
          <div>
            <button
              className={
                selectedButton === "analytics" ? styles.selectedButtonColor : ""
              }
              onClick={handleAnalytics}
            >
              Analytics
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                setShowCreateModal(true);
              }}
            >
              Create Quiz
            </button>
          </div>
          {showCreateModal && (
            <CreateQuizForm
              userId={userId}
              onClose={() => setShowCreateModal(false)}
              onCreateSuccess={handleCreateQuizSuccess}
            />
          )}
        </div>
        <div className={styles.logout}>
          <button onClick={handleLogout}>LogOut</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
