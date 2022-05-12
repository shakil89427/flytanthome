import axios from "axios";
import useStore from "../../Store/useStore";
import { doc, getFirestore, getDoc } from "firebase/firestore";

const useConnect = (setLoading) => {
  const { user, setUser, setNotify } = useStore();
  const db = getFirestore();

  /* Get Info and update on db */
  const getInfo = async (code) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://flytant.herokuapp.com/tiktokinfo",
        {
          code,
          userId: user.id,
        }
      );
      if (response.data.success) {
        const userRef = doc(db, "users", user.id);
        const response2 = await getDoc(userRef);
        setUser({ ...response2.data(), id: response2.id });
        setNotify({ status: true, message: "Tiktok linked successfully" });
      } else {
        setLoading(false);
        setNotify({ status: false, message: "Cannot link Tiktok" });
      }
    } catch (err) {
      setLoading(false);
      setNotify({ status: false, message: "Cannot link Tiktok" });
    }
  };

  const getTiktokCode = () => {
    const code = localStorage.getItem("tiktokCode");
    getInfo(code);
    localStorage.clear("tiktokCode");
  };

  /* Create popup */
  const openPopup = () => {
    const url = `https://www.tiktok.com/auth/authorize?response_type=code&client_key=${process.env.REACT_APP_TIKTOK_CLIENT_KEY}&redirect_uri=${process.env.REACT_APP_TIKTOK_REDIRECT_URI}&scope=user.info.basic,video.list&state=tiktok`;
    const options = `toolbar=no, menubar=no, width=400, height=550 left=${
      window.innerWidth / 2 - 200
    },top=${window.screen.availHeight / 2 - 275}`;

    localStorage.clear("tiktokCode");
    window.open(url, "tiktok", options);
    window.addEventListener("storage", getTiktokCode, { once: true });
  };

  return { openPopup };
};

export default useConnect;
