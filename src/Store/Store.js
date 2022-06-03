import { useState } from "react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../Firebase/firebaseConfig";
import { getRemoteConfig } from "firebase/remote-config";
/* Initialize Firebase */
const app = initializeApp(firebaseConfig);
const remoteConfig = getRemoteConfig(app);
remoteConfig.settings.minimumFetchIntervalMillis = 300000;

/* Main Store */
const Store = () => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [countryCode, setCountryCode] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [notify, setNotify] = useState(false);
  const [allPlans, setAllPlans] = useState([]);
  const [plans, setPlans] = useState([]);
  const [myCampaigns, setMyCampaigns] = useState([]);
  const [featuredInfluencers, setFeaturedInfluencers] = useState({
    data: [],
    lastVisible: false,
  });
  const [popularInfluencers, setPopularInfluencers] = useState({
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
  const [blogsData, setBlogsData] = useState({
    all: [],
    carousel: [],
    notCarousel: [],
  });
  const [loaded, setLoaded] = useState([]);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [latestIndex, setLatestIndex] = useState(0);
  const [paidIndex, setPaidIndex] = useState(0);
  const [barterIndex, setBarterIndex] = useState(0);
  const [popularIndex, setPopularIndex] = useState(0);
  const [sponsorships, setSponsorships] = useState([]);
  const [instagramData, setInstagramData] = useState([]);
  const [youtubeData, setYoutubeData] = useState([]);
  const [twitterData, setTwitterData] = useState([]);
  const [tiktokData, setTiktokData] = useState([]);

  /* Returned Items */
  return {
    app,
    remoteConfig,
    user,
    setUser,
    countryCode,
    setCountryCode,
    users,
    setUsers,
    authLoading,
    setAuthLoading,
    userLoading,
    setUserLoading,
    showLogin,
    setShowLogin,
    showLogout,
    setShowLogout,
    notify,
    setNotify,
    allPlans,
    setAllPlans,
    plans,
    setPlans,
    myCampaigns,
    setMyCampaigns,
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
    sponsorships,
    setSponsorships,
    featuredIndex,
    setFeaturedIndex,
    latestIndex,
    setLatestIndex,
    paidIndex,
    setPaidIndex,
    barterIndex,
    setBarterIndex,
    popularIndex,
    setPopularIndex,
    instagramData,
    setInstagramData,
    youtubeData,
    setYoutubeData,
    twitterData,
    setTwitterData,
    tiktokData,
    setTiktokData,
    blogsData,
    setBlogsData,
    loaded,
    setLoaded,
  };
};

export default Store;
