import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Scroll from "../Components/Scroll/Scroll";
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
} from "firebase/firestore";
import {
  AiOutlineInstagram,
  AiFillInstagram,
  AiOutlineFacebook,
  AiFillFacebook,
  AiOutlineTwitter,
  AiFillTwitterSquare,
  AiOutlineLinkedin,
  AiFillLinkedin,
  AiOutlineYoutube,
  AiFillYoutube,
} from "react-icons/ai";
import Spinner from "../Components/Spinner/Spinner";
import useApplySponsorship from "../Hooks/useApplySponsorship";
import SocialError from "../Components/SponsorshipDetails/SocialError";
import useStore from "../Store/useStore";

const SponsorshipDetails = () => {
  const {
    user,
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
  const { apply, socialError, setSocialError } = useApplySponsorship(
    details,
    setDetails,
    loading,
    setLoading
  );
  const [similar, setSimilar] = useState([]);
  const [description, setDescription] = useState("");
  const [full, setFull] = useState(false);
  const { id } = useParams();
  const db = getFirestore();
  const navigate = useNavigate();

  const getSimilar = async (info) => {
    if (!info?.categories?.length) return;
    const colRef = collection(db, "sponsorship");
    setSimilarLoading(true);
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

  useEffect(() => {
    if (details?.description) setDescription(details?.description);
    if (details?.barterDescription) setDescription(details?.barterDescription);
    setDetailsLoading(false);
  }, [details]);

  return (
    <div>
      <Scroll />
      {loading && <Spinner />}
      {socialError && <SocialError setSocialError={setSocialError} />}
      <div className="px-5 max-w-[1100px] mx-auto py-20 flex flex-col md:flex-row gap-20 md:gap-10 lg:gap-32">
        {/* Left Side */}
        <div className="w-full md:w-8/12 relative">
          {detailsLoading && <Spinner position={true} />}
          {details?.id && (
            <div>
              <img
                className="w-full h-96 mb-5"
                src={details?.blob[0]?.path}
                alt=""
              />
              <div className="pr-5">
                <div className="flex flex-col gap-5 mt-5">
                  <h3 className="text-2xl font-semibold">{details?.name}</h3>
                  <p className="text-sm">
                    Posted: {new Date(details?.creationDate).toDateString()}
                  </p>
                  <p className="text-sm py-2 px-4 bg-[#3FD5F5] w-fit rounded-3xl font-semibold">
                    {details?.barter ? "Barter" : "Paid"} Campaign
                  </p>
                </div>

                <div className="flex items-center justify-between my-14">
                  <p className="py-3 px-5 border-2 border-black rounded-3xl w-[45%] text-center font-medium">
                    Message
                  </p>
                  {user?.appliedCampaigns?.includes(details?.id) ? (
                    <p className="py-3 px-5 bg-gray-700 text-white border-2 border-black w-[45%] rounded-3xl text-center font-medium">
                      Applied
                    </p>
                  ) : (
                    <p
                      onClick={() => apply()}
                      className="py-3 px-5 bg-black text-white border-2 border-black w-[45%] rounded-3xl text-center font-medium cursor-pointer"
                    >
                      Apply
                    </p>
                  )}
                </div>
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
                <h5 className="text-xl font-semibold mb-5">Catagories</h5>
                <div className="flex items-center gap-3 mb-10">
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
                  {details?.platforms?.includes("Facebook") && (
                    <span className="flex flex-col gap-1 items-center">
                      <AiOutlineFacebook className="text-3xl" />
                      <p>Facebook</p>
                    </span>
                  )}
                  {details?.platforms?.includes("Twitter") && (
                    <span className="flex flex-col gap-1 items-center">
                      <AiOutlineTwitter className="text-3xl" />
                      <p>Twitter</p>
                    </span>
                  )}
                  {details?.platforms?.includes("Linkedin") && (
                    <span className="flex flex-col gap-1 items-center">
                      <AiOutlineLinkedin className="text-3xl" />
                      <p>Linkedin</p>
                    </span>
                  )}
                  {details?.platforms?.includes("Youtube") && (
                    <span className="flex flex-col gap-1 items-center">
                      <AiOutlineYoutube className="text-3xl" />
                      <p>Youtube</p>
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side */}
        <div className="w-full md:w-4/12 relative">
          <p className="text-xl font-semibold text-center mb-5">
            More related campaigns
          </p>
          {similarLoading && <Spinner position={true} />}
          {!similarLoading && similar?.length && (
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
                        {Math.floor(
                          (Date.now() - item?.creationDate) / 86400000
                        )}{" "}
                        days ago
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
                      {item?.platforms?.includes("Facebook") && (
                        <AiFillFacebook />
                      )}
                      {item?.platforms?.includes("Twitter") && (
                        <AiFillTwitterSquare />
                      )}
                      {item?.platforms?.includes("Linkedin") && (
                        <AiFillLinkedin />
                      )}
                      {item?.platforms?.includes("Youtube") && (
                        <AiFillYoutube />
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
