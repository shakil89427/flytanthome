import { useState } from "react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../Firebase/firebaseConfig";

/* Initialize Firebase */
const app = initializeApp(firebaseConfig);

/* Main Store */
const Store = () => {
  const [user, setUser] = useState({});
  const [userLoading, setUserLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [notify, setNotify] = useState(false);
  const [laitestSponsorships, setLaitestSponsorships] = useState([]);
  const [paidSponsorships, setPaidSponsorships] = useState([]);
  const [barterSponsorships, setBarterSponsorships] = useState([]);

  /* Returned Items */
  return {
    app,
    user,
    setUser,
    userLoading,
    setUserLoading,
    showLogin,
    setShowLogin,
    notify,
    setNotify,
    laitestSponsorships,
    setLaitestSponsorships,
    paidSponsorships,
    setPaidSponsorships,
    barterSponsorships,
    setBarterSponsorships,
  };
};

export default Store;
