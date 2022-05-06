import React from "react";
import styles from "./Spinner.module.css";

const Spinner = ({ position }) => {
  return (
    <div className="w-fit mx-auto p-20">
      <div className={styles.spin} />
    </div>
  );
};

export default Spinner;
