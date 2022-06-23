import { getString } from "firebase/remote-config";
import moment from "moment";
import React, { useEffect, useState } from "react";
import useStore from "../../Store/useStore";
import History from "./History";
import { FaHistory } from "react-icons/fa";

const ActivePlans = () => {
  const { user, allPlans, remoteConfig } = useStore();
  const [data, setData] = useState({});
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (allPlans?.length > 0) {
      const valid = user?.subscriptions?.filter(
        (sub) => sub.orderDate + sub.subscriptionDays * 86400 >= moment().unix()
      );
      if (valid?.length < 1) return setData({ invalid: true });

      let namePriceSymbol = [];
      let allDates = [];
      let allCampaignCredits = 0;
      let allMessageCredits = 0;
      const currencies = JSON.parse(getString(remoteConfig, "currency_list"));
      valid?.forEach((validPlan) => {
        const { symbol_native } = currencies.find(
          (item) => item?.code === validPlan?.currencyCode
        );
        namePriceSymbol.push({
          name: validPlan?.plan,
          price: validPlan?.price,
          days: validPlan?.subscriptionDays,
          symbol: symbol_native,
        });
        allDates.push(validPlan?.orderDate);

        const time = validPlan?.subscriptionDays / 30;
        allPlans.forEach((plan) => {
          if (
            validPlan?.plan?.toLowerCase() === plan?.name?.toLowerCase() &&
            plan?.numberOfApplies > 0
          ) {
            allCampaignCredits += plan?.numberOfApplies * time;
          }
          if (
            validPlan?.plan?.toLowerCase() === plan?.name?.toLowerCase() &&
            plan?.messageCredits > 0
          ) {
            allMessageCredits += plan?.messageCredits * time;
          }
        });
      });

      const sortedDate = allDates?.sort((a, b) => a - b);

      const final = {
        namePriceSymbol,
        startDate: moment.unix(sortedDate[0]).format("MMM DD YYYY"),
        endDate: moment.unix(user.subscriptionEndingDate).format("MMM DD YYYY"),
        allCampaignCredits,
        availableCampaignCredits: user?.numberOfApplies,
        allMessageCredits,
        availableMessageCredits: user?.messageCredits,
      };
      const premium = final?.namePriceSymbol?.find(
        (item) => item?.name?.toLowerCase() === "premium"
      );
      if (premium?.name) {
        final.unlimited = true;
      }
      setData(final);
    }
  }, [allPlans]);

  return (
    <div className="pt-20">
      {showHistory && <History setShowHistory={setShowHistory} />}
      <div className="relative">
        <p className="text-center text-2xl lg:text-3xl font-semibold">
          Your active plan
        </p>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-xl font-medium cursor-pointer flex items-center gap-1">
          <FaHistory onClick={() => setShowHistory(true)} />
          <p onClick={() => setShowHistory(true)} className="hidden lg:block">
            History
          </p>
        </div>
      </div>
      {data?.invalid ? (
        <p className="mt-5 text-center">No active plan found</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mt-5">
          <div className="border shadow-lg p-14 rounded-lg flex flex-col justify-between gap-8">
            <div className="grid grid-cols-2 gap-8">
              {data?.namePriceSymbol?.map((item, index) => (
                <div key={index} className="flex flex-col gap-5">
                  <p className="text-lg md:text-xl lg:text-2xl font-medium bg-black text-white w-fit px-5 h-10 flex items-center justify-center rounded-md">
                    {item?.name}
                  </p>
                  <div>
                    <p className="text-lg md:text-2xl font-medium mb-2">
                      Price {item?.symbol}
                      {item?.price}
                    </p>
                    <p className="text-sm md:text-lg font-medium">
                      Duration {item?.days} days
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-lg font-medium flex justify-between gap-3 flex-wrap">
              <p className="text-gray-500">Started at {data?.startDate}</p>
              <p className="text-gray-500">Expire on {data?.endDate}</p>
            </div>
          </div>
          <div className="border shadow-lg p-14 rounded-lg">
            <div className="mb-14">
              <p className="text-lg font-medium">Apply Campaigns credits</p>
              <div className="relative mt-3">
                <div className="bg-gray-300 h-5 w-full rounded-full overflow-hidden relative">
                  <div
                    style={{
                      width: `${
                        data?.unlimited
                          ? "100"
                          : (data?.availableCampaignCredits * 100) /
                            data?.allCampaignCredits
                      }%`,
                    }}
                    className="absolute bg-black inset-y-0 left-0"
                  />
                </div>
                <p className="absolute right-0 -bottom-6 text-sm font-medium">
                  {data?.unlimited
                    ? "Unlimited"
                    : data?.availableCampaignCredits}
                  {!data?.unlimited && <span>/{data?.allCampaignCredits}</span>}
                </p>
              </div>
            </div>
            <div className="mb-5">
              <p className="text-lg font-medium">Direct Message credits</p>
              <div className="relative mt-3">
                <div className="bg-gray-300 h-5 w-full rounded-full overflow-hidden relative">
                  <div
                    style={{
                      width: `${
                        data?.unlimited
                          ? "100"
                          : (data?.availableMessageCredits * 100) /
                            data?.allMessageCredits
                      }%`,
                    }}
                    className="absolute bg-black inset-y-0 left-0"
                  />
                </div>
                <p className="absolute right-0 -bottom-6 text-sm font-medium">
                  {data?.unlimited
                    ? "Unlimited"
                    : data?.availableMessageCredits}
                  {!data?.unlimited && <span>/{data?.allMessageCredits}</span>}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivePlans;
