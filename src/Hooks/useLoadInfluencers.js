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
  const { user, setFeaturedInfluencers, setPopularInfluencers } = useStore();
  const db = getFirestore();
  const colRef = collection(db, "users");

  const featuredQuery = query(
    colRef,
    where("profileImageUrl", "!=", null),
    where("shouldShowTrending", "==", true),
    orderBy("profileImageUrl", "asc"),
    orderBy("socialScore", "desc"),
    limit(20)
  );
  const popularQuery = query(
    colRef,
    where("profileImageUrl", "!=", null),
    where("shouldShowInfluencer", "==", true),
    orderBy("profileImageUrl", "asc"),
    orderBy("socialScore", "desc"),
    limit(20)
  );

  const getFeatured = async () => {
    const temp = [];
    try {
      const response = await getDocs(featuredQuery);
      response.forEach((data) => {
        temp.push({ id: data.id, ...data.data() });
      });
    } catch (err) {}
    setFeaturedInfluencers(temp);
  };
  const getPopular = async () => {
    const temp = [];
    try {
      const response = await getDocs(popularQuery);
      response.forEach((data) => {
        temp.push({ id: data.id, ...data.data() });
      });
    } catch (err) {}
    setPopularInfluencers(temp);
  };

  useEffect(() => {
    if (!user?.userId) return;
    getFeatured();
    getPopular();
  }, [user]);
};

export default useLoadSponsorships;
