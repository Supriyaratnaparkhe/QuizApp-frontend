import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import styles from "./Login.module.css";
const Login = () => {
  const navigate = useNavigate();
  const [UserState, setUserState] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState("Login");
  const [errors, setErrors] = useState({});

  const validateValues = (UserState) => {
    const errors = {};

    if (!UserState.email) {
      errors.email = "*Email field is required";
    } else if (!/^\S+@\S+\.\S+$/.test(UserState.email)) {
      errors.email = "Invalid email format";
    }

    if (!UserState.password) {
      errors.password = "*Password is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setLoading("Loading...")
      const isValid = validateValues(UserState);

      if (isValid) {
        const response = await axios.post("https://quizeapp-backend.onrender.com/auth/login", {
          email: UserState.email,
          password: UserState.password,
        });
        const userId = response.data.userId;
        localStorage.setItem("token", response.data.token);
        
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
            navigate(`/dashboard/${userId}`);
        }, 700);
        return response.data;
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        const { data } = error.response;

        if (data.message === "User does not exist") {
          setErrors({ userNotExist: data.message });
        } else {
          setErrors({
            generalError: "An unexpected error occurred. Please try again.",
          });
        }
      }
    }
  };
  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/");
  };
  const updateForm = (e) => {
    setUserState({
      ...UserState,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.login}>
          <div className={styles.heading}>QUIZZIE</div>
          <div className={styles.buttons}>
            <div className={styles.signupbut}>
              <button onClick={handleRegister}>Sign Up</button>
            </div>
            <div className={styles.loginbut}>
              <button>Login</button>
            </div>
          </div>
          <div>
            <form onSubmit={handleLogin} className={styles.centeredForm}>
              <table>
                <tbody>
                  <tr>
                    <td className={styles.ele1}>Email</td>
                    <td>
                      <input
                        type="email"
                        name="email"
                        value={UserState.email}
                        onChange={updateForm}
                        className={
                          errors.email ? styles.inputErrorbox : styles.inputbox
                        }
                        placeholder={errors.email ? errors.email : ""}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className={styles.ele1}>Password</td>
                    <td>
                      <input
                        type="text"
                        name="password"
                        value={UserState.password}
                        onChange={updateForm}
                        className={
                          errors.password
                            ? styles.inputErrorbox
                            : styles.inputbox
                        }
                        placeholder={errors.password ? errors.password : ""}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className={styles.loginbtn}>
                <button type="submit">
                  <div>{loading}</div>
                </button>
              </div>
            </form>
            <ToastContainer />
          </div>
          <div className={styles.errormessage}>
            {errors.userNotExist} {errors.generalError}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
