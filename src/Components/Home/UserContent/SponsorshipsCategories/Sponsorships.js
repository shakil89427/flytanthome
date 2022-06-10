import React from "react";
import "swiper/css";
import {
  AiFillInstagram,
  AiFillYoutube,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import millify from "millify";
import Spinner from "../../../Spinner/Spinner";

/* Styles Start */
const styles = {
  heading: "font-semibold text-xl md:text-2xl mb-10 text-center",
  applied:
    "bg-[#F5B63A] text-white absolute top-4 right-0 px-3 py-1 rounded-tl-full rounded-bl-full shadow-xl",
  image: "w-full h-full rounded-md bg-cover bg-center bg-no-repeat",
  typeWrapper: "flex items-center justify-between",
  type: "px-3 py-1 my-2 rounded-2xl text-xs font-medium",
  title: "font-semibold my-1 text-lg break-words",
  bottomWrapper: "flex flex-col gap-2",
  followers: "text-xs font-medium text-gray-600",
  icons: "text-[#B4B4B4] flex items-center gap-1 text-lg",
  prev: "hidden md:block absolute bg-white top-[15%] -left-3 z-10 w-14 px-1 text-5xl shadow-xl rounded-tr-3xl rounded-br-3xl cursor-pointer select-none",
  next: "hidden md:block absolute bg-white top-[15%] -right-3 z-10 w-14 px-1 text-5xl shadow-xl rounded-tl-3xl rounded-bl-3xl cursor-pointer select-none",
};
/* Styles End */

const Sponsorships = ({ sponsorships, type, loadMore, loading }) => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className={styles.heading}>{type} Sponsorships</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-14">
        {sponsorships.map((sponsorship, index) => (
          <div
            onClick={() => navigate(`/sponsorshipdetails/${sponsorship.id}`)}
            key={index}
            className="cursor-pointer"
          >
            <div className="w-full aspect-[9/8] border rounded-md">
              <div
                className={styles.image}
                style={{
                  backgroundImage: `url(${sponsorship?.blob[0].path})`,
                }}
                alt=""
              />
            </div>

            <div className="mt-2 mr-3">
              <div className={styles.typeWrapper}>
                {type === "Latest" && (
                  <p
                    style={{
                      backgroundColor: !sponsorship?.barter
                        ? "#FFDE2F"
                        : "#3FD5F5",
                    }}
                    className={styles.type}
                  >
                    {!sponsorship?.barter ? "Paid" : "Barter"}
                  </p>
                )}
                {type === "Latest" && (
                  <p className="text-xs">
                    {moment(sponsorship?.creationDate * 1000).fromNow()}
                  </p>
                )}
              </div>

              <p className={styles.title}>
                {sponsorship?.name.length > 15
                  ? sponsorship?.name.slice(0, 15) + "..."
                  : sponsorship?.name}
              </p>

              <div className={styles.bottomWrapper}>
                <p className={styles.followers}>
                  Min {millify(sponsorship.minFollowers)} followers required
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
                  {type !== "Latest" && (
                    <p className="text-xs">
                      {moment(sponsorship?.creationDate * 1000).fromNow()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 flex items-center justify-center">
        {loading ? (
          <Spinner />
        ) : (
          <button
            onClick={loadMore}
            className="bg-black text-white px-5 py-3 rounded-full"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Sponsorships;
