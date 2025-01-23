
"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff, LockKeyhole} from 'lucide-react'
import React, { useState } from 'react'

const SetPassword = () => {
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
              New password
            </h1>
            <p className="mt-2 text-base font-normal leading-tight text-[#575758]">
              Create a new password
            </p>
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
          <div className="mb-16 mt-10 flex items-center justify-end">
            <Button className="flex w-fit items-center justify-between rounded-xl bg-[#131313] px-5 py-3 text-white transition-all duration-200 hover:bg-[#2b2b2b] hover:scale-105">
              Set new password
            
            </Button>
          </div>
    </>
  )
}

export default SetPassword
