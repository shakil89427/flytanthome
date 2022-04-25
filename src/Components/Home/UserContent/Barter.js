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

const Barter = () => {
  const [sponsorships, setSponsorships] = useState([]);
  const db = getFirestore();
  const colRef = collection(db, "sponsorship");

  const getBarter = async () => {
    const q = query(
      colRef,
      where("isApproved", "==", true),
      where("barter", "==", true),
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
    getBarter();
  }, []);
  return <Sponsorships sponsorships={sponsorships} type={"Barter"} />;
};

export default Barter;
