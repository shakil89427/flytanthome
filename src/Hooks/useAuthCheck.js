import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import useStore from "../Store/useStore";

const useAuthCheck = () => {
  const { setUser, setUserLoading, setNotify } = useStore();
  const auth = getAuth();
  const database = getFirestore();

  const checkOnDB = async (currentUser) => {
    const userRef = doc(database, "users", currentUser.uid);
    try {
      const userData = await getDoc(userRef);
      const userFinalData = userData.data();
      if (userFinalData?.userId) {
        setUser(userFinalData);
        setUserLoading(false);
      }
    } catch (err) {
      setUserLoading(false);
      setNotify({ status: false, message: err?.message });
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        checkOnDB(currentUser);
      } else {
        setUser({});
        setUserLoading(false);
      }
    });
  }, [auth]);
};

export default useAuthCheck;
