import React, { useEffect, useState } from "react";
import Sponsorships from "./Sponsorships";
import useStore from "../../../../Store/useStore";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  limit,
} from "firebase/firestore";
import Spinner from "../../../Spinner/Spinner";

const Applied = () => {
  const {
    user,
    appliedSponsorships,
    setAppliedSponsorships,
    appliedIndex,
    setAppliedIndex,
  } = useStore();
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  const colRef = collection(db, "sponsorship");

  const getBarter = async (q) => {
    try {
      const response = await getDocs(q);
      const data = response?.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      if (!data?.length) return setLoading(false);
      setAppliedSponsorships((prev) => {
        return {
          data: [...prev.data, ...data],
          lastVisible: response?.docs[response?.docs?.length - 1],
        };
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      !appliedSponsorships?.data?.length &&
      user?.appliedCampaigns?.length > 0
    ) {
      const q = query(
        colRef,
        where("campaignId", "in", user?.appliedCampaigns),
        limit(10)
      );
      getBarter(q);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }
  if (appliedSponsorships?.data?.length === 0) return null;

  return (
    <Sponsorships
      sponsorships={appliedSponsorships?.data?.slice(0, 10)}
      applied={"Applied By You"}
      activeIndex={appliedIndex}
      setActiveIndex={setAppliedIndex}
    />
  );
};

export default Applied;
