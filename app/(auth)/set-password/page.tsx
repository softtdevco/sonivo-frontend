"use client"
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, LockKeyhole, MoveRight } from 'lucide-react'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { setPasswordSchema } from "@/lib/validations/auth"
import type * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"

type SetPasswordFormValues = z.infer<typeof setPasswordSchema>

const SetPassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

  const form = useForm<SetPasswordFormValues>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: SetPasswordFormValues) => {
    try {
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

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
    }`
  })

  const PasswordField = ({ 
    name,
    label,
    placeholder,
    showPassword,
    onTogglePassword 
  }: {
    name: "password" | "confirmPassword"
    label: string
    placeholder: string
    showPassword: boolean
    onTogglePassword: () => void
  }) => {
    const error = !!form.formState.errors[name]
    const styles = getInputStyles(error)

    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className={styles.label}>{label}</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  className={styles.input}
                  placeholder={placeholder}
                />
                <LockKeyhole className={styles.icon} />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  onClick={onTogglePassword}
                >
                  {showPassword ? (
                    <EyeOff className="h-[13px] w-[13px] text-gray-500" />
                  ) : (
                    <Eye className="h-[13px] w-[13px] text-gray-500" />
                  )}
                </button>
              </div>
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
    )
  }

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
          <PasswordField
            name="password"
            label="Password"
            placeholder="Enter password"
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />

          <PasswordField
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm password"
            showPassword={showConfirmPassword}
            onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
          />

          <div className="mb-16 mt-10 flex items-center justify-end">
            <Button 
              type="submit"
              className="flex w-fit items-center justify-between rounded-xl bg-[#131313] px-5 py-3 text-white transition-all duration-200 hover:bg-[#2b2b2b] hover:scale-105"
            >
              Set new password
              <MoveRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default SetPassword
