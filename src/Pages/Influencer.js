import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Scroll from "../Components/Scroll/Scroll";
import Details from "../Components/Profile/Details";
import Spinner from "../Components/Spinner/Spinner";
import SocialAccounts from "../Components/Profile/SocialAccounts";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const styles = {
  main: "grid grid-cols-1 lg:grid-cols-2 pt-14 pb-32 max-w-[1100px] px-5 mx-auto gap-10 lg:gap-20",
};

const Influencer = () => {
  const { id } = useParams();
  const [influencer, setInfluencer] = useState({});
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  useEffect(() => {
    if (!id) return setLoading(false);
    const userRef = doc(db, "users", id);
    getDoc(userRef)
      .then((data) => {
        const temp = data.data();
        if (temp?.userId) {
          setInfluencer(temp);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Scroll />
      {loading && <Spinner />}
      {influencer?.userId && (
        <div className={styles.main}>
          <Details user={influencer} value={false} />
          <SocialAccounts value={false} />
        </div>
      )}
    </div>
  );
};

export default Influencer;
