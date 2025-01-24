"use client";
import { OTPInput } from '@/components/shared/otp-input'
import { useRouter } from 'next/navigation'


const ResetPassword = () => {
  const router = useRouter()

  const handleSubmit = (otp: string) => {
    console.log("OTP:", otp)
    router.push('/login')
  }

  return (
    <OTPInput 
      email="ibrahim@gmail.com"
      onSubmit={handleSubmit}
      title="Enter OTP"
      buttonText="Submit"
    />
  )
}

export default ResetPassword