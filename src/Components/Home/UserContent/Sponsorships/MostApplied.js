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
} from "firebase/firestore";
import Spinner from "../../../Spinner/Spinner";

const MostApplied = () => {
  const {
    mostAppliedSponsorships,
    setMostAppliedSponsorships,
    mostIndex,
    setMostIndex,
  } = useStore();
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  const colRef = collection(db, "sponsorship");

  const getMost = async (q) => {
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
    if (!mostAppliedSponsorships?.data?.length) {
      const q = query(
        colRef,
        where("isApproved", "==", true),
        orderBy("applied", "desc"),
        limit(10)
      );
      getMost(q);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }
  if (mostAppliedSponsorships?.data?.length === 0) return null;

  return (
    <Sponsorships
      sponsorships={mostAppliedSponsorships?.data?.slice(0, 10)}
      type={"Most Applied"}
      activeIndex={mostIndex}
      setActiveIndex={setMostIndex}
    />
  );
};

export default MostApplied;
