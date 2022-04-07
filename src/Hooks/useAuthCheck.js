import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const useAuthCheck = (setUser) => {
  const auth = getAuth();
  const database = getFirestore();

  const checkOnDB = async (currentUser) => {
    const userRef = doc(database, "users", currentUser.uid);
    try {
      const userData = await getDoc(userRef);
      const userFinalData = userData.data();
      if (userFinalData?.userId) setUser(userFinalData);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        checkOnDB(currentUser);
      } else {
        setUser({});
      }
    });
  }, [auth]);
};

export default useAuthCheck;
