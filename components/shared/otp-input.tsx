"use client";
import { useEffect, useRef, useState } from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2, MoveRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const otpSchema = z.object({
  otp: z.array(z.string()).length(6, "Please enter all 6 digits"),
});

type OTPFormValues = z.infer<typeof otpSchema>;

interface OTPInputProps {
  email: string;
  onSubmit: (otp: string) => void;
  title: string;
  buttonText: string;
  countdown?: number;
  onResendCode?: () => void;
  canResend?: boolean;
  isLoading?: boolean;
}

export function OTPInput({
  email,
  onSubmit,
  title,
  buttonText,
  countdown,
  onResendCode,
  canResend,
  isLoading,
}: OTPInputProps) {
  const [otp, setOtp] = useState(new Array(5).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: new Array(5).fill(""),
    },
  });

  const handleOnChange = ({ target }: { target: HTMLInputElement }) => {
    const { value } = target;
    const newOTP = [...otp];
    setError(null);

    let startIndex = activeOTPIndex;
    for (let i = 0; i < value.length && startIndex < 5; i++) {
      newOTP[startIndex] = value[i];
      startIndex++;
    }

    setOtp(newOTP);

    if (startIndex <= 4) {
      setActiveOTPIndex(startIndex);
    } else {
      setActiveOTPIndex(4);
    }
  };

  const handleOnKeyDown = ({ key }: { key: string }, index: number) => {
    const currentOTPIndex = index;
    setError(null);

    if (key === "Backspace") {
      const newOTP = [...otp];
      newOTP[currentOTPIndex] = "";

      if (currentOTPIndex > 0) {
        setActiveOTPIndex(currentOTPIndex - 1);
      }

      setOtp(newOTP);
    }
  };

  const handleSubmit = () => {
    const hasEmptyFields = otp.some((digit) => digit === "");
    if (hasEmptyFields) {
      setError("Please enter all 5 digits");
      return;
    }
    onSubmit(otp.join(""));
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  return (
    <>
      <div className="md:mb-10 mb-6">
        <h1 className="md:text-2xl text-xl font-semibold leading-tight text-[#272728]">
          {title}
        </h1>
        <p className="mt-2 text-base font-normal leading-tight text-[#575758]">
          Please enter the 5 digit code sent to{" "}
          <span className="font-medium text-black-900">{email}</span>
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="flex w-full justify-center">
            <div className="grid w-full grid-cols-5 gap-2">
              {otp.map((_, index) => (
                <input
                  key={index}
                  ref={index === activeOTPIndex ? inputRef : null}
                  type="password"
                  className={`h-[35px] w-[40px] rounded border-2 bg-neutral-50 bg-transparent text-center text-xl font-semibold outline-none transition [appearance:textfield] md:h-[45px] md:w-[45px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
                    error
                      ? "border-red-500 text-red-500 focus:border-red-500"
                      : "border-[#e7e7e7] text-gray-700 focus:border-gray-700"
                  }`}
                  onChange={handleOnChange}
                  onKeyDown={(e) => handleOnKeyDown(e, index)}
                  value={otp[index]}
                />
              ))}
            </div>
          </div>
          {error && (
            <p className="mt-2 text-center text-sm text-red-500">{error}</p>
          )}
          <div className="mt-10 flex items-center justify-between">
            <div
              className={`text-[15px] font-medium leading-[21px] ${canResend ? "cursor-pointer text-blue-600 underline" : "text-black"}`}
              onClick={canResend ? onResendCode : undefined}
            >
              {canResend ? (
                "Resend code"
              ) : (
                <>
                  Resend code in <span className="font-bold">{countdown}s</span>
                </>
              )}
            </div>
            <Button
              type="submit"
              className="flex w-[120px] items-center justify-between rounded-xl bg-[#131313] px-5 py-3 text-white transition-all duration-200 hover:scale-105 hover:bg-[#2b2b2b]"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
              {buttonText}
              {!isLoading && <MoveRight className="h-5 w-5" />}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
