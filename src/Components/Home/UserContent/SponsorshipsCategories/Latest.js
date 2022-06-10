import React, { useEffect, useState } from "react";
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
import Sponsorships from "./Sponsorships";

const Latest = () => {
  const { latestSponsorships, setLatestSponsorships } = useStore();
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

  const loadMore = () => {
    if (latestSponsorships?.data?.length) {
      const q = query(
        colRef,
        where("isApproved", "==", true),
        orderBy("creationDate", "desc"),
        startAfter(latestSponsorships.lastVisible),
        limit(10)
      );
      getLaitest(q);
    }
  };

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
    <>
      <Sponsorships
        sponsorships={latestSponsorships?.data}
        type={"Latest"}
        loadMore={loadMore}
        loading={loading}
      />
    </>
  );
};

export default Latest;
