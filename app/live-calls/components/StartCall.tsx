"use client";
import React from "react";
import { BsTelephoneOutboundFill } from "react-icons/bs";

const StartCall = () => {
  return (
    <>
      <div className="relative h-64 self-stretch rounded-2xl bg-violet-50 outline outline-2">
        <div className=" inline-flex w-full flex-col items-center justify-center h-full gap-8">
          <div className="flex flex-col items-center justify-start gap-6 self-stretch">
            <div className="relative h-10 w-10 overflow-hidden">
              <BsTelephoneOutboundFill className=" h-10 w-10 text-indigo-700" />
            </div>
            <div className="flex flex-col items-center justify-start gap-2 self-stretch">
              <div className="text-black justify-start self-stretch text-center text-base font-medium">
                Start Call
              </div>
              <div className="justify-start text-base font-medium text-neutral-400">
                Enter a phone number to make a call
              </div>
            </div>
          </div>
          <div className="bg-black-900 relative inline-flex items-center justify-start gap-1.5 rounded-xl px-5 py-3 w-48 border border-neutral-200">
            <div className="justify-center text-center text-base font-medium leading-none text-white">
              Call phone number
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartCall;
