import React, { useState } from "react";
import { PhoneNumber } from "../page";
import { useRouter } from "next/navigation";
import Telephone from "@/assets/icons/Telephone";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2Icon } from "lucide-react";
import { useDeletePhoneNumber } from "@/service/phone-numbers/phoneNumbers";
import { toast } from "react-toastify";
import CreatePhoneNumberModal from "./CreatePhoneNumberModal";

const Lists = ({ phoneNumbers }: { phoneNumbers: PhoneNumber[] }) => {
    const router = useRouter();
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedPhoneNumber, setSelectedPhoneNumber] = useState<string | null>(null);
    const { mutate: deletePhoneNumber } = useDeletePhoneNumber(selectedPhoneNumber?.id || "");
    
    function formatDate(dateString: string) {
        const date = new Date(dateString);
      
        const options = {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        };
      
        return date.toLocaleString('en-US', options);
    }
    
    const handleRowClick = (phoneNumberId: string) => {
      router.push(`/phone-numbers/${phoneNumberId}`);
    };
    
    const handleModifyClick = (e: React.MouseEvent, phoneNumberId: string) => {
      e.stopPropagation(); // Prevent row click event
      setSelectedPhoneNumber(phoneNumberId);
      setEditModalOpen(true);
    };
    
    const handleDeleteClick = () => {
      deletePhoneNumber(undefined, {
        onSuccess: () => {
          toast.success("Phone number deleted successfully");
        },
        onError: (error) => {
          toast.error(error.response.data.message || "Failed to delete phone number");
        }
      });
    };
    
  return (
    <>
      <table className="w-full">
        <thead className=" ">
          <tr className="border-b bg-neutral-100 text-left text-sm">
            <th className="px-6 py-3 text-xs font-medium text-gray-500">Name</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500">
              Platform
            </th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500">
              Number
            </th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500">
              Date Added
            </th>

            <th className="px-6 py-3 text-xs font-medium text-gray-500">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {phoneNumbers.map((phoneNumber) => (
            <tr
              key={phoneNumber.id}
              className="group cursor-pointer hover:bg-gray-50"
              onClick={() => handleRowClick(phoneNumber.id)}
            >
              <td className="flex items-center gap-4 px-6 py-4">
                <div data-svg-wrapper className="bg-[rgba(0,0,0,0.1)] rounded-full p-2">
                  <Telephone className="w-4 h-4" />
                </div>
                <p className="text-sm font-medium text-[#575758]">
                  {phoneNumber.label}
                </p>
              </td>
              <td className="px-6 py-4 text-sm text-[#575758]">{phoneNumber.provider}</td>
              <td className="px-6 py-4 text-sm text-[#575758]">
                {phoneNumber.phonenumber}
              </td>
              <td className="px-6 py-4 text-sm text-[#575758]">
                {formatDate(phoneNumber.createdAt)}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <button 
                    className="text-sm font-medium text-[#150a30] underline hover:text-gray-900"
                    onClick={(e) => handleModifyClick(e, phoneNumber.id)}
                  >
                    Modify
                  </button>
                  <button className="text-sm font-medium text-[#150a30] underline hover:text-gray-900">
                    Call Logs
                  </button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button 
                        className="text-[#000] hover:text-red-500"
                        onClick={(e) => e.stopPropagation()} // Prevent row click
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your phone number.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          className="bg-red-500 hover:bg-red-600"
                          onClick={() => handleDeleteClick()}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Edit Modal */}
      {selectedPhoneNumber && (
        <CreatePhoneNumberModal
          open={editModalOpen}
          setOpen={setEditModalOpen}
          phoneNumberId={selectedPhoneNumber}
          mode="edit"
        />
      )}
    </>
  );
};

export default Lists;
