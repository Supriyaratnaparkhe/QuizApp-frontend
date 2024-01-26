import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./QnA.module.css";
import stroke from "../assets/stroke.png";
const QnA = (props) => {
  const location = useLocation();
  const { quizName, createdOn, impression } = location.state;
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div id={styles.qzname}>{quizName} Question Analysis</div>
        <div id={styles.create}>
          <div>
            Created On:{" "}
            {new Date(createdOn).toLocaleDateString("en-us", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
          <div>Impressions: {impression}</div>
        </div>
      </div>
      <div className={styles.qnBox}>
        {props.quizDetails.map((questions, index) => (
          <div key={index}>
            <div className={styles.qnText}>
              Q.{index + 1} {questions.questionText}
            </div>
            <div className={styles.data}>
              {props.quizType === "q&a" ? (
                <>
                  <div className={styles.card1}>
                    <span>{questions.answerCount}</span>people Attempted the
                    question
                  </div>
                  <div className={styles.card1}>
                    <span>{questions.correctCount}</span>people Answered
                    Correctly
                  </div>
                  <div className={styles.card1}>
                    <span>{questions.incorrectCount}</span>people Answered
                    Incorrectly
                  </div>
                </>
              ) : (
                <>
                  {Object.entries(questions.optionVotes).map(
                    ([optionIndex, count]) => (
                      <div className={styles.card2} key={optionIndex}>
                        <span>{count}</span>Option {Number(optionIndex)+1} 
                      </div>
                    )
                  )}
                </>
              )}
            </div>
            <div className={styles.stroke}>
              <img src={stroke} alt="stroke" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QnA;
