import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import useStore from "../Store/useStore";
import { fetchAndActivate } from "firebase/remote-config";

const useAuthCheck = () => {
  const auth = getAuth();
  const database = getFirestore();
  const { remoteConfig, setUser, setNotify, authLoading, setAuthLoading } =
    useStore();
  const [currentUser, setCurrentUser] = useState(false);

  const checkOnDB = async () => {
    const userRef = doc(database, "users", currentUser.uid);
    try {
      await fetchAndActivate(remoteConfig);
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
    if (currentUser && authLoading) {
      checkOnDB();
    }
  }, [currentUser]);

  useEffect(() => {
    onAuthStateChanged(auth, (current) => {
      if (current) {
        setCurrentUser(current);
      } else {
        setAuthLoading(false);
      }
    });
  }, [auth]);
};

export default useAuthCheck;
