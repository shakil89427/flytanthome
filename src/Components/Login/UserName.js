import React, { useState } from "react";
import { styles } from "./CommonStyles";
import { BiArrowBack } from "react-icons/bi";
import useAddUser from "../../Hooks/useAddUser";

const UserName = ({ back }) => {
  const { addUserToDB } = useAddUser();
  const [username, setUsername] = useState("");

  const addUser = (e) => {
    e.preventDefault();
    addUserToDB(username);
  };

  return (
    <div className={styles.inputsMain}>
      <BiArrowBack onClick={back} className={styles.back} />
      <form className={styles.usernameForm} onSubmit={addUser}>
        <p>Enter your username</p>
        <input
          minLength="3"
          className={styles.username}
          placeholder="Enter username here"
          type="text"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value.slice(0, 15).toLowerCase())
          }
        />
        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserName;
