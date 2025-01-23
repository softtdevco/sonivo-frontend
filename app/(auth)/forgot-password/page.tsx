"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, MoveRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const ForgotPassword = () => {
    const router = useRouter()
  return (
    <>
     <div className="mb-10">
            <h1 className="text-2xl font-semibold leading-tight text-[#272728]">
              Forgot password
            </h1>
            <p className="mt-2 text-base font-normal leading-tight text-[#575758]">
              Enter your email to reset your password
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
          <div className="mb-16 mt-10 flex items-center justify-between">
            <h1 className="text-black text-[15px] font-medium leading-[21px] cursor-pointer" onClick={() => router.push('/login')}>
              Back to login
            </h1>
            <Button className="flex w-[165px] items-center justify-between rounded-xl bg-[#131313] px-5 py-3 text-white transition-all duration-200 hover:bg-[#2b2b2b] hover:scale-105" onClick={() => router.push('/reset-password')}>
              Reset password
              <MoveRight className="h-5 w-5" />
            </Button>
          </div>
    </>
  )
}

export default ForgotPassword