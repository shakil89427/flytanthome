import { useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import useStore from "../Store/useStore";

const useLoadSponsorships = () => {
  const {
    user,
    setLaitestSponsorships,
    setPaidSponsorships,
    setBarterSponsorships,
  } = useStore();
  const db = getFirestore();
  const colRef = collection(db, "sponsorship");

  const laitestQuery = query(
    colRef,
    where("isApproved", "==", true),
    orderBy("creationDate", "desc"),
    limit(10)
  );
  const paidQuery = query(
    colRef,
    where("isApproved", "==", true),
    where("barter", "==", false),
    orderBy("creationDate", "desc"),
    limit(10)
  );
  const barterQuery = query(
    colRef,
    where("isApproved", "==", true),
    where("barter", "==", true),
    orderBy("creationDate", "desc"),
    limit(10)
  );

  const getLaitest = async () => {
    const temp = [];
    try {
      const response = await getDocs(laitestQuery);
      response.forEach((data) => {
        temp.push({ id: data.id, ...data.data() });
      });
    } catch (err) {}
    setLaitestSponsorships(temp);
  };
  const getPaid = async () => {
    const temp = [];
    try {
      const response = await getDocs(paidQuery);
      response.forEach((data) => {
        temp.push({ id: data.id, ...data.data() });
      });
    } catch (err) {}
    setPaidSponsorships(temp);
  };
  const getBarter = async () => {
    const temp = [];
    try {
      const response = await getDocs(barterQuery);
      response.forEach((data) => {
        temp.push({ id: data.id, ...data.data() });
      });
    } catch (err) {}
    setBarterSponsorships(temp);
  };

  useEffect(() => {
    if (!user?.userId) return;
    getLaitest();
    getPaid();
    getBarter();
  }, [user]);
};

export default useLoadSponsorships;
