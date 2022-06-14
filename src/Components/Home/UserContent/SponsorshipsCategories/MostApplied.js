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

const MostApplied = () => {
  const { mostAppliedSponsorships, setMostAppliedSponsorships } = useStore();
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
      if (response?.empty) {
        setMostAppliedSponsorships((prev) => {
          return {
            data: [...prev.data],
            lastVisible: false,
          };
        });
      } else {
        setMostAppliedSponsorships((prev) => {
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
      getLaitest(q);
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
      getLaitest(q);
    }
  }, []);
  return (
    <>
      <Sponsorships
        sponsorships={mostAppliedSponsorships?.data}
        type={"Most Applied"}
        loadMore={loadMore}
        loading={loading}
        lastVisible={mostAppliedSponsorships?.lastVisible}
      />
    </>
  );
};

export default MostApplied;
