import { useState } from "react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../Firebase/firebaseConfig";
import useAuthCheck from "../Hooks/useAuthCheck";

/* Initialize Firebase */
initializeApp(firebaseConfig);

/* Main Store */
const Store = () => {
  const [user, setUser] = useState({});
  const [userLoading, setUserLoading] = useState(false);

  /* Activities */
  useAuthCheck(setUser);

  /* Returned Items */
  return {
    user,
    setUser,
    userLoading,
    setUserLoading,
  };
};

export default Store;
