import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import QuizTable from "../../Components/QuizTable/QuizTable";
import styles from "./Analytics.module.css";


const Analytics = () => {
  
  return (
    <div className={styles.analytics}>
      <div>
        <Navbar/>
      </div>
      <div className={styles.quiztablecontainer}>
        <div><QuizTable/></div>
      </div>
    </div>
  );
};

export default Analytics;
