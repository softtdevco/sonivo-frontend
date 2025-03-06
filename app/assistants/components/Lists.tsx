import { Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import React from "react";
import { Assistant } from "../page";

const Lists = ({ assistants }: { assistants: Assistant[] }) => {
  return (
    <table className="w-full">
      <thead className=" ">
        <tr className="border-b bg-neutral-100 text-left text-sm">
          <th className="px-6 py-3 text-xs font-medium text-gray-500">Name</th>
          <th className="px-6 py-3 text-xs font-medium text-gray-500">
            Date created
          </th>
          <th className="px-6 py-3 text-xs font-medium text-gray-500">ID</th>
          <th className="px-6 py-3 text-xs font-medium text-gray-500">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {assistants.map((assistant) => (
          <tr key={assistant.id} className="group hover:bg-gray-50">
            <td className="px-6 py-4 flex items-center gap-4">
              <div data-svg-wrapper>
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="38"
                    y="38"
                    width="38"
                    height="38"
                    rx="19"
                    transform="rotate(180 38 38)"
                    fill="#8263FF"
                    fill-opacity="0.2"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.3333 13.8542C17.3333 12.9337 18.0794 12.1875 18.9999 12.1875C19.9204 12.1875 20.6666 12.9337 20.6666 13.8542C20.6666 14.5048 20.2937 15.0684 19.75 15.3429V16.8125H22.5C23.8807 16.8125 25 17.9318 25 19.3125V23.3125C25 24.6932 23.8807 25.8125 22.5 25.8125H15.5C14.1193 25.8125 13 24.6932 13 23.3125V19.3125C13 17.9318 14.1193 16.8125 15.5 16.8125H18.25V15.343C17.7062 15.0685 17.3333 14.5049 17.3333 13.8542ZM21.2047 23.1788C21.4415 22.9276 21.4299 22.5321 21.1788 22.2953C20.9276 22.0585 20.5321 22.0701 20.2953 22.3212C20.0698 22.5604 19.588 22.7436 19 22.7436C18.412 22.7436 17.9302 22.5604 17.7047 22.3212C17.4679 22.0701 17.0724 22.0585 16.8212 22.2953C16.5701 22.5321 16.5585 22.9276 16.7953 23.1788C17.3474 23.7644 18.2268 23.9936 19 23.9936C19.7732 23.9936 20.6525 23.7644 21.2047 23.1788ZM17.0417 21.0416C17.456 21.0416 17.7917 20.7058 17.7917 20.2916C17.7917 19.8774 17.456 19.5416 17.0417 19.5416C16.6275 19.5416 16.2917 19.8774 16.2917 20.2916C16.2917 20.7058 16.6275 21.0416 17.0417 21.0416ZM21.7083 20.2916C21.7083 20.7058 21.3725 21.0416 20.9583 21.0416C20.544 21.0416 20.2083 20.7058 20.2083 20.2916C20.2083 19.8774 20.544 19.5416 20.9583 19.5416C21.3725 19.5416 21.7083 19.8774 21.7083 20.2916Z"
                    fill="#8263FF"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-[#575758]">{assistant.name}</p>
            </td>
            <td className="px-6 py-4 text-sm text-[#575758]">
              {assistant.id}
            </td>
            <td className="px-6 py-4 text-sm text-[#575758]">
              {assistant.createdAt}
            </td>

            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <button className="text-sm font-medium text-[#150a30] underline hover:text-gray-900">
                  Talk to Assistant
                </button>
                <button className="text-sm font-medium text-[#150a30] underline hover:text-gray-900">
                  Call Logs
                </button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="text-[#000] hover:text-red-500">
                      <Trash2Icon className="h-4 w-4" />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your transcription.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-500 hover:bg-red-600">
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
  );
};

export default Lists;
