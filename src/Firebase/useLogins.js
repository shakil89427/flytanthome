import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import useStore from "../Store/useStore";

const useLogins = () => {
  const auth = getAuth();
  const { setUser, setUserLoading } = useStore();

  /* Google SignIn */
  const googleSignIn = async () => {
    setUserLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const response = await signInWithPopup(auth, provider);
      if (response?.user) {
        setUser(response.user);
        setUserLoading(false);
      }
    } catch (err) {
      console.log(err);
      setUserLoading(false);
    }
  };

  /* Signout */
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  /* Returned Items */
  return {
    googleSignIn,
    signOutUser,
  };
};

export default useLogins;
