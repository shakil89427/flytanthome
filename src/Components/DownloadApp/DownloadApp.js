import React, { useEffect } from "react";
import playstoreWhite from "../../Assets/playstoreWhite.png";
import { AiFillApple } from "react-icons/ai";
import cross from "../../Assets/cross.svg";

const styles = {
  appMain:
    "w-fit flex gap-3 flex-wrap mt-10  items-center justify-center  text-white mx-auto",
  appBtn:
    "bg-black w-48 flex items-center pl-5 py-1 border-2 border-white rounded-lg z-10 cursor-pointer hover:scale-105 duration-150",
  appIcon: "text-3xl mr-2",
  download: "text-sm font-medium text-gray-300",
  appCatagory: "font-semibold text-xl leading-none mb-1",
};

const DownloadApp = ({ setShowDownload }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <>
      <div
        onClick={() => setShowDownload(false)}
        className="fixed w-full h-full bg-[#07070783] top-0 left-0 z-20"
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-white px-5 py-12 rounded-md w-[95%] max-w-[700px]">
        <img
          onClick={() => setShowDownload(false)}
          className="absolute top-3 right-3 w-6 cursor-pointer"
          src={cross}
          alt=""
        />
        <p className="text-xl md:text-2xl font-semibold text-center">
          Download the App and Apply for the Campaigns
        </p>
        <div className={styles.appMain}>
          <a
            onClick={() => setShowDownload(false)}
            href="https://play.google.com/store/apps/details?id=influencer.marketing.flytant"
            target="_blank"
            rel="noreferrer"
            className={styles.appBtn}
          >
            <img className="w-6 mr-3" src={playstoreWhite} alt="" />
            <div>
              <p className={styles.download}>GET IT ON</p>
              <p className={styles.appCatagory}>Play Store</p>
            </div>
          </a>
          <a
            onClick={() => setShowDownload(false)}
            href="https://apps.apple.com/in/app/flytant/id1530158515"
            target="_blank"
            rel="noreferrer"
            className={styles.appBtn}
          >
            <AiFillApple className={styles.appIcon} />
            <div>
              <p style={{ fontSize: "11px" }} className={styles.download}>
                DOWNLOAD ON THE
              </p>
              <p className={styles.appCatagory}>App Store</p>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default DownloadApp;
