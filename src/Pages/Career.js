import React, { useState } from "react";
import useStore from "../Store/useStore";
import Scroll from "../Components/Scroll/Scroll";
import ProgressBar from "../Components/ProgressBar/ProgressBar";
import ContactBar from "../Components/ContactBar/ContactBar";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import careerBg from "../Assets/career/careerBg.png";
import axios from "axios";

const styles = {
  main: "w-fit mx-auto px-5 py-20",
  bg: "w-full max-w-[800px]",
  title: "text-5xl lg:text-7xl font-bold text-center my-20",
  info: "text-2xl font-medium text-center mb-20 px-5",
  form: "my-20 grid grid-cols-2 gap-12 md:gap-y-20 md:gap-x-10 relative",
  input:
    "outline-0 border-b-2 py-2 border-black placeholder:text-lg placeholder:font-medium placeholder:text-gray-500 text-lg font-medium",
  progress: "absolute w-full bottom-20 md:bottom-24 left-0",
  btn: "bg-black text-white px-10 py-3 rounded-3xl text-lg font-medium",
};

const Career = () => {
  const { app, setNotify } = useStore();
  const storage = getStorage(app);
  const [data, setData] = useState({ ask: "" });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(0);
  const [loading, setLoading] = useState();

  const submitData = async (url, e) => {
    try {
      await axios.post(process.env.REACT_APP_CAREER_URL, { ...data, url });
      e.target.reset();
      setFile(null);
      setLoading(false);
      setNotify({ status: true, message: "Submitted Successfully.Thank you" });
    } catch (err) {
      setLoading(false);
      setNotify({ status: false, message: err.message });
    }
  };

  const uploadFile = (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `/files/${Date.now() + file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setUploading(true);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setUploaded(
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        );
      },
      (err) => {
        setUploading(false);
        setNotify({ status: false, message: err.message });
      },
      () => {
        setUploading(false);
        setLoading(true);
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => submitData(url, e))
          .catch((err) => {
            setLoading(false);
            setNotify({ status: false, message: err.message });
          });
      }
    );
  };

  return (
    <>
      <div className={styles.main}>
        <Scroll />
        <img className={styles.bg} src={careerBg} alt="" />
        <h1 className={styles.title}>We're Hiring</h1>
        <p className={styles.info}>
          Leave us a message. We’ll contact you soon
        </p>
        <form className={styles.form} onSubmit={uploadFile}>
          <input
            required
            className={`${styles.input} col-span-2 md:col-span-1`}
            type="text"
            placeholder="Name"
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <input
            required
            className={`${styles.input} col-span-2 md:col-span-1`}
            type="email"
            placeholder="Email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <textarea
            required
            className={`${styles.input} col-span-2`}
            rows="3"
            placeholder="Type Message Here"
            onChange={(e) => setData({ ...data, text: e.target.value })}
          />
          <input
            required
            id="career_file"
            className={`${styles.input} col-span-2 mt-10 pb-0 cursor-pointer`}
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className="col-span-2 relative mt-8 md:mt-0">
            <div className="absolute w-full -top-14 left-0">
              {uploading && (
                <p className="text-sm">
                  Uploading File
                  <span className="text-lg ml-1">{uploaded}%</span>
                </p>
              )}
              {loading && <ProgressBar />}
            </div>
            <button type="submit" className={styles.btn}>
              Submit
            </button>
          </div>
        </form>
      </div>
      <ContactBar />
    </>
  );
};

export default Career;
