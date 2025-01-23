"use client"
import { MoveRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

const VerifyEmail = () => {
    const router = useRouter()
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [activeOTPIndex, setActiveOTPIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const [color, setColor] = useState(
        "border-gray-400 focus:border-gray-700 focus:text-gray-700"
      );

    const handleOnChange = ({ target }: { target: HTMLInputElement }) => {
      const { value } = target;
      const newOTP = [...otp]; // Copy the current OTP array
  
      let startIndex = activeOTPIndex;
      for (let i = 0; i < value.length && startIndex < 6; i++) {
        newOTP[startIndex] = value[i];
        startIndex++;
      }
  
      setOtp(newOTP);
  
      // Set the active index based on the length of the value
      if (startIndex <= 5) {
        setActiveOTPIndex(startIndex);
      } else {
        setActiveOTPIndex(5);
      }
    };
  
    // console.log(otp);
  
    const handleOnKeyDown = ({ key }: { key: string }, index: number) => {
      setColor("border-gray-400 focus:border-gray-700 focus:text-gray-700");
      const currentOTPIndex = index;
  
      if (key === "Backspace") {
        const newOTP = [...otp];
        newOTP[currentOTPIndex] = ""; // Clear the current input
  
        if (currentOTPIndex > 0) {
          setActiveOTPIndex(currentOTPIndex - 1);
        }
  
        setOtp(newOTP);
      }
    };
    useEffect(() => {
        inputRef.current?.focus();
      }, [activeOTPIndex]);
  return (
    <>
    <div className="mb-10">
            <h1 className="text-2xl font-semibold leading-tight text-[#272728]">
              Verify account
            </h1>
            <p className="mt-2 text-base font-normal leading-tight text-[#575758]">
              Please enter the 6 digit code sent to <span className="font-medium text-black-900">ibrahim@gmail.com</span>
            </p>
          </div>
          <div className=" flex justify-center w-full">
              <div className="grid grid-cols-6 gap-2 w-full">
                {otp.map((_, index) => {
                  return (
                    <React.Fragment key={index}>
                      <input
                        ref={index === activeOTPIndex ? inputRef : null}
                        type="password"
                        className={`w-[40px] h-[35px] md:w-[45px] md:h-[45px] border-2 rounded bg-transparent outline-none text-center font-semibold text-xl border-[#e7e7e7] bg-neutral-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${color} text-gray-400 transition`}
                        onChange={handleOnChange}
                        onKeyDown={(e) => handleOnKeyDown(e, index)}
                        value={otp[index]}
                      />
                    </React.Fragment>
                  );
                })}
               
              </div>
            </div>
          <div className=" mt-10 flex items-center justify-between">
            <h1 className="text-black text-[15px] font-medium leading-[21px]">
              Resend code in <span className='font-bold'>54s</span>
            </h1>
            <Button className="flex w-[120px] items-center justify-between rounded-xl bg-[#131313] px-5 py-3 text-white transition-all duration-200 hover:bg-[#2b2b2b] hover:scale-105" onClick={() => router.push('/login')}>
              Verify
              <MoveRight className="h-5 w-5" />
            </Button>
          </div>
    </>
  )
}

export default VerifyEmail