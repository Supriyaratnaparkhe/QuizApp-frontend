import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import styles from "./Register.module.css";
const Register = () => {
  const navigate = useNavigate();
  const [UserState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({});

  const validateValues = (UserState) => {
    const errors = {};
    if (!UserState.name) {
      errors.name = "*Name field is required";
    }
    if (!UserState.email) {
      errors.email = "*Email field is required";
    } else if (!/^\S+@\S+\.\S+$/.test(UserState.email)) {
      errors.email = "Invalid email format";
    }

    if (!UserState.password) {
      errors.password = "*Password is required";
    } else if (UserState.password.length <= 5) {
      errors.password = "*Weak Password";
    }
    if (!UserState.confirmpassword) {
      errors.confirmpassword = "*Confirm password is required";
    } else if (UserState.password !== UserState.confirmpassword) {
      errors.confirmpassword = "*Password does not match";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      const isValid = validateValues(UserState);

      if (isValid) {
        const response = await axios.post("https://quizeapp-backend.onrender.com/auth/register", {
          name: UserState.name,
          email: UserState.email,
          password: UserState.password,
          confirmpassword: UserState.confirmpassword,
        });
        toast.success("Register successful!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          navigate("/login");
        }, 700);
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
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
        <div className={styles.signup}>
          <div className={styles.heading}>QUIZZIE</div>
          <div className={styles.buttons}>
            <div className={styles.signupbut}>
              <button>Sign Up</button>
            </div>
            <div className={styles.loginbut}>
              <button onClick={handleLogin}>Login</button>
            </div>
          </div>
          <div>
            <form onSubmit={handleRegister} className={styles.centeredForm}>
              <table>
                <tbody>
                  <tr>
                    <td className={styles.ele1}>Name</td>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={UserState.name}
                        onChange={updateForm}
                        className={
                          errors.name ? styles.inputErrorbox : styles.inputbox
                        }
                        placeholder={errors.name ? errors.name : ""}
                      />
                    </td>
                  </tr>

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
                          errors.password ? styles.inputErrorbox : styles.inputbox
                        }
                        placeholder={errors.password ? errors.password : ""}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className={styles.ele1}>Confirm Password</td>
                    <td>
                      <input
                        type="text"
                        name="confirmpassword"
                        value={UserState.confirmpassword}
                        onChange={updateForm}
                        className={
                          errors.confirmpassword ? styles.inputErrorbox : styles.inputbox
                        }
                        placeholder={
                          errors.confirmpassword ? errors.confirmpassword : ""
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className={styles.signupbtn}>
                <button type="submit">
                  <div>Sign-Up</div>
                </button>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
