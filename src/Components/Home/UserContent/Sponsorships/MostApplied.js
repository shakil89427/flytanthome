import React, { useEffect, useState } from "react";
import Sponsorships from "./Sponsorships";
import useStore from "../../../../Store/useStore";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

const MostApplied = () => {
  const {
    mostAppliedSponsorships,
    setMostAppliedSponsorships,
    mostIndex,
    setMostIndex,
  } = useStore();
  const [loading, setLoading] = useState(false);
  const db = getFirestore();
  const colRef = collection(db, "sponsorship");

  const getMost = async (q) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await getDocs(q);
      const data = response?.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      if (!data?.length) return setLoading(false);
      setMostAppliedSponsorships((prev) => {
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
      mostAppliedSponsorships?.data?.length &&
      mostAppliedSponsorships?.lastVisible
    ) {
      const q = query(
        colRef,
        where("isApproved", "==", true),
        orderBy("applied", "desc"),
        startAfter(mostAppliedSponsorships.lastVisible),
        limit(10)
      );
      if (mostIndex + 6 >= mostAppliedSponsorships?.data?.length) {
        getMost(q);
      }
    }
  }, [mostIndex]);

  useEffect(() => {
    if (!mostAppliedSponsorships?.data?.length) {
      const q = query(
        colRef,
        where("isApproved", "==", true),
        orderBy("applied", "desc"),
        limit(10)
      );
      getMost(q);
    }
  }, []);

  return (
    <Sponsorships
      sponsorships={mostAppliedSponsorships?.data}
      type={"Most Applied"}
      activeIndex={mostIndex}
      setActiveIndex={setMostIndex}
    />
  );
};

export default MostApplied;
