"use client"
import { Suspense } from 'react'
import { OTPInput } from '@/components/shared/otp-input'
import { useSignUpMutation, useVerifyEmailMutation } from '@/service/auth/auth'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const VerifyEmailContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [countdown, setCountdown] = useState(59)
  const [canResend, setCanResend] = useState(false)
  const { mutate: verifyEmail, isPending } = useVerifyEmailMutation()
  const {mutate: signUp} = useSignUpMutation()
  
  const encodedData = searchParams.get('data')
  const userData = encodedData ? JSON.parse(atob(encodedData)) : null
  const { email, fullName, password, phone } = userData || {}

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  if (!email) {
    router.push('/register')
    return null
  }

  const handleResendCode = () => {
    if (canResend && userData) {
      signUp({
        email,
        fullName,
        password,
        phone: phone || undefined
      }, {
        onSuccess: (response) => {
          router.push(`/verify-email?token=${encodeURIComponent(response.token)}&data=${encodedData}`)
          setCountdown(59)
          setCanResend(false)
          toast.success("Verification code resent")
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
      router.push('/register')
      return
    }
    verifyEmail({ otp, token }, {
      onSuccess: (response) => {
        if (response.user) {
          toast.success("Email verified successfully")
          router.push('/login')
        }
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "An error occurred")
      }
    })
  }

  return (
    <OTPInput 
      email={email}
      onSubmit={handleSubmit}
      title="Verify account"
      buttonText="Verify"
      countdown={countdown}
      onResendCode={handleResendCode}
      canResend={canResend}
      isLoading={isPending}
    />
  )
}

const VerifyEmail = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  )
}

export default VerifyEmail