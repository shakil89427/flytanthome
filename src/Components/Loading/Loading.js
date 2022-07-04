import React from "react";
import styles from "./Loading.module.css";
import flytant from "../../Assets/flytant.png";

const Loading = () => {
  return (
    <div className="z-50 fixed w-full h-screen bg-[#ffffff81] top-0 left-0 flex flex-col items-center justify-center">
      <div className={styles.loader}>
        <img src={flytant} alt="" />
      </div>
    </div>
  );
};

export default Loading;
