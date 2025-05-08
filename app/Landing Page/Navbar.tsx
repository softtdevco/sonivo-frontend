"use client";
import { Logo } from "@/assets/images";
import { MenuIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Close mobile menu if it's open
    setIsMenuOpen(false);

    // Get the href attribute
    const href = e.currentTarget.getAttribute('href');
    if (href?.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <div className="inline-flex w-full items-center justify-between self-stretch px-4 py-4 md:px-24">
        <Link href="/">
          <Image src={Logo} alt="Logo" width={150} height={150} className="cursor-pointer hover:opacity-90 transition-opacity" />
        </Link>

        {/* Mobile Menu Icon */}
        <div
          className="block md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <XIcon className="h-6 w-6 cursor-pointer hover:text-gray-600 transition-colors" />
          ) : (
            <MenuIcon className="h-6 w-6 cursor-pointer hover:text-gray-600 transition-colors" />
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center justify-start gap-6 md:flex">
          <Link href="#features" onClick={handleLinkClick} className="h-5 w-16 justify-center text-base font-normal leading-tight text-stone-900 hover:text-gray-600 transition-colors hover:underline">
            Features
          </Link>
          <Link href="#testimonials" onClick={handleLinkClick} className="justify-center text-base font-normal leading-tight text-stone-900 hover:text-gray-600 transition-colors hover:underline">
            Testimonials
          </Link>
          <Link href="#pricing" onClick={handleLinkClick} className="justify-center text-base font-normal leading-tight text-stone-900 hover:text-gray-600 transition-colors hover:underline">
            Pricing
          </Link>
          <Link href="#faq" onClick={handleLinkClick} className="justify-center text-base font-normal leading-tight text-stone-900 hover:text-gray-600 transition-colors hover:underline">
            FAQ
          </Link>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden items-center justify-start gap-4 md:flex">
          <Link href="/login" className="flex items-center justify-start gap-2 hover:text-gray-600 transition-colors group">
            <div className="h-5 justify-center text-base font-medium leading-tight text-stone-900 group-hover:text-gray-600 transition-colors">
              Log in
            </div>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/contact" className="flex items-center justify-start gap-1.5 rounded-xl bg-black-900 px-5 py-3 hover:bg-gray-800 transition-colors group">
            <div className="justify-center text-center text-base font-medium leading-none text-white">
              Contact Transkript
            </div>
            <FaArrowRight className="text-white group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Mobile Menu - Only visible when menu is open */}
      {isMenuOpen && (
        <div className="px-4 pb-4 md:hidden">
          <div className="flex flex-col items-start gap-6 py-4">
            <Link href="#features" onClick={handleLinkClick} className="h-5 w-16 justify-center text-base font-normal leading-tight text-stone-900 hover:text-gray-600 transition-colors">
              Features
            </Link>
            <Link href="#testimonials" onClick={handleLinkClick} className="justify-center text-base font-normal leading-tight text-stone-900 hover:text-gray-600 transition-colors">
              Testimonials
            </Link>
            <Link href="#pricing" onClick={handleLinkClick} className="justify-center text-base font-normal leading-tight text-stone-900 hover:text-gray-600 transition-colors">
              Pricing
            </Link>
            <Link href="#faq" onClick={handleLinkClick} className="justify-center text-base font-normal leading-tight text-stone-900 hover:text-gray-600 transition-colors">
              FAQ
            </Link>
          </div>

          <div className="mt-6 flex flex-col items-center gap-8">
            <Link href="/login" className="inline-flex items-center justify-start gap-2 hover:text-gray-600 transition-colors group">
              <div className="h-5 justify-center text-base font-medium leading-tight text-stone-900 group-hover:text-gray-600 transition-colors">
                Log in
              </div>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact" className="bg-black-900 flex w-full items-center justify-center gap-1.5 rounded-xl px-5 py-3 hover:bg-gray-800 transition-colors group">
              <div className="justify-center text-center text-base font-medium leading-none text-white">
                Contact Transkript
              </div>
              <FaArrowRight className="text-white group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
