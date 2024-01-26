import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Quiz.module.css";
import { useParams, useNavigate } from "react-router-dom";

const QuizzePage = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [countdown, setCountdown] = useState(null);
  const { quizId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await axios.get(
          `https://quizeapp-backend.onrender.com/quiz/${quizId}`
        );

        setQuizData(response.data.quiz);
      } catch (error) {
        console.error("Error fetching quiz details:", error.message);
      }
    };

    fetchQuizDetails();
  }, [quizId]);

  useEffect(() => {
    const currentQuestion = quizData?.questions[currentQuestionIndex];
    if (currentQuestion?.timer > 0) {
      setCountdown(currentQuestion.timer);
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            if (currentQuestionIndex === quizData.questions.length - 1) {
              // If it's the last question, automatically submit data
              handleSubmit();
            } else if (quizData.quizType) {
              handleNextQuestion();
            }
            clearInterval(countdownInterval);
            return 0;
          } else {
            return prevCountdown - 1;
          }
        });
      }, 1000);
      return () => {
        clearInterval(countdownInterval);
      };
    } else {
      setCountdown(null);
    }
  }, [currentQuestionIndex, quizData]);

  const handleOptionClick = (option) => {
    setSelectedOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[currentQuestionIndex] = option;
      return newOptions;
    });
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSubmit = () => {
    const userResponses = quizData.questions.map((question, index) => {
      const selectedOption = selectedOptions[index];
      const isCorrect = selectedOption === question.correctAnswer;
      return {
        questionId: question._id,
        selectedOption,
        isCorrect,
      };
    });

    // Send user responses to the backend
    axios
      .put(`https://quizeapp-backend.onrender.com/quiz/${quizId}`, userResponses)
      .then((response) => {
        console.log("Responses submitted successfully", response.data);
      })
      .catch((error) => {
        console.error("Error submitting responses", error);
      });

    const finalScore = calculateScore();
    const quizLength = quizData.questions.length;
    // Display the final score to the user locally
    navigate("/finalScore", { state: { finalScore, quizLength } });
  };

  const handlePollSubmit = () => {
    const userResponses = selectedOptions.map((selectedOption, index) => {
      const question = quizData.questions[index];
      const optionIndex = question.options.findIndex((option) => {
        return (
          option.optionText === selectedOption ||
          option.optionImgURL === selectedOption ||
          `${option.optionText},${option.optionImgURL}` === selectedOption
        );
      });
      console.log(optionIndex.toString());
      return {
        questionId: quizData.questions[index]._id,
        selectedOption: optionIndex.toString(),
      };
    });
    // Send user responses to the backend
    axios
      .put(`https://quizeapp-backend.onrender.com/quiz/poll/${quizId}`, userResponses)
      .then((response) => {
        console.log("Responses submitted successfully", response.data);
      })
      .catch((error) => {
        console.error("Error submitting responses", error);
      });
    navigate("/finalPoll");
  };

  const calculateScore = () => {
    let score = 0;

    quizData.questions.forEach((question, index) => {
      const selectedOption = selectedOptions[index];
      const correctAnswer = question.correctAnswer;

      if (selectedOption === correctAnswer) {
        score++;
      }
    });

    return score;
  };

  if (!quizData) {
    return <div>Loading...</div>;
  }

  const questionType = quizData.quizType;
  const currentQuestion = quizData.questions[currentQuestionIndex];

  return (
    <>
      <div>
        {questionType === "poll" ? (
          <div className={styles.main}>
            <div className={styles.quizContainer}>
              <div className={styles.quizeheader}>
                <div className={styles.questionNumber}>
                  {currentQuestionIndex + 1}/{quizData.questions.length}
                </div>
              </div>
              <div className={styles.quizTitle}>
                {currentQuestion.questionText}
              </div>
              <div>
                {currentQuestion.optionType === "text" ? (
                  <div className={styles.optionsContainer}>
                    {currentQuestion.options.map((option) => (
                      <div
                        key={option._id}
                        className={`${styles.optionButtonText} ${
                          selectedOptions[currentQuestionIndex] ===
                          option.optionText
                            ? styles.selected
                            : ""
                        }`}
                        onClick={() => handleOptionClick(option.optionText)}
                      >
                        <div id={styles.text}>{option.optionText}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                {currentQuestion.optionType === "image" ? (
                  <div className={styles.optionsContainer}>
                    {currentQuestion.options.map((option) => (
                      <div
                        key={option._id}
                        className={`${styles.optionButtonImage} ${
                          selectedOptions[currentQuestionIndex] ===
                          option.optionImgURL
                            ? styles.selected
                            : ""
                        }`}
                        onClick={() => handleOptionClick(option.optionImgURL)}
                      >
                        <div id={styles.img}>
                          <img src={option.optionImgURL} alt="url" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                {currentQuestion.optionType === "text-and-image" ? (
                  <div className={styles.optionsContainer}>
                    {currentQuestion.options.map((option) => (
                      <div
                        key={option._id}
                        className={`${styles.optionButtonTextImg} ${
                          selectedOptions[currentQuestionIndex] ===
                          `${option.optionText},${option.optionImgURL}`
                            ? styles.selected
                            : ""
                        }`}
                        onClick={() =>
                          handleOptionClick(
                            `${option.optionText},${option.optionImgURL}`
                          )
                        }
                      >
                        <div id={styles.textImg}>{option.optionText}</div>
                        <div id={styles.imgText}>
                          <img src={option.optionImgURL} alt="url" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className={styles.nextContainer}>
                {currentQuestionIndex < quizData.questions.length - 1 ? (
                  <button
                    className={styles.nextButton}
                    onClick={handleNextQuestion}
                  >
                    NEXT
                  </button>
                ) : (
                  <button
                    className={styles.nextButton}
                    onClick={handlePollSubmit}
                  >
                    SUBMIT
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : questionType === "q&a" ? (
          <div className={styles.main}>
            <div className={styles.quizContainer}>
              <div className={styles.quizeheader}>
                <div className={styles.questionNumber}>
                  {currentQuestionIndex + 1}/{quizData.questions.length}
                </div>
                {currentQuestion.timer > 0 && (
                  <div className={styles.questionTimer}>
                    {formatTime(countdown)}s
                  </div>
                )}
              </div>
              <div className={styles.quizTitle}>
                {currentQuestion.questionText}
              </div>
              <div>
                {currentQuestion.optionType === "text" ? (
                  <div className={styles.optionsContainer}>
                    {currentQuestion.options.map((option) => (
                      <div
                        key={option._id}
                        className={`${styles.optionButtonText} ${
                          selectedOptions[currentQuestionIndex] ===
                          option.optionText
                            ? styles.selected
                            : ""
                        }`}
                        onClick={() => handleOptionClick(option.optionText)}
                      >
                        <div id={styles.text}>{option.optionText}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                {currentQuestion.optionType === "image" ? (
                  <div className={styles.optionsContainer}>
                    {currentQuestion.options.map((option) => (
                      <div
                        key={option._id}
                        className={`${styles.optionButtonImage} ${
                          selectedOptions[currentQuestionIndex] ===
                          option.optionImgURL
                            ? styles.selected
                            : ""
                        }`}
                        onClick={() => handleOptionClick(option.optionImgURL)}
                      >
                        <div id={styles.img}>
                          <img src={option.optionImgURL} alt="url" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                {currentQuestion.optionType === "text-and-image" ? (
                  <div className={styles.optionsContainer}>
                    {currentQuestion.options.map((option) => (
                      <div
                        key={option._id}
                        className={`${styles.optionButtonTextImg} ${
                          selectedOptions[currentQuestionIndex] ===
                          `${option.optionText},${option.optionImgURL}`
                            ? styles.selected
                            : ""
                        }`}
                        onClick={() =>
                          handleOptionClick(
                            `${option.optionText},${option.optionImgURL}`
                          )
                        }
                      >
                        <div id={styles.textImg}>{option.optionText}</div>
                        <div id={styles.imgText}>
                          <img src={option.optionImgURL} alt="url" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className={styles.nextContainer}>
                {currentQuestionIndex < quizData.questions.length - 1 ? (
                  <button
                    className={styles.nextButton}
                    onClick={handleNextQuestion}
                  >
                    NEXT
                  </button>
                ) : (
                  <button className={styles.nextButton} onClick={handleSubmit}>
                    SUBMIT
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <h1>Unknown question type</h1>
        )}
      </div>
    </>
  );
};

export default QuizzePage;
