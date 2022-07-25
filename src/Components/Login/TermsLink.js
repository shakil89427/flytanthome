import React from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../Store/useStore";
import { styles } from "./CommonStyles";
import useAnalytics from "../../Hooks/useAnalytics";

const TermsLink = () => {
  const { setShowLogin } = useStore();
  const navigate = useNavigate();
  const { addLog } = useAnalytics();

  const redirect = (to) => {
    navigate(to);
    setShowLogin(false);
  };
  return (
    <p className={styles.condition}>
      Click "Sign In" to agree to Flytant's
      <span
        className={styles.linkup}
        onClick={() => {
          addLog("terms_of_service");
          redirect("/terms");
        }}
      >
        Terms of Service
      </span>
      and acknowledge that Flytant's
      <span
        className={styles.linkup}
        onClick={() => {
          addLog("privacy_policy");
          redirect("/privacy");
        }}
      >
        Privacy Policy
      </span>
      applies to you.
    </p>
  );
};

export default TermsLink;
