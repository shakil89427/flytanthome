import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import useStore from "../Store/useStore";

const useAddUser = () => {
  const navigate = useNavigate();
  const database = getFirestore();
  const { user, setUser, setUserLoading, setNotify } = useStore();

  const addTempUser = async (data) => {
    const userRef = doc(database, "users", data.uid);
    try {
      const userData = await getDoc(userRef);
      const finalData = userData.data();
      if (finalData) {
        setUser(finalData);
        setUserLoading(false);
        return navigate("/");
      }
      const current = {
        deviceType: "Website",
        email: data.email ? data.email : "",
        freeTrials: 3,
        phoneNumber: data.phoneNumber ? data.phoneNumber : "",
        profileImageUrl: "",
        shouldShowInfluencer: false,
        userId: data.uid,
      };
      setUser({ required: true, tempData: current });
      setUserLoading(false);
    } catch (err) {
      setUserLoading(false);
      setNotify({ status: false, message: err?.message });
    }
  };

  const addUserToDB = (username) => {
    const regex = /^[0-9a-zA-Z]+$/;
    if (!username.match(regex)) {
      return setNotify({ status: false, message: "Type alphanumeric only" });
    }
    if (username.length < 3) {
      return setNotify({
        status: false,
        message: "username cannot be less than 3 characters",
      });
    }
    if (username.length > 15) {
      return setNotify({
        status: false,
        message: "username cannot be more than 15 characters",
      });
    }
    setUserLoading(true);
    const newData = { ...user.tempData, username };
    const userRef = doc(database, "users", newData.userId);
    setDoc(userRef, newData)
      .then(() => {
        setUser(newData);
        setUserLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setUserLoading(false);
        setNotify({ status: false, message: err?.message });
      });
  };
  return { addTempUser, addUserToDB };
};

export default useAddUser;
