import { useEffect, useState } from "react";
import app from "../Firebase/firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";

/* Main Store */
const Store = () => {
  const auth = getAuth();
  const [user, setUser] = useState({});
  const [userLoading, setUserLoading] = useState(false);

  /* Check current user */
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser({});
      }
    });
  }, [auth]);

  /* Returned Items */
  return {
    user,
    setUser,
    userLoading,
    setUserLoading,
  };
};

export default Store;
