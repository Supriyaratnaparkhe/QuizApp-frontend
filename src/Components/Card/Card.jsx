import React from "react";
import styles from "./Card.module.css";
const Card = (props) => {
  const formatImpression = (impression) => {
    return impression > 1000
      ? (impression / 1000).toFixed(1) + "k"
      : impression;
  };
  return (
    <div>
      <div className={styles.upper}>
        <div className={`${styles.card} ${styles.quiz}`}>
          <span id={styles.num}>{props.numberOfQuizzes}</span> Quiz Created
        </div>
        <div className={`${styles.card} ${styles.question}`}>
          <span id={styles.num}>{props.totalNumberOfQuestions}</span> questions
          Created
        </div>
        <div className={`${styles.card} ${styles.impression}`}>
          <span id={styles.num}>
            {formatImpression(props.totalImpressions)}
          </span>{" "}
          Total Impressions
        </div>
      </div>
    </div>
  );
};

export default Card;
