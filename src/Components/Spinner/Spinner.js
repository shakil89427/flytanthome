import React from "react";
import styles from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className="fixed w-full h-screen top-0 left-0 flex items-center justify-center bg-[#8080807a] z-50">
      <div className={styles.spin} />
    </div>
  );
};

export default Spinner;
