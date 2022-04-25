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

const Latest = () => {
  const [sponsorships, setSponsorships] = useState([]);
  const [activeIndex, setActiveIndex] = useState(1);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const db = getFirestore();
  const colRef = collection(db, "sponsorship");

  const getLaitest = async (q) => {
    if (activeIndex === "Last" || loading) return;
    setLoading(true);
    try {
      const response = await getDocs(q);
      const data = response?.docs.map((item) => {
        return { id: item.id, ...item.data() };
      });
      if (!data?.length) {
        setLoading(false);
        return setActiveIndex("Last");
      }
      setLastVisible(response.docs[response.docs.length - 1]);
      setSponsorships((prev) => [...prev, ...data]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!sponsorships?.length) return;
    const q = query(
      colRef,
      where("isApproved", "==", true),
      orderBy("creationDate", "desc"),
      startAfter(lastVisible),
      limit(10)
    );
    if (activeIndex === sponsorships?.length) {
      getLaitest(q);
    }
  }, [activeIndex]);

  useEffect(() => {
    const q = query(
      colRef,
      where("isApproved", "==", true),
      orderBy("creationDate", "desc"),
      limit(10)
    );

    getLaitest(q);
  }, []);

  return (
    <Sponsorships
      sponsorships={sponsorships}
      type={"Latest"}
      setActiveIndex={setActiveIndex}
    />
  );
};

export default Latest;
