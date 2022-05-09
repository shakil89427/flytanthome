import axios from "axios";
import useStore from "../../Store/useStore";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

const useYoutubeConnect = (setLoading) => {
  const { user, setUser, setNotify } = useStore();
  const db = getFirestore();

  const addToDb = (channelId) => {
    const userRef = doc(db, "users", user.id);
    const updated = {
      linkedAccounts: user?.linkedAccounts
        ? { ...user.linkedAccounts, Youtube: { channelId } }
        : { Youtube: { channelId } },
    };
    updateDoc(userRef, updated)
      .then(() => {
        setUser({ ...user, ...updated });
        setNotify({ status: true, message: "Youtube linked successfully" });
      })
      .catch((err) => {
        setNotify({ status: false, message: "Cannot link Youtube" });
        setLoading(false);
      });
  };

  const getChannels = async (token) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/channels",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            part: "id",
            mine: true,
          },
        }
      );
      const channels = response?.data?.items?.map((item) => item.id);
      addToDb(channels[0]);
    } catch (err) {
      setNotify({ status: false, message: "Cannot link Youtube" });
      setLoading(false);
    }
  };

  const openPopup = () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/youtube.readonly&response_type=token&state=youtubev3&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;
    const options = `toolbar=no, menubar=no, width=400, height=550 left=${
      window.innerWidth / 2 - 200
    },top=${window.screen.availHeight / 2 - 275}`;

    localStorage.clear("youtubeToken");
    window.open(url, "youtube", options);

    let count = 0;
    let check = setInterval(() => {
      const token = localStorage.getItem("youtubeToken");
      if (count === 20000) {
        return clearInterval(check);
      }
      if (token?.length > 0) {
        getChannels(token);
        localStorage.clear("youtubeToken");
        return clearInterval(check);
      }
      count = count + 100;
    }, 100);
  };

  return { openPopup };
};

export default useYoutubeConnect;
