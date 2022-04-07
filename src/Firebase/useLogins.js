import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import useStore from "../Store/useStore";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const useLogins = () => {
  const auth = getAuth();
  const database = getFirestore();
  const { setUser, userLoading, setUserLoading } = useStore();

  /* Common SignIn */
  const signIn = async (provider) => {
    if (userLoading) return;
    setUserLoading(true);
    try {
      const response = await signInWithPopup(auth, provider);
      if (response.user) {
        const userRef = doc(database, "users", response.user.uid);
        const userData = await getDoc(userRef);
        const finalData = userData.data();
        if (finalData) {
          setUser(finalData);
          return setUserLoading(false);
        }
        const current = {
          deviceType: "Website",
          email: response.user.email,
          freeTrials: 3,
          phoneNumber: response.user.phoneNumber,
          profileImageUrl: response.user.photoURL,
          shouldShowInfluencer: false,
          userId: response.user.uid,
        };
        setUser({ required: true, tempData: current });
        setUserLoading(false);
      }
    } catch (err) {
      setUserLoading(false);
      alert(err);
    }
  };

  /* Google SignIn */
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signIn(provider);
  };

  /* Facebook SignIn */
  const facebookSignIn = () => {
    const provider = new FacebookAuthProvider();
    signIn(provider);
  };

  /* Facebook SignIn */
  const twitterSignIn = () => {
    const provider = new TwitterAuthProvider();
    signIn(provider);
  };

  /* Apple SignIn */
  const appleSignIn = () => {
    const provider = new OAuthProvider("apple.com");
    signIn(provider);
  };

  /* Signout */
  const signOutUser = () => {
    signOut(auth)
      .then(() => {})
      .catch((err) => {});
  };

  /* Returned Items */
  return {
    googleSignIn,
    facebookSignIn,
    twitterSignIn,
    appleSignIn,
    signOutUser,
  };
};

export default useLogins;
