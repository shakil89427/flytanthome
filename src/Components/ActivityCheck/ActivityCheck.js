import React from "react";
import useAuthCheck from "../../Hooks/useAuthCheck";
import useStore from "../../Store/useStore";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import Toast from "../Toast/Toast";
import Spinner from "../Spinner/Spinner";
import useCheckCode from "../../Hooks/useCheckCode";
import useLocationCheck from "../../Hooks/useLocationCheck";
import useNotifications from "../../Hooks/useNotifications";
import NewsCard from "../NewsCard/NewsCard";
import SingleCard from "../NewsCard/SingleCard";
import { useEffect } from "react";

const styles = {
  spinnerDiv:
    "fixed top-0 left-0 w-full z-[999999999] h-screen flex items-center justify-center bg-[#8d8b8b4f]",
};

const ActivityCheck = () => {
  const {
    showLogin,
    showLogout,
    notify,
    authLoading,
    setUserLoading,
    userLoading,
    showNewsCard,
    showSingleCard,
  } = useStore();
  useAuthCheck();
  useCheckCode();
  useLocationCheck();
  useNotifications();

  useEffect(() => {
    if (!showLogin) {
      setUserLoading(false);
    }
  }, [showLogin]);

  return (
    <>
      {showLogin && <Login />}
      {showLogout && <Logout />}
      {notify && <Toast />}
      {authLoading && (
        <div className="barwrapper">
          <div className="barmain">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
            <div className="bar4"></div>
            <div className="bar5"></div>
          </div>
          <p className="bartext">
            <i>Please Wait...</i>
          </p>
        </div>
      )}
      {showNewsCard && <NewsCard />}
      {showSingleCard && <SingleCard />}
      {userLoading && (
        <div className={styles.spinnerDiv}>
          <Spinner />
        </div>
      )}
    </>
  );
};

export default ActivityCheck;
