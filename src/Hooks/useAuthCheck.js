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
          socialCardEnabled: true,
          socialCard: {
            brandImageUrl:
              "https://firebasestorage.googleapis.com/v0/b/flytant-cb72e.appspot.com/o/flytant_image%2Fappicon.png?alt=media&token=f8f276ff-8186-4d51-87fb-b608dcc532d6",
            featureImageUrl:
              "https://firebasestorage.googleapis.com/v0/b/flytant-cb72e.appspot.com/o/socail_card_default_feature_graphic%2Fimage_2022_07_05T07_03_49_436Z.png?alt=media&token=b13c47e5-c6ce-421b-93dd-46b42fa30db4",
            profileImageUrl:
              "https://firebasestorage.googleapis.com/v0/b/flytant-cb72e.appspot.com/o/default_user_image%2FGroup%201763.png?alt=media&token=ef261d0b-a8d9-4791-a0c5-2d8338b77ea3",
            bio: "",
            manualLocation: "",
            name: "",
            qrCodeUrl: "",
          },
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
