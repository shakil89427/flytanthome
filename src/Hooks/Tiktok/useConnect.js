import axios from "axios";
import useStore from "../../Store/useStore";
import { doc, getFirestore, getDoc } from "firebase/firestore";
import { getString } from "firebase/remote-config";

const useConnect = (setLoading) => {
  const { user, setUser, setNotify, remoteConfig } = useStore();
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
  const openPopup = async () => {
    try {
      const secrets = await JSON.parse(getString(remoteConfig, "tiktok_keys"));

      const state = `access${Date.now()}`;

      const url = `https://www.tiktok.com/auth/authorize?response_type=code&client_key=${secrets.client_key}&redirect_uri=${secrets.redirect_uri}&scope=user.info.basic,video.list&state=${state}`;

      const options = `toolbar=no, menubar=no, width=400, height=550 left=${
        window.innerWidth / 2 - 200
      },top=${window.screen.availHeight / 2 - 275}`;

      window.open(url, "tiktok", options);

      window.addEventListener("storage", () => {
        const access = localStorage.getItem(state);
        if (access?.includes(state)) {
          const code = access.split("code=")[1].split("&scopes=")[0];
          getInfo(code);
          localStorage.clear(state);
        }
      });
    } catch (err) {}
  };

  return { openPopup };
};

export default useConnect;
