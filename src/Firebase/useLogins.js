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
  const { setUser, userLoading, setUserLoading } = useStore();

  /* Main SignIn */
  const signIn = async (provider) => {
    if (userLoading) return;
    setUserLoading(true);
    try {
      const response = await signInWithPopup(auth, provider);
      console.log(response);
      if (response?.user) {
        setUser(response.user);
        setUserLoading(false);
      }
    } catch (err) {
      console.log(err);
      setUserLoading(false);
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
