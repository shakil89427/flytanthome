import React, { useState } from "react";
import { styles } from "./CommonStyles";
import { BiArrowBack } from "react-icons/bi";
import useAddUser from "../../Hooks/useAddUser";
import useAnalytics from "../../Hooks/useAnalytics";
import useStore from "../../Store/useStore";

const UserName = ({ back }) => {
  const { authLoading } = useStore();
  const { addUserToDB } = useAddUser();
  const [username, setUsername] = useState("");
  const { addLog } = useAnalytics();

  const addUser = (e) => {
    e.preventDefault();
    addLog("submit_login_username");
    addUserToDB(username);
  };

  return (
    <div className={styles.inputsMain}>
      <BiArrowBack onClick={back} className={styles.back} />
      <form className={styles.usernameForm} onSubmit={addUser}>
        <p>Enter your username</p>
        <input
          disabled={authLoading}
          minLength="3"
          className={styles.username}
          placeholder="Enter username here"
          type="text"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value.slice(0, 15).toLowerCase())
          }
        />
        <button
          disabled={authLoading}
          type="submit"
          className={` text-white p-3 border-0 rounded-3xl w-full ${
            authLoading ? "bg-gray-400" : "bg-black"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserName;
