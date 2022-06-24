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

const Latest = () => {
  const {
    latestSponsorships,
    setLatestSponsorships,
    latestIndex,
    setLatestIndex,
  } = useStore();
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  const colRef = collection(db, "sponsorship");

  const getLaitest = async (q) => {
    try {
      const response = await getDocs(q);
      const data = response?.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      if (!data?.length) return setLoading(false);
      setLatestSponsorships((prev) => {
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
    if (!latestSponsorships?.data?.length) {
      const q = query(
        colRef,
        where("isApproved", "==", true),
        orderBy("creationDate", "desc"),
        limit(12)
      );
      getLaitest(q);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }
  if (latestSponsorships?.data?.length === 0) return null;

  return (
    <Sponsorships
      sponsorships={latestSponsorships?.data?.slice(0, 10)}
      type={"Latest"}
      activeIndex={latestIndex}
      setActiveIndex={setLatestIndex}
    />
  );
};

export default Latest;
