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
  startAfter,
} from "firebase/firestore";

const Applied = () => {
  const {
    user,
    appliedSponsorships,
    setAppliedSponsorships,
    appliedIndex,
    setAppliedIndex,
  } = useStore();
  const [loading, setLoading] = useState(false);
  const db = getFirestore();
  const colRef = collection(db, "sponsorship");

  const getBarter = async (q) => {
    if (loading) return;
    setLoading(true);
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
    if (appliedSponsorships?.data?.length && appliedSponsorships?.lastVisible) {
      const q = query(
        colRef,
        where("campaignId", "in", user?.appliedCampaigns),
        startAfter(appliedSponsorships?.lastVisible),
        limit(10)
      );
      if (appliedIndex + 6 >= appliedSponsorships?.data?.length) {
        getBarter(q);
      }
    }
  }, [appliedIndex]);

  useEffect(() => {
    if (!appliedSponsorships?.data?.length) {
      const q = query(
        colRef,
        where("campaignId", "in", user?.appliedCampaigns),
        limit(10)
      );
      getBarter(q);
    }
  }, []);

  return (
    <Sponsorships
      sponsorships={appliedSponsorships?.data}
      applied={"Applied By You"}
      activeIndex={appliedIndex}
      setActiveIndex={setAppliedIndex}
    />
  );
};

export default Applied;
