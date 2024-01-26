import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import QnA from "../../Components/QnA/QnA";
import axios from "axios";
import styles from "./QnAnalysis.module.css";
import { useLocation } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const QnAnalysis = () => {
  const [quizDetails, setQuizDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId, quizId } = useParams();
  const location = useLocation();
  const { quizType } = location.state;

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/quiz/analytics/${userId}/${quizId}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        setQuizDetails(response.data.quizDetails);
      } catch (error) {
        console.error(error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchQuizDetails();
  }, [userId, quizId]);

  return (
    <>
      {!loading ? (
        <div className={styles.container}>
          <div>
            <Navbar />
          </div>
          <div className={styles.quiz}>
            <QnA quizDetails={quizDetails} quizType={quizType} />
          </div>
        </div>
      ) : (
        loading && <Spinner />
      )}
    </>
  );
};

export default QnAnalysis;
