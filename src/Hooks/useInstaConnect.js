import axios from "axios";

const useInstaConnect = () => {
  const instaClientId = process.env.REACT_APP_INSTAGRAM_CLIENT_ID;
  const instaClientSecret = process.env.REACT_APP_INSTAGRAM_CLIENT_SECRET;
  const instaRedirectUri = process.env.REACT_APP_INSTAGRAM_REDIRECT_URI;

  const getuserInfo = async (access_token) => {
    try {
      const response = await axios.get(
        `https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`
      );
      if (response?.data) {
        console.log(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* Get Token */
  const getToken = async (code) => {
    const url = "https://api.instagram.com/oauth/access_token";
    const headers = {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };
    const params = `client_id=${instaClientId}&client_secret=${instaClientSecret}&grant_type=authorization_code&redirect_uri=${instaRedirectUri}&code=${code}`;
    try {
      const response = await axios.post(url, params, headers);
      if (response?.data) {
        const { access_token } = response.data;
        getuserInfo(access_token);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return getToken;
};

export default useInstaConnect;
