import { useState } from "react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../Firebase/firebaseConfig";
import useAuthCheck from "../Hooks/useAuthCheck";

/* Initialize Firebase */
initializeApp(firebaseConfig);

/* Main Store */
const Store = () => {
  const [user, setUser] = useState({});
  const [userLoading, setUserLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [notify, setNotify] = useState(false);

  /* Activities */
  useAuthCheck(setUser, setUserLoading);

  /* Returned Items */
  return {
    user,
    setUser,
    userLoading,
    setUserLoading,
    showLogin,
    setShowLogin,
    notify,
    setNotify,
  };
};

export default Store;
