import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebaseConfig from "../Firebase/firebaseConfig";
import { getRemoteConfig } from "firebase/remote-config";
import mixpanel from "mixpanel-browser";

/* Initialize Firebase */
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const remoteConfig = getRemoteConfig(app);
remoteConfig.settings.minimumFetchIntervalMillis = 1800000;

/* Initialize mixpanel */
mixpanel.init(process.env.REACT_APP_MIXPANEL_SECRET, { ignore_dnt: true });

const mixpanelLog = (event) => {
  mixpanel.track(event);
};

/* Main Store */
const Store = () => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [countryCode, setCountryCode] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [authState, setAuthState] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [notify, setNotify] = useState(false);
  const [allPlans, setAllPlans] = useState([]);
  const [plans, setPlans] = useState([]);
  const [course, setCourse] = useState({});
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
  const [mySponsorships, setMySponsorships] = useState({
    data: [],
    lastVisible: false,
  });
  const [mostAppliedSponsorships, setMostAppliedSponsorships] = useState({
    data: [],
    lastVisible: false,
  });
  const [appliedSponsorships, setAppliedSponsorships] = useState({
    data: [],
    lastVisible: false,
  });
  const [blogsData, setBlogsData] = useState({
    all: [],
    carousel: [],
    notCarousel: [],
  });
  const [allImages, setAllImages] = useState({});
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
  const [flytantYoutube, setFlytantYoutube] = useState({});
  const [flytantShow, setFlytantShow] = useState([]);
  const [flytantIndex, setFlytantIndex] = useState(0);
  const [notifications, setNotifications] = useState({
    data: [],
    lastVisible: false,
  });
  const [blogIndex, setBlogIndex] = useState(0);
  const [myIndex, setMyIndex] = useState(0);
  const [mostIndex, setMostIndex] = useState(0);
  const [appliedIndex, setAppliedIndex] = useState(0);
  const [routes, setRoutes] = useState(false);
  const [allNews, setAllNews] = useState({ data: [], lastVisible: false });
  const [newsIndex, setNewsIndex] = useState(0);
  const [showNewsCard, setShowNewsCard] = useState(false);
  const [showSingleCard, setShowSingleCard] = useState(false);
  const [selectedSection, setSelectedScetion] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [products, setProducts] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [customText, setCustomText] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [instagramResults, setInstagramResults] = useState({
    prev: false,
    next: false,
    data: [],
  });
  const [youtubeResults, setYoutubeResults] = useState({
    prev: false,
    next: false,
    data: [],
  });
  const [twitterResults, setTwitterResults] = useState({
    prev: false,
    next: false,
    data: [],
  });
  const [searchImages, setSearchImages] = useState({});
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    if (!user?.userId) {
      setMySponsorships({ data: [], lastVisible: false });
      setAppliedSponsorships({ data: [], lastVisible: false });
      setMyCampaigns([]);
      setMyIndex(0);
      setAppliedIndex(0);
      setSelectedScetion(false);
      setSelectedVideo({});
      setNotifications({ data: [], lastVisible: false });
      setMyOrders([]);
    }
  }, [user]);

  /* Returned Items */
  return {
    app,
    analytics,
    remoteConfig,
    user,
    setUser,
    countryCode,
    setCountryCode,
    users,
    setUsers,
    authLoading,
    setAuthLoading,
    authState,
    setAuthState,
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
    flytantYoutube,
    setFlytantYoutube,
    flytantShow,
    setFlytantShow,
    flytantIndex,
    setFlytantIndex,
    notifications,
    setNotifications,
    blogIndex,
    setBlogIndex,
    mySponsorships,
    setMySponsorships,
    mostAppliedSponsorships,
    setMostAppliedSponsorships,
    appliedSponsorships,
    setAppliedSponsorships,
    myIndex,
    setMyIndex,
    mostIndex,
    setMostIndex,
    appliedIndex,
    setAppliedIndex,
    routes,
    setRoutes,
    course,
    setCourse,
    allNews,
    setAllNews,
    newsIndex,
    setNewsIndex,
    showNewsCard,
    setShowNewsCard,
    showSingleCard,
    setShowSingleCard,
    searchKeyword,
    setSearchKeyword,
    activeCategory,
    setActiveCategory,
    instagramResults,
    setInstagramResults,
    youtubeResults,
    setYoutubeResults,
    twitterResults,
    setTwitterResults,
    searchImages,
    setSearchImages,
    selectedSection,
    setSelectedScetion,
    selectedVideo,
    setSelectedVideo,
    products,
    setProducts,
    allReviews,
    setAllReviews,
    customText,
    setCustomText,
    quantity,
    setQuantity,
    allImages,
    setAllImages,
    myOrders,
    setMyOrders,
    mixpanelLog,
  };
};

export default Store;
