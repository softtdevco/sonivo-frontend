"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  CircleUserRound,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  MoveRight,
  PhoneIncoming,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
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
          <div>
            <label
              htmlFor="name"
              className="text-base font-normal leading-tight text-[#272728]"
            >
              Your name
            </label>
            <div className="relative">
              <Input
                className="mt-1 rounded-xl border border-[#e7e7e7] bg-neutral-50 px-[20.52px] py-5 pl-10"
                placeholder="Enter your name"
                id="name"
                type="text"
              />
              <CircleUserRound className="absolute left-4 top-1/2 h-[13px] w-[13px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="phone-number"
              className="text-base font-normal leading-tight text-[#272728]"
            >
              Phone number (optional)
            </label>
            <div className="relative">
              <Input
                id="phone-number"
                type="tel"
                className="mt-1 rounded-xl border border-[#e7e7e7] bg-neutral-50 px-[20.52px] py-5 pl-10 pr-10"
                placeholder="Enter phone number"
              />
              <PhoneIncoming className="absolute left-4 top-1/2 h-[13px] w-[13px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div className="mt-4">
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
                id="email"
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
                id="password"
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
          <div className="mt-4">
            <label
              htmlFor="confirm-password"
              className="text-base font-normal leading-tight text-[#272728]"
            >
              Confirm password
            </label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                className="mt-1 rounded-xl border border-[#e7e7e7] bg-neutral-50 px-[20.52px] py-5 pl-10 pr-10"
                placeholder="Enter password"
                id="confirm-password"
              />
              <LockKeyhole className="absolute left-4 top-1/2 h-[13px] w-[13px] -translate-y-1/2 text-gray-500" />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2"
                onClick={handleShowConfirmPassword}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-[13px] w-[13px] text-gray-500" />
                ) : (
                  <Eye className="h-[13px] w-[13px] text-gray-500" />
                )}
              </button>
            </div>
          </div>
          <div className="items-top mt-10 flex space-x-4 items-center">
            <Checkbox id="terms1"  />
            <p className="text-black text-[15px] font-medium leading-[21px]">
              By clicking here, you are accepting our Privacy policy, Terms &
              Conditions
            </p>
          </div>
         
         
          <div className="mb-16 mt-10 flex items-center justify-end">
            
            <Button className="flex w-[170px] items-center justify-between rounded-xl bg-[#131313] px-5 py-3 text-white transition-all duration-200 hover:bg-[#2b2b2b] hover:scale-105">
              Create Account
              <MoveRight className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-black text-center text-[15px] font-medium leading-[21px]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-black text-[15px] font-bold leading-[21px] "
            >
              Sign in
            </Link>
          </p>
        
    </>
  );
};

export default Register;
