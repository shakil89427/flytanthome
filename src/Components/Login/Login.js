import React, { useEffect, useState } from "react";
import { styles } from "./CommonStyles";
import useStore from "../../Store/useStore";
import Methods from "./Methods";
import SendOTP from "./SendOTP";
import VerifyOTP from "./VerifyOTP";
import UserName from "./UserName";
import TermsLink from "./TermsLink";

const Login = () => {
  const { user, setUser, userLoading, setShowLogin } = useStore();
  const [show, setShow] = useState("methods");

  const back = () => {
    if (user?.required) {
      setUser({});
    }
    setShow("methods");
  };

  const exit = () => {
    if (user?.required) {
      setUser({});
      return setShowLogin(false);
    }
    setShowLogin(false);
  };

  useEffect(() => {
    if (user?.required) {
      setShow("");
    }
    if (user?.userId) {
      setShowLogin(false);
    }
  }, [user]);

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        {/* Spinner */}
        {userLoading && (
          <div className={styles.spinnerContainer}>
            <div className="spinner"></div>
          </div>
        )}

        {/* Exit Button */}
        <p onClick={exit} className={styles.exit}>
          x
        </p>

        {/* Login Methods */}
        {show === "methods" && <Methods setShow={setShow} />}

        {/* Get Phone Number And Send OTP */}
        {show === "sendOTP" && <SendOTP back={back} setShow={setShow} />}

        {/* Enter And Verify OTP */}
        {show === "verifyOTP" && <VerifyOTP setShow={setShow} />}

        {/* Get Username And Add User to DB*/}
        {user?.required && <UserName back={back} />}

        {/* Terms and Conditions Linkup */}
        {!user.required && <TermsLink />}
      </div>
    </div>
  );
};

export default Login;
