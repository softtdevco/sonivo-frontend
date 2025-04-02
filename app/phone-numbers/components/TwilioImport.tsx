import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ErrorResponse } from "@/service/auth/authServices";
import { useCreatePhoneNumberTwilio, useUpdatePhoneNumberTwilio } from "@/service/phone-numbers/phoneNumbers";
import { Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { PhoneNumber } from "../page";

const TwilioImport = ({ 
  setOpen, 
  mode = "create", 
  phoneNumberData, 
  phoneNumberId 
}: { 
  setOpen: (open: boolean) => void;
  mode?: "create" | "edit";
  phoneNumberData?: PhoneNumber;
  phoneNumberId?: string;
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [label, setLabel] = useState('');
  const [accountSid, setAccountSid] = useState('');

  const { mutate: createPhoneNumberTwilio, isPending: isCreating } = useCreatePhoneNumberTwilio();
  const { mutate: updatePhoneNumberTwilio, isPending: isUpdating } = useUpdatePhoneNumberTwilio(phoneNumberId || "");
  
  const isPending = isCreating || isUpdating;

  useEffect(() => {
    if (phoneNumberData && mode === "edit") {
      setPhoneNumber(phoneNumberData.phonenumber || '');
      setAuthToken(phoneNumberData.authToken || '');
      setAccountSid(phoneNumberData.accountSid || '');
      setLabel(phoneNumberData.label || '');
    }
  }, [phoneNumberData, mode]);

  const handleSubmit = () => {
    const data = {
      phoneNumber,
      authToken,
      accountSid,
      label,
      country: 'US',
      provider: 'TWILIO'
    };

    if (mode === "create") {
      createPhoneNumberTwilio(data, {
        onSuccess: () => {
          toast.success('Phone number created successfully');
          resetForm();
          setOpen(false);
        },
        onError: (error: ErrorResponse) => {
          toast.error(error.response.data.message);
        }
      });
    } else {
      // For edit mode, we don't need to send the label in the update
      const updateData = {
        phoneNumber,
        authToken,
        accountSid,
        country: 'US',
        provider: 'TWILIO'
      };
      
      updatePhoneNumberTwilio(updateData, {
        onSuccess: () => {
          toast.success('Phone number updated successfully');
          resetForm();
          setOpen(false);
        },
        onError: (error: ErrorResponse) => {
          toast.error(error.response.data.message);
        }
      });
    }
  };

  const resetForm = () => {
    setPhoneNumber('');
    setAuthToken('');
    setAccountSid('');
    setLabel('');
  };

  return (
    <div className="mt-8 flex flex-col items-start justify-start gap-6 self-stretch">
      <div className="flex flex-col items-start justify-start gap-2 self-stretch">
        <div className="justify-end text-sm font-normal leading-[17.50px] text-[#272728]">
          Twillo Phone Number
        </div>

        <div className="inline-flex h-[50px] items-center justify-start gap-3 self-stretch rounded-xl border-[1px] border-[#e7e7e7] bg-neutral-50 px-[20.52px] py-5 outline-[1.14px] outline-offset-[-1.14px]">
          <div className="flex items-center justify-start gap-1.5">
            <div className="justify-end text-sm font-normal leading-[17.50px] text-[#555e67]">
              US
            </div>
          </div>
          <Separator orientation="vertical" className="h-6 w-[1.9px]" />

          <Input
            className="w-full justify-end border-none bg-transparent text-sm font-normal leading-[17.50px] text-black-900  "
            placeholder="Enter number"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-2 self-stretch">
        <div className="justify-end text-sm font-normal leading-[17.50px] text-[#272728]">
          Twilio Account SID
        </div>

        <div className="inline-flex h-[50px] items-center justify-start gap-[19.38px] self-stretch rounded-xl border-[1px] border-[#e7e7e7] bg-neutral-50 py-5 outline-[1.14px] outline-offset-[-1.14px] outline-gray-200">
          <Input
            className="justify-end border-none bg-transparent text-sm font-normal leading-[17.50px] text-black-900  outline-none"
            placeholder="Twilio Account SID"
            value={accountSid}
            onChange={(e) => setAccountSid(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-2 self-stretch">
        <div className="justify-end text-sm font-normal leading-[17.50px] text-[#272728]">
          Twilio Auth Token
        </div>

        <div className="inline-flex h-[50px] items-center justify-start gap-[19.38px] self-stretch rounded-xl border-[1px] border-[#e7e7e7] bg-neutral-50 py-5 outline-[1.14px] outline-offset-[-1.14px] outline-gray-200">
          <Input
            className="justify-end border-none bg-transparent text-sm font-normal leading-[17.50px] text-black-900  outline-none"
            placeholder="Twilio Auth Token"
            value={authToken}
            onChange={(e) => setAuthToken(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-2 self-stretch">
        <div className="justify-end text-sm font-normal leading-[17.50px] text-[#272728]">
          Label
        </div>

        <div className="inline-flex h-[50px] items-center justify-start gap-[19.38px] self-stretch rounded-xl border-[1px] border-[#e7e7e7] bg-neutral-50 py-5 outline-[1.14px] outline-offset-[-1.14px] outline-gray-200">
          <Input
            className="justify-end border-none bg-transparent text-sm font-normal leading-[17.50px] text-black-900  outline-none"
            placeholder="Label for phone number"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>
      </div>

      <div className="inline-flex items-center justify-end gap-2 self-stretch">
        <div 
          className="relative flex cursor-pointer items-center justify-start gap-1.5 self-stretch rounded-xl bg-white px-5 py-3 border-[1.5px]"
          onClick={() => setOpen(false)}
        >
          <div className="justify-center text-center text-base font-medium leading-[14.40px] text-[#131313]">
            Cancel
          </div>
        </div>
        <div className="flex h-11 cursor-pointer items-center justify-start gap-1.5 rounded-xl bg-[#131313] px-5 py-3" onClick={handleSubmit}>
          <Button className="justify-center text-center text-base font-medium leading-[14.40px] text-white">
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : mode === "create" ? 'Import from Twilio' : 'Update Phone Number'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TwilioImport;
