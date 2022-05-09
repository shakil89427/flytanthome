import axios from "axios";
import useStore from "../../Store/useStore";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

const useConnect = (details) => {
  const { user, setUser, setNotify } = useStore();
  const db = getFirestore();

  /* Get Info and update on db */
  const getInfo = async (code) => {
    try {
      const response = await axios.post("http://localhost:5000/twitterinfo", {
        code,
      });
      const updated = {
        linkedAccounts: user?.linkedAccounts
          ? { ...user.linkedAccounts, Twitter: { ...response.data } }
          : { Twitter: { ...response.data } },
      };
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, updated);
      setUser({ ...user, ...updated });
      setNotify({ status: true, message: "Twitter linked successfully" });
    } catch (err) {
      setNotify({ status: false, message: "Cannot link Twitter" });
    }
  };

  /* Create popup */
  const openPopup = () => {
    const url = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_TWITTER_OAUTH2_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_TWITTER_REDIRECT_URI}&scope=tweet.read%20users.read%20follows.read%20offline.access&state=twitter&code_challenge=challenge&code_challenge_method=plain`;
    const options = `toolbar=no, menubar=no, width=400, height=550 left=${
      window.innerWidth / 2 - 200
    },top=${window.screen.availHeight / 2 - 275}`;

    localStorage.clear("twitterCode");
    window.open(url, "twitter", options);

    let count = 0;
    let check = setInterval(() => {
      const code = localStorage.getItem("twitterCode");
      if (count === 20000) {
        return clearInterval(check);
      }
      if (code?.length > 0) {
        getInfo(code);
        localStorage.clear("twitterCode");
        return clearInterval(check);
      }
      count = count + 100;
    }, 100);
  };

  return { openPopup };
};

export default useConnect;
