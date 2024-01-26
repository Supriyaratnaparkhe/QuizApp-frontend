import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./SubmitQuiz.module.css";

const SubmitQuiz = () => {
  // Use useLocation hook to access the location object
  const location = useLocation();
  // Extract finalScore from location.state
  const finalScore = location.state?.finalScore || 0;
  const quizLength = location.state?.quizLength || 0;

  return (
    <center>
      <div className={styles.doneContainer}>
        <div className={styles.title}> Congrats Quiz is completed </div>
        <div className={styles.doneImage}></div>
        {/* Display the final score */}
        <p className={styles.scoreText}>Your Score is: {finalScore}/{quizLength}</p>
      </div>
    </center>
  );
};

export default SubmitQuiz;
