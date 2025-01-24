"use client"
import React from 'react'
import { Mail, MoveRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { forgotPasswordSchema } from '@/lib/validations/auth'



type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

const ForgotPassword = () => {
  const router = useRouter()
  
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      console.log(data)
      router.push('/reset-password')
    } catch (error) {
      console.error(error)
    }
  }

  // Extract common styles
  const inputBaseStyles = "mt-1 rounded-xl border bg-neutral-50 px-[20.52px] py-5"
  const getErrorStyles = (error: boolean) => 
    error ? "border-red-500 focus-visible:ring-red-500 text-red-500" : "border-[#e7e7e7]"
  const getLabelStyles = (error: boolean) =>
    `text-base font-normal leading-tight ${error ? "text-red-500" : "text-[#272728]"}`
  const getIconStyles = (error: boolean) =>
    `absolute left-4 top-1/2 h-[13px] w-[13px] -translate-y-1/2 ${error ? "text-red-500" : "text-gray-500"}`

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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={getLabelStyles(!!form.formState.errors.email)}>
                  Email
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      className={`${inputBaseStyles} pl-10 ${getErrorStyles(!!form.formState.errors.email)}`}
                      placeholder="Enter email"
                      type="email"
                    />
                    <Mail className={getIconStyles(!!form.formState.errors.email)} />
                  </div>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="mb-16 mt-10 flex items-center justify-between">
            <h1 
              className="text-black text-[15px] font-medium leading-[21px] cursor-pointer" 
              onClick={() => router.push('/login')}
            >
              Back to login
            </h1>
            <Button 
              type="submit"
              className="flex w-[165px] items-center justify-between rounded-xl bg-[#131313] px-5 py-3 text-white transition-all duration-200 hover:bg-[#2b2b2b] hover:scale-105"
            >
              Reset password
              <MoveRight className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default ForgotPassword