import React from "react";
import styles from "./ProgressBar.module.css";

const ProgressBar = () => {
  return (
    <div className={styles.main}>
      <div className={styles.progress} />
    </div>
  );
};

export default ProgressBar;
