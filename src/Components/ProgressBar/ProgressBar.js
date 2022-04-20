import React from "react";
import styles from "./ProgressBar.module.css";

const ProgressBar = () => {
  return (
    <div className="">
      <p className="text-sm mb-1">Submitting Data</p>
      <div className={styles.main}>
        <div className={styles.progress} />
      </div>
    </div>
  );
};

export default ProgressBar;
