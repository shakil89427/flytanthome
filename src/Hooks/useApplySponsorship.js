import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useState } from "react";
import useStore from "../Store/useStore";

const useApplySponsorship = (details, setDetails, loading, setLoading) => {
  const [socialError, setSocialError] = useState(false);
  const { user, setUser } = useStore();
  const db = getFirestore();

  const updateUserData = (updatedUser) => {
    const userRef = doc(db, "users", user?.userId);
    updateDoc(userRef, updatedUser)
      .then(() => {
        getDoc(userRef).then((res) => {
          console.log(res.data());
          setUser(res.data());
          setLoading(false);
        });
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const updateSponsorshipData = (updatedUser) => {
    const sponsorshipRef = doc(db, "sponsorship", details.id);
    const updatedData = {
      applied: details?.applied + 1,
      influencers: [...details.influencers, user.userId],
    };
    setLoading(true);
    updateDoc(sponsorshipRef, updatedData)
      .then(() => {
        getDoc(sponsorshipRef).then((res) => {
          console.log({ ...res?.data(), id: res?.id });
          setDetails({ ...res?.data(), id: res?.id });
          updateUserData(updatedUser);
        });
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const apply = () => {
    console.log(user);
    console.log(details);
    if (loading) return;
    if (!user?.linkedAccounts) return setSocialError(true);
    if (user?.freeTrials > 0) {
      const updatedUser = {
        freeTrials: user.freeTrials - 1,
        appliedCampaigns: [...user.appliedCampaigns, details.id],
      };
      return updateSponsorshipData(updatedUser);
    }
    if (user?.numberOfApplies > 0) {
      const updatedUser = {
        numberOfApplies: user.numberOfApplies - 1,
        appliedCampaigns: [...user.appliedCampaigns, details.id],
      };
      updateSponsorshipData(updatedUser);
    }
  };

  return {
    apply,
    socialError,
    setSocialError,
  };
};

export default useApplySponsorship;
