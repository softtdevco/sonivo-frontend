"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Loader2, LockKeyhole, Mail, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations/auth";
import type * as z from "zod";
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
import { useLoginMutation } from "@/service/auth/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { handleEncodeData } from "@/lib/utils";

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {mutate: login, isPending} = useLoginMutation()
  const router = useRouter()
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const onSubmit = async (data: LoginFormValues) => {
    login(data, {
      onSuccess: (response) => {
        if (response.user) {
          toast.success("Login successful")
          handleEncodeData(response)
          router.push('/dashboard')
        }
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Failed to login")
      }
    })
  };

  // Extract common styles to constants
  const inputBaseStyles = "-mt-1 rounded-xl border bg-neutral-50 px-[20.52px] py-5";
  const getErrorStyles = (error: boolean) => 
    error ? "border-red-500 focus-visible:ring-red-500 text-red-500" : "border-[#e7e7e7]";
  const getLabelStyles = (error: boolean) =>
    `text-base font-normal leading-tight ${error ? "text-red-500" : "text-[#272728]"}`;
  const getIconStyles = (error: boolean) =>
    `absolute left-4 top-1/2 h-[13px] w-[13px] -translate-y-1/2 ${error ? "text-red-500" : "text-gray-500"}`;

  const renderFormField = (
    name: "email" | "password",
    placeholder: string,
    Icon: React.ElementType
  ) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={getLabelStyles(!!form.formState.errors[name])}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={name === "password" ? (showPassword ? "text" : "password") : name}
                className={`${inputBaseStyles} ${name === "password" ? "pr-10 " : ""}pl-10 ${
                  getErrorStyles(!!form.formState.errors[name])
                }`}
                placeholder={placeholder}
              />
              <Icon className={getIconStyles(!!form.formState.errors[name])} />
              {name === "password" && (
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
              )}
            </div>
          </FormControl>
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );

  return (
    <>
      <div className="mb-10">
        <h1 className="text-2xl font-semibold leading-tight text-[#272728]">
          Sign in
        </h1>
        <p className="mt-2 text-base font-normal leading-tight text-[#575758]">
          Log into your Transkript account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {renderFormField("email", "Enter email", Mail)}
          {renderFormField("password", "Enter password", LockKeyhole)}

          <div className="flex items-center justify-between pt-6">
            <Link
              className="text-black text-[15px] font-medium leading-[21px]"
              href="/forgot-password"
            >
              Forgot password?
            </Link>
            <Button
              type="submit"
              className="flex w-[150px] items-center justify-between rounded-xl bg-[#131313] px-5 py-3 text-white transition-all duration-200 hover:bg-[#2b2b2b] hover:scale-105"
              disabled={isPending}
            >
              {isPending && <Loader2 className="h-5 w-5 animate-spin" />}
              Login
              {!isPending && <MoveRight className="h-5 w-5" />}
            </Button>
          </div>
        </form>
      </Form>

      <p className="text-black text-center text-[15px] font-medium leading-[21px] mt-16">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-black text-[15px] font-bold leading-[21px]"
        >
          Sign up
        </Link>
      </p>
    </>
  );
};

export default Login;
