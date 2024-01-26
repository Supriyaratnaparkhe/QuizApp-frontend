import React, { useState } from "react";
import { useParams} from "react-router-dom";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import CreateQuizForm from "../CreateQuiz/CreateQuiz";
const Navbar = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("UserName");
    navigate("/login");
  };
  const handleAnalytics = (e) => {
    e.preventDefault();
    navigate(`/analytics/${userId}`);
  };
  const handleDashboard = (e) => {
    e.preventDefault();
    navigate(`/dashboard/${userId}`);
  };

  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.quizze}>Quizzie</div>
        <div className={styles.but}>
          <div>
            <button onClick={handleDashboard}>Dahboard</button>
          </div>
          <div>
            <button onClick={handleAnalytics}>Analytics</button>
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
              <CreateQuizForm userId={userId} onClose={() => setShowCreateModal(false)}/>
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