import Telephone from "@/assets/icons/Telephone";
import React, { useState } from "react";
import CreatePhoneNumberModal from "./CreatePhoneNumberModal";

const EmptyState = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="inline-flex h-full w-full items-center justify-center overflow-hidden bg-white px-[89px] pb-[160px] pt-[46px]">
        <div className="inline-flex shrink grow basis-0 items-center justify-center self-stretch rounded-2xl border-2 border-dashed border-[#bbbbbb] bg-neutral-400/5 py-[47px] pl-[160px] pr-[160px]">
          <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-8 self-stretch">
            <div className="flex h-[175px] flex-col items-start justify-start gap-6 self-stretch">
              <div data-svg-wrapper className="relative">
                <Telephone />
              </div>
              <div className="flex h-[141px] flex-col items-start justify-start gap-2 self-stretch">
                <div className="self-stretch text-base font-semibold text-gray-600">
                  Phone Numbers
                </div>
                <div className="self-stretch text-base font-normal text-gray-500">
                  Assistants are able to be connected to phone numbers for
                  calls.
                  <br />
                  <br />
                  You can import from Twilio, vonage.
                </div>
              </div>
            </div>
            <div className="inline-flex items-center justify-center gap-4">
              <div
                className="flex cursor-pointer items-center justify-start gap-1.5 rounded-xl bg-[#131313] px-5 py-3"
                onClick={() => setIsModalOpen(true)}
              >
                <div className="text-center text-base font-medium leading-[14.40px] text-white">
                  Create Phone Number
                </div>
              </div>
              <div className="cursor-pointer rounded-xl bg-white px-5 py-3">
                <div className="flex h-11 w-[158px] items-center justify-center rounded-xl border border-[#dedede] text-center text-base font-medium leading-[14.40px] text-[#131313]">
                  Documentation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <CreatePhoneNumberModal open={isModalOpen} setOpen={setIsModalOpen} />
      )}
    </>
  );
};

export default EmptyState;
