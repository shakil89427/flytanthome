import {
  collection,
  doc,
  getDocs,
  getFirestore,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import useStore from "../Store/useStore";

const useAddUser = () => {
  const database = getFirestore();
  const { user, setUser, setAuthLoading, setNotify, countryCode } = useStore();

  const addUserToDB = async (username) => {
    const regex = /^[0-9a-zA-Z]+$/;
    if (!username.match(regex)) {
      return setNotify({ status: false, message: "Type alphanumeric only" });
    }
    setAuthLoading(true);
    try {
      const colRef = collection(database, "users");
      const q = query(colRef, where("username", "==", username), limit(1));
      const exist = await getDocs(q);
      if (exist?.docs?.length > 0) {
        setAuthLoading(false);
        return setNotify({ status: false, message: "Username already taken" });
      }
      let newData = { ...user.tempData, username };
      if (countryCode) {
        newData.countryCode = countryCode;
      }
      const userRef = doc(database, "users", newData.userId);
      await setDoc(userRef, newData);
      setUser({ ...newData, id: newData.userId });
      return setAuthLoading(false);
    } catch (err) {
      setAuthLoading(false);
      setNotify({ status: false, message: "Something went wrong" });
    }
  };
  return { addUserToDB };
};

export default useAddUser;
