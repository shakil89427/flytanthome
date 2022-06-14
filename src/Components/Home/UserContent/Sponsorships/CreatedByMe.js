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
  startAfter,
} from "firebase/firestore";

const CreatedByMe = () => {
  const { user, mySponsorships, setMySponsorships, myIndex, setMyIndex } =
    useStore();
  const [loading, setLoading] = useState(false);
  const db = getFirestore();
  const colRef = collection(db, "sponsorship");

  const getMy = async (q) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await getDocs(q);
      const data = response?.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      if (!data?.length) return setLoading(false);
      setMySponsorships((prev) => {
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
    if (mySponsorships?.data?.length && mySponsorships?.lastVisible) {
      const q = query(
        colRef,
        where("userId", "==", user?.userId),
        orderBy("creationDate", "desc"),
        startAfter(mySponsorships.lastVisible),
        limit(10)
      );
      if (myIndex + 6 >= mySponsorships?.data?.length) {
        getMy(q);
      }
    }
  }, [myIndex]);

  useEffect(() => {
    if (!mySponsorships?.data?.length) {
      const q = query(
        colRef,
        where("userId", "==", user?.userId),
        orderBy("creationDate", "desc"),
        limit(10)
      );
      getMy(q);
    }
  }, []);

  return (
    <Sponsorships
      sponsorships={mySponsorships?.data}
      type={"My"}
      activeIndex={myIndex}
      setActiveIndex={setMyIndex}
    />
  );
};

export default CreatedByMe;
