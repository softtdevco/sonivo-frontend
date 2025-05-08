import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import CreateAssistantModal from "./CreateAssistantModal";
import "./customModal.css";
import RobotHead from "@/assets/icons/RobotHead";

const EmptyState = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="inline-flex h-full w-full items-center justify-center overflow-hidden bg-white px-4 md:px-[89px] pb-[153px] pt-[46px]">
        <div className="inline-flex shrink grow basis-0 items-center justify-center self-stretch rounded-2xl border-2 border-dashed border-[#bbbbbb] bg-neutral-400/5 py-[57px] px-4 md:px-[177px]">
          <div className="inline-flex shrink grow basis-0 flex-col items-center md:items-start justify-start gap-8 self-stretch">
            <div className="flex h-auto md:h-[205px] flex-col items-center md:items-start justify-start gap-6 self-stretch">
              <div data-svg-wrapper className="relative">
                <RobotHead />
              </div>
              <div className="flex h-auto md:h-[141px] flex-col items-center md:items-start justify-start gap-2 self-stretch">
                <div className="self-stretch text-center md:text-left text-base font-semibold text-gray-600">
                  Assistants
                </div>
                <div className="self-stretch text-center md:text-left text-base font-normal text-gray-500">
                  Assistants are voice AI chatbots designed for seamless
                  integration into your applications. <br />
                  <br />
                  They are fully configurable to meet your business needs, with
                  support for all major models and providers.
                </div>
              </div>
            </div>
            <div className="inline-flex flex-col md:flex-row items-center justify-center gap-4">
              <div
                className="flex cursor-pointer items-center justify-start gap-1.5 rounded-xl bg-[#131313] px-5 py-3"
                onClick={() => setIsModalOpen(true)}
              >
                <div className="text-center text-base font-medium leading-[14.40px] text-white">
                  Create Assistant
                </div>
              </div>
              <div className="cursor-pointer rounded-xl bg-white px-5 py-3 mt-2 md:mt-0">
                <div className="flex h-11 w-[158px] items-center justify-center rounded-xl border border-[#dedede] text-center text-base font-medium leading-[14.40px] text-[#131313]">
                  Documentation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <CreateAssistantModal open={isModalOpen} setOpen={setIsModalOpen} />
      )}
    </>
  );
};

export default EmptyState;
