
import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Asterisk from "@/assets/icons/Asterisk";
import AddFileIcon from "@/assets/icons/AddFileIcon";
import HeadsetIcon from "@/assets/icons/HeadsetIcon";
import GamepadIcon from "@/assets/icons/GamepadIcon";
import { Input } from "@/components/ui/input";
import { useCreateAssistant } from "@/service/assistant/assistant";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const CreateAssistantModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const {mutate: createAssistant, isPending} = useCreateAssistant();
  const [name, setName] = useState("");
  const router = useRouter();

  const handleCreateAssistant = () => {
    createAssistant({name}, {
      onSuccess: (response) => {
        toast.success("Assistant created successfully");
        setOpen(false);
        setName("");
        router.push(`/assistants/${response.id}`);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Failed to create assistant");
      }
    });
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className="shadow-[0px_21px_35px_0px_rgba(0,0,0,0.05)]w-[400px] inline-flex h-[701px] flex-col gap-8 overflow-hidden rounded-bl-[20px] rounded-br-[20px] bg-white px-8 py-6">
        <div className="flex h-[75px] flex-col items-start justify-start gap-2 self-stretch">
          <div className="self-stretch text-base font-semibold text-gray-600">
            Choose a template
          </div>
          <div className="self-stretch text-base font-normal leading-normal text-gray-500">
            Here&apos;s a few templates to get you started, or you can create
            your own template and use it to create a new assistant.
          </div>
        </div>
        <div className="flex h-[546px] flex-col items-start justify-start gap-6 self-stretch">
          <div className="flex h-[76px] flex-col items-start justify-start gap-2 self-stretch">
            <div className="inline-flex items-center justify-center gap-2">
              <div>
                <span className="text-sm font-normal leading-[17.50px] text-[#272728]">
                  Assistant's name
                </span>
                <span className="text-sm font-normal leading-[17.50px] text-[#ef5a3c]">
                  *
                </span>
              </div>
              <div className="text-xs font-normal leading-[15px] text-[#808080]">
                You can change this later
              </div>
            </div>

            <Input
              className="inline-flex h-[50px] shrink grow basis-0 items-center justify-start gap-[19.38px] self-stretch rounded-xl border border-gray-200 bg-neutral-50 px-[20.52px] py-5 text-sm font-normal leading-[17.50px] text-black-900  outline-0 focus:border-none focus:ring-0"
              placeholder="Enter preferred name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div data-svg-wrapper>
            <Asterisk />
          </div>
          <div className="grid grid-cols-2 gap-5 self-stretch">
            <div className="inline-flex shrink grow basis-0 flex-col items-start justify-center gap-2.5 rounded-2xl border-2 border-[#ef5a3c] bg-[#ef5a3c]/5 p-6">
              <div data-svg-wrapper>
                <AddFileIcon />
              </div>
              <div className="flex h-[89px] flex-col items-start justify-start gap-2.5 self-stretch">
                <div className="self-stretch text-base font-semibold text-[#ef5a3c]">
                  Blank Template
                </div>
                <div className="self-stretch text-xs font-normal leading-[15px] text-[#c69389]">
                  This blank slate template with minimal configurations. It's a
                  starting point for creating your custom assistant.
                </div>
              </div>
            </div>
            <div className="inline-flex shrink grow basis-0 flex-col items-start justify-center gap-2.5 rounded-2xl border border-gray-300 bg-[#f9f9f9] p-6">
              <div data-svg-wrapper className="relative">
                <HeadsetIcon />
              </div>
              <div className="flex h-[89px] flex-col items-start justify-start gap-2.5 self-stretch">
                <div className="self-stretch text-base font-semibold text-gray-600">
                  Inbound Q & A
                </div>
                <div className="self-stretch text-xs font-normal leading-[15px] text-[#808080]">
                  An inbound call agent example designed to provide
                  comprehensive support for SmartHome Innovations.{" "}
                </div>
              </div>
            </div>
            <div className="inline-flex shrink grow basis-0 flex-col items-start justify-center gap-2.5 rounded-2xl border border-gray-300 bg-[#f9f9f9] p-6">
              <div data-svg-wrapper className="relative">
                <GamepadIcon />
              </div>
              <div className="flex h-[89px] flex-col items-start justify-start gap-2.5 self-stretch">
                <div className="self-stretch text-base font-semibold text-gray-600">
                  Customer Support
                </div>
                <div className="self-stretch text-xs font-normal leading-[15px] text-[#808080]">
                  A versatile template designed with a perfect mix of emotional
                  intelligence and technical knowledge.
                </div>
              </div>
            </div>
            <div className="inline-flex shrink grow basis-0 flex-col items-start justify-center gap-2.5 rounded-2xl border border-gray-300 bg-[#f9f9f9] p-6">
              <div data-svg-wrapper className="relative">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_309_258)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0 2.79548C0 1.64611 0.931756 0.714355 2.08113 0.714355H17.9189C19.0683 0.714355 20 1.64611 20 2.79548V13.6332C20 14.7826 19.0683 15.7144 17.9189 15.7144H12.1671L12.9316 17.8506H14.2857C14.8774 17.8506 15.3571 18.3304 15.3571 18.9221C15.3571 19.5138 14.8774 19.9935 14.2857 19.9935H5.71426C5.12253 19.9935 4.64283 19.5138 4.64283 18.9221C4.64283 18.3304 5.12253 17.8506 5.71426 17.8506H7.06837L7.83294 15.7144H2.08113C0.931757 15.7144 0 14.7826 0 13.6332V2.79548ZM2.94861 7.90054C2.94861 7.40744 3.34836 7.00768 3.84147 7.00768H5.09147V5.75768C5.09147 5.26458 5.49121 4.86483 5.98433 4.86483C6.47743 4.86483 6.87719 5.26458 6.87719 5.75768V7.00768H8.12719C8.62029 7.00768 9.02004 7.40744 9.02004 7.90054C9.02004 8.39366 8.62029 8.7934 8.12719 8.7934H6.87719V10.0434C6.87719 10.5365 6.47743 10.9363 5.98433 10.9363C5.49121 10.9363 5.09147 10.5365 5.09147 10.0434V8.7934H3.84147C3.34836 8.7934 2.94861 8.39366 2.94861 7.90054ZM14.4369 6.50764C14.4369 7.198 14.9966 7.75764 15.6869 7.75764C16.3773 7.75764 16.9369 7.198 16.9369 6.50764C16.9369 5.81728 16.3773 5.25764 15.6869 5.25764C14.9966 5.25764 14.4369 5.81728 14.4369 6.50764ZM11.6636 9.29346C11.6636 9.98381 12.2233 10.5435 12.9136 10.5435C13.604 10.5435 14.1636 9.98381 14.1636 9.29346C14.1636 8.6031 13.604 8.04346 12.9136 8.04346C12.2233 8.04346 11.6636 8.6031 11.6636 9.29346Z"
                      fill="#808080"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_309_258">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="flex h-[89px] flex-col items-start justify-start gap-2.5 self-stretch">
                <div className="self-stretch text-base font-semibold text-gray-600">
                  Game NPC
                </div>
                <div className="self-stretch text-xs font-normal leading-[15px] text-[#808080]">
                  An assistant for demonstrating an in-game NPC, Elenya is
                  designed to offer guidance, lore, and insights.
                </div>
              </div>
            </div>
          </div>
          <div className="inline-flex items-center justify-end gap-2 self-stretch">
            <div className="rounded-xl">
              <div className="flex h-11 w-[84px] items-center justify-center rounded-xl border border-[#dedede] text-center text-base font-medium leading-[14.40px] text-[#131313] cursor-pointer" onClick={() => setOpen(false)}>
                Close
              </div>
            </div>
            <Button className="flex items-center justify-start gap-1.5 rounded-xl bg-[#131313] px-5 py-3 cursor-pointer" onClick={handleCreateAssistant} disabled={isPending}>
              <div className="text-center text-base font-medium leading-[14.40px] text-white">
                {isPending ? "Creating..." : "Create Assistant"}
              </div>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateAssistantModal;
