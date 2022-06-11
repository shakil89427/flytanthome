import React, { useEffect, useState } from "react";
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
import Sponsorships from "./Sponsorships";

const Barter = () => {
  const { barterSponsorships, setBarterSponsorships } = useStore();
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
      if (response?.empty) {
        setBarterSponsorships((prev) => {
          return {
            data: [...prev.data],
            lastVisible: false,
          };
        });
      } else {
        setBarterSponsorships((prev) => {
          return {
            data: [...prev.data, ...data],
            lastVisible: response?.docs[response?.docs?.length - 1],
          };
        });
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (barterSponsorships?.data?.length && barterSponsorships?.lastVisible) {
      const q = query(
        colRef,
        where("isApproved", "==", true),
        where("barter", "==", true),
        orderBy("creationDate", "desc"),
        startAfter(barterSponsorships?.lastVisible),
        limit(10)
      );
      getBarter(q);
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
    }
  }, []);

  return (
    <>
      <Sponsorships
        sponsorships={barterSponsorships?.data}
        type={"Barter"}
        loadMore={loadMore}
        loading={loading}
        lastVisible={barterSponsorships?.lastVisible}
      />
    </>
  );
};

export default Barter;
