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

const Paid = () => {
  const { paidSponsorships, setPaidSponsorships } = useStore();
  const [loading, setLoading] = useState(false);
  const db = getFirestore();
  const colRef = collection(db, "sponsorship");

  const getPaid = async (q) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await getDocs(q);
      const data = response?.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      if (response?.empty) {
        setPaidSponsorships((prev) => {
          return {
            data: [...prev.data],
            lastVisible: false,
          };
        });
      } else {
        setPaidSponsorships((prev) => {
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
    if (paidSponsorships?.data?.length && paidSponsorships?.lastVisible) {
      const q = query(
        colRef,
        where("isApproved", "==", true),
        where("barter", "==", false),
        orderBy("creationDate", "desc"),
        startAfter(paidSponsorships.lastVisible),
        limit(10)
      );
      getPaid(q);
    }
  };

  useEffect(() => {
    if (!paidSponsorships?.data?.length) {
      const q = query(
        colRef,
        where("isApproved", "==", true),
        where("barter", "==", false),
        orderBy("creationDate", "desc"),
        limit(10)
      );
      getPaid(q);
    }
  }, []);

  return (
    <>
      <Sponsorships
        sponsorships={paidSponsorships?.data}
        type={"Paid"}
        loadMore={loadMore}
        loading={loading}
        lastVisible={paidSponsorships?.lastVisible}
      />
    </>
  );
};

export default Paid;
