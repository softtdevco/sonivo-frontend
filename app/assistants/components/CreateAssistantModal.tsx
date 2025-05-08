import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import AddFileIcon from "@/assets/icons/AddFileIcon";
import HeadsetIcon from "@/assets/icons/HeadsetIcon";
import GamepadIcon from "@/assets/icons/GamepadIcon";
import { Input } from "@/components/ui/input";
import { useCreateAssistant } from "@/service/assistant/assistant";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import "./customModal.css";
import { ErrorResponse } from "@/service/auth/authServices";

const TEMPLATES = {
  blank: {
    name: "Blank Template",
    description: "This blank slate template with minimal configurations. It's a starting point for creating your custom assistant.",
    prompt: "You are a helpful assistant."
  },
  inbound_qa: {
    name: "Inbound Q & A",
    description: "An inbound call agent example designed to provide comprehensive support for SmartHome Innovations.",
    prompt: "You are an inbound call agent for SmartHome Innovations. Your role is to provide comprehensive support and answer customer queries about our products and services."
  },
  customer_support: {
    name: "Customer Support",
    description: "A versatile template designed with a perfect mix of emotional intelligence and technical knowledge.",
    prompt: "You are a customer support representative with a perfect mix of emotional intelligence and technical knowledge. Your goal is to provide excellent customer service while solving technical issues."
  },
  game_npc: {
    name: "Game NPC",
    description: "An assistant for demonstrating an in-game NPC, Elenya is designed to offer guidance, lore, and insights.",
    prompt: "You are Elenya, an in-game NPC designed to offer guidance, lore, and insights to players. You should be knowledgeable about the game world and help players navigate their journey."
  }
};

const CreateAssistantModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const {mutate: createAssistant, isPending} = useCreateAssistant();
  const [name, setName] = useState("");
  const [assistantType, setAssistantType] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  
  const router = useRouter();

  const handleCreateAssistant = () => {
    if (!name || !assistantType || !selectedTemplate) {
      toast.error("Please enter a name, select an assistant type, and choose a template");
      return;
    }
    createAssistant({
      name, 
      assistantType,
      prompt: TEMPLATES[selectedTemplate as keyof typeof TEMPLATES].prompt
    }, {
      onSuccess: (response) => {
        toast.success("Assistant created successfully");
        setOpen(false);
        setName("");
        setSelectedTemplate("");
        router.push(`/assistants/${response.id}`);
      },
      onError: (error:  ErrorResponse) => {
        toast.error(error.response?.data?.message || "Failed to create assistant");
      }
    });
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)} classNames={{
      modal: "custom-modal"
    }}>
      <div className="shadow-[0px_21px_35px_0px_rgba(0,0,0,0.05)] w-full md:w-[570px] inline-flex h-auto max-h-[90vh] md:h-[800px] flex-col gap-4 md:gap-8 overflow-auto rounded-bl-[20px] rounded-br-[20px] bg-white px-4 md:px-8 py-4 md:py-6">
        <div className="flex h-auto md:h-[75px] flex-col items-start justify-start gap-2 self-stretch">
          <div className="self-stretch text-base font-semibold text-gray-600">
            Choose a template
          </div>
          <div className="self-stretch text-sm md:text-base font-normal leading-normal text-gray-500">
            Here&apos;s a few templates to get you started, or you can create
            your own template and use it to create a new assistant.
          </div>
        </div>
        <div className="flex h-full flex-col items-start justify-start gap-4 md:gap-6 self-stretch">
          <div className="flex h-auto md:h-[76px] flex-col items-start justify-start gap-2 self-stretch">
            <div className="inline-flex items-center justify-center gap-2">
              <div>
                <span className="text-sm font-normal leading-[17.50px] text-[#272728]">
                  Assistant&apos;s name
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
          <div className="flex h-auto md:h-[76px] flex-col items-start justify-start gap-2 self-stretch mt-2">
            <div className="inline-flex items-center justify-center gap-2">
              <div>
                <span className="text-sm font-normal leading-[17.50px] text-[#272728]">
                  Assistance Type
                </span>
                <span className="text-sm font-normal leading-[17.50px] text-[#ef5a3c]">
                  *
                </span>
              </div>
            </div>

            <select 
              className="inline-flex w-full items-center justify-start gap-[19.38px] self-stretch rounded-xl border border-gray-200 bg-neutral-50 px-[20.52px] py-4 text-sm font-normal leading-[17.50px] text-black-900 outline-0 focus:border-none focus:ring-0"
              value={assistantType}
              onChange={(e) => setAssistantType(e.target.value)}
            >
              <option value="">Select call type</option>
              <option value="inbound_call">Inbound Call</option>
              <option value="outbound_call">Outbound Call</option>
            </select>
          </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-4 md:mt-24 gap-4 md:gap-5 self-stretch">
            <div 
              className={`inline-flex shrink grow basis-0 flex-col items-start justify-center gap-2.5 rounded-2xl border-2 ${selectedTemplate === 'blank' ? 'border-[#ef5a3c] bg-[#ef5a3c]/5' : 'border-gray-300 bg-[#f9f9f9]'} p-4 md:p-6 cursor-pointer`}
              onClick={() => setSelectedTemplate('blank')}
            >
              <div data-svg-wrapper>
                <AddFileIcon />
              </div>
              <div className="flex h-auto md:h-[89px] flex-col items-start justify-start gap-2.5 self-stretch">
                <div className={`self-stretch text-base font-semibold ${selectedTemplate === 'blank' ? 'text-[#ef5a3c]' : 'text-gray-600'}`}>
                  {TEMPLATES.blank.name}
                </div>
                <div className={`self-stretch text-xs font-normal leading-[15px] ${selectedTemplate === 'blank' ? 'text-[#c69389]' : 'text-[#808080]'}`}>
                  {TEMPLATES.blank.description}
                </div>
              </div>
            </div>
            <div 
              className={`inline-flex shrink grow basis-0 flex-col items-start justify-center gap-2.5 rounded-2xl border-2 ${selectedTemplate === 'inbound_qa' ? 'border-[#ef5a3c] bg-[#ef5a3c]/5' : 'border-gray-300 bg-[#f9f9f9]'} p-4 md:p-6 cursor-pointer`}
              onClick={() => setSelectedTemplate('inbound_qa')}
            >
              <div data-svg-wrapper className="relative">
                <HeadsetIcon />
              </div>
              <div className="flex h-auto md:h-[89px] flex-col items-start justify-start gap-2.5 self-stretch">
                <div className={`self-stretch text-base font-semibold ${selectedTemplate === 'inbound_qa' ? 'text-[#ef5a3c]' : 'text-gray-600'}`}>
                  {TEMPLATES.inbound_qa.name}
                </div>
                <div className={`self-stretch text-xs font-normal leading-[15px] ${selectedTemplate === 'inbound_qa' ? 'text-[#c69389]' : 'text-[#808080]'}`}>
                  {TEMPLATES.inbound_qa.description}
                </div>
              </div>
            </div>
            <div 
              className={`inline-flex shrink grow basis-0 flex-col items-start justify-center gap-2.5 rounded-2xl border-2 ${selectedTemplate === 'customer_support' ? 'border-[#ef5a3c] bg-[#ef5a3c]/5' : 'border-gray-300 bg-[#f9f9f9]'} p-4 md:p-6 cursor-pointer`}
              onClick={() => setSelectedTemplate('customer_support')}
            >
              <div data-svg-wrapper className="relative">
                <GamepadIcon />
              </div>
              <div className="flex h-auto md:h-[89px] flex-col items-start justify-start gap-2.5 self-stretch">
                <div className={`self-stretch text-base font-semibold ${selectedTemplate === 'customer_support' ? 'text-[#ef5a3c]' : 'text-gray-600'}`}>
                  {TEMPLATES.customer_support.name}
                </div>
                <div className={`self-stretch text-xs font-normal leading-[15px] ${selectedTemplate === 'customer_support' ? 'text-[#c69389]' : 'text-[#808080]'}`}>
                  {TEMPLATES.customer_support.description}
                </div>
              </div>
            </div>
            <div 
              className={`inline-flex shrink grow basis-0 flex-col items-start justify-center gap-2.5 rounded-2xl border-2 ${selectedTemplate === 'game_npc' ? 'border-[#ef5a3c] bg-[#ef5a3c]/5' : 'border-gray-300 bg-[#f9f9f9]'} p-4 md:p-6 cursor-pointer`}
              onClick={() => setSelectedTemplate('game_npc')}
            >
              <div data-svg-wrapper className="relative">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_309_258)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
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
              <div className="flex h-auto md:h-[89px] flex-col items-start justify-start gap-2.5 self-stretch">
                <div className={`self-stretch text-base font-semibold ${selectedTemplate === 'game_npc' ? 'text-[#ef5a3c]' : 'text-gray-600'}`}>
                  {TEMPLATES.game_npc.name}
                </div>
                <div className={`self-stretch text-xs font-normal leading-[15px] ${selectedTemplate === 'game_npc' ? 'text-[#c69389]' : 'text-[#808080]'}`}>
                  {TEMPLATES.game_npc.description}
                </div>
              </div>
            </div>
          </div>
          <div className="inline-flex items-center justify-end gap-2 self-stretch mt-4">
            <div className="rounded-xl">
              <div className="flex h-10 md:h-11 w-[70px] md:w-[84px] items-center justify-center rounded-xl border border-[#dedede] text-center text-sm md:text-base font-medium leading-[14.40px] text-[#131313] cursor-pointer" onClick={() => setOpen(false)}>
                Close
              </div>
            </div>
            <Button className="flex h-10 md:h-11 items-center justify-start gap-1.5 rounded-xl bg-[#131313] px-3 md:px-5 py-2 md:py-3 cursor-pointer" onClick={handleCreateAssistant} disabled={isPending}>
              <div className="text-center text-sm md:text-base font-medium leading-[14.40px] text-white">
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
