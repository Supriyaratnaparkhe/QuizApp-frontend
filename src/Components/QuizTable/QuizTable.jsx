import React, { useEffect, useState } from "react";
import styles from "./QuizTable.module.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteQuiz from "../DeleteQuiz/DeleteQuiz";
import EditQuizForm from "../EditQuiz/EditQuiz";
import edit from "../assets/edit.png";
import share from "../assets/share.png";
import del from "../assets/delete.png";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../../Pages/Spinner/Spinner"

import "react-toastify/dist/ReactToastify.css";

const QuizTable = () => {
  const [analyticData, setAnalyticData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          `https://quizeapp-backend.onrender.com/quiz/dashboard/${userId}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        setAnalyticData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
      finally {
        setLoading(false); // Move setLoading(false) here
      }
    };

    fetchDashboardData();
  }, [userId]);

  const formatImpression = (impression) => {
    return impression > 1000
      ? (impression / 1000).toFixed(1) + "k"
      : impression;
  };

  const handleQuiz = (quizId, quizName, quizType, createdOn, impression) => {
    navigate(`/analytics/${userId}/${quizId}`, {
      state: {
        quizName,
        quizType,
        createdOn,
        impression,
      },
    });
  };
  const handleDelete = () => {
    // Update local state to remove the deleted quiz
    setAnalyticData((prevData) => {
      const updatedData = {
        ...prevData,
        quizDetails: prevData.quizDetails.filter(
          (quiz) => quiz.quizId !== selectedQuizId
        ),
      };
      return updatedData;
    });
    console.log("Quiz deleted successfully");
    setShowDeleteModal(false);
  };

  const handleShareClick = (quizId) => {
    const quizLink = `https://quizze-app-supriya.netlify.app/liveQuiz/${quizId}`;

    navigator.clipboard.writeText(quizLink).then(
      () => {
        toast.success("Link copied successfully!");
      },
      (err) => {
        console.error("Unable to copy link to clipboard", err);
        toast.error("Error copying link to clipboard");
      }
    );
  };

  return (
    <div>
      {analyticData ? (
        <div className={styles.container}>
          <div className={styles.headline}>Quiz Analysis</div>
          <div className={styles.tableContainer}>
            <table className={styles.quiztable}>
              <thead>
                <tr>
                  <th>Serial Number</th>
                  <th>Quiz Name</th>
                  <th>CreatedOn</th>
                  <th>Impressions</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {analyticData.quizDetails.map((quiz, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{quiz.quizName}</td>
                    <td>
                      {new Date(quiz.createdOn).toLocaleDateString("en-us", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td>{formatImpression(quiz.impression)}</td>
                    <td>
                      <div className={styles.logo}>
                        <div className={styles.icon}>
                          <img
                            src={edit}
                            alt="edit"
                            onClick={() => {
                              setShowEditModal(true);
                              setSelectedQuizId(quiz.quizId);
                            }}
                          />
                        </div>
                        <div className={styles.icon}>
                          <img
                            src={del}
                            alt="delete"
                            onClick={() => {
                              setShowDeleteModal(true);
                              setSelectedQuizId(quiz.quizId);
                            }}
                          />
                        </div>
                        <div className={styles.icon}>
                          <img
                            src={share}
                            alt="share"
                            onClick={() => {
                              handleShareClick(quiz.quizId);
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td
                      onClick={(e) => {
                        e.preventDefault();
                        handleQuiz(
                          quiz.quizId,
                          quiz.quizName,
                          quiz.quizType,
                          quiz.createdOn,
                          quiz.impression
                        );
                      }}
                      style={{
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      Question Wise Analysis
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ToastContainer />
            {showEditModal && (
              <EditQuizForm
                quizId={selectedQuizId}
                userId={userId}
                onClose={() => setShowEditModal(false)}
              />
            )}
            {showDeleteModal && (
              <DeleteQuiz
                onClose={() => setShowDeleteModal(false)}
                onDelete={handleDelete}
                quizId={selectedQuizId}
              />
            )}
          </div>
        </div>
      ) : (
        loading && <Spinner/> 
      )}
    </div>
  );
};

export default QuizTable;
