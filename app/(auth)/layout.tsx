"use client";
import { Logo } from "@/assets/images";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center mt-[30px] md:mt-0 sm:min-h-screen md:py-8 md:h-full">
      <div className="w-full rounded-[20px] md:border md:border-[#f1f1f1] md:bg-white px-5 py-[40px] md:shadow-[0px_21px_35px_0px_rgba(0,0,0,0.05)] md:w-[45%] md:px-[61px]">
        <div className="mb-12 flex justify-center">
          <Image alt="logo" src={Logo} />
        </div>
        {children}
      </div>
    </div>
  );
}
