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

  // useEffect(() => {
  //   const fetchDashboardData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3001/quiz/dashboard/${userId}`,
  //         {
  //           headers: {
  //             token: localStorage.getItem("token"),
  //           },
  //         }
  //       );
  //       setDashboardData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching dashboard data:", error);
  //     }
  //   };

  //   fetchDashboardData();
  //   setLoading(false);
  // }, [userId]);

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
        setLoading(false); // Move setLoading(false) here
      }
    };
  
    fetchDashboardData();
  }, [userId]);


  // const handleUpdateQuizList = async () => {
  //   // You can use this function to update the quiz list after creating a new quiz
  //   try {
  //     const response = await axios.get(`http://localhost:3001/quiz/dashboard/${userId}`, {
  //       headers: {
  //         token: localStorage.getItem('token'),
  //       },
  //     });
  //     setDashboardData(response.data);
  //   } catch (error) {
  //     console.error('Error fetching dashboard data:', error);
  //   }
  // };
  return (
    <>
      {!loading ? (
        
        <div className={styles.box}>
          <div className={styles.container}>
            <div>
              <Navbar/>
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
