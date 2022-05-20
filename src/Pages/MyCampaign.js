import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  AiFillInstagram,
  AiFillYoutube,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import useStore from "../Store/useStore";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

/* Styles Start */
const styles = {
  nonSelect: "text-lg md:text-xl text-gray-600 cursor-pointer font-medium",
  selected:
    "text-lg md:text-xl font-semibold relative before:content-[''] before:absolute before:w-[140%] before:max-w-[150px] before:left-1/2 before:-translate-x-1/2 before:h-[3px] before:bg-black before:-bottom-[2px] before:rounded-full",
  applied: "bg-[#F5B63A] text-white px-3 py-1 rounded-tl-md rounded-bl-md mb-2",
  image: "w-full aspect-[12/8]",
  typeWrapper: "flex items-center justify-between",
  type: "px-3 py-1 my-2 rounded-2xl text-xs font-medium",
  title: "font-semibold my-1 text-lg",
  bottomWrapper: "flex flex-col gap-2",
  followers: "text-xs font-medium",
  icons: "text-[#B4B4B4] flex items-center gap-1 text-lg",
  next: "absolute bg-white top-[35%] -right-3 z-10 w-14 px-1 text-5xl shadow-xl rounded-tl-3xl rounded-bl-3xl cursor-pointer select-none",
};
/* Styles End */

const MyCampaign = () => {
  const { user } = useStore();
  const db = getFirestore();
  const colRef = collection(db, "sponsorship");
  const [selected, setSelected] = useState("All");
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    getDocs(colRef)
      .then((res) => {
        const allDocs = res.docs.map((item) => ({
          ...item.data(),
          id: item.id,
        }));
        setAllData(allDocs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (selected === "All") {
      return setFilteredData(allData);
    }
    if (selected === "Live") {
      setFilteredData(allData.filter((item) => item?.isApproved));
    }
    if (selected === "Review") {
      setFilteredData(allData.filter((item) => !item?.isApproved));
    }
  }, [allData, selected]);

  return (
    <div className="r-box my-20">
      <div className="px-5">
        <h1 className="text-2xl font-semibold mb-3">My Campaigns</h1>
        <p className="text-gray-600">List of all campaigns created by you</p>
        <div className="w-[80%] mx-auto my-12">
          <div className="flex flex-wrap items-center gap-6 md:gap-12">
            <p
              onClick={() => selected !== "All" && setSelected("All")}
              className={
                selected === "All" ? styles.selected : styles.nonSelect
              }
            >
              All
            </p>
            <p
              onClick={() => selected !== "Live" && setSelected("Live")}
              className={
                selected === "Live" ? styles.selected : styles.nonSelect
              }
            >
              Live
            </p>
            <p
              onClick={() => selected !== "Review" && setSelected("Review")}
              className={
                selected === "Review" ? styles.selected : styles.nonSelect
              }
            >
              Under Review
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-x-10 gap-y-14 mt-24">
            {filteredData.map((sponsorship) => (
              <div
                key={sponsorship?.id}
                className="relative shadow-lg rounded-lg border-t-8 border-b-8"
              >
                <div className="absolute top-4 right-0">
                  <p className={styles.applied}>
                    {sponsorship?.applied ? sponsorship.applied : "0"} applied
                  </p>
                  <p
                    style={{
                      backgroundColor: sponsorship?.isApproved
                        ? "green"
                        : "red",
                    }}
                    className="text-white px-3 py-1 rounded-tl-md rounded-bl-md"
                  >
                    {sponsorship?.isApproved ? "Approved" : "In Review"}
                  </p>
                </div>

                <div className={styles.image}>
                  <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${sponsorship?.blob[0].path})`,
                    }}
                    alt=""
                  />
                </div>

                <div className="p-2 pb-4">
                  <div className={styles.typeWrapper}>
                    <p
                      style={{
                        backgroundColor: sponsorship?.barter
                          ? "#FFDE2F"
                          : "#3FD5F5",
                      }}
                      className={styles.type}
                    >
                      {sponsorship?.barter
                        ? "Paid Campaign"
                        : "Barter Campaign"}
                    </p>
                    <p className="text-xs">
                      {moment(sponsorship?.creationDate * 1000).fromNow()}
                    </p>
                  </div>

                  <p className={styles.title}>{sponsorship?.name}</p>

                  <div className={styles.bottomWrapper}>
                    <p className={styles.followers}>
                      Min{" "}
                      {sponsorship.minFollowers < 1000
                        ? sponsorship.minFollowers
                        : Math.abs(sponsorship.minFollowers / 1000)
                            .toString()
                            .slice(0, 3) + "k"}{" "}
                      followers required
                    </p>

                    <div className="flex justify-between">
                      <div className={styles.icons}>
                        {sponsorship?.platforms?.includes("Instagram") && (
                          <AiFillInstagram />
                        )}
                        {sponsorship?.platforms?.includes("Twitter") && (
                          <AiFillYoutube />
                        )}

                        {sponsorship?.platforms?.includes("Twitter") && (
                          <AiFillTwitterSquare />
                        )}
                        {sponsorship?.platforms?.includes("Twitter") && (
                          <FaTiktok className="w-3" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCampaign;