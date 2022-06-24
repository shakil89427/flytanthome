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

const Paid = () => {
  const { paidSponsorships, setPaidSponsorships, paidIndex, setPaidIndex } =
    useStore();
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  const colRef = collection(db, "sponsorship");

  const getPaid = async (q) => {
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
    if (!paidSponsorships?.data?.length) {
      const q = query(
        colRef,
        where("isApproved", "==", true),
        where("barter", "==", false),
        orderBy("creationDate", "desc"),
        limit(12)
      );
      getPaid(q);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }
  if (paidSponsorships?.data?.length === 0) return null;

  return (
    <Sponsorships
      sponsorships={paidSponsorships?.data?.slice(0, 10)}
      type={"Paid"}
      activeIndex={paidIndex}
      setActiveIndex={setPaidIndex}
    />
  );
};

export default Paid;
