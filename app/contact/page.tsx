"use client";
import React from "react";
import { FaArrowRight, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import Navbar from "../Landing Page/Navbar";
import Footer from "../Landing Page/Footer";

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="mx-auto h-full md:w-[80%] w-[90%] pt-12 md:pb-20 pb-10">
          <div className="h-fit w-full rounded-3xl border-2 border-gray-200 p-8 hover:border-gray-300 transition-colors">
            <h1 className="text-3xl font-bold text-center mb-8">Contact Transkript</h1>
            
            <div className="flex flex-col items-center gap-8">
              <div className="text-center">
                <p className="text-lg mb-4">Have questions? We&apos;d love to hear from you.</p>
                <p className="text-gray-600">Send us a message and we&apos;ll respond as soon as possible.</p>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
                <Link 
                  href="mailto:contact@transkript.com" 
                  className="inline-flex w-40 items-center justify-between rounded-xl bg-black-900 px-5 py-3 hover:bg-gray-800 transition-colors group cursor-pointer"
                >
                  <div className="justify-center text-center font-['Inter'] text-base font-medium leading-none text-white">
                    Email Us
                  </div>
                  <div className="relative h-5 w-5 overflow-hidden">
                    <FaEnvelope className="text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                <Link 
                  href="/dashboard" 
                  className="flex items-center gap-3 rounded-xl border-2 border-gray-600 px-5 py-2 font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <FaArrowRight />
                  Back to Home
                </Link>
              </div>

              <div className="mt-8 text-center text-gray-600">
                <p>Our team typically responds within 24 hours.</p>
                <p className="mt-2">Email: contact@transkript.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
