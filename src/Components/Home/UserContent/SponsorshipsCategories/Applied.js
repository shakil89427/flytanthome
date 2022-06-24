import React, { useEffect, useState } from "react";
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
import Sponsorships from "./Sponsorships";

const Applied = () => {
  const { user, appliedSponsorships, setAppliedSponsorships } = useStore();
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
      if (response?.empty || data?.length < 12) {
        setAppliedSponsorships((prev) => {
          return {
            data: [...prev.data, ...data],
            lastVisible: false,
          };
        });
      } else {
        setAppliedSponsorships((prev) => {
          return {
            data: [...prev.data, ...data],
            lastVisible: response?.docs[response?.docs?.length - 1],
          };
        });
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (appliedSponsorships?.data?.length && appliedSponsorships?.lastVisible) {
      const q = query(
        colRef,
        where("campaignId", "in", user?.appliedCampaigns),
        startAfter(appliedSponsorships?.lastVisible),
        limit(12)
      );
      getBarter(q);
    }
  };

  useEffect(() => {
    if (!appliedSponsorships?.data?.length) {
      const q = query(
        colRef,
        where("campaignId", "in", user?.appliedCampaigns),
        limit(12)
      );
      getBarter(q);
    }
  }, []);

  return (
    <>
      <Sponsorships
        sponsorships={appliedSponsorships?.data}
        applied={"Applied By You"}
        loadMore={loadMore}
        loading={loading}
        lastVisible={appliedSponsorships?.lastVisible}
      />
    </>
  );
};

export default Applied;
