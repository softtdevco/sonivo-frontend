"use client";
import { Suspense } from 'react';
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, LockKeyhole, MoveRight, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { setPasswordSchema } from "@/lib/validations/auth";
import type * as z from "zod";
import {
  Form,

  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useSetPasswordMutation } from "@/service/auth/auth";
import { FormFieldWrapper } from "../register/components/form-field-wrapper";

type SetPasswordFormValues = z.infer<typeof setPasswordSchema>;

const SetPasswordContent = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const { mutate: setPassword, isPending } = useSetPasswordMutation();
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<SetPasswordFormValues>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SetPasswordFormValues) => {
    const token = searchParams.get("token");
    if (!token) {
      toast.error("Invalid reset token");
      router.push("/forgot-password");
      return;
    }

    // Omit confirmPassword when sending to API
    const apiData = {
      password: data.password,
      resetPasswordToken: token,
    };

    setPassword(apiData, {
      onSuccess: () => {
        toast.success("Password updated successfully");
        router.push("/login");
      },
      onError: (error) => {
        toast.error(
          error.response?.data?.message || "Failed to update password"
        );
      },
    });
  };

  // Helper function to reduce duplication
  const getInputStyles = (error?: boolean) => ({
    input: `rounded-xl border bg-neutral-50 px-[20.52px] py-5 pl-10 pr-10 -mt-1 ${
      error
        ? "border-red-500 focus-visible:ring-red-500 text-red-500"
        : "border-[#e7e7e7]"
    }`,
    label: `text-base font-normal leading-tight ${
      error ? "text-red-500" : "text-[#272728]"
    }`,
    icon: `absolute left-4 top-1/2 h-[13px] w-[13px] -translate-y-1/2 ${
      error ? "text-red-500" : "text-gray-500"
    }`,
  });

 

  return (
    <>
      <div className="mb-10">
        <h1 className="text-2xl font-semibold leading-tight text-[#272728]">
          New password
        </h1>
        <p className="mt-2 text-base font-normal leading-tight text-[#575758]">
          Create a new password
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    className={`${getInputStyles(!!form.formState.errors.password).input} pr-10`}
                    placeholder="Enter password"
                  />
                  <LockKeyhole
                    className={getInputStyles(!!form.formState.errors.password).icon}
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
                    className={`${getInputStyles(!!form.formState.errors.confirmPassword).input} pr-10`}
                    placeholder="Confirm password"
                  />
                  <LockKeyhole
                    className={getInputStyles(!!form.formState.errors.confirmPassword).icon}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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

          <div className="mb-16 mt-10 flex items-center justify-end">
            <Button
              type="submit"
              className="flex w-fit items-center justify-between rounded-xl bg-[#131313] px-5 py-3 text-white transition-all duration-200 hover:scale-105 hover:bg-[#2b2b2b]"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  Set new password
                  <MoveRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

const SetPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SetPasswordContent />
    </Suspense>
  );
};

export default SetPassword;
