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

const Barter = () => {
  const {
    barterSponsorships,
    setBarterSponsorships,
    barterIndex,
    setBarterIndex,
  } = useStore();
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  const colRef = collection(db, "sponsorship");

  const getBarter = async (q) => {
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
    if (!barterSponsorships?.data?.length) {
      const q = query(
        colRef,
        where("isApproved", "==", true),
        where("barter", "==", true),
        orderBy("creationDate", "desc"),
        limit(10)
      );
      getBarter(q);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }
  if (barterSponsorships?.data?.length === 0) return null;

  return (
    <Sponsorships
      sponsorships={barterSponsorships?.data?.slice(0, 10)}
      type={"Barter"}
      activeIndex={barterIndex}
      setActiveIndex={setBarterIndex}
    />
  );
};

export default Barter;
