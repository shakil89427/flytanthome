import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { useState } from "react";
import useStore from "../Store/useStore";

const useApplySponsorship = (details, setDetails, loading, setLoading) => {
  const [socialError, setSocialError] = useState(false);
  const { user, setUser, setNotify } = useStore();
  const db = getFirestore();

  const updateInfo = (updatedUser) => {
    const sponsorshipRef = doc(db, "sponsorship", details.id);
    const userRef = doc(db, "users", user?.id);
    const updatedData = {
      applied: details?.applied + 1,
      influencers: details?.influencers
        ? [...details?.influencers, user?.id]
        : [user?.id],
    };
    setLoading(true);
    updateDoc(sponsorshipRef, updatedData)
      .then(() => {
        updateDoc(userRef, updatedUser).then(() => {
          setDetails({ ...details, ...updatedData });
          setUser({ ...user, ...updatedUser });
          setLoading(false);
          setNotify({ status: true, message: "Applied Successfully" });
        });
      })
      .catch((err) => {
        setLoading(false);
        setNotify({ status: false, message: "Something went wrong" });
      });
  };

  const apply = () => {
    if (loading) return;
    if (!user?.linkedAccounts) return setSocialError(true);
    if (user?.freeTrials > 0) {
      const updatedUser = {
        freeTrials: user.freeTrials - 1,
        appliedCampaigns: user?.appliedCampaigns
          ? [...user?.appliedCampaigns, details?.id]
          : [details?.id],
      };
      return updateInfo(updatedUser);
    }
    if (user?.numberOfApplies > 0) {
      const updatedUser = {
        numberOfApplies: user.numberOfApplies - 1,
        appliedCampaigns: user?.appliedCampaigns
          ? [...user?.appliedCampaigns, details?.id]
          : [details?.id],
      };
      updateInfo(updatedUser);
    }
  };

  return {
    apply,
    socialError,
    setSocialError,
  };
};

export default useApplySponsorship;
