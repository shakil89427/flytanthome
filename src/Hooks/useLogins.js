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
  const { setUser, userLoading, setShowLogout, setNotify } = useStore();

  /* Common SignIn */
  const signIn = async (provider) => {
    if (userLoading) return;
    try {
      const response = await signInWithPopup(auth, provider);
      if (response?.user) {
        addTempUser(response.user);
      }
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
        setUser({});
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
