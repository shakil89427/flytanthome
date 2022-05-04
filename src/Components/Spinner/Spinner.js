import React from "react";
import styles from "./Spinner.module.css";

const Spinner = ({ position }) => {
  return (
    <div
      className={`w-full top-0 left-0 flex items-center justify-center z-50 ${
        position ? "absolute h-60" : "fixed h-screen bg-[#8080807a]"
      }`}
    >
      <div className={styles.spin} />
    </div>
  );
};

export default Spinner;
