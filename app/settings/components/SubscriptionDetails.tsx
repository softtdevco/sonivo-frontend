"use client";
import {
  useGetSubscriptionConfig,
  useGetUserSubscription,
  useUpdateSubscription,
  useCancelSubscription,
  useReactivateSubscription,
} from "@/service/subscriptions/subscription";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface SubscriptionConfig {
  id: string;
  name: string;
  description: string;
  price: number;
}

const SubscriptionDetails = () => {
  const { data: subscriptionConfig } = useGetSubscriptionConfig();
  const { data: subscription } = useGetUserSubscription();
  const { mutate: updateSubscription, isPending } = useUpdateSubscription();
  const { mutate: cancelSubscription, isPending: isCancelling } = useCancelSubscription();
  const { mutate: reactivateSubscription, isPending: isReactivating } = useReactivateSubscription();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");
  const [selectedConfigId, setSelectedConfigId] = useState<string | null>(null);

  const handleUpgrade = (subscriptionId: string) => {
    if (subscription?.subscriptionRef?.id === subscriptionId) {
      return;
    }
    updateSubscription({ subscriptionConfigId: subscriptionId }, {
      onSuccess: () => {
        toast.success("Subscription upgraded successfully");
      },
      onError: () => {
        toast.error("Failed to upgrade subscription");
      },
    });
  };

  const handleCancelClick = (configId: string) => {
    setSelectedConfigId(configId);
    setIsCancelModalOpen(true);
  };

  const handleConfirmCancel = () => {
    if (!selectedConfigId || !cancellationReason.trim()) {
      toast.error("Please provide a reason for cancellation");
      return;
    }

    cancelSubscription({ reason: cancellationReason }, {
      onSuccess: () => {
        toast.success("Subscription cancelled successfully");
        setIsCancelModalOpen(false);
        setCancellationReason("");
        
      },
      onError: () => {
        toast.error("Failed to cancel subscription");
      },
    });
  };

  const handleReactivateClick = (configId: string) => {
    reactivateSubscription({ subscriptionConfigId: configId }, {
      onSuccess: () => {
        toast.success("Subscription reactivated successfully");
        
      },
      onError: () => {
        toast.error("Failed to reactivate subscription");
      }
    });
  };

  return (
    <>
      {subscriptionConfig?.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-4">
          {subscriptionConfig.map((config: SubscriptionConfig) => (
            <div
              key={config.id}
              className="inline-flex h-[232px] flex-col items-start justify-center gap-6 rounded-xl border border-[#e8e6ea] bg-white p-4 cursor-pointer"
            >
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
                onClick={() => {
                  if (subscription?.subscriptionRef?.id === config.id) {
                    if (subscription?.isCancelled) {
                      handleReactivateClick(config.id);
                    } else {
                      handleCancelClick(config.id);
                    }
                  } else if (!isPending) {
                    if (!subscription?.subscriptionRef) {
                      // Redirect to payment page for new subscription
                      window.location.href = `/settings/payment?subscriptionId=${config.id}`;
                    } else {
                      handleUpgrade(config.id);
                    }
                  }
                }}
                className={`inline-flex h-[50px] items-center justify-center gap-1.5 self-stretch rounded-xl px-5 py-3 ${
                  subscription?.subscriptionRef?.id === config.id 
                    ? subscription?.isCancelled
                      ? "bg-neutral-400/10 hover:bg-green-50 group" 
                      : "bg-neutral-400/10 hover:bg-red-50 group" 
                    : isPending 
                      ? "cursor-not-allowed bg-gray-400" 
                      : "cursor-pointer bg-[#131313]"
                }`}
              >
                {isPending && subscription?.subscriptionRef?.id !== config.id || isReactivating ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <div
                      className={`text-center text-base font-medium leading-[14.40px] ${
                        subscription?.subscriptionRef?.id === config.id 
                          ? subscription?.isCancelled
                            ? "text-[#131313] group-hover:hidden" 
                            : "text-[#131313] group-hover:hidden" 
                          : "text-white"
                      }`}
                    >
                      {subscription?.subscriptionRef?.id === config.id
                        ? "Current plan"
                        : subscription?.subscriptionRef
                          ? "Upgrade Plan"
                          : "Create Plan"}
                    </div>
                    {subscription?.subscriptionRef?.id === config.id && (
                      <div className="hidden text-center text-base font-medium leading-[14.40px] group-hover:block">
                        {subscription?.isCancelled ? (
                          <span className="text-green-600">Reactivate Subscription</span>
                        ) : (
                          <span className="text-red-600">Cancel Subscription</span>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isCancelModalOpen} onOpenChange={setIsCancelModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>We&apos;re sorry to see you go</DialogTitle>
            <DialogDescription>
              Your feedback helps us improve. Could you share why you&apos;re canceling your subscription?
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={cancellationReason}
            onChange={(e) => setCancellationReason(e.target.value)}
            placeholder="Please share your reason for cancellation..."
            className="min-h-[120px]"
          />
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsCancelModalOpen(false)}
              disabled={isCancelling || isReactivating}
            >
              Go Back
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleConfirmCancel}
              disabled={isCancelling || !cancellationReason.trim() || isReactivating}
            >
              {isCancelling ? "Cancelling..." : "Confirm Cancellation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubscriptionDetails;