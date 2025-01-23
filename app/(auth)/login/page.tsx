"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, LockKeyhole, Mail, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
     
          <div className="mb-10">
            <h1 className="text-2xl font-semibold leading-tight text-[#272728]">
              Sign in
            </h1>
            <p className="mt-2 text-base font-normal leading-tight text-[#575758]">
              Log into your Sonivo account
            </p>
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-base font-normal leading-tight text-[#272728]"
            >
              Email
            </label>
            <div className="relative">
              <Input
                className="mt-1 rounded-xl border border-[#e7e7e7] bg-neutral-50 px-[20.52px] py-5 pl-10"
                placeholder="Enter email"
                type="email"
              />
              <Mail className="absolute left-4 top-1/2 h-[13px] w-[13px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="text-base font-normal leading-tight text-[#272728]"
            >
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                className="mt-1 rounded-xl border border-[#e7e7e7] bg-neutral-50 px-[20.52px] py-5 pl-10 pr-10"
                placeholder="Enter password"
              />
              <LockKeyhole className="absolute left-4 top-1/2 h-[13px] w-[13px] -translate-y-1/2 text-gray-500" />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2"
                onClick={handleShowPassword}
              >
                {showPassword ? (
                  <EyeOff className="h-[13px] w-[13px] text-gray-500" />
                ) : (
                  <Eye className="h-[13px] w-[13px] text-gray-500" />
                )}
              </button>
            </div>
          </div>
          <div className="mb-16 mt-10 flex items-center justify-between">
            <Link className="text-black text-[15px] font-medium leading-[21px]" href="/forgot-password">
              Forgot password?
            </Link>
            <Button className="flex w-[150px] items-center justify-between rounded-xl bg-[#131313] px-5 py-3 text-white transition-all duration-200 hover:bg-[#2b2b2b] hover:scale-105">
              Login
              <MoveRight className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-black text-center text-[15px] font-medium leading-[21px]">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-black text-[15px] font-bold leading-[21px] "
            >
              Sign up
            </Link>
          </p>
        
    </>
  );
};

export default Login;
