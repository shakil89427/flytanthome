import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { useState } from "react";
import useStore from "../Store/useStore";

const useApplySponsorship = () => {
  const [sponsorship, setSponsorship] = useState({});
  const [freeTrials, setFreeTrials] = useState(false);
  const [numberOfApplies, setNumberOfApplies] = useState(false);
  const [showMethods, setShowMethods] = useState(false);
  const [socialError, setSocialError] = useState(false);
  const { user } = useStore();
  const db = getFirestore();
  console.log(user);

  const updateSponsorshipData = (sponsorship) => {
    const sponsorshipRef = doc(db, "sponsorship", sponsorship.id);
    const updatedData = {
      applied: sponsorship.applied + 1,
      influencers: [...sponsorship.influencers, user.userId],
    };
    updateDoc(sponsorshipRef, updatedData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const apply = (data) => {
    if (!user?.linkedAccounts) return setSocialError(true);
    if (user?.freeTrials > 0 || user?.numberOfApplies > 0) {
      setSponsorship(data);
      setShowMethods(true);
    }
  };
  // const userData = {appliedCampaigns:[...user?.appliedCampaigns,sponsorship?.id],freeTrials:user?.freeTrials-1}

  return {
    apply,
    socialError,
    setSocialError,
    showMethods,
    setShowMethods,
    setFreeTrials,
    setNumberOfApplies,
  };
};

export default useApplySponsorship;

// private void completeApply() {
//     FirebaseFirestore firestore = FirebaseFirestore.getInstance();
//     DocumentReference ref = firestore.collection(FirestoreConstant.SPONSORSHIOP_TABLE)
//             .document(mainData.getCampaignId());
//     ref.update("influencers", FieldValue.arrayUnion(mUser.getUserId().trim()));
//     ref.update("applied", FieldValue.increment(1));
//     FirebaseFirestore firestore1 = FirebaseFirestore.getInstance();
//     DocumentReference ref1 = firestore1.collection(FirestoreConstant.USER_TABLE).document(mUser.getUserId());
//     if (mUser.getFreeTrials() > 0) {
//         mUser.setFreeTrials(mUser.getFreeTrials() - 1);
//         ref1.update("freeTrials", FieldValue.increment(-1));
//         AppUtil.showShortToast(SponsorshipCampaignDetailsActivity.this,
//                 "You have " + mUser.getFreeTrials() + " free trials left");
//     } else {
//         if (mUser.getNumberOfApplies() > 0) {
//             ref1.update("numberOfApplies", FieldValue.increment(-1));
//         }
//     }
//     AppUtil.showShortToast(SponsorshipCampaignDetailsActivity.this,
//             "You have applied successfully.");
//     if (mainData.getInfluencers() == null) {
//         mainData.setInfluencers(new ArrayList<>());
//     }
//     mainData.getInfluencers().add(mUser.getUserId().trim());
//     btApply.setAlpha(0.4f);
//     btApply.setClickable(false);
//     btApply.setText("Applied");
//     setCampaignMailData(mainData.getUserId());
//     NotificationService.sendCampApplyNotification(this, mainData.getUserId().trim(), mainData.getCampaignId());
//     isChanged = true;
//     try {
//         if (mUser.getAppliedCampaigns() == null) {
//             mUser.setAppliedCampaigns(new ArrayList<>());
//         }

//         mUser.getAppliedCampaigns().add(0, mainData.getCampaignId().trim());
//         AppPreference.setUserDetails(this, mUser);

//         firestore.collection(FirestoreConstant.USER_TABLE)
//                 .document(mUser.getUserId().trim())
//                 .update("appliedCampaigns", mUser.getAppliedCampaigns());

//         if (mUser.getAppliedCampaigns().size() == 3) {
//             AppUtil.handleInAppReview(this);
//         }
//     } catch (Exception e) {
//         e.printStackTrace();
//     }

//     if (mUser.getAppliedCampaigns().size() == 1) {
//         showEmailDialog();
//     }
// }

// if (mUser.getLinkedAccounts() == null) {
//     showNoLinkedAccountDialog();
// } else if (mUser.getLinkedAccounts().size() == 0) {
//     showNoLinkedAccountDialog();
// } else if (mUser.getFreeTrials() > 0) {
//     btApply.setClickable(false);
//     completeApply();
// } else {
//     if (mUser.getReferralNumberOfApplies() > 0) {
//         DocumentReference reference = firestore.collection(FirestoreConstant.USER_TABLE)
//                 .document(mUser.getUserId().trim());
//         reference.update("referralNumberOfApplies", FieldValue.increment(-1));
//         mUser.setReferralNumberOfApplies(mUser.getReferralNumberOfApplies() - 1);
//         AppPreference.setUserDetails(SponsorshipCampaignDetailsActivity.this, mUser);
//         btApply.setClickable(false);
//         completeApply();
//     } else if (AppUtil.checkSubscriptionTime(SponsorshipCampaignDetailsActivity.this)) {
//         if (mUser.getNumberOfApplies() > 0) {
//             btApply.setClickable(false);
//             completeApply();
//         } else {
//             showErrorDialog(true);
//         }
//     } else {
//         isPayment = true;
//         startActivity(new Intent(SponsorshipCampaignDetailsActivity.this, SubscriptionPurchaseActivity.class));
//     }
// }
