import api from "../api";
import { ErrorResponse } from "../auth/authServices";

export const createPhoneNumberVonage = async (data: {
  phoneNumber: string;
  country: string;
  provider: string;
  apiKey: string;
  apiSecret: string;
  label: string;
}) => {
  try {
    const response = await api.post("/phone-numbers", data);
    return response.data;
  } catch (error) {
    throw error as ErrorResponse;
  }
};

export const createPhoneNumberTwilio = async (data: {
  phoneNumber: string;
  country: string;
  provider: string;
  accountSid: string;
  authToken: string;
  label: string;
}) => {
  try {
    const response = await api.post("/phone-numbers", data);
    return response.data;
  } catch (error) {
    throw error as ErrorResponse;
  }
};

export const updatePhoneNumberVonage = async (id: string, data: {
  phoneNumber: string;
  country: string;
  provider: string;
  apiKey: string;
  apiSecret: string;
}) => {
  try {
    const response = await api.put(`/phone-numbers/${id}`, data);
    return response.data;
  } catch (error) {
    throw error as ErrorResponse;
  }
};

export const updatePhoneNumberTwilio = async (id: string, data: {
  phoneNumber: string;
  country: string;
  provider: string;
  accountSid: string;
  authToken: string;
}) => {
  try {
    const response = await api.put(`/phone-numbers/${id}`, data);
    return response.data;
  } catch (error) {
    throw error as ErrorResponse;
  }
};

export const getPhoneNumbers = async () => {
  try {
    const response = await api.get("/phone-numbers");
    return response.data;
  } catch (error) {
    throw error as ErrorResponse;
  }
};

export const getPhoneNumberById = async (id: string) => {
  try {
    const response = await api.get(`/phone-numbers/${id}`);
    return response.data;
  } catch (error) {
    throw error as ErrorResponse;
  }
};

export const deletePhoneNumber = async (id: string) => {
  try {
    const response = await api.delete(`/phone-numbers/${id}`);
    return response.data;
  } catch (error) {
    throw error as ErrorResponse;
  }
};
