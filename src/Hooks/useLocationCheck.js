import axios from "axios";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import useStore from "../Store/useStore";

const useLocationCheck = () => {
  const { user, setUser } = useStore();
  const db = getFirestore();

  const updateInfo = async () => {
    try {
      const basic = await axios.get(
        `https://extreme-ip-lookup.com/json/?key=${process.env.REACT_APP_IP_KEY}`
      );
      const { country, countryCode } = basic.data;
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, { country, countryCode });
      const getData = await getDoc(userRef);
      setUser({ ...getData.data(), id: getData.id });
    } catch (err) {}
  };

  useEffect(() => {
    if (!user?.userId) return;
    if (user?.country || user?.countryCode) return;
    updateInfo();
  }, [user]);
};

export default useLocationCheck;
