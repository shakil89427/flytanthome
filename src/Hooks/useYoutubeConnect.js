import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useStore from "../Store/useStore";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

const useYoutubeConnect = () => {
  const { user, userLoading, setUser, setNotify } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const db = getFirestore();

  const addToDb = (channelId) => {
    const userRef = doc(db, "users", user.id);
    const updated = {
      linkedAccounts: { ...user.linkedAccounts, Youtube: { channelId } },
    };
    updateDoc(userRef, updated)
      .then(() => {
        setUser({ ...user, ...updated });
        setNotify({ status: true, message: "Youtube linked successfully" });
        navigate("/", { replace: true });
      })
      .catch(() => {
        setNotify({ status: false, message: "Cannot link Youtube" });
        navigate("/", { replace: true });
      });
  };

  const getChannels = async (token) => {
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
    }
  };

  useEffect(() => {
    if (userLoading) return;
    if (location?.hash?.includes("state=youtubev3") && user?.id) {
      const token = location?.hash?.split("token=")[1]?.split("&token_type")[0];
      getChannels(token);
    }
  }, [userLoading]);
};

export default useYoutubeConnect;
