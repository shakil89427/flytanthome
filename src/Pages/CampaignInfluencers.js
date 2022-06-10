import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../Store/useStore";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import Spinner from "../Components/Spinner/Spinner";
import Spinner2 from "../Components/Spinner/Spinner2";
import { BsCheckLg } from "react-icons/bs";

const styles = {
  nonSelect: "text-lg md:text-xl text-gray-600 cursor-pointer font-medium",
  selected:
    "text-lg md:text-xl font-semibold relative before:content-[''] before:absolute before:w-[110%] before:left-1/2 before:-translate-x-1/2 before:h-[3px] before:bg-black before:-bottom-[2px] before:rounded-full",
};

const CampaignInfluencers = () => {
  const { user, setNotify } = useStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const db = getFirestore();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [campaign, setCampaign] = useState({});
  const [allInfluencers, setAllInfluencers] = useState([]);
  const [influencers, setInfluencers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [category, setCategory] = useState(1);

  const updateDb = async (newData) => {
    try {
      const sponsorshipRef = doc(db, "sponsorship", id);
      await updateDoc(sponsorshipRef, { selectedUsers: newData });
      setSelected(newData);
      setUpdating(false);
    } catch (err) {
      setUpdating(false);
      setNotify({ status: false, message: "Something went wrong" });
    }
  };

  const changeSelected = async (influencerId) => {
    if (updating) return;
    setUpdating(influencerId);
    if (selected?.includes(influencerId)) {
      const filtered = selected.filter((item) => item !== influencerId);
      updateDb(filtered);
    } else {
      const newData = [...selected, influencerId];
      updateDb(newData);
    }
  };

  const getInfluencers = async () => {
    try {
      const colRef = collection(db, "users");
      const q = query(colRef, where("appliedCampaigns", "array-contains", id));
      const res = await getDocs(q);
      const allData = res.docs.map((i) => ({ ...i?.data(), id: i?.id }));
      setAllInfluencers(allData);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      navigate("/mycampaigns", { replace: true });
    }
  };

  const getCampaign = async () => {
    try {
      const colRef = collection(db, "sponsorship");
      const q = query(
        colRef,
        where("userId", "==", user?.userId),
        where("campaignId", "==", id)
      );
      const res = await getDocs(q);
      const valid = res.docs[0];
      const allData = { ...valid.data(), id: valid.id };
      if (allData?.campaignId) {
        setCampaign(allData);
        setSelected(allData?.selectedUsers || []);
        getInfluencers();
      } else {
        setLoading(false);
        navigate("/mycampaigns", { replace: true });
      }
    } catch (err) {
      setLoading(false);
      navigate("/mycampaigns", { replace: true });
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    if (!user?.userId) return;
    if (!id) return navigate("/mycampaigns", { replace: true });
    getCampaign();
  }, []);

  useEffect(() => {
    if (allInfluencers?.length > 0) {
      if (category === 1) {
        setInfluencers(allInfluencers);
      }
      if (category === 2) {
        const filtered = allInfluencers.filter((i) =>
          selected?.includes(i?.userId)
        );
        setInfluencers(filtered);
      }
    }
  }, [allInfluencers, category, selected]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-[95%] max-w-[1000px] mx-auto py-20">
          <p className="text-xl md:text-2xl lg:text-3xl font-semibold">
            {campaign?.name}
          </p>
          <p className="font-medium mt-1 text-lg">Influencers who applied</p>
          <div className="w-full max-w-[800px] mx-auto mt-14">
            <span className="flex flex-wrap items-center gap-6 md:gap-12 mb-10">
              <p
                onClick={() => category !== 1 && setCategory(1)}
                className={category === 1 ? styles.selected : styles.nonSelect}
              >
                All
              </p>
              <p
                onClick={() => category !== 2 && setCategory(2)}
                className={category === 2 ? styles.selected : styles.nonSelect}
              >
                Selected
              </p>
            </span>
            <div className="grid grid-cols-3 mb-5 border-b-2 text-gray-500 font-medium text-xs sm:text-sm md:text-md lg:text-lg gap-5">
              <p className="ml-5">Profile</p>
              <p>Name</p>
              <p className="text-right mr-5">Select</p>
            </div>
            {influencers?.length < 1 && (
              <p className="text-center mt-20">No Influencers found</p>
            )}
            {influencers?.map((influencer) => (
              <div
                key={influencer?.userId}
                className="border py-3 shadow-lg rounded-md grid grid-cols-3 mb-5 gap-5"
              >
                <div
                  onClick={() => navigate(`/profile/${influencer?.userId}`)}
                  style={{
                    backgroundImage: `url(${influencer?.profileImageUrl})`,
                  }}
                  className="w-12 h-12 rounded-full bg-cover bg-no-repeat bg-center cursor-pointer ml-5"
                />
                <div
                  onClick={() => navigate(`/profile/${influencer?.userId}`)}
                  className="flex flex-col justify-center cursor-pointer w-fit"
                >
                  <p className="font-semibold">{influencer?.name}</p>
                  <p className="text-sm">@{influencer?.username}</p>
                </div>
                <div className="text-right mr-5 flex items-center justify-end">
                  {updating === influencer?.userId ? (
                    <Spinner2 />
                  ) : (
                    <div
                      onClick={() => changeSelected(influencer?.userId)}
                      style={{
                        backgroundColor: selected?.includes(influencer?.userId)
                          ? "black"
                          : "white",
                      }}
                      className="border-2 border-black w-[25px] h-[25px] cursor-pointer relative overflow-hidden flex items-center justify-center rounded duration-150 text-white select-none"
                    >
                      {selected?.includes(influencer?.userId) && <BsCheckLg />}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CampaignInfluencers;
