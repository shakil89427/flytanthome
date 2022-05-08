import axios from "axios";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import useStore from "../../Store/useStore";

const useConnect = (setLoading) => {
  const db = getFirestore();
  const { setNotify, user, setUser } = useStore();

  /* Add token to user db */
  const addTokenToUser = (data) => {
    const tokenInfo = {
      accessToken: data?.access_token,
      tokenExpires: Date.now() + data?.expires_in * 1000,
    };
    axios
      .get(
        `https://graph.instagram.com/me?fields=id,username&access_token=${tokenInfo?.accessToken}`
      )
      .then((res) => {
        const info = { username: res.data.username, instaId: res.data.id };
        const updatedData = {
          linkedAccounts: user?.linkedAccounts
            ? { ...user?.linkedAccounts, Instagram: { ...info, ...tokenInfo } }
            : { Instagram: { ...info, ...tokenInfo } },
        };
        const userRef = doc(db, "users", user?.id);
        updateDoc(userRef, updatedData)
          .then(() => {
            setUser({ ...user, ...updatedData });
            setLoading(false);
            setNotify({
              status: true,
              message: "Instagram linked successfully",
            });
          })
          .catch((err) => {
            setLoading(false);
            setNotify({ status: false, message: "Cannot link Instagram" });
          });
      })
      .catch((err) => {
        setLoading(false);
        setNotify({ status: false, message: "Cannot link Instagram" });
      });
  };

  /* Get Token */
  const getToken = async (code) => {
    setLoading(true);
    try {
      /* Short live token */
      const response1 = await axios.post(
        "https://api.instagram.com/oauth/access_token",
        `client_id=${process.env.REACT_APP_INSTAGRAM_CLIENT_ID}&client_secret=${process.env.REACT_APP_INSTAGRAM_CLIENT_SECRET}&grant_type=authorization_code&redirect_uri=${process.env.REACT_APP_INSTAGRAM_REDIRECT_URI}&code=${code}`,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      /* Long live token */
      const response2 = await axios.get(
        "https://graph.instagram.com/access_token",
        {
          params: {
            grant_type: "ig_exchange_token",
            client_secret: process.env.REACT_APP_INSTAGRAM_CLIENT_SECRET,
            access_token: response1.data.access_token,
          },
        }
      );
      addTokenToUser(response2.data);
    } catch (err) {
      setLoading(false);
      setNotify({ status: false, message: "Cannot link Instagram" });
    }
  };

  const openPopup = () => {
    const url = `https://www.instagram.com/oauth/authorize?scope=user_profile,user_media&response_type=code&state=instagram&redirect_uri=${process.env.REACT_APP_INSTAGRAM_REDIRECT_URI}&client_id=${process.env.REACT_APP_INSTAGRAM_CLIENT_ID}`;
    const options = "toolbar=no, menubar=no, width=400, height=600";

    let popup = window.open(url, "Instagram", options);
    let check = setInterval(() => {
      try {
        if (popup.location.search.includes("state=instagram")) {
          clearInterval(check);
          const code = popup?.location?.search
            ?.split("code=")[1]
            ?.split("&state")[0];
          getToken(code);
          popup.close();
        }
      } catch (err) {}
    }, 100);
  };

  return { openPopup };
};

export default useConnect;
