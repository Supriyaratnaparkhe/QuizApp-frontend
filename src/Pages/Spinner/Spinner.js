import React from "react";
import loading from "./loading.gif";
import styles from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles.fpContainer}>
      <img className={styles.fpLoader} src={loading} alt="loading" />
    </div>
  );
};

export default Spinner;
