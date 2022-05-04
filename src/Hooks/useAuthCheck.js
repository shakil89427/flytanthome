import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import useStore from "../Store/useStore";

const useAuthCheck = () => {
  const auth = getAuth();
  const database = getFirestore();
  const { setUser, setUserLoading, setNotify } = useStore();

  const checkOnDB = async (currentUser) => {
    const userRef = doc(database, "users", currentUser.uid);
    try {
      const userData = await getDoc(userRef);
      const userFinalData = { ...userData.data(), id: userData?.id };
      if (userFinalData?.id) {
        setUser(userFinalData);
        setUserLoading(false);
      } else {
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
