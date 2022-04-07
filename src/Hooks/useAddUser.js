import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import useStore from "../Store/useStore";

const useAddUser = () => {
  const database = getFirestore();
  const { user, setUser, setUserLoading } = useStore();

  const addTempUser = async (data) => {
    const userRef = doc(database, "users", data.uid);
    try {
      const userData = await getDoc(userRef);
      const finalData = userData.data();
      if (finalData) {
        setUser(finalData);
        return setUserLoading(false);
      }
      const current = {
        deviceType: "Website",
        email: data.email,
        freeTrials: 3,
        phoneNumber: data.phoneNumber,
        profileImageUrl: data.photoURL,
        shouldShowInfluencer: false,
        userId: data.uid,
      };
      setUser({ required: true, tempData: current });
      setUserLoading(false);
    } catch (err) {
      setUserLoading(false);
      alert(err);
    }
  };

  const addUserToDB = (username) => {
    const regex = /^[0-9a-zA-Z]+$/;
    if (!username.match(regex)) {
      return alert("Type alphanumeric only");
    }
    if (username.length < 3) {
      return alert("username cannot be less than 3 characters");
    }
    if (username.length > 15) {
      return alert("username cannot be more than 15 characters");
    }
    setUserLoading(true);
    const newData = { ...user.tempData, username };
    const userRef = doc(database, "users", newData.userId);
    setDoc(userRef, newData)
      .then(() => {
        setUser(newData);
        setUserLoading(false);
      })
      .catch((err) => {
        setUserLoading(false);
        alert(err);
      });
  };
  return { addTempUser, addUserToDB };
};

export default useAddUser;
