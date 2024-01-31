import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./Dashboard.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import Card from "../../Components/Card/Card";
import TrendingQuizzes from "../../Components/TrendingQuizzes/TrendingQuizzes";
import Spinner from "../Spinner/Spinner"
const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();

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
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false); 
      }
    };
  
    fetchDashboardData();
  }, [userId]);


  return (
    <>
      {!loading ? (
        
        <div className={styles.box}>
          <div className={styles.container}>
            <div>
              <Navbar selectedButton={"dashboard"}/>
            </div>

            <div className={styles.dashboard}>
              <div>
              <Card
                numberOfQuizzes={dashboardData.numberOfQuizzes}
                totalNumberOfQuestions={dashboardData.totalNumberOfQuestions}
                totalImpressions={dashboardData.totalImpressions}
              />
              <TrendingQuizzes quizDetails={dashboardData.quizDetails} />
              </div>
            </div>
          </div>
          </div>
        
      ) : (
        loading && <Spinner/> 
      )}
  </>
  );
};

export default Dashboard;
