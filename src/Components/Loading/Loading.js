import React from "react";
import styles from "./Loading.module.css";

const Loading = ({ position }) => {
  return (
    <div className="z-50 fixed w-full h-screen bg-[#ffffff81] top-0 left-0 flex items-center justify-center">
      <div className={styles.global}>
        <div className={styles.top}>
          <div className={styles.plane}></div>
        </div>
        <div className={styles.middle}>
          <div className={styles.plane}></div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.plane}></div>
        </div>

        <p className={styles.loading}>
          <i>LOADING...</i>
        </p>
      </div>
    </div>
  );
};

export default Loading;
