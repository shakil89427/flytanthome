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

const CreatedByMe = () => {
  const { user, mySponsorships, setMySponsorships, myIndex, setMyIndex } =
    useStore();
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  const colRef = collection(db, "sponsorship");

  const getMy = async (q) => {
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
    if (!mySponsorships?.data?.length) {
      const q = query(
        colRef,
        where("userId", "==", user?.userId),
        orderBy("creationDate", "desc"),
        limit(10)
      );
      getMy(q);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }
  if (mySponsorships?.data?.length === 0) return null;

  return (
    <Sponsorships
      sponsorships={mySponsorships?.data?.slice(0, 10)}
      type={"My"}
      activeIndex={myIndex}
      setActiveIndex={setMyIndex}
    />
  );
};

export default CreatedByMe;
