import axios from "axios";
import useStore from "../../Store/useStore";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const useConnect = (setLoading) => {
  const { user, setUser, setNotify } = useStore();
  const db = getFirestore();

  /* Get channelId and set to user db */
  const getInfo = async (token) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://flytant.herokuapp.com/youtubeinfo",
        {
          token,
          userId: user.id,
        }
      );
      if (response.data.success) {
        const userRef = doc(db, "users", user.id);
        const response2 = await getDoc(userRef);
        setUser({ ...response2.data(), id: response2.id });
        setNotify({ status: true, message: "Youtube linked successfully" });
      } else {
        setNotify({ status: false, message: "Cannot link Youtube" });
        setLoading(false);
      }
    } catch (err) {
      setNotify({ status: false, message: "Cannot link Youtube" });
      setLoading(false);
    }
  };

  const openPopup = () => {
    const state = `access${Date.now()}`;
    const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/youtube.readonly&response_type=token&state=${state}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;
    const options = `toolbar=no, menubar=no, width=400, height=550 left=${
      window.innerWidth / 2 - 200
    },top=${window.screen.availHeight / 2 - 275}`;

    localStorage.clear("access");
    window.open(url, "youtube", options);

    let check = setInterval(() => {
      const access = localStorage.getItem("access");
      if (access?.includes(state)) {
        clearInterval(check);
        const token = access.split("access_token=")[1].split("&token_type=")[0];
        getInfo(token);
        localStorage.clear("access");
      }
    }, 1000);

    setTimeout(() => {
      clearInterval(check);
    }, 120000);
  };

  return { openPopup };
};

export default useConnect;
