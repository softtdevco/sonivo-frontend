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
import AssistantIcon from "@/assets/icons/AssistantIcon";
import { useRouter } from "next/navigation";

const Lists = ({ assistants }: { assistants: Assistant[] }) => {
  const router = useRouter();
  function formatDate(dateString: string) {
    const date = new Date(dateString);
  
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };
  
    return date.toLocaleString('en-US', options);
  }
  return (
    <>
      {/* Desktop view */}
      <div className="hidden md:block">
        <table className="w-full">
          <thead>
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
              <tr key={assistant.id} className="group hover:bg-gray-50 cursor-pointer" onClick={() => router.push(`/assistants/${assistant.id}`)}>
                <td className="flex items-center gap-4 px-6 py-4">
                  <div data-svg-wrapper>
                    <AssistantIcon />
                  </div>
                  <p className="text-sm font-medium text-[#575758]">
                    {assistant.name}
                  </p>
                </td>
                <td className="px-6 py-4 text-sm text-[#575758]">{assistant.id}</td>
                <td className="px-6 py-4 text-sm text-[#575758]">
                  {formatDate(assistant.createdAt)}
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
                        <button className="text-[#000] hover:text-red-500" onClick={(e) => e.stopPropagation()}>
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
      </div>

      {/* Mobile view */}
      <div className="md:hidden space-y-4 p-3">
        {assistants.map((assistant) => (
          <div 
            key={assistant.id} 
            className="border rounded-lg p-4 shadow-sm cursor-pointer hover:bg-gray-50"
            onClick={() => router.push(`/assistants/${assistant.id}`)}
          >
            <div className="flex items-center gap-3 mb-3">
              <div data-svg-wrapper>
                <AssistantIcon />
              </div>
              <p className="text-sm font-medium text-[#575758]">
                {assistant.name}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs text-[#575758] mb-3">
              <div>
                <p className="font-medium text-gray-500">Date Created</p>
                <p>{formatDate(assistant.createdAt)}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">ID</p>
                <p className="truncate">{assistant.id}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t">
              <button className="text-xs font-medium text-[#150a30] underline hover:text-gray-900">
                Talk to Assistant
              </button>
              <button className="text-xs font-medium text-[#150a30] underline hover:text-gray-900">
                Call Logs
              </button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="text-[#000] hover:text-red-500 ml-auto" onClick={(e) => e.stopPropagation()}>
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
          </div>
        ))}
      </div>
    </>
  );
};

export default Lists;
