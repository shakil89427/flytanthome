import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import useStore from "../Store/useStore";
import { formatPhoneNumberIntl } from "react-phone-number-input";

const useAuthCheck = () => {
  const auth = getAuth();
  const database = getFirestore();
  const { setUser, setNotify, setAuthLoading, setAuthState } = useStore();

  const checkOnDB = async (currentUser) => {
    const userRef = doc(database, "users", currentUser.uid);
    try {
      const userData = await getDoc(userRef);
      const userFinalData = { ...userData.data(), id: userData?.id };
      if (userFinalData?.userId) {
        setUser(userFinalData);
        setAuthState(false);
        setAuthLoading(false);
      } else {
        let current = {
          deviceType: "Website",
          email: currentUser?.email || "",
          freeTrials: 3,
          profileImageUrl: "",
          shouldShowInfluencer: false,
          userId: currentUser.uid,
        };
        if (currentUser?.phoneNumber?.length > 1) {
          const [, ...rest] = formatPhoneNumberIntl(
            currentUser?.phoneNumber
          ).split(" ");
          const num = rest.toString().replace(/,/g, "");
          current.phoneNumber = num;
        } else {
          current.phoneNumber = "";
        }
        setUser({ required: true, tempData: current });
        setAuthState(false);
        setAuthLoading(false);
      }
    } catch (err) {
      setAuthState(false);
      setAuthLoading(false);
      setNotify({ status: false, message: err?.message });
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (current) => {
      if (current) {
        setAuthLoading(true);
        checkOnDB(current);
      } else {
        setUser({});
        setAuthState(false);
        setAuthLoading(false);
      }
    });
  }, []);
};

export default useAuthCheck;
