import React, { useEffect, useState } from "react";
import Sponsorships from "./Sponsorships";
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
  const [sponsorships, setSponsorships] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lastVisible, setLastVisible] = useState(null);
  const db = getFirestore();
  const colRef = collection(db, "sponsorship");

  const getPaid = async (q) => {
    if (activeIndex === "Last") return;
    try {
      const response = await getDocs(q);
      const data = response?.docs.map((item) => {
        return { id: item.id, ...item.data() };
      });
      if (!data?.length) return setActiveIndex("Last");
      setLastVisible(response.docs[response.docs.length - 1]);
      setSponsorships((prev) => [...prev, ...data]);
    } catch (err) {}
  };

  useEffect(() => {
    if (!sponsorships?.length) return;
    const q = query(
      colRef,
      where("isApproved", "==", true),
      where("barter", "==", false),
      orderBy("creationDate", "desc"),
      startAfter(lastVisible),
      limit(10)
    );
    if (activeIndex === sponsorships?.length) {
      getPaid(q);
    }
  }, [activeIndex]);

  useEffect(() => {
    const q = query(
      colRef,
      where("isApproved", "==", true),
      where("barter", "==", false),
      orderBy("creationDate", "desc"),
      limit(10)
    );
    getPaid(q);
  }, []);

  return (
    <Sponsorships
      sponsorships={sponsorships}
      type={"Paid"}
      setActiveIndex={setActiveIndex}
    />
  );
};

export default Paid;
