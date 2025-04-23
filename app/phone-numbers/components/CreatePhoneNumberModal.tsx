import React, { useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import "../../assistants/components/customModal.css";
import "react-responsive-modal/styles.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TwilioImport from "./TwilioImport";
import Vonage from "./Vonage";
import { useGetPhoneNumberById } from "@/service/phone-numbers/phoneNumbers";

const CreatePhoneNumberModal = ({
  open,
  setOpen,
  phoneNumberId,
  mode = "create",
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  phoneNumberId?: string;
  mode?: "create" | "edit";
}) => {
  const [activeTab, setActiveTab] = useState("twilio");
  const { data: phoneNumberData } = useGetPhoneNumberById(phoneNumberId || "");

  useEffect(() => {
    if (phoneNumberData && mode === "edit") {
      // Set the active tab based on the provider
      setActiveTab(phoneNumberData.provider.toLowerCase());
    }
  }, [phoneNumberData, mode]);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      classNames={{
        modal: "custom-modal",
      }}
      center
    >
      <div className="inline-flex w-full flex-col gap-8 self-stretch bg-white px-8 py-6">
        <p className="-mt-[27px] justify-start text-lg font-semibold text-[#575758]">
          {mode === "create" ? "Create Phone Number" : "Edit Phone Number"}
        </p>
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full rounded-full bg-neutral-100">
            <TabsTrigger
              value="twilio"
              className="w-full rounded-full px-4 py-2 text-center text-[#979797] data-[state=active]:border-none data-[state=active]:bg-black-900 data-[state=active]:text-white"
            >
              {mode === "create" ? "Import Twilio" : "Twilio"}
            </TabsTrigger>
            <TabsTrigger
              value="vonage"
              className="w-full rounded-full px-4 py-2 text-center text-[#979797] data-[state=active]:border-none data-[state=active]:bg-black-900 data-[state=active]:text-white"
            >
              {mode === "create" ? "Import Vonage" : "Vonage"}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="twilio">
            <TwilioImport 
              setOpen={setOpen} 
              mode={mode} 
              phoneNumberData={mode === "edit" ? phoneNumberData : undefined} 
              phoneNumberId={phoneNumberId}
            />
          </TabsContent>
          <TabsContent value="vonage">
            <Vonage 
              setOpen={setOpen} 
              mode={mode} 
              phoneNumberData={mode === "edit" ? phoneNumberData : undefined}
              phoneNumberId={phoneNumberId}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Modal>
  );
};

export default CreatePhoneNumberModal;
