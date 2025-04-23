import { HeroImage2 } from "@/assets/images";
import Image from "next/image";
import React from "react";
import { Autodesk, Cisco, Feica, Frog, Google, Intel, Samsung, Visa } from "@/assets/images";
import Marquee from "react-fast-marquee";
import { FaPhoneFlip } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";

const HeroSection = () => {
  return (
    <>
      <div className="mx-auto h-full w-[80%] pt-12 pb-20 bg-gray-100">
        <div className="h-fit w-full rounded-3xl border-2 border-gray-200 p-5">
          <div className="h-fit w-full rounded-3xl border-2 border-gray-300">
            <Image
              src={HeroImage2}
              alt="heroImage"
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="relative mt-20">
          <div className="absolute right-0 top-0 bottom-0 w-[150px] z-10 bg-gradient-to-r from-transparent to-gray-100"></div>
          <div className="absolute left-0 top-0 bottom-0 w-[150px] z-10 bg-gradient-to-l from-transparent to-gray-100"></div>
          <Marquee pauseOnHover={true}>
            <div className="flex gap-10">
                <Image src={Autodesk} alt="Autodesk" />
                <Image src={Cisco} alt="Cisco" />
                <Image src={Feica} alt="Feica" />
                <Image src={Frog} alt="Frog" />
                <Image src={Google} alt="Google" />
                <Image src={Intel} alt="Intel" />
                <Image src={Samsung} alt="Samsung" />
                <Image src={Visa} alt="Visa" />
            </div>
          </Marquee>
        </div>

        <div className="relative z-10 mt-20 flex items-center justify-center gap-4">
            <div className="inline-flex w-40 items-center justify-between rounded-xl bg-black-900 px-5 py-3">
              <div className="justify-center text-center font-['Inter'] text-base font-medium leading-none text-white">
                Try Now
              </div>
              <div className="relative h-5 w-5 overflow-hidden">
                <FaArrowRight className="text-white" />
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border-2 border-gray-600 px-5 py-2 font-medium">
              <FaPhoneFlip />
              Talk to Sales
            </div>
          </div>
      </div>
    </>
  );
};

export default HeroSection;
