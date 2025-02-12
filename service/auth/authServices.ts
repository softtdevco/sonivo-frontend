import api from "../api";

export type ErrorResponse = {
  response: {
    data: {
      message: string;
    }
  }
};

export const signUp = async (data: { fullName: string; email: string; password: string, phone?: string }) => {
  try {
    const response = await api.post("/auth/sign-up", data);
    return response.data;
  } catch (error) {
    throw error as ErrorResponse;
  }
};

export const verifyEmail = async (data: { token: string, otp: string }) => {
  try {
    const response = await api.post("/auth/verify-email", data);
    return response.data;
  } catch (error) {
    throw error as ErrorResponse;
  }
};

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post("/auth/sign-in", data);
    return response.data;
  } catch (error) {
    throw error as ErrorResponse;
  }
};

export const forgotPassword = async (data: {email: string}) => {
  try {
    const response = await api.post("/auth/forgot-password", data);
    return response.data;
  } catch (error) {
    throw error as ErrorResponse;
  }
}

export const verifyResetPassword = async (data: {token: string, otp: string}) => {
  try {
    const response = await api.post("/auth/verify-forgot-password-otp", data);
    return response.data;
  } catch (error) {
    throw error as ErrorResponse;
  }
}

export const setPassword = async (data: {resetPasswordToken: string, password: string}) => {
  try {
    const response = await api.post("/auth/reset-password", data);
    return response.data;
  } catch (error) {
    throw error as ErrorResponse;
  }
}

export const getUser = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    throw error as ErrorResponse;
  }
}
