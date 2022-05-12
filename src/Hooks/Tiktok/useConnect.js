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

  /* Create popup */
  const openPopup = () => {
    const state = `access${Date.now()}`;
    const url = `https://www.tiktok.com/auth/authorize?response_type=code&client_key=${process.env.REACT_APP_TIKTOK_CLIENT_KEY}&redirect_uri=${process.env.REACT_APP_TIKTOK_REDIRECT_URI}&scope=user.info.basic,video.list&state=${state}`;
    const options = `toolbar=no, menubar=no, width=400, height=550 left=${
      window.innerWidth / 2 - 200
    },top=${window.screen.availHeight / 2 - 275}`;

    localStorage.clear("access");
    window.open(url, "tiktok", options);

    let check = setInterval(() => {
      const access = localStorage.getItem("access");
      if (access?.includes(state)) {
        clearInterval(check);
        const code = access.split("code=")[1].split("&scopes=")[0];
        getInfo(code);
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
