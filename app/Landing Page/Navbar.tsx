"use client";
import { Logo } from "@/assets/images";
import { MenuIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="inline-flex w-full items-center justify-between self-stretch px-4 py-4 md:px-24">
        <Image src={Logo} alt="Logo" width={150} height={150} />

        {/* Mobile Menu Icon */}
        <div
          className="block md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <XIcon className="h-6 w-6 cursor-pointer" />
          ) : (
            <MenuIcon className="h-6 w-6 cursor-pointer" />
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center justify-start gap-6 md:flex">
          <div className="h-5 w-16 justify-center text-base font-normal leading-tight text-stone-900">
            Features
          </div>
          <div className="justify-center text-base font-normal leading-tight text-stone-900">
            Why Transkript
          </div>
          <div className="justify-center text-base font-normal leading-tight text-stone-900">
            Pricing
          </div>
          <div className="justify-center text-base font-normal leading-tight text-stone-900">
            Testimonials
          </div>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden items-center justify-start gap-4 md:flex">
          <div className="flex items-center justify-start gap-2">
            <div className="h-5 justify-center text-base font-medium leading-tight text-stone-900">
              Log in
            </div>
            <FaArrowRight className="" />
          </div>
          <div className="flex items-center justify-start gap-1.5 rounded-xl bg-black-900 px-5 py-3">
            <div className="justify-center text-center text-base font-medium leading-none text-white">
              Contact sales
            </div>
            <FaArrowRight className="text-white" />
          </div>
        </div>
      </div>

      {/* Mobile Menu - Only visible when menu is open */}
      {isMenuOpen && (
        <div className="px-4 pb-4 md:hidden">
          <div className="flex flex-col items-start gap-6 py-4">
            <div className="h-5 w-16 justify-center text-base font-normal leading-tight text-stone-900">
              Features
            </div>
            <div className="justify-center text-base font-normal leading-tight text-stone-900">
              Why Transkript
            </div>
            <div className="justify-center text-base font-normal leading-tight text-stone-900">
              Pricing
            </div>
            <div className="justify-center text-base font-normal leading-tight text-stone-900">
              Testimonials
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center gap-8">
            <div className="inline-flex items-center justify-start gap-2">
              <div className="h-5 justify-center text-base font-medium leading-tight text-stone-900">
                Log in
              </div>
              <FaArrowRight className="" />
            </div>
            <div className="bg-black-900 flex w-full items-center justify-center gap-1.5 rounded-xl px-5 py-3">
              <div className="justify-center text-center text-base font-medium leading-none text-white">
                Contact sales
              </div>
              <FaArrowRight className="text-white" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
