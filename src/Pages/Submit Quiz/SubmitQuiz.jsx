import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./SubmitQuiz.module.css";

const SubmitQuiz = () => {
  const location = useLocation();
  const finalScore = location.state?.finalScore || 0;
  const quizLength = location.state?.quizLength || 0;

  return (
    <center>
      <div className={styles.doneContainer}>
        <div className={styles.title}> Congrats Quiz is completed </div>
        <div className={styles.doneImage}></div>
        <p className={styles.scoreText}>Your Score is:<span>{finalScore}/{quizLength}</span></p>
      </div>
    </center>
  );
};

export default SubmitQuiz;
