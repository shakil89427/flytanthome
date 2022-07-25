import React from "react";
import "./Toast.css";
import useStore from "../../Store/useStore";
import { GiTireIronCross } from "react-icons/gi";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { CgDanger } from "react-icons/cg";
import useAnalytics from "../../Hooks/useAnalytics";

/* Styles Start */
const styles = {
  main: "fixed top-0 left-[50%] translate-x-[-50%] z-[999999999999999]",
  toast: "toastMessage w-[350px] rounded-md py-1 px-3 text-white text-xs",
  head: "flex items-center justify-between mb-[3px]",
  status: "flex items-center gap-1 text-lg font-medium",
};
/* Styles End */

const Toast = () => {
  const { notify, setNotify } = useStore();
  setTimeout(() => setNotify(false), 4000);
  const { addLog } = useAnalytics();

  return (
    <div className={styles.main}>
      <div
        style={{ backgroundColor: notify?.status ? "green" : "red" }}
        className={styles.toast}
      >
        <div className={styles.head}>
          <span className={styles.status}>
            {notify?.status ? <BsFillCheckCircleFill /> : <CgDanger />}
            {notify?.status ? "Success" : "Error"}
          </span>
          <GiTireIronCross
            onClick={() => {
              addLog("notification_closed_by_user");
              setNotify(false);
            }}
            className="cursor-pointer"
          />
        </div>
        <p className="mb-1">{notify?.message}</p>
      </div>
    </div>
  );
};

export default Toast;
