"use client"
import { useEffect, useRef, useState } from "react"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { MoveRight } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const otpSchema = z.object({
  otp: z.array(z.string()).length(6, "Please enter all 6 digits")
})

type OTPFormValues = z.infer<typeof otpSchema>

interface OTPInputProps {
  email: string
  onSubmit: (otp: string) => void
  title: string
  buttonText: string
}

export function OTPInput({ email, onSubmit, title, buttonText }: OTPInputProps) {
  const [otp, setOtp] = useState(new Array(6).fill(""))
  const [activeOTPIndex, setActiveOTPIndex] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const form = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: new Array(6).fill("")
    }
  })

  const handleOnChange = ({ target }: { target: HTMLInputElement }) => {
    const { value } = target
    const newOTP = [...otp]
    setError(null)

    let startIndex = activeOTPIndex
    for (let i = 0; i < value.length && startIndex < 6; i++) {
      newOTP[startIndex] = value[i]
      startIndex++
    }

    setOtp(newOTP)

    if (startIndex <= 5) {
      setActiveOTPIndex(startIndex)
    } else {
      setActiveOTPIndex(5)
    }
  }

  const handleOnKeyDown = ({ key }: { key: string }, index: number) => {
    const currentOTPIndex = index
    setError(null)

    if (key === "Backspace") {
      const newOTP = [...otp]
      newOTP[currentOTPIndex] = ""

      if (currentOTPIndex > 0) {
        setActiveOTPIndex(currentOTPIndex - 1)
      }

      setOtp(newOTP)
    }
  }

  const handleSubmit = () => {
    const hasEmptyFields = otp.some(digit => digit === "")
    if (hasEmptyFields) {
      setError("Please enter all 6 digits")
      return
    }
    onSubmit(otp.join(""))
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [activeOTPIndex])

  return (
    <>
      <div className="mb-10">
        <h1 className="text-2xl font-semibold leading-tight text-[#272728]">
          {title}
        </h1>
        <p className="mt-2 text-base font-normal leading-tight text-[#575758]">
          Please enter the 6 digit code sent to <span className="font-medium text-black-900">{email}</span>
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
          <div className="flex justify-center w-full">
            <div className="grid grid-cols-6 gap-2 w-full">
              {otp.map((_, index) => (
                <input
                  key={index}
                  ref={index === activeOTPIndex ? inputRef : null}
                  type="password"
                  className={`w-[40px] h-[35px] md:w-[45px] md:h-[45px] border-2 rounded bg-transparent outline-none text-center font-semibold text-xl bg-neutral-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition ${
                    error 
                      ? "border-red-500 focus:border-red-500 text-red-500" 
                      : "border-[#e7e7e7] focus:border-gray-700 text-gray-700"
                  }`}
                  onChange={handleOnChange}
                  onKeyDown={(e) => handleOnKeyDown(e, index)}
                  value={otp[index]}
                />
              ))}
            </div>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-500 text-center">
              {error}
            </p>
          )}
          <div className="mt-10 flex items-center justify-between">
            <h1 className="text-black text-[15px] font-medium leading-[21px]">
              Resend code in <span className='font-bold'>54s</span>
            </h1>
            <Button 
              type="submit"
              className="flex w-[120px] items-center justify-between rounded-xl bg-[#131313] px-5 py-3 text-white transition-all duration-200 hover:bg-[#2b2b2b] hover:scale-105"
            >
              {buttonText}
              <MoveRight className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}