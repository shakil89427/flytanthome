import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { fetchAndActivate } from "firebase/remote-config";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import { useNavigate } from "react-router-dom";
import useStore from "../Store/useStore";

const useAddUser = () => {
  const navigate = useNavigate();
  const database = getFirestore();
  const {
    user,
    remoteConfig,
    setUser,
    setUserLoading,
    setNotify,
    countryCode,
  } = useStore();

  const addTempUser = async (data) => {
    const userRef = doc(database, "users", data.uid);
    try {
      await fetchAndActivate(remoteConfig);
      const userData = await getDoc(userRef);
      const finalData = { ...userData.data(), id: userData.id };
      if (finalData?.userId) {
        setUser(finalData);
        setUserLoading(false);
        return navigate("/");
      }
      let current = {
        deviceType: "Website",
        email: data?.email ? data?.email : "",
        freeTrials: 3,
        profileImageUrl: "",
        shouldShowInfluencer: false,
        userId: data.uid,
      };
      if (data?.phoneNumber?.length > 1) {
        const [, ...rest] = formatPhoneNumberIntl(data?.phoneNumber).split(" ");
        const num = rest.toString().replace(/,/g, "");
        current.phoneNumber = num;
      } else {
        current.phoneNumber = "";
      }
      setUser({ required: true, tempData: current });
      setUserLoading(false);
    } catch (err) {
      setUserLoading(false);
      setNotify({ status: false, message: err?.message });
    }
  };

  const addUserToDB = async (username) => {
    const regex = /^[0-9a-zA-Z]+$/;
    if (!username.match(regex)) {
      return setNotify({ status: false, message: "Type alphanumeric only" });
    }
    setUserLoading(true);
    try {
      const colRef = collection(database, "users");
      const q = query(colRef, where("username", "==", username), limit(1));
      const exist = await getDocs(q);
      if (exist?.docs?.length > 0) {
        setUserLoading(false);
        return setNotify({ status: false, message: "Username already taken" });
      }
      let newData = { ...user.tempData, username };
      if (countryCode) {
        newData.countryCode = countryCode;
      }
      const userRef = doc(database, "users", newData.userId);
      await setDoc(userRef, newData);
      setUser({ ...newData, id: newData.userId });
      setUserLoading(false);
      navigate("/");
    } catch (err) {
      setUserLoading(false);
      setNotify({ status: false, message: "Something went wrong" });
    }
  };
  return { addTempUser, addUserToDB };
};

export default useAddUser;
