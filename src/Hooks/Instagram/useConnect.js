import axios from "axios";
import useStore from "../../Store/useStore";

const useConnect = () => {
  const { setNotify } = useStore();
  const instaClientId = process.env.REACT_APP_INSTAGRAM_CLIENT_ID;
  const instaClientSecret = process.env.REACT_APP_INSTAGRAM_CLIENT_SECRET;
  const instaRedirectUri = process.env.REACT_APP_INSTAGRAM_REDIRECT_URI;

  const getFullData = async (username) => {
    try {
      const response = await axios.get(
        `https://www.instagram.com/${username}/channel/?__a=1`
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const getuserInfo = async (access_token) => {
    try {
      const response = await axios.get(
        `https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`
      );
      if (response?.data) {
        getFullData(response.data.username);
      }
    } catch (err) {
      setNotify({ status: false, message: err?.message });
    }
  };

  /* Get Token */
  const getToken = async (event) => {
    if (!event?.data?.instagram) return;
    const code = event?.data?.code;
    const url = "https://api.instagram.com/oauth/access_token";
    const headers = {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };
    const params = `client_id=${instaClientId}&client_secret=${instaClientSecret}&grant_type=authorization_code&redirect_uri=${instaRedirectUri}&code=${code}`;
    try {
      const response = await axios.post(url, params, headers);
      getuserInfo(response.data.access_token);
    } catch (err) {
      setNotify({ status: false, message: err?.message });
    }
  };

  const openPopup = () => {
    const url = `https://www.instagram.com/oauth/authorize?scope=user_profile,user_media&response_type=code&state=instagram&redirect_uri=${process.env.REACT_APP_INSTAGRAM_REDIRECT_URI}&client_id=${process.env.REACT_APP_INSTAGRAM_CLIENT_ID}`;
    const options =
      "toolbar=no, menubar=no, width=400, height=600, top=100, left=100";

    window.open(url, "Instagram", options);
    window.addEventListener("message", (event) => getToken(event), {
      once: true,
    });
  };

  return { openPopup };
};

export default useConnect;
