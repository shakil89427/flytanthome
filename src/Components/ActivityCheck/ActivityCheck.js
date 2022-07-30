import React from "react";
import useAuthCheck from "../../Hooks/useAuthCheck";
import useStore from "../../Store/useStore";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import Toast from "../Toast/Toast";
import useCheckCode from "../../Hooks/useCheckCode";
import useLocationCheck from "../../Hooks/useLocationCheck";
import NewsCard from "../NewsCard/NewsCard";
import SingleCard from "../NewsCard/SingleCard";

const ActivityCheck = () => {
  const {
    authLoading,
    showLogin,
    showLogout,
    notify,
    showNewsCard,
    showSingleCard,
  } = useStore();
  useAuthCheck();
  useCheckCode();
  useLocationCheck();

  return (
    <>
      {showLogin && <Login />}
      {showLogout && <Logout />}
      {notify && <Toast />}
      {showNewsCard && <NewsCard />}
      {showSingleCard && <SingleCard />}
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
    </>
  );
};

export default ActivityCheck;
