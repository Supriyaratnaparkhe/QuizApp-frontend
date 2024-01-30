import React from "react";
import styles from "./TrendingQuizzes.module.css";
import eyes from "../assets/eyes.png";
const TrendingQuizzes = (props) => {
  const { quizDetails } = props;

  if (quizDetails.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.message}>You don't have any quiz</div>
      </div>
    );
  }
  const sortedQuizDetails = props.quizDetails.sort(
    (a, b) => b.impression - a.impression
  );
  const shortenQuizName = (quizName) => {
    return quizName.length > 8 ? quizName.substring(0, 5) + "..." : quizName;
  };
  return (
    <div>
      <div className={styles.headline}>Trending Quizs</div>
      <div className={styles.container}>
        {sortedQuizDetails.map((quiz, index) => (
          <div key={index} className={styles.quizcontainer}>
            <div className={styles.row1}>
              <div className={styles.quizname}>
                {shortenQuizName(quiz.quizName)}
              </div>
              <div className={styles.impression}>
                {quiz.impression} <img src={eyes} alt="eye" />
              </div>
            </div>
            <div className={styles.row2}>
              Created On: {new Date(quiz.createdOn).toLocaleDateString('en-us',{ day:'numeric', month:'short', year:'numeric'})}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingQuizzes;
