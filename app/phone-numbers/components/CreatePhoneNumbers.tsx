import React from "react";
import CreatePhoneNumberModal from "./CreatePhoneNumberModal";
import Telephone from "@/assets/icons/Telephone";

const CreatePhoneNumbers = ({ setShowModal, showModal }: { setShowModal: (showModal: boolean) => void, showModal: boolean }) => {
  

  return (
    <div className="inline-flex h-[297px] w-full items-center justify-center overflow-hidden bg-white py-6 pl-7 pr-[26px]">
      <div className="inline-flex w-full items-center justify-center self-stretch rounded-2xl border-2 border-[#bbbbbb] bg-neutral-400/5 py-6 pl-[98px] pr-[97px]">
        <div className="inline-flex shrink grow basis-0 flex-col items-center justify-start gap-8 self-stretch">
          <div className="flex h-[125px] flex-col items-center justify-start gap-6 self-stretch">
            <div data-svg-wrapper className="relative">
              <Telephone />
            </div>
            <div className="flex h-[61px] flex-col items-center justify-start gap-2 self-stretch">
              <div className="self-stretch text-center text-base font-semibold text-gray-600">
                Phone Numbers
              </div>
              <div className="self-stretch text-center text-sm font-normal text-gray-500">
                Assistants are able to be connected to phone numbers for calls.
                <br />
                You can import from Twilio, vonage
              </div>
            </div>
          </div>
          <div className="inline-flex items-center justify-center gap-4">
            <div
              className="flex cursor-pointer items-center justify-start gap-1.5 rounded-xl bg-[#131313] px-5 py-3"
              onClick={() => setShowModal(true)}
            >
              <div className="text-center text-base font-medium leading-[14.40px] text-white">
                Create Phone Numbers
              </div>
            </div>
            <div className="flex items-center justify-start gap-1.5 self-stretch rounded-xl">
              <div className="flex h-11 w-[158px] items-center justify-center rounded-xl border border-[#dedede]">
                Documentation
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <CreatePhoneNumberModal open={showModal} setOpen={setShowModal} />
      )}
    </div>
  );
};

export default CreatePhoneNumbers;
