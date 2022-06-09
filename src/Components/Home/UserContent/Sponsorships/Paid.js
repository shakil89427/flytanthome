import React, { useEffect, useState } from "react";
import Sponsorships from "./Sponsorships";
import useStore from "../../../Store/useStore";
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

const Paid = () => {
  const { paidSponsorships, setPaidSponsorships, paidIndex, setPaidIndex } =
    useStore();
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
      if (!data?.length) return setLoading(false);
      setPaidSponsorships((prev) => {
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
    if (paidSponsorships?.data?.length) {
      const q = query(
        colRef,
        where("isApproved", "==", true),
        where("barter", "==", false),
        orderBy("creationDate", "desc"),
        startAfter(paidSponsorships.lastVisible),
        limit(10)
      );
      if (paidIndex + 6 >= paidSponsorships?.data?.length) {
        getPaid(q);
      }
    }
  }, [paidIndex]);

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
    <Sponsorships
      sponsorships={paidSponsorships?.data}
      type={"Paid"}
      activeIndex={paidIndex}
      setActiveIndex={setPaidIndex}
    />
  );
};

export default Paid;
