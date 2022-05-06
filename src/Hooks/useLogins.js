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
import useAddUser from "./useAddUser";

const useLogins = () => {
  const auth = getAuth();
  const { addTempUser } = useAddUser();
  const { userLoading, setUserLoading, setNotify } = useStore();

  /* Common SignIn */
  const signIn = async (provider) => {
    if (userLoading) return;
    setUserLoading(true);
    try {
      const response = await signInWithPopup(auth, provider);
      if (response?.user) {
        addTempUser(response.user);
      }
    } catch (err) {
      setUserLoading(false);
      setNotify({ status: false, message: err.message });
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
