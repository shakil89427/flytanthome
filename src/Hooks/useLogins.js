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

const useLogins = () => {
  const auth = getAuth();
  const { setUser, setShowLogout, setNotify } = useStore();

  /* Common SignIn */
  const signIn = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      setNotify({
        status: false,
        message: err?.message?.split("/")[1]?.split(")")[0],
      });
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
      .then(() => {
        setShowLogout(false);
      })
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
