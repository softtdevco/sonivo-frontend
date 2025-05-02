import { HeroImage2 } from "@/assets/images";
import Image from "next/image";
import React from "react";
import { Autodesk, Cisco, Feica, Frog, Google, Intel, Samsung, Visa } from "@/assets/images";
import Marquee from "react-fast-marquee";
import { FaPhoneFlip } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const HeroSection = () => {
  return (
    <>
      <div className="mx-auto h-full md:w-[80%] w-[90%] pt-12 md:pb-20 pb-10 bg-gray-100">
        <div className="h-fit w-full rounded-3xl border-2 border-gray-200 p-5 hover:border-gray-300 transition-colors">
          <div className="h-fit w-full rounded-3xl border-2 border-gray-300 overflow-hidden">
            <Image
              src={HeroImage2}
              alt="heroImage"
              className="cursor-pointer w-full hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
        <div className="relative mt-20">
          <div className="absolute right-0 top-0 bottom-0 w-[100px] md:w-[150px] z-10 bg-gradient-to-r from-transparent to-gray-100"></div>
          <div className="absolute left-0 top-0 bottom-0 w-[100px] md:w-[150px] z-10 bg-gradient-to-l from-transparent to-gray-100"></div>
          <Marquee pauseOnHover={true} speed={30}>
            <div className="flex gap-10">
                <Image src={Autodesk} alt="Autodesk" className="opacity-80 hover:opacity-100 transition-opacity" />
                <Image src={Cisco} alt="Cisco" className="opacity-80 hover:opacity-100 transition-opacity" />
                <Image src={Feica} alt="Feica" className="opacity-80 hover:opacity-100 transition-opacity" />
                <Image src={Frog} alt="Frog" className="opacity-80 hover:opacity-100 transition-opacity" />
                <Image src={Google} alt="Google" className="opacity-80 hover:opacity-100 transition-opacity" />
                <Image src={Intel} alt="Intel" className="opacity-80 hover:opacity-100 transition-opacity" />
                <Image src={Samsung} alt="Samsung" className="opacity-80 hover:opacity-100 transition-opacity" />
                <Image src={Visa} alt="Visa" className="opacity-80 hover:opacity-100 transition-opacity" />
            </div>
          </Marquee>
        </div>

        <div className="relative z-10 mt-20 flex md:flex-col flex-row items-center justify-center gap-4">
            <Link href="/try-now" className="inline-flex w-40 items-center justify-between rounded-xl bg-black-900 px-5 py-3 hover:bg-gray-800 transition-colors group">
              <div className="justify-center text-center font-['Inter'] text-base font-medium leading-none text-white">
                Try Now
              </div>
              <div className="relative h-5 w-5 overflow-hidden">
                <FaArrowRight className="text-white group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            <Link href="/contact-sales" className="flex items-center gap-3 rounded-xl border-2 border-gray-600 px-5 py-2 font-medium hover:bg-gray-200 transition-colors">
              <FaPhoneFlip />
              Talk to Sales
            </Link>
          </div>
      </div>
    </>
  );
};

export default HeroSection;
