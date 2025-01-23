"use client";
import Image from "next/image";
import Logo from "@/public/Sonivo.svg";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center md:py-8 sm:min-h-screen md:h-full">
      <div className="w-full rounded-[20px] border border-[#f1f1f1] bg-white px-5 py-[40px] shadow-[0px_21px_35px_0px_rgba(0,0,0,0.05)] md:w-[45%] md:px-[61px] ">
        <div className="mb-12 flex justify-center">
          <Image alt="logo" src={Logo} />
        </div>
        {children}
      </div>
    </div>
  );
}
