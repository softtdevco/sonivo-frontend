"use client"
import React, { useState } from "react";
import {
  CircleUserRound,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  MoveRight,
  PhoneIncoming,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validations/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { RegisterFormValues, useSignUpMutation } from "@/service/auth/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ErrorResponse } from "@/service/auth/authServices";
import { FormFieldWrapper } from "./components/form-field-wrapper";


// Constants
const INPUT_BASE_CLASSES = "-mt-1 rounded-xl border bg-neutral-50 px-[20.52px] py-5 pl-10";
const ICON_BASE_CLASSES = "absolute left-4 top-1/2 h-[13px] w-[13px] -translate-y-1/2";

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const { mutate: register, isPending } = useSignUpMutation();
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
      // Omit terms and confirmPassword when sending to API
      const apiData: Omit<RegisterFormValues, 'terms' | 'confirmPassword'> = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
      };
      register(apiData, {
        onSuccess: (response) => {
          const userData = btoa(JSON.stringify({
            email: data.email,
            fullName: data.fullName,
            password: data.password,
            phone: data.phone,
          }));
          
          router.push(`/verify-email?token=${encodeURIComponent(response.token)}&data=${userData}`);
          toast.success("Account created successfully");
        },
        onError: (error: ErrorResponse) => {
          toast.error(error.response?.data?.message || "An error occurred");
        }
      });
  };

  const getInputClassName = (error?: boolean) => `
    ${INPUT_BASE_CLASSES} ${
    error
      ? "border-red-500 text-red-500 focus-visible:ring-red-500"
      : "border-[#e7e7e7]"
  }`;

  const getIconClassName = (error?: boolean) => `
    ${ICON_BASE_CLASSES} ${error ? "text-red-500" : "text-gray-500"}`;

  return (
    <>
      <div className="mb-10">
        <h1 className="text-2xl font-semibold leading-tight text-[#272728]">
          Start your free trial
        </h1>
        <p className="mt-2 text-base font-normal leading-tight text-[#575758]">
          Get started with a demo account on Sonivo
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormFieldWrapper
                label="Your name"
                error={!!form.formState.errors.fullName}
              >
                <div className="relative">
                  <Input
                    {...field}
                    className={getInputClassName(!!form.formState.errors.fullName)}
                    placeholder="Enter your name"
                  />
                  <CircleUserRound
                    className={getIconClassName(!!form.formState.errors.fullName)}
                  />
                </div>
              </FormFieldWrapper>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormFieldWrapper
                label="Phone number (optional)"
                error={!!form.formState.errors.phone}
              >
                <div className="relative">
                  <Input
                    {...field}
                    className={getInputClassName(!!form.formState.errors.phone)}
                    placeholder="Enter phone number"
                  />
                  <PhoneIncoming
                    className={getIconClassName(!!form.formState.errors.phone)}
                  />
                </div>
              </FormFieldWrapper>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormFieldWrapper
                label="Email"
                error={!!form.formState.errors.email}
              >
                <div className="relative">
                  <Input
                    {...field}
                    type="email"
                    className={getInputClassName(!!form.formState.errors.email)}
                    placeholder="Enter email"
                  />
                  <Mail
                    className={getIconClassName(!!form.formState.errors.email)}
                  />
                </div>
              </FormFieldWrapper>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormFieldWrapper
                label="Password"
                error={!!form.formState.errors.password}
              >
                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    className={`${getInputClassName(!!form.formState.errors.password)} pr-10`}
                    placeholder="Enter password"
                  />
                  <LockKeyhole
                    className={getIconClassName(!!form.formState.errors.password)}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-[13px] w-[13px] text-gray-500" />
                    ) : (
                      <Eye className="h-[13px] w-[13px] text-gray-500" />
                    )}
                  </button>
                </div>
              </FormFieldWrapper>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormFieldWrapper
                label="Confirm Password"
                error={!!form.formState.errors.confirmPassword}
              >
                <div className="relative">
                  <Input
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                    className={`${getInputClassName(!!form.formState.errors.confirmPassword)} pr-10`}
                    placeholder="Confirm password"
                  />
                  <LockKeyhole
                    className={getIconClassName(!!form.formState.errors.confirmPassword)}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-[13px] w-[13px] text-gray-500" />
                    ) : (
                      <Eye className="h-[13px] w-[13px] text-gray-500" />
                    )}
                  </button>
                </div>
              </FormFieldWrapper>
            )}
          />

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <>
                <FormItem className="mt-6 flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-black text-[15px] font-medium leading-[21px]">
                      By clicking here, you are accepting our Privacy policy,
                      Terms & Conditions
                    </FormLabel>
                  </div>
                </FormItem>
                <FormMessage className="text-red-500" />
              </>
            )}
          />

          <div className="flex items-center justify-end pt-6">
            <Button
              type="submit"
              className="flex w-[170px] items-center justify-between rounded-xl bg-[#131313] px-5 py-3 text-white transition-all duration-200 hover:scale-105 hover:bg-[#2b2b2b]"
              disabled={isPending}
            >
              {isPending && <Loader2 className="animate-spin" />}
              Create Account
              {!isPending && <MoveRight className="h-5 w-5" />}
            </Button>
          </div>
        </form>
      </Form>

      <p className="mt-16 text-center text-[15px] font-medium leading-[21px] text-black">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-[15px] font-bold leading-[21px] text-black"
        >
          Sign in
        </Link>
      </p>
    </>
  );
};

export default Register;
