import axios from "axios";
import useStore from "../../Store/useStore";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getString } from "firebase/remote-config";

const useConnect = (setLoading) => {
  const { user, setUser, setNotify, remoteConfig } = useStore();
  const db = getFirestore();

  /* Get Info and update on db */
  const getInfo = async (code) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://flytant.herokuapp.com/twitterinfo",
        {
          code,
          userId: user.id,
        }
      );
      if (response.data.success) {
        const userRef = doc(db, "users", user.id);
        const response2 = await getDoc(userRef);
        setUser({ ...response2.data(), id: response2.id });
        setNotify({ status: true, message: "Twitter linked successfully" });
      } else {
        setLoading(false);
        setNotify({ status: false, message: "Cannot link Twitter" });
      }
    } catch (err) {
      setLoading(false);
      setNotify({ status: false, message: "Cannot link Twitter" });
    }
  };

  /* Create popup */
  const openPopup = async () => {
    try {
      const { client_id, redirect_uri } = await JSON.parse(
        getString(remoteConfig, "twitter_keys")
      );

      const state = `access${Date.now()}`;

      const url = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=tweet.read%20users.read%20follows.read%20offline.access&state=${state}&code_challenge=challenge&code_challenge_method=plain`;

      const options = `toolbar=no, menubar=no, width=400, height=550 left=${
        window.innerWidth / 2 - 200
      },top=${window.screen.availHeight / 2 - 275}`;

      window.open(url, "twitter", options);

      window.addEventListener("storage", () => {
        const access = localStorage.getItem(state);
        if (access?.includes(state)) {
          const code = access.split("code=")[1];
          getInfo(code);
          localStorage.clear(state);
        }
      });
    } catch (err) {}
  };

  return { openPopup };
};

export default useConnect;
