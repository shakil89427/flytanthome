import React, { useEffect, useState } from "react";
import cross from "../../Assets/cross.svg";
import { styles } from "./CommonStyles";
import useStore from "../../Store/useStore";
import Methods from "./Methods";
import SendOTP from "./SendOTP";
import VerifyOTP from "./VerifyOTP";
import UserName from "./UserName";
import TermsLink from "./TermsLink";

const Login = () => {
  const { user, setUser, setShowLogin } = useStore();
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
      setShow("username");
    }
    if (user?.userId) {
      setShowLogin(false);
    }
  }, [user]);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <>
      <div onClick={() => setShowLogin(false)} className={styles.main} />
      <div className="fixed z-[99999999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-[450px] overflow-y-scroll scrollbar max-h-[95vh]">
        <div className={styles.wrapper}>
          {/* Exit Button */}
          <img onClick={exit} className={styles.exit} src={cross} alt="" />

          {/* Login Methods */}
          {show === "methods" && <Methods setShow={setShow} />}

          {/* Get Phone Number And Send OTP */}
          {show === "sendOTP" && <SendOTP back={back} setShow={setShow} />}

          {/* Enter And Verify OTP */}
          {show === "verifyOTP" && <VerifyOTP setShow={setShow} />}

          {/* Get Username And Add User to DB*/}
          {show === "username" && <UserName back={back} />}

          {/* Terms and Conditions Linkup */}
          {!user.required && <TermsLink />}
        </div>
      </div>
    </>
  );
};

export default Login;
