import { useState } from "react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../Firebase/firebaseConfig";
import useAuthCheck from "../Hooks/useAuthCheck";

/* Initialize Firebase */
const app = initializeApp(firebaseConfig);

/* Main Store */
const Store = () => {
  const [user, setUser] = useState({});
  const [userLoading, setUserLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [notify, setNotify] = useState(false);
  const [featuredInfluencers, setFeaturedInfluencers] = useState({
    data: [],
    lastVisible: false,
  });
  const [latestSponsorships, setLatestSponsorships] = useState({
    data: [],
    lastVisible: false,
  });
  const [paidSponsorships, setPaidSponsorships] = useState({
    data: [],
    lastVisible: false,
  });
  const [barterSponsorships, setBarterSponsorships] = useState({
    data: [],
    lastVisible: false,
  });
  const [popularInfluencers, setPopularInfluencers] = useState({
    data: [],
    lastVisible: false,
  });

  /* Auth Status Check */
  useAuthCheck(setUser, setUserLoading, setNotify);

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
    featuredInfluencers,
    setFeaturedInfluencers,
    latestSponsorships,
    setLatestSponsorships,
    paidSponsorships,
    setPaidSponsorships,
    barterSponsorships,
    setBarterSponsorships,
    popularInfluencers,
    setPopularInfluencers,
  };
};

export default Store;
