import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  // addDoc,
  // collection,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";

const useAuthCheck = (setUser, setUserLoading, setNotify) => {
  const auth = getAuth();
  const database = getFirestore();

  // const addData = (old) => {
  //   setInterval(() => {
  //     let result = "";
  //     const characters =
  //       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //     const charactersLength = characters.length;
  //     for (var i = 0; i < charactersLength; i++) {
  //       result += characters.charAt(
  //         Math.floor(Math.random() * charactersLength)
  //       );
  //     }
  //     function randomDate(start, end) {
  //       return new Date(
  //         start.getTime() + Math.random() * (end.getTime() - start.getTime())
  //       );
  //     }

  //     const d = randomDate(new Date(1980, 0, 1), new Date());
  //     const val = d.toDateString();
  //     const dateOfBirth = val.slice(3, val.length);
  //     const countryCode = result.slice(5, 7);
  //     const email = result.slice(0, 15) + "@gmail.com";
  //     const socialScore = Math.floor(Math.random() * 1000);
  //     const gender = socialScore % 2 ? "Male" : "Female";
  //     const name = result.slice(12, 20);
  //     const userId = result.slice(12, result.length - 1);
  //     const username = name;
  //     const profileImageUrl = `https://picsum.photos/200/300?random=${socialScore}`;
  //     const shouldShowInfluencer = socialScore % 2 ? true : false;
  //     const shouldShowTrending = !shouldShowInfluencer;

  //     const newData = {
  //       ...old,
  //       dateOfBirth,
  //       countryCode,
  //       email,
  //       socialScore,
  //       gender,
  //       name,
  //       username,
  //       userId,
  //       profileImageUrl,
  //       shouldShowInfluencer,
  //       shouldShowTrending,
  //     };
  //     const colRef = collection(database, "users");
  //     addDoc(colRef, newData);
  //   }, 1000);
  // };

  const checkOnDB = async (currentUser) => {
    const userRef = doc(database, "users", currentUser.uid);
    try {
      const userData = await getDoc(userRef);
      const userFinalData = userData.data();
      if (userFinalData?.userId) {
        setUser(userFinalData);
        // addData(userFinalData);
        setUserLoading(false);
      }
    } catch (err) {
      setUserLoading(false);
      setNotify({ status: false, message: err?.message });
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        checkOnDB(currentUser);
      } else {
        setUser({});
        setUserLoading(false);
      }
    });
  }, [auth]);
};

export default useAuthCheck;
