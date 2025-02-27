import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSubscription,
  getSubscriptionConfig,
  getSubscriptionHistories,
  getUserSubscription,
} from "./subscriptionService";

export type createSubscriptionData = {
  subscriptionConfigId: string;
  paymentMethodId: string;
};

export function useCreateSubscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: createSubscriptionData) => createSubscription(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
}

export function useGetUserSubscription() {
  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: () => getUserSubscription(),
  });
}

export function useGetSubscriptionHistories() {
  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: () => getSubscriptionHistories(),
  });
}

export function useGetSubscriptionConfig() {
  return useQuery({
    queryKey: ["subscriptionsConfig"],
    queryFn: () => getSubscriptionConfig(),
  });
}
