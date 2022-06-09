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

const Barter = () => {
  const {
    barterSponsorships,
    setBarterSponsorships,
    barterIndex,
    setBarterIndex,
  } = useStore();
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
      if (!data?.length) return setLoading(false);
      setBarterSponsorships((prev) => {
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
    if (barterSponsorships?.data?.length) {
      const q = query(
        colRef,
        where("isApproved", "==", true),
        where("barter", "==", true),
        orderBy("creationDate", "desc"),
        startAfter(barterSponsorships?.lastVisible),
        limit(10)
      );
      if (barterIndex + 6 >= barterSponsorships?.data?.length) {
        getBarter(q);
      }
    }
  }, [barterIndex]);

  useEffect(() => {
    if (!barterSponsorships?.data?.length) {
      const q = query(
        colRef,
        where("isApproved", "==", true),
        where("barter", "==", true),
        orderBy("creationDate", "desc"),
        limit(10)
      );
      getBarter(q);
    }
  }, []);

  return (
    <Sponsorships
      sponsorships={barterSponsorships?.data}
      type={"Barter"}
      activeIndex={barterIndex}
      setActiveIndex={setBarterIndex}
    />
  );
};

export default Barter;
