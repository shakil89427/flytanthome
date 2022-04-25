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
  const db = getFirestore();
  const colRef = collection(db, "sponsorship");

  const getLaitest = async () => {
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
    } catch (err) {}
    setSponsorships((prev) => [...prev, ...temp]);
  };

  useEffect(() => {
    getLaitest();
  }, []);
  return <Sponsorships sponsorships={sponsorships} type={"Latest"} />;
};

export default Latest;
