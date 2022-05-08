import axios from "axios";

const useConnect = () => {
  /* Get tokens */
  const getToken = async (code) => {
    const url = "https://api.twitter.com/2/oauth2/token";

    const params = `client_id=${process.env.REACT_APP_TWITTER_OAUTH2_CLIENT_ID}&grant_type=authorization_code&redirect_uri=${process.env.REACT_APP_TWITTER_REDIRECT_URI}&code=${code}&code_verifier=challenge`;

    const headers = {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };

    try {
      const response1 = await axios.post(url, params, headers);
      console.log(response1.data);
    } catch (err) {
      console.log(err);
    }
  };

  /* Create popup */
  const openPopup = () => {
    const url = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_TWITTER_OAUTH2_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_TWITTER_REDIRECT_URI}&scope=tweet.read%20users.read%20follows.read%20offline.access&state=twitter&code_challenge=challenge&code_challenge_method=plain`;
    const options = "toolbar=no, menubar=no, width=400, height=600";

    window.open(url, "twitter", options);
    localStorage.clear("twitterCode");
    let check = setInterval(() => {
      const code = localStorage.getItem("twitterCode");
      if (code?.length > 0) {
        clearInterval(check);
        getToken(code);
        localStorage.clear("twitterCode");
      }
    }, 100);
  };

  return { openPopup };
};

export default useConnect;
