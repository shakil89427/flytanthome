import React from "react";
import useAuthCheck from "../../Hooks/useAuthCheck";
import useStore from "../../Store/useStore";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import Toast from "../Toast/Toast";
import Loading from "../Loading/Loading";
import Spinner from "../Spinner/Spinner";
import useCheckCode from "../../Hooks/useCheckCode";
import useLocationCheck from "../../Hooks/useLocationCheck";
import useNotifications from "../../Hooks/useNotifications";
import NewsCard from "../NewsCard/NewsCard";
import SingleCard from "../NewsCard/SingleCard";

const styles = {
  spinnerDiv:
    "fixed top-0 left-0 w-full h-screen z-50 flex items-center justify-center bg-[#8d8b8b4f]",
};

const ActivityCheck = () => {
  const {
    showLogin,
    showLogout,
    notify,
    authLoading,
    userLoading,
    showNewsCard,
    showSingleCard,
  } = useStore();
  useAuthCheck();
  useCheckCode();
  useLocationCheck();
  useNotifications();

  return (
    <>
      {showLogin && <Login />}
      {showLogout && <Logout />}
      {notify && <Toast />}
      {authLoading && <Loading />}
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
