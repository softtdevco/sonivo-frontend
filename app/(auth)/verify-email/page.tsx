"use client"
import { OTPInput } from '@/components/otp-input'
import { useRouter } from 'next/navigation'


const VerifyEmail = () => {
  const router = useRouter()

  const handleSubmit = (otp: string) => {
    console.log("OTP:", otp)
    router.push('/login')
  }

  return (
    <OTPInput 
      email="ibrahim@gmail.com"
      onSubmit={handleSubmit}
      title="Verify account"
      buttonText="Verify"
    />
  )
}

export default VerifyEmail