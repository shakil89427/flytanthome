import { useState } from "react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../Firebase/firebaseConfig";
import useAuthCheck from "../Hooks/useAuthCheck";

/* Initialize Firebase */
const app = initializeApp(firebaseConfig);

/* Main Store */
const Store = () => {
  const [user, setUser] = useState({});
  const [userLoading, setUserLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [notify, setNotify] = useState(false);

  /* Auth Status Check */
  useAuthCheck(setUser, setUserLoading, setNotify);

  /* Returned Items */
  return {
    app,
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
