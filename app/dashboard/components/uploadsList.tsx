import React from "react";
import { Trash2Icon } from "lucide-react";
import { format } from "date-fns";
import { HiMicrophone } from "react-icons/hi";
import { IoVideocam } from "react-icons/io5";

interface FileItem {
  id: string;
  name: string;
  type: "audio" | "video";
  uploadDate: string;
  duration: string;
  status: "Processing" | "Completed";
}

const files: FileItem[] = [
  {
    id: "1",
    name: "Client_meeting.mp3",
    type: "audio",
    uploadDate: "2025-01-17T10:45:00",
    duration: "45:32",
    status: "Processing",
  },
  {
    id: "2",
    name: "CocaCola_interviews.MOV",
    type: "video",
    uploadDate: "2025-01-17T10:45:00",
    duration: "45:32",
    status: "Completed",
  },
  {
    id: "3",
    name: "yellow.mp4",
    type: "video",
    uploadDate: "2025-01-25T10:45:00",
    duration: "12:45",
    status: "Completed",
  },
  {
    id: "4",
    name: "yellow2.mp4",
    type: "video",
    uploadDate: "2024-01-25T10:45:00",
    duration: "12:45",
    status: "Completed",
  },
];

const UploadsList = () => {
  const getStatusColor = (status: string) => {
    return status === "Completed" ? "text-[#2eb67d]" : "text-[#ffc805]";
  };

  const groupFilesByDate = (files: FileItem[]) => {
    const groups: { [key: string]: FileItem[] } = {};

    files.forEach((file) => {
      const date = new Date(file.uploadDate);
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

  const groupedFiles = groupFilesByDate(files);
  return (
    <>
      <div className="mt-5 inline-flex w-full flex-col items-start justify-end gap-6 overflow-hidden border-t bg-white pt-6">
        <div className="text-center text-base font-medium text-[#4d4d4d]">
          Recent uploads
        </div>
        <table className="w-full">
          <thead className=" ">
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
                        <div
                          className={`h-8 w-8 rounded-full ${
                            file.type === "audio"
                              ? "bg-[#ef5a3c]/20"
                              : "bg-[#8263ff]/20"
                          } flex items-center justify-center`}
                        >
                          {file.type === "audio" ? (
                            <HiMicrophone className="h-4 w-4 text-[#ef5a3c]/90" />
                          ) : (
                            <IoVideocam className="h-4 w-4 text-[#8263ff]/90" />
                          )}
                        </div>
                        <span className="text-sm font-medium text-[#575758]">
                          {file.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#575758]">
                      {format(
                        new Date(file.uploadDate),
                        "dd MMM yyyy, hh:mm a",
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#575758]">
                      {file.duration}
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className={`w-fit rounded-xl px-2 py-0.5 ${file.status === "Completed" ? "bg-[#2eb67d]/5" : "bg-[#ffc805]/5"}`}
                      >
                        <span
                          className={`text-sm ${getStatusColor(file.status)}`}
                        >
                          {file.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button className="text-sm font-medium text-[#150a30] underline hover:text-gray-900">
                          View
                        </button>
                        <button className="text-sm font-medium text-[#150a30] underline hover:text-gray-900">
                          Download
                        </button>
                        <button className="text-[#000] hover:text-gray-600">
                          <Trash2Icon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UploadsList;
