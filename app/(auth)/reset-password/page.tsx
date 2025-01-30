"use client";
import { OTPInput } from '@/components/shared/otp-input'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useForgotPasswordMutation, useVerifyResetPasswordMutation } from '@/service/auth/auth'

const ResetPassword = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [countdown, setCountdown] = useState(59)
  const [canResend, setCanResend] = useState(false)
  const { mutate: forgotPassword } = useForgotPasswordMutation()
  const { mutate: verifyResetPassword, isPending } = useVerifyResetPasswordMutation()

  const encodedData = searchParams.get('data')
  const userData = encodedData ? JSON.parse(atob(encodedData)) : null
  const { email } = userData || {}

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  if (!email) {
    router.push('/forgot-password')
    return null
  }

  const handleResendCode = () => {
    if (canResend) {
      forgotPassword({ email }, {
        onSuccess: (response) => {
          const userData = btoa(JSON.stringify({ email }));
          router.push(`/reset-password?token=${encodeURIComponent(response.token)}&data=${userData}`);
          setCountdown(59)
          setCanResend(false)
          toast.success("Reset code resent")
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || "Failed to resend code")
        }
      })
    }
  }

  const handleSubmit = (otp: string) => {
    const token = searchParams.get('token')
    if (!token) {
      toast.error("Invalid reset token")
      router.push('/forgot-password')
      return
    }
    
    verifyResetPassword({
      token,
      otp
    }, {
      onSuccess: (response) => {
        if (response) {
          toast.success("Email verified successfully")
          router.push(`/set-password?token=${encodeURIComponent(response.resetPasswordToken)}`)
        }
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Failed to verify email")
      }
    })
  }

  return (
    <OTPInput 
      email={email}
      onSubmit={handleSubmit}
      title="Enter OTP"
      buttonText="Submit"
      countdown={countdown}
      onResendCode={handleResendCode}
      canResend={canResend}
      isLoading={isPending}
    />
  )
}

export default ResetPassword