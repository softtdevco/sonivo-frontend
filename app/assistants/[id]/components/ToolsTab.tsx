import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { BsTelephoneOutbound } from "react-icons/bs";
import { IoCalendarClearOutline } from "react-icons/io5";
import AddToolModal from "./AddToolModal";


export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  method: string;
  executionText: string;
  timeout: number;
  headers: {key: string, value: string}[];
  parameters: {name: string, type: string, required: boolean, description: string}[];
  fixedParams: {key: string, value: string}[];
}
const ToolsTab = ({ tools, id }: { tools: Tool[], id: string }) => {
  const [openToolModal, setOpenToolModal] = useState(false);
  return (
    <div>
      <div className="mt-9 inline-flex w-[710px] flex-col items-start justify-start gap-6 self-stretch">
        <div className="inline-flex items-start justify-start gap-2.5 self-stretch">
          <div className="inline-flex flex-1 flex-col items-start justify-start gap-2">
            <div className="justify-start self-stretch text-base font-medium text-zinc-800">
              Tools
            </div>
            <div className="justify-end self-stretch text-xs font-normal leading-none text-zinc-500">
              Tools that the assistant can use during the call
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="flex cursor-pointer items-center justify-start gap-1.5 self-stretch rounded-xl bg-neutral-900 px-5 py-3">
                <FaPlus className="text-white" />
                <div className="justify-center text-center text-base font-medium leading-none text-white">
                  Add Tool
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit flex flex-col  p-0" side="top">
              <div className="inline-flex items-center justify-start gap-2 cursor-pointer hover:bg-gray-100 rounded-md p-2" onClick={() => setOpenToolModal(true)}>
                <div className="relative overflow-hidden">
                  <BsTelephoneOutbound className="h-3.5 w-3.5" />
                </div>
                <div className="justify-start text-base font-medium leading-tight text-gray-700">
                  Forward Call
                </div>
              </div>
        
              <div className="inline-flex items-center justify-start gap-2 cursor-pointer hover:bg-gray-100 rounded-md p-2" onClick={() => setOpenToolModal(true)}>
                <div className="relative overflow-hidden">
                  <IoCalendarClearOutline className="h-3.5 w-3.5" />
                </div>
                <div className="justify-start text-base font-medium leading-tight text-gray-700">
                  Book Appointment
                </div>
              </div>
              <div className="inline-flex items-center justify-start gap-2 cursor-pointer hover:bg-gray-100 rounded-md p-2" onClick={() => setOpenToolModal(true)}>
                <div className="relative overflow-hidden">
                  <FaPlus className="h-3.5 w-3.5" />
                </div>
                <div className="justify-start text-base font-medium leading-tight text-gray-700">
                  Add Tool
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <AddToolModal open={openToolModal} setOpen={setOpenToolModal} id={id} tools={tools}/>
    </div>
  );
};

export default ToolsTab;
