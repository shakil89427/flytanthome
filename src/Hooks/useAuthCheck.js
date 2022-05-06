import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import useStore from "../Store/useStore";

const useAuthCheck = () => {
  const auth = getAuth();
  const database = getFirestore();
  const { setUser, setNotify, setAuthLoading } = useStore();
  const [run, setRun] = useState(true);

  const checkOnDB = async (currentUser) => {
    const userRef = doc(database, "users", currentUser.uid);
    try {
      const userData = await getDoc(userRef);
      const userFinalData = { ...userData.data(), id: userData?.id };
      if (userFinalData?.userId) {
        setUser(userFinalData);
        setAuthLoading(false);
      } else {
        setAuthLoading(false);
      }
    } catch (err) {
      setAuthLoading(false);
      setNotify({ status: false, message: err?.message });
    }
  };

  useEffect(() => {
    if (!run) return;
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        checkOnDB(currentUser);
      } else {
        setUser({});
        setAuthLoading(false);
      }
      setRun(false);
    });
  }, [auth]);
};

export default useAuthCheck;
