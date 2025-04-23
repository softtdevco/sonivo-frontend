import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { PhoneNumber } from "@/app/phone-numbers/page";

interface AssignPhoneNumberModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  phoneNumbers?: PhoneNumber[];
  onAssign: (phoneNumberId: string) => void;
  onUnassign: (phoneNumberId: string) => void;
  assignedNumber?: PhoneNumber;
}

const AssignPhoneNumberModal = ({
  isOpen,
  onOpenChange,
  phoneNumbers,
  onAssign,
  onUnassign,
  assignedNumber,
}: AssignPhoneNumberModalProps) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleAction = async (phoneNumber: PhoneNumber) => {
    setLoadingId(phoneNumber.id);
    if (assignedNumber?.id === phoneNumber.id) {
      await onUnassign(phoneNumber.id);
    } else {
      await onAssign(phoneNumber.id);
    }
    setLoadingId(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Assign Phone Number</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-neutral-100 text-left text-sm">
                <th className="px-6 py-3 text-xs font-medium text-gray-500">Name</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500">Number</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {phoneNumbers?.map((phone) => (
                <tr key={phone.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{phone.label}</td>
                  <td className="px-6 py-4 text-sm">{phone.phonenumber}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleAction(phone)}
                      disabled={!!loadingId}
                      className={`text-sm font-medium ${
                        assignedNumber?.id === phone.id
                          ? "text-red-600 hover:text-red-800"
                          : "text-blue-600 hover:text-blue-800"
                      } disabled:opacity-50`}
                    >
                      {loadingId === phone.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : assignedNumber?.id === phone.id ? (
                        "Unassign"
                      ) : (
                        "Assign"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignPhoneNumberModal; 