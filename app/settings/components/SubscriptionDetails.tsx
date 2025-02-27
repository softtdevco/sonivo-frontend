"use client";
import { useGetSubscriptionConfig } from "@/service/subscriptions/subscription";
import { useRouter } from "next/navigation";
import React from "react";

interface SubscriptionConfig {
  id: string;
  name: string;
  description: string;
  price: number;
}

const SubscriptionDetails = () => {
  const { data: subscriptionConfig } = useGetSubscriptionConfig();
  const router = useRouter();

  const handleUpgrade = (subscriptionId: string) => {
    router.push(`/settings/payment?subscriptionId=${subscriptionId}`);
  };

  return (
    <>
      {subscriptionConfig?.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-4">
          {subscriptionConfig.map((config: SubscriptionConfig) => (
            <div key={config.id} className="inline-flex h-[232px] flex-col items-start justify-center gap-6 rounded-xl border border-[#e8e6ea] bg-white p-4">
              <div className="inline-flex items-start justify-between self-stretch">
                <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-2">
                  <div className="text-base font-medium leading-normal text-[#272728]">
                    {config.name}
                  </div>
                  <div className="self-stretch text-sm font-normal leading-[23px] text-[#555e67]">
                    {config.description}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold leading-normal text-[#272728]">
                  ${config.price}
                </div>
                <div className="text-base font-normal leading-tight text-[#555e67]">
                  per month
                </div>
              </div>
              <div 
                onClick={() => handleUpgrade(config.id)}
                className="inline-flex h-[50px] items-center justify-center gap-1.5 self-stretch rounded-xl bg-[#131313] px-5 py-3 cursor-pointer"
              >
                <div className="text-center text-base font-medium leading-[14.40px] text-white">
                  Upgrade plan
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SubscriptionDetails;
