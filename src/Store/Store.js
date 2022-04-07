import { useEffect, useState } from "react";
import app from "../Firebase/firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

/* Main Store */
const Store = () => {
  const auth = getAuth();
  const database = getFirestore();
  const [user, setUser] = useState({});
  const [userLoading, setUserLoading] = useState(false);

  /* Check current user */
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userRef = doc(database, "users", currentUser.uid);
        getDoc(userRef).then((res) => {
          const data = res.data();
          if (data) {
            setUser(data);
          }
        });
      } else {
        setUser({});
        setUserLoading(false);
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

// if (docs.length > 0) {
//   const userData = docs[0]?.data();
//   setUser(userData);
//   setUserLoading(false);
//   //This query will change as find single doc
// } else {
//   await setDoc(userRef, current);
//   setUser(current);
//   setUserLoading(false);
// }
