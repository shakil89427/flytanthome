import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Scroll from "../Components/Scroll/Scroll";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css";
import { MdNavigateNext } from "react-icons/md";
import {
  getFirestore,
  doc,
  getDoc,
  query,
  collection,
  where,
  limit,
  orderBy,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  AiOutlineInstagram,
  AiFillInstagram,
  AiOutlineTwitter,
  AiFillTwitterSquare,
  AiOutlineYoutube,
  AiFillYoutube,
} from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import Spinner from "../Components/Spinner/Spinner";
import SocialError from "../Components/SponsorshipDetails/SocialError";
import useStore from "../Store/useStore";

const styles = {
  image: "h-80 rounded-md bg-cover bg-center bg-no-repeat",
  next: "absolute bg-white top-[40%] right-0 z-10 w-14 px-1 text-5xl shadow-xl rounded-tl-3xl rounded-bl-3xl cursor-pointer select-none",
};

const SponsorshipDetails = () => {
  const {
    user,
    setUser,
    setNotify,
    latestSponsorships,
    paidSponsorships,
    barterSponsorships,
    sponsorships,
    setSponsorships,
  } = useStore();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [similarLoading, setSimilarLoading] = useState(true);
  const [similar, setSimilar] = useState([]);
  const [description, setDescription] = useState("");
  const [full, setFull] = useState(false);
  const [socialError, setSocialError] = useState(false);
  const { id } = useParams();
  const db = getFirestore();
  const navigate = useNavigate();
  const [swiper, setSwiper] = useState();
  const nextRef = useRef();

  useEffect(() => {
    if (swiper) {
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper]);

  /* Update info on db after apply */
  const updateInfo = (updatedUser) => {
    const sponsorshipRef = doc(db, "sponsorship", details.id);
    const userRef = doc(db, "users", user?.id);
    const updatedData = {
      applied: details?.applied + 1,
      influencers: details?.influencers
        ? [...details?.influencers, user?.id]
        : [user?.id],
    };
    setLoading(true);
    updateDoc(sponsorshipRef, updatedData)
      .then(() => {
        updateDoc(userRef, updatedUser).then(() => {
          setDetails({ ...details, ...updatedData });
          setUser({ ...user, ...updatedUser });
          setLoading(false);
          setNotify({ status: true, message: "Applied Successfully" });
        });
      })
      .catch((err) => {
        setLoading(false);
        setNotify({ status: false, message: "Something went wrong" });
      });
  };

  /* Process to apply */
  const apply = () => {
    if (loading) return;
    if (!user?.linkedAccounts) return setSocialError(true);
    if (user?.freeTrials > 0) {
      const updatedUser = {
        freeTrials: user.freeTrials - 1,
        appliedCampaigns: user?.appliedCampaigns
          ? [...user?.appliedCampaigns, details?.id]
          : [details?.id],
      };
      return updateInfo(updatedUser);
    }
    if (user?.numberOfApplies > 0) {
      const updatedUser = {
        numberOfApplies: user.numberOfApplies - 1,
        appliedCampaigns: user?.appliedCampaigns
          ? [...user?.appliedCampaigns, details?.id]
          : [details?.id],
      };
      updateInfo(updatedUser);
    }
  };

  /* getting similar sponsorship from db */
  const getSimilar = async (info) => {
    setSimilarLoading(true);
    if (!info?.categories?.length) return setSimilarLoading(false);
    const colRef = collection(db, "sponsorship");
    try {
      const q = query(
        colRef,
        where("isApproved", "==", true),
        where("barter", "==", info?.barter),
        where("categories", "array-contains-any", info?.categories),
        orderBy("creationDate", "desc"),
        limit(6)
      );
      const response = await getDocs(q);
      const data = response.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      const valid = data.filter((item) => item.id !== id);
      setSimilar(valid);
      setSimilarLoading(false);
    } catch (err) {
      setSimilarLoading(false);
    }
  };

  /* getting sponsorship detail from db */
  const getDetails = async () => {
    const docRef = doc(db, "sponsorship", id);
    setDetailsLoading(true);
    try {
      const response = await getDoc(docRef);
      const data = { ...response?.data(), id: response?.id };
      if (data?.id) {
        setDetails(data);
        setSponsorships([...sponsorships, data]);
        getSimilar(data);
      } else {
        setDetailsLoading(false);
      }
    } catch (err) {
      setDetailsLoading(false);
    }
  };

  /* Checking sponsorship details on store */
  useEffect(() => {
    const exist1 = latestSponsorships?.data?.find((item) => item?.id === id);
    if (exist1?.id) {
      setDetails(exist1);
      getSimilar(exist1);
      return;
    }
    const exist2 = paidSponsorships?.data?.find((item) => item?.id === id);
    if (exist2?.id) {
      setDetails(exist2);
      getSimilar(exist2);
      return;
    }
    const exist3 = barterSponsorships?.data?.find((item) => item?.id === id);
    if (exist3?.id) {
      setDetails(exist3);
      getSimilar(exist3);
      return;
    }
    const exist4 = sponsorships?.find((item) => item?.id === id);
    if (exist4?.id) {
      setDetails(exist4);
      getSimilar(exist4);
      return;
    }
    getDetails();
  }, [id]);

  /* getting description from sponsorship */
  useEffect(() => {
    if (details?.description) setDescription(details?.description);
    if (details?.barterDescription) setDescription(details?.barterDescription);
    setDetailsLoading(false);
  }, [details]);

  return (
    <div>
      <Scroll />
      {loading && (
        <div className="fixed top-0 left-0 w-full h-screen z-50 flex items-center justify-center bg-[#8d8b8b4f]">
          <Spinner />
        </div>
      )}
      {socialError && <SocialError setSocialError={setSocialError} />}
      <div className="px-5 max-w-[1100px] mx-auto py-20 flex flex-col md:flex-row gap-20 md:gap-10 lg:gap-28">
        {/* Left Side */}
        <div className="w-full md:w-7/12 relative">
          {detailsLoading && <Spinner position={true} />}
          {details?.id && (
            <div>
              <div className="relative border">
                <Swiper
                  modules={[Navigation]}
                  navigation={{
                    nextEl: nextRef?.current,
                  }}
                  initialSlide={0}
                  onSwiper={setSwiper}
                  slidesPerView={1}
                >
                  {details?.blob &&
                    details?.blob?.map((item, index) => (
                      <SwiperSlide key={index}>
                        <div
                          className={styles.image}
                          style={{
                            backgroundImage: `url(${item.path})`,
                          }}
                          alt=""
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
                <div
                  style={{
                    visibility:
                      details?.blob?.length > 1 ? "visible" : "hidden",
                  }}
                  className={styles.next}
                  ref={nextRef}
                >
                  <MdNavigateNext />
                </div>
              </div>
              <div className="pr-5">
                <div className="flex flex-col gap-5 mt-5">
                  <h3 className="text-2xl font-semibold">{details?.name}</h3>
                  <p className="text-sm">
                    Posted {moment(details?.creationDate).fromNow()}
                  </p>
                  <p className="text-sm py-2 px-4 bg-[#3FD5F5] w-fit rounded-3xl font-semibold">
                    {details?.barter ? "Barter" : "Paid"} Campaign
                  </p>
                </div>

                {user?.appliedCampaigns?.includes(details?.id) ? (
                  <p className="my-14 py-3 px-5 bg-gray-700 text-white border-2 border-black rounded-3xl text-center font-medium">
                    Applied
                  </p>
                ) : (
                  <p
                    onClick={() => apply()}
                    className="my-14 py-3 px-5 bg-black text-white border-2 border-black rounded-3xl text-center font-medium cursor-pointer"
                  >
                    Apply
                  </p>
                )}
                {!details?.barter && (
                  <h5 className="text-xl font-semibold mb-5">Description</h5>
                )}
                <div className="mb-14 text-gray-700">
                  {description?.length <= 250 ? (
                    <p>{description}</p>
                  ) : (
                    <p>
                      {full ? (
                        <span>{description}</span>
                      ) : (
                        <span>{description?.slice(0, 250)}</span>
                      )}
                      <span
                        onClick={() => setFull(!full)}
                        className="text-xs font-medium cursor-pointer text-gray-400 pl-1"
                      >
                        {full ? "Show less" : "...Show more"}
                      </span>
                    </p>
                  )}
                </div>
                <h5 className="text-xl font-semibold mb-5">Gender</h5>
                <p className="mb-10">{details?.gender}</p>

                {details?.price && (
                  <div>
                    <h5 className="text-xl font-semibold mb-5">Price</h5>
                    <p className="mb-10">$ {details?.price}</p>
                  </div>
                )}

                <h5 className="text-xl font-semibold mb-5">Catagories</h5>
                <div className="flex items-center gap-3 mb-10 flex-wrap">
                  {details?.categories?.map((item) => (
                    <p
                      className="py-1 px-6 bg-gray-200 w-fit rounded-3xl text-sm font-medium"
                      key={item}
                    >
                      {item}
                    </p>
                  ))}
                </div>
                <h5 className="text-xl font-semibold mb-5">
                  Minimum followers
                </h5>
                <p className="mb-10">{details?.minFollowers}</p>
                <p className="text-xl font-semibold mb-5">Platform required</p>
                <div className="flex items-center gap-3 text-xs">
                  {details?.platforms?.includes("Instagram") && (
                    <span className="flex flex-col gap-1 items-center">
                      <AiOutlineInstagram className="text-3xl" />
                      <p>Instagram</p>
                    </span>
                  )}
                  {details?.platforms?.includes("Youtube") && (
                    <span className="flex flex-col gap-1 items-center">
                      <AiOutlineYoutube className="text-3xl" />
                      <p>Youtube</p>
                    </span>
                  )}

                  {details?.platforms?.includes("Twitter") && (
                    <span className="flex flex-col gap-1 items-center">
                      <AiOutlineTwitter className="text-3xl" />
                      <p>Twitter</p>
                    </span>
                  )}
                  {details?.platforms?.includes("Tiktok") && (
                    <span className="flex flex-col gap-1 items-center">
                      <FaTiktok className="text-3xl p-1" />
                      <p>Tiktok</p>
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side */}
        <div className="w-full md:w-5/12 relative">
          <p className="text-xl font-semibold text-center mb-5">
            More related campaigns
          </p>
          {similarLoading && <Spinner position={true} />}
          {!similarLoading && !similar?.length ? (
            <p className="text-center">No data found</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-1 gap-x-5 gap-y-10">
              {similar?.map((item) => (
                <div
                  onClick={() => navigate(`/sponsorshipdetails/${item?.id}`)}
                  key={item.id}
                  className="relative cursor-pointer"
                >
                  <div className="bg-[#F5B63A] text-white text-sm absolute top-5 right-0 px-3 py-1 rounded-tl-md rounded-bl-md">
                    {item?.applied} applied
                  </div>
                  <div
                    style={{ backgroundImage: `url(${item.blob[0]?.path})` }}
                    className="w-full h-48 bg-cover bg-center bg-no-repeat rounded-md"
                  />
                  <div className="mt-3 md:pr-5">
                    <div className="flex items-center justify-between mb-2">
                      <p className="bg-[#FFDE2F] text-xs py-1 px-3 rounded-3xl font-medium">
                        {item.barter ? "Barter" : "Paid"} campaign
                      </p>
                      <p className="text-xs">
                        {moment(item?.creationDate).fromNow()}
                      </p>
                    </div>
                    <p className="text-md font-semibold">{item.name}</p>
                    <p className="text-xs my-1">
                      Min {item.minFollowers} followers required
                    </p>
                    <div className="flex items-center gap-2 text-lg text-gray-400 mt-2">
                      {item?.platforms?.includes("Instagram") && (
                        <AiFillInstagram />
                      )}
                      {item?.platforms?.includes("Youtube") && (
                        <AiFillYoutube />
                      )}

                      {item?.platforms?.includes("Twitter") && (
                        <AiFillTwitterSquare />
                      )}
                      {item?.platforms?.includes("Tiktok") && (
                        <FaTiktok className="w-3" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SponsorshipDetails;
