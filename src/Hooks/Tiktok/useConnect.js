import axios from "axios";
import useStore from "../../Store/useStore";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

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
        }
      );
      const updated = {
        linkedAccounts: user?.linkedAccounts
          ? { ...user.linkedAccounts, Tiktok: { ...response.data } }
          : { Tiktok: { ...response.data } },
      };
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, updated);
      setUser({ ...user, ...updated });
      setNotify({ status: true, message: "Tiktok linked successfully" });
    } catch (err) {
      setLoading(false);
      setNotify({ status: false, message: "Cannot link Tiktok" });
    }
  };

  /* Create popup */
  const openPopup = () => {
    const url = `https://www.tiktok.com/auth/authorize?response_type=code&client_key=${process.env.REACT_APP_TIKTOK_CLIENT_KEY}&redirect_uri=${process.env.REACT_APP_TIKTOK_REDIRECT_URI}&scope=user.info.basic,video.list&state=tiktok`;
    const options = `toolbar=no, menubar=no, width=400, height=550 left=${
      window.innerWidth / 2 - 200
    },top=${window.screen.availHeight / 2 - 275}`;

    localStorage.clear("tiktokCode");
    window.open(url, "tiktok", options);

    let count = 0;
    let check = setInterval(() => {
      const code = localStorage.getItem("tiktokCode");
      if (count === 20000) {
        return clearInterval(check);
      }
      if (code?.length > 0) {
        getInfo(code);
        localStorage.clear("tiktokCode");
        return clearInterval(check);
      }
      count = count + 100;
    }, 100);
  };

  return { openPopup };
};

export default useConnect;
