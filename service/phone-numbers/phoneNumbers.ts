import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPhoneNumberTwilio, createPhoneNumberVonage, updatePhoneNumberVonage, updatePhoneNumberTwilio, getPhoneNumbers, getPhoneNumberById, deletePhoneNumber } from "./phoneNumbersService";
import { ErrorResponse } from "../auth/authServices";


export function useCreatePhoneNumberVonage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      phoneNumber: string;
      country: string;
      provider: string;
      apiKey: string;
      apiSecret: string;
      label: string;
    }) => createPhoneNumberVonage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phoneNumbers"] });
    },
    onError: (error: ErrorResponse) => {
      throw error;
    },
  });
}

export function useCreatePhoneNumberTwilio() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      phoneNumber: string;
      country: string;
      provider: string;
      accountSid: string;
      authToken: string;
      label: string;
    }) => createPhoneNumberTwilio(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phoneNumbers"] });
    },
    onError: (error: ErrorResponse) => {
      throw error;
    },
  });
}

export function useUpdatePhoneNumberVonage(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      phoneNumber: string;
      country: string;
      provider: string;
      apiKey: string;
      apiSecret: string;
    }) => updatePhoneNumberVonage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phoneNumbers"] });
      queryClient.invalidateQueries({ queryKey: ["phoneNumbers", id] });
    },
    onError: (error: ErrorResponse) => {
      throw error;
    },
  });
}   

export function useUpdatePhoneNumberTwilio(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      phoneNumber: string;
      country: string;
      provider: string;
      accountSid: string;
      authToken: string;
    }) => updatePhoneNumberTwilio(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phoneNumbers"] });
      queryClient.invalidateQueries({ queryKey: ["phoneNumbers", id] });
    },
    onError: (error: ErrorResponse) => {
      throw error;
    },
  });
}

export function useGetPhoneNumbers() {
  return useQuery({
    queryKey: ["phoneNumbers"],
    queryFn: () => getPhoneNumbers(),
  });
}

export function useGetPhoneNumberById(id: string) {
  return useQuery({
    queryKey: ["phoneNumbers", id],
    queryFn: () => getPhoneNumberById(id),
  });
}

export function useDeletePhoneNumber(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deletePhoneNumber(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phoneNumbers"] });
    },
    onError: (error: ErrorResponse) => {
      throw error;
    },
  });
}

