import axios from "axios";
import { doc, getFirestore, getDoc } from "firebase/firestore";
import useStore from "../../Store/useStore";

const useConnect = (setLoading) => {
  const db = getFirestore();
  const { setNotify, user, setUser } = useStore();

  /* Get User info */
  const getInfo = async (code) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://flytant.herokuapp.com/instainfo",
        {
          code,
          userId: user.id,
        }
      );
      if (response.data.success) {
        const userRef = doc(db, "users", user?.id);
        const response2 = await getDoc(userRef);
        setUser({ ...response2.data(), id: response2.id });
        setNotify({ status: true, message: "Instagram linked successfully" });
      } else {
        setLoading(false);
        setNotify({ status: false, message: "Cannot link instagram" });
      }
    } catch (err) {
      setLoading(false);
      setNotify({ status: false, message: "Cannot link instagram" });
    }
  };

  const openPopup = () => {
    const url = `https://www.instagram.com/oauth/authorize?scope=user_profile,user_media&response_type=code&state=instagram&redirect_uri=${process.env.REACT_APP_INSTAGRAM_REDIRECT_URI}&client_id=${process.env.REACT_APP_INSTAGRAM_CLIENT_ID}`;
    const options = `toolbar=no, menubar=no, width=400, height=550 left=${
      window.innerWidth / 2 - 200
    },top=${window.screen.availHeight / 2 - 275}`;

    localStorage.clear("instaCode");
    window.open(url, "instagram", options);

    let count = 0;
    let check = setInterval(() => {
      const code = localStorage.getItem("instaCode");
      if (count === 20000) {
        return clearInterval(check);
      }
      if (code?.length > 0) {
        getInfo(code);
        localStorage.clear("instaCode");
        return clearInterval(check);
      }
      count = count + 100;
    }, 100);
  };

  return { openPopup };
};

export default useConnect;
