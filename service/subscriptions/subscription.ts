import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cancelUserSubscription,
  createSubscription,
  getCredit,
  getSubscriptionConfig,
  getSubscriptionHistories,
  getUserSubscription,
  reactivateUserSubscription,
  topUpCredit,
  updateSubscription,
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
      queryClient.invalidateQueries({
        queryKey: [
          "subscriptions",
          "subscriptionsHistories",
          "subscriptionsConfig",
        ],
      });
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
    queryKey: ["subscriptionsHistories"],
    queryFn: () => getSubscriptionHistories(),
  });
}

export function useGetSubscriptionConfig() {
  return useQuery({
    queryKey: ["subscriptionsConfig"],
    queryFn: () => getSubscriptionConfig(),
  });
}

export function useUpdateSubscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { subscriptionConfigId: string }) => updateSubscription(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      queryClient.invalidateQueries({ queryKey: ["subscriptionsHistories"] });
      queryClient.invalidateQueries({ queryKey: ["subscriptionsConfig"] });
    },
  });
}

export function useCancelSubscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { reason: string }) => cancelUserSubscription(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      queryClient.invalidateQueries({ queryKey: ["subscriptionsHistories"] });
      queryClient.invalidateQueries({ queryKey: ["subscriptionsConfig"] });
    },
  });
}

export function useReactivateSubscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { subscriptionConfigId: string }) =>
      reactivateUserSubscription(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      queryClient.invalidateQueries({ queryKey: ["subscriptionsHistories"] });
      queryClient.invalidateQueries({ queryKey: ["subscriptionsConfig"] });
    },
  });
}

export function useGetCredit() {
  return useQuery({
    queryKey: ["credit"],
    queryFn: () => getCredit(),
  });
}

export function useTopUpCredit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { amount: number }) => topUpCredit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "subscriptionsHistories"],
      });
    },
  });
}
