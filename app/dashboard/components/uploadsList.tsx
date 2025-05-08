"use client";
import React from "react";
import { Trash2Icon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { HiMicrophone } from "react-icons/hi";
import { IoVideocam } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import { useDeleteTranscription, useGetUserTranscriptions } from "@/service/transcriptions/transcriptions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { SyncLoader } from "react-spinners";
import PaginationComponent from "@/components/shared/Pagination";

export interface Meta {
  hasNext: boolean;
  hasPrevious: boolean;
  limit: number;
  page: number;
  pages: number;
  total: number;
}
export interface File {
  id: string;
    transccriptionMedia: {
  publicId: string;
  publicUrl: string;
  fileType: string;
};
transcriptionStatus: "COMPLETED" | "PROCESSING";
createdAt: string;
duration: string;
transctriptionText: string;
}

export interface FileItem {
  data: File[]
  meta: Meta;
}

interface SummaryResponse {
  transctriptionSummary?: string;
}

interface InsightResponse {
  transcriptionInsight?: string;
}

const UploadsList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  
  const { data, isLoading: isPending } = useGetUserTranscriptions(currentPage);
  const { mutate: deleteTranscription, isPending: isDeleting } = useDeleteTranscription();
  const files = data?.data;
  const meta = data?.meta;

  const getStatusColor = (status: string) => {
    return status === "COMPLETED" ? "text-[#2eb67d]" : "text-[#ffc805]";
  };

  const groupFilesByDate = (files: File[]) => {
    if (!files || !Array.isArray(files)) {
      return {};
    }

    const groups: { [key: string]: File[] } = {};

    files.forEach((file) => {
      const date = new Date(file.createdAt);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let groupKey = format(date, "d MMMM yyyy");

      if (date.toDateString() === today.toDateString()) {
        groupKey = "Today";
      } else if (date.toDateString() === yesterday.toDateString()) {
        groupKey = "Yesterday";
      }

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(file);
    });

    // Sort the dates to ensure 'Today' comes first
    const sortedEntries = Object.entries(groups).sort(([dateA], [dateB]) => {
      if (dateA === "Today") return -1;
      if (dateB === "Today") return 1;
      if (dateA === "Yesterday") return -1;
      if (dateB === "Yesterday") return 1;
      return (
        new Date(dateB.replace("Yesterday", "")).getTime() -
        new Date(dateA.replace("Yesterday", "")).getTime()
      );
    });

    return Object.fromEntries(sortedEntries);
  };

  const groupedFiles = files ? groupFilesByDate(files) : {};

  const handleDownload = async (file: File) => {
    try {
      const summaryResponse = await fetch(`/api/transcriptions/${file.id}/summary`);
      const insightResponse = await fetch(`/api/transcriptions/${file.id}/insight`);
      
      let summaryData: SummaryResponse = {}, insightData: InsightResponse = {};
      if (summaryResponse.ok) {
        summaryData = await summaryResponse.json();
      }
      if (insightResponse.ok) {
        insightData = await insightResponse.json(); 
      }

      // Create a formatted text content
      const content = [
        "=== TRANSCRIPTION DETAILS ===",
        `Date: ${format(new Date(file.createdAt), "dd MMM yyyy, hh:mm a")}`,
        `Duration: ${Math.round(parseFloat(file.duration))}s`,
        `Status: ${file.transcriptionStatus}`,
        "\n=== TRANSCRIPTION TEXT ===",
        file.transctriptionText || "No transcription available",
        "\n=== SUMMARY ===",
        summaryData?.transctriptionSummary || "No summary available",
        "\n=== INSIGHTS ===",
        insightData?.transcriptionInsight || "No insights available",
      ].join("\n\n");

      // Create and download the file
      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transcription-${file.id}-complete.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading transcription:', error);
      // Fallback to basic download if summary/insights fetch fails
      const basicContent = [
        "=== TRANSCRIPTION DETAILS ===",
        `Date: ${format(new Date(file.createdAt), "dd MMM yyyy, hh:mm a")}`,
        `Duration: ${Math.round(parseFloat(file.duration))}s`,
        `Status: ${file.transcriptionStatus}`,
        "\n=== TRANSCRIPTION TEXT ===",
        file.transctriptionText || "No transcription available",
      ].join("\n\n");

      const blob = new Blob([basicContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transcription-${file.id}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  return (
    <>
      <div className="w-full gap-6 overflow-hidden border-t bg-white pt-6 h-full px-7 py-6">
        <div className="text-left text-base font-medium text-[#4d4d4d]">
          Recent uploads
        </div>
        {isPending ? (
          <div className="flex justify-center items-center w-full h-full">
            <SyncLoader
              color="#ef5a3c"
              loading={true}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>

        ) : files?.length === 0 ? (
          <div className="flex justify-center items-center w-full h-full">
            <div>No transcription found</div>
          </div>
        ) : (
          <>
            {/* Desktop Table View - Hidden on mobile */}
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-neutral-100 text-left text-sm">
                    <th className="px-6 py-3 text-xs font-medium text-gray-500">
                      File name
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500">
                      Date uploaded
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500">
                      Status
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {Object.entries(groupedFiles).map(([date, files]) => (
                    <React.Fragment key={date}>
                      {date !== "Today" && (
                        <tr className="bg-neutral-100">
                          <td
                            colSpan={5}
                            className="px-6 py-1 text-xs font-medium text-gray-500"
                          >
                            {date}
                          </td>
                        </tr>
                      )}
                      {files.map((file) => (
                        <tr key={file.id} className="group hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`h-8 w-8 rounded-full ${file.transccriptionMedia.fileType === "audio"
                                ? "bg-[#ef5a3c]/20"
                                : "bg-[#8263ff]/20"
                              } flex items-center justify-center`}>
                                {file.transccriptionMedia.fileType === "audio" ? (
                                  <HiMicrophone className="h-4 w-4 text-[#ef5a3c]/90" />
                                ) : (
                                  <IoVideocam className="h-4 w-4 text-[#8263ff]/90" />
                                )}
                              </div>
                              <span className="text-sm font-medium text-[#575758]">
                                {file.transctriptionText ? file.transctriptionText.slice(0, 20) : "No transcription"}...
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-[#575758]">
                            {format(new Date(file.createdAt), "dd MMM yyyy, hh:mm a")}
                          </td>
                          <td className="px-6 py-4 text-sm text-[#575758]">
                            {Math.round(parseFloat(file.duration)) || 0}s
                          </td>
                          <td className="px-6 py-4">
                            <div className={`w-fit rounded-xl px-2 py-0.5 ${file.transcriptionStatus === "COMPLETED" ? "bg-[#2eb67d]/5" : "bg-[#ffc805]/5"
                              }`}>
                              <span className={`text-sm ${getStatusColor(file.transcriptionStatus)}`}>
                                {file.transcriptionStatus}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {file.transcriptionStatus === "COMPLETED" && (
                                <>
                                  <button
                                    className="text-sm font-medium text-[#150a30] underline hover:text-gray-900"
                                    onClick={() => router.push(`/transcriptions/${file.id}`)}
                                  >
                                    View
                                  </button>
                                  <button 
                                    className="text-sm font-medium text-[#150a30] underline hover:text-gray-900"
                                    onClick={() => handleDownload(file)}
                                  >
                                    Download
                                  </button>
                                </>
                              )}
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
                                      This action cannot be undone. This will permanently delete your transcription.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => deleteTranscription(file.id)}
                                      className="bg-red-500 hover:bg-red-600"
                                      disabled={isDeleting}
                                    >
                                      {isDeleting ? (
                                        <>
                                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                          Deleting...
                                        </>
                                      ) : (
                                        'Delete'
                                      )}
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View - Visible only on mobile */}
            <div className="md:hidden space-y-4">
              {Object.entries(groupedFiles).map(([date, files]) => (
                <div key={date} className="space-y-3">
                  {date !== "Today" && (
                    <div className="bg-neutral-100 px-4 py-1 text-xs font-medium text-gray-500">
                      {date}
                    </div>
                  )}
                  {files.map((file) => (
                    <div key={file.id} className="border rounded-lg p-4 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`h-8 w-8 rounded-full ${file.transccriptionMedia.fileType === "audio"
                          ? "bg-[#ef5a3c]/20"
                          : "bg-[#8263ff]/20"
                        } flex items-center justify-center`}>
                          {file.transccriptionMedia.fileType === "audio" ? (
                            <HiMicrophone className="h-4 w-4 text-[#ef5a3c]/90" />
                          ) : (
                            <IoVideocam className="h-4 w-4 text-[#8263ff]/90" />
                          )}
                        </div>
                        <span className="text-sm font-medium text-[#575758]">
                          {file.transctriptionText ? file.transctriptionText.slice(0, 20) : "No transcription"}...
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-[#575758] mb-3">
                        <div>
                          <p className="font-medium text-gray-500">Date</p>
                          <p>{format(new Date(file.createdAt), "dd MMM yyyy, hh:mm a")}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-500">Duration</p>
                          <p>{Math.round(parseFloat(file.duration))}s</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-500">Status</p>
                          <div className={`w-fit rounded-xl px-2 py-0.5 mt-1 ${file.transcriptionStatus === "COMPLETED" ? "bg-[#2eb67d]/5" : "bg-[#ffc805]/5"
                            }`}>
                            <span className={`text-xs ${getStatusColor(file.transcriptionStatus)}`}>
                              {file.transcriptionStatus}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-2 border-t">
                        {file.transcriptionStatus === "COMPLETED" && (
                          <>
                            <button
                              className="text-xs font-medium text-[#150a30] underline hover:text-gray-900"
                              onClick={() => router.push(`/transcriptions/${file.id}`)}
                            >
                              View
                            </button>
                            <button 
                              className="text-xs font-medium text-[#150a30] underline hover:text-gray-900"
                              onClick={() => handleDownload(file)}
                            >
                              Download
                            </button>
                          </>
                        )}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="text-[#000] hover:text-red-500 ml-auto">
                              <Trash2Icon className="h-4 w-4" />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your transcription.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteTranscription(file.id)}
                                className="bg-red-500 hover:bg-red-600"
                                disabled={isDeleting}
                              >
                                {isDeleting ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting...
                                  </>
                                ) : (
                                  'Delete'
                                )}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
        {meta && <PaginationComponent meta={meta} />}
      </div>
    </>
  );
};

export default UploadsList;
