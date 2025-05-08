import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";

const HeroHeader = () => {
  return (
    <>
      <div className="bg-hero-image bg-cover bg-center md:pb-40 md:pt-40 pb-20 pt-20">
        <div className="relative mx-auto">
          {/* Call Flow Builder and other UI elements */}
          <div className="absolute top-[180px] right-0 h-9 w-36 hidden md:block">
            <div className="absolute left-[-132.12px] top-[12px] inline-flex items-start justify-start overflow-hidden rounded-full bg-yellow-400 px-2.5 shadow-[inset_0px_0px_0px_0px_rgba(255,255,255,1.00)] shadow-[inset_0px_0px_0px_1px_rgba(255,235,164,1.00)]">
              <div className="justify-center text-center font-['Inter'] text-sm font-medium leading-normal text-white">
                Call Flow Builder
              </div>
            </div>
          </div>
          <div className="absolute right-[180px] top-[-70px] h-9 w-44 hidden md:block">
            <div className="absolute left-[12.12px] top-[12px] inline-flex items-start justify-start overflow-hidden rounded-full bg-violet-400 px-2.5 shadow-[inset_0px_0px_0px_0px_rgba(255,255,255,1.00)] shadow-[inset_0px_0px_0px_1px_rgba(184,166,255,1.00)]">
              <div className="justify-center text-center font-['Inter'] text-sm font-medium leading-normal text-white">
                AI Assistant training
              </div>
            </div>
          </div>
          <div className="absolute left-[175px] top-[-50px] h-9 w-36 hidden md:block">
            <div className="absolute left-[12.12px] top-[12px] inline-flex items-start justify-start overflow-hidden rounded-full bg-orange-300 px-2.5 shadow-[inset_0px_0px_0px_0px_rgba(255,255,255,1.00)] shadow-[inset_0px_0px_0px_1px_rgba(253,197,166,1.00)]">
              <div className="justify-center text-center font-['Inter'] text-sm font-medium leading-normal text-white">
                Call Broadcast
              </div>
            </div>
          </div>
          <div className="absolute left-0 top-[120px] h-9 w-36 hidden md:block">
            <div className="absolute left-[82.12px] top-[12px] inline-flex items-start justify-start overflow-hidden rounded-full bg-red-300 px-2.5 shadow-[inset_0px_0px_0px_0px_rgba(255,255,255,1.00)] shadow-[inset_0px_0px_0px_1px_rgba(255,180,180,1.00)]">
              <div className="justify-center text-center font-['Inter'] text-sm font-medium leading-normal text-white">
                IVR
              </div>
            </div>
          </div>
          <div className="absolute top-[180px] left-[135px] h-9 w-36 hidden md:block">
            <div className="absolute left-[12.12px] top-[12px] inline-flex items-start justify-start overflow-hidden rounded-full bg-emerald-500 px-2.5 shadow-[inset_0px_0px_0px_0px_rgba(255,255,255,1.00)] shadow-[inset_0px_0px_0px_1px_rgba(82,201,151,1.00)]">
              <div className="justify-center text-center font-['Inter'] text-sm font-medium leading-normal text-white">
                Agent Access
              </div>
            </div>
          </div>

          {/* Main headline text */}
          <div className="text-black relative z-10 mx-auto w-[80%] justify-center self-stretch text-center font-syne md:text-5xl text-3xl font-bold md:leading-[55px] leading-10">
            The Complete & Most Advanced Transkript Center Software for <br />
            Your Business
          </div>

          {/* Buttons */}
          <div className="relative z-10 mt-5 flex items-center justify-center gap-4">
            <Link href="/login" className="inline-flex w-40 items-center justify-between rounded-xl bg-black-900 px-5 py-3">
              <div className="justify-center text-center font-['Inter'] text-base font-medium leading-none text-white">
                Try Now
              </div>
              <div className="relative h-5 w-5 overflow-hidden">
                <FaArrowRight className="text-white" />
              </div>
            </Link>
            <Link href="/contact" className="flex items-center gap-3 rounded-xl border-2 border-black-900 px-5 py-2 font-medium">
              <FaPhoneFlip />
              Contact Transkript
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroHeader;
