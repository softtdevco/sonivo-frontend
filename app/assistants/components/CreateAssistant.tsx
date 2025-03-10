"use client";
import RobotHead from "@/assets/icons/RobotHead";
import React, { useState } from "react";
import CreateAssistantModal from "./CreateAssistantModal";

const CreateAssistant = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="inline-flex h-[297px] w-full items-center justify-center overflow-hidden bg-white py-6 pl-7 pr-[26px]">
      <div className="inline-flex w-full items-center justify-center self-stretch rounded-2xl border-2 border-[#bbbbbb] bg-neutral-400/5 py-6 pl-[98px] pr-[97px]">
        <div className="inline-flex shrink grow basis-0 flex-col items-center justify-start gap-8 self-stretch">
          <div className="flex h-[125px] flex-col items-center justify-start gap-6 self-stretch">
            <div data-svg-wrapper className="relative">
              <RobotHead />
            </div>
            <div className="flex h-[61px] flex-col items-center justify-start gap-2 self-stretch">
              <div className="self-stretch text-center  text-base font-semibold text-gray-600">
                Assistants
              </div>
              <div className="self-stretch text-center  text-sm font-normal text-gray-500">
                Assistants are voice AI chatbots designed for seamless
                integration into your applications. <br />
                They are fully configurable to meet your business needs, with
                support for all major models and providers.
              </div>
            </div>
          </div>
          <div className="inline-flex items-center justify-center gap-4">
            <div className="flex items-center justify-start gap-1.5 rounded-xl bg-[#131313] px-5 py-3 cursor-pointer" onClick={() => setShowModal(true)}>
              <div className="text-center  text-base font-medium leading-[14.40px] text-white">
                Create Assistant
              </div>
            </div>
            <div className="flex items-center justify-start gap-1.5 self-stretch rounded-xl ">
              <div className="h-11 w-[158px] rounded-xl border border-[#dedede] flex items-center justify-center">
                Documentation
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && <CreateAssistantModal open={showModal} setOpen={setShowModal} />}
    </div>
  );
};

export default CreateAssistant;
