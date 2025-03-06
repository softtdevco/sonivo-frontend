import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ErrorResponse, forgotPassword, getUser, login, setPassword, signUp, updateUser, verifyEmail, verifyResetPassword } from "./authServices";
import { forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema, verifyEmailSchema } from "@/lib/validations/auth";
import * as z from "zod";



//Data
export type RegisterFormValues = z.infer<typeof registerSchema>;
type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;

type SignUpData = Omit<RegisterFormValues, 'terms' | 'confirmPassword'>;

type LoginData = z.infer<typeof loginSchema>;

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

type VerifyResetPasswordData = z.infer<typeof resetPasswordSchema>;

type SetPasswordData = {
  password: string;
  resetPasswordToken: string;
};

export type UpdateUserData = {
  fullName: string;
  phone?: string;
  companyName?: string;
}


//Responses
interface SignUpResponse {
  token: string;
}
interface VerifyEmailResponse {
  user: string;
  access_token: string;
  refresh_token: string;
}
export interface LoginResponse {
  user: string;
  access_token: string;
  refresh_token: string;
}
export interface ForgotPasswordResponse {
  token: string;
}

export interface VerifyResetPasswordResponse {
  resetPasswordToken: string;
}

export interface SetPasswordResponse {
  message: string;
}

export interface UserUpdateResponse {
  message: string;
}

export function useSignUpMutation() {
  return useMutation<SignUpResponse, ErrorResponse, SignUpData>({
    mutationFn: (data: SignUpData) => signUp(data),
    onSuccess: (response) => {
      if (response.token) {
        localStorage.setItem("token", response.token);
        return response;
      }
    },
  });
}

export function useVerifyEmailMutation() {
  return useMutation<VerifyEmailResponse, ErrorResponse, VerifyEmailFormValues>({
    mutationFn: (data: VerifyEmailFormValues) => verifyEmail(data),
    onSuccess: (response) => {
        return response;
    }
  });
}

export function useLoginMutation() {
  return useMutation<LoginResponse, ErrorResponse, LoginData>({
    mutationFn: (data: LoginData) => login(data),
    onSuccess: (response) => {
        return response;
    }
  });
}

export function useForgotPasswordMutation() {
  return useMutation<ForgotPasswordResponse, ErrorResponse, ForgotPasswordData>({
    mutationFn: (data: ForgotPasswordData) => forgotPassword(data),
    onSuccess: (response) => {
        return response;
    }
  });
}

export function useVerifyResetPasswordMutation() {
  return useMutation<VerifyResetPasswordResponse, ErrorResponse, VerifyResetPasswordData>({
    mutationFn: (data: VerifyResetPasswordData) => verifyResetPassword(data),
    onSuccess: (response) => {
      return response;
    }
  });
}

export function useSetPasswordMutation() {
  return useMutation<SetPasswordResponse, ErrorResponse, SetPasswordData>({
    mutationFn: (data: SetPasswordData) => setPassword(data),
    onSuccess: (response) => {
      return response;
    }
  });
}

export function useGetUser() {
  return useQuery< ErrorResponse>({
      queryKey: ['user'],
      queryFn: () => getUser()
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation<UserUpdateResponse, ErrorResponse, UpdateUserData>({
    mutationFn: (data: UpdateUserData) => updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  });
}

