import { useEffect } from "react";
import useStore from "../Store/useStore";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

const useNotifications = () => {
  const { user, notifications, setNotifications } = useStore();
  const db = getFirestore();

  useEffect(() => {
    const colRef = collection(db, "notifications");
    if (user?.id && notifications?.length < 1) {
      onSnapshot(colRef, (allData) => {
        const valid = allData?.docs?.map((doc) => ({
          ...doc?.data(),
          id: doc?.id,
        }));
        setNotifications(valid);
      });
    }
  }, [user]);
};

export default useNotifications;
