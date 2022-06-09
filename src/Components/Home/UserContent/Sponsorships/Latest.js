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

const Latest = () => {
  const {
    latestSponsorships,
    setLatestSponsorships,
    latestIndex,
    setLatestIndex,
  } = useStore();
  const [loading, setLoading] = useState(false);
  const db = getFirestore();
  const colRef = collection(db, "sponsorship");

  const getLaitest = async (q) => {
    if (loading) return;
    setLoading(true);
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
    if (latestSponsorships?.data?.length) {
      const q = query(
        colRef,
        where("isApproved", "==", true),
        orderBy("creationDate", "desc"),
        startAfter(latestSponsorships.lastVisible),
        limit(10)
      );
      if (latestIndex + 6 >= latestSponsorships?.data?.length) {
        getLaitest(q);
      }
    }
  }, [latestIndex]);

  useEffect(() => {
    if (!latestSponsorships?.data?.length) {
      const q = query(
        colRef,
        where("isApproved", "==", true),
        orderBy("creationDate", "desc"),
        limit(10)
      );
      getLaitest(q);
    }
  }, []);

  return (
    <Sponsorships
      sponsorships={latestSponsorships?.data}
      type={"Latest"}
      activeIndex={latestIndex}
      setActiveIndex={setLatestIndex}
    />
  );
};

export default Latest;
