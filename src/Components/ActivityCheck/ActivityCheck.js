import React from "react";
import useAuthCheck from "../../Hooks/useAuthCheck";
import useInstaConnect from "../../Hooks/useInstaConnect";
import useYoutubeConnect from "../../Hooks/useYoutubeConnect";
import useStore from "../../Store/useStore";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import Toast from "../Toast/Toast";
import Loading from "../Loading/Loading";
import Spinner from "../Spinner/Spinner";

const styles = {
  spinnerDiv:
    "fixed top-0 left-0 w-full h-screen z-50 flex items-center justify-center bg-[#8d8b8b4f]",
};

const ActivityCheck = () => {
  const { showLogin, showLogout, notify, authLoading, userLoading } =
    useStore();
  useAuthCheck();
  useInstaConnect();
  useYoutubeConnect();

  return (
    <>
      {showLogin && <Login />}
      {showLogout && <Logout />}
      {notify && <Toast />}
      {authLoading && <Loading />}
      {userLoading && (
        <div className={styles.spinnerDiv}>
          <Spinner />
        </div>
      )}
    </>
  );
};

export default ActivityCheck;
