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
} from "firebase/firestore";

const Latest = () => {
  const [sponsorships, setSponsorships] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const db = getFirestore();
  const colRef = collection(db, "sponsorship");
  const [loading, setLoading] = useState(false);

  const getLaitest = async () => {
    setLoading(true);
    const q = query(
      colRef,
      where("isApproved", "==", true),
      orderBy("creationDate", "desc"),
      limit(10)
    );
    const temp = [];
    try {
      const response = await getDocs(q);
      response.forEach((data) => {
        temp.push({ id: data.id, ...data.data() });
      });
      setSponsorships((prev) => [...prev, ...temp]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (activeIndex === sponsorships?.length) {
      getLaitest();
    }
  }, [activeIndex]);
  return (
    <Sponsorships
      sponsorships={sponsorships}
      type={"Latest"}
      setActiveIndex={setActiveIndex}
    />
  );
};

export default Latest;
