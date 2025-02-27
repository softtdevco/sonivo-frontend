import React, { useState } from "react";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import CreateAssistantModal from "./CreateAssistantModal"
import "./customModal.css"


const EmptyState = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <div className="inline-flex h-full w-full items-center justify-center overflow-hidden bg-white px-[89px] pb-[153px] pt-[46px]">
      <div className="inline-flex shrink grow basis-0 items-center justify-center self-stretch rounded-2xl border-2 border-[#bbbbbb] bg-neutral-400/5 py-[57px] pl-[178px] pr-[177px] border-dashed">
        <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-8 self-stretch">
          <div className="flex h-[205px] flex-col items-start justify-start gap-6 self-stretch">
            <div data-svg-wrapper className="relative">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.5344 4.59551C15.5344 2.1303 17.5328 0.131836 19.998 0.131836C22.4633 0.131836 24.4617 2.1303 24.4617 4.59551C24.4617 6.28417 23.524 7.75383 22.1409 8.51217V11.5844C25.8658 11.9118 29.2793 13.1064 31.9122 15.1809C35.0793 17.6767 37.0216 21.3777 37.0216 26.0657V27.1066H32.9096C31.355 27.1066 29.9033 27.8847 29.043 29.1794L28.2044 30.4411C28.0058 30.74 27.6708 30.9194 27.312 30.9194H12.684C12.3253 30.9194 11.9903 30.74 11.7917 30.4411L10.9532 29.1794C10.0926 27.8847 8.64112 27.1066 7.08647 27.1066H2.99152L2.97461 27.1067V26.0657C2.97461 21.3777 4.91675 17.6767 8.08407 15.1809C10.7168 13.1064 14.1303 11.9118 17.8552 11.5844V8.5122C16.4721 7.75386 15.5344 6.2842 15.5344 4.59551ZM2.97461 30.678V35.582C2.97461 37.9491 4.89338 39.8677 7.26032 39.8677H32.7359C35.1028 39.8677 37.0216 37.9491 37.0216 35.582V30.678H32.9096C32.5508 30.678 32.2159 30.8577 32.0173 31.1563L31.1788 32.418C30.3182 33.7129 28.8668 34.4909 27.312 34.4909H12.684C11.1294 34.4909 9.67792 33.7129 8.81735 32.418L7.97878 31.1563C7.78021 30.8577 7.44524 30.678 7.08647 30.678H2.99152H2.97461ZM13.5695 20C12.386 20 11.4266 20.9594 11.4266 22.1429C11.4266 23.3263 12.386 24.2857 13.5695 24.2857C14.753 24.2857 15.7124 23.3263 15.7124 22.1429C15.7124 20.9594 14.753 20 13.5695 20ZM24.2838 22.1429C24.2838 20.9594 25.2432 20 26.4266 20C27.6101 20 28.5695 20.9594 28.5695 22.1429C28.5695 23.3263 27.6101 24.2857 26.4266 24.2857C25.2432 24.2857 24.2838 23.3263 24.2838 22.1429Z"
                  fill="black"
                  fill-opacity="0.7"
                />
              </svg>
            </div>
            <div className="flex h-[141px] flex-col items-start justify-start gap-2 self-stretch">
              <div className="self-stretch  text-base font-semibold text-gray-600">
                Assistants
              </div>
              <div className="self-stretch  text-base font-normal text-gray-500">
                Assistants are voice AI chatbots designed for seamless
                integration into your applications. <br />
                <br />
                They are fully configurable to meet your business needs, with
                support for all major models and providers.
              </div>
            </div>
          </div>
          <div className="inline-flex items-center justify-center gap-4">
            <div 
              className="flex items-center justify-start gap-1.5 rounded-xl bg-[#131313] px-5 py-3 cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="text-center  text-base font-medium leading-[14.40px] text-white">
                Create Assistant
              </div>
            </div>
            <div className=" rounded-xl bg-white px-5 py-3 cursor-pointer"
            >
              <div className="text-center text-base font-medium leading-[14.40px] text-[#131313] h-11 w-[158px] rounded-xl border border-[#dedede] flex items-center justify-center">
                Documentation
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} center classNames={{modal: "custom-modal"}}>
        <CreateAssistantModal onClose={() => setIsModalOpen(false)}/>
      </Modal>
    </>
  );
};

export default EmptyState;
