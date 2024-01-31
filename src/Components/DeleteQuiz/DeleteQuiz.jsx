import React from "react";
import axios from "axios";
import styles from "./DeleteQuiz.module.css";
import { useParams } from "react-router-dom";

const DeleteQuiz = ({ onClose, onDelete, quizId }) => {
  const { userId } = useParams();
  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://quizeapp-backend.onrender.com/quiz/deleteQuiz/${userId}/${quizId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      onDelete(); 
      onClose(); 
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  return (
    <div className={styles.deletepopup}>
      <div className={styles.deletebox}>
        <div className={styles.text}>Are you confirm you want to delete ?</div>
        <div className={styles.delbuttons}>
          <div className={styles.confirmbut}>
            <button onClick={handleDelete}>Confirm Delete</button>
          </div>
          <div className={styles.cancelbut}>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteQuiz;
