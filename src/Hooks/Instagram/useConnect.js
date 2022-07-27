import axios from "axios";
import { doc, getFirestore, getDoc } from "firebase/firestore";
import { fetchAndActivate, getString } from "firebase/remote-config";
import useStore from "../../Store/useStore";

const useConnect = (setLoading) => {
  const db = getFirestore();
  const { setNotify, user, setUser, remoteConfig } = useStore();

  /* Get User info */
  const getInfo = async (code) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://arcane-castle-29935.herokuapp.com/instainfo",
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

  const openPopup = async () => {
    try {
      await fetchAndActivate(remoteConfig);
      const { redirect_uri, instagram_app_id } = await JSON.parse(
        getString(remoteConfig, "instagram_keys")
      );

      const state = `access${Date.now()}`;

      const url = `https://www.instagram.com/oauth/authorize?scope=user_profile,user_media&response_type=code&state=${state}&redirect_uri=${redirect_uri}&client_id=${instagram_app_id}`;

      const options = `toolbar=no, menubar=no, width=400, height=550 left=${
        window.innerWidth / 2 - 200
      },top=${window.screen.availHeight / 2 - 275}`;

      window.open(url, "instagram", options);

      window.addEventListener("storage", () => {
        const access = localStorage.getItem(state);
        if (access?.includes(state)) {
          const code = access.split("code=")[1].split("&state=")[0];
          getInfo(code);
          localStorage.clear(state);
        }
      });
    } catch (err) {}
  };

  return { openPopup };
};

export default useConnect;
