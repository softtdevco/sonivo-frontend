"use client";
import React, { useState } from "react";
import { Trash2Icon, Loader2, FileIcon } from "lucide-react";
import { format } from "date-fns";
import { useDeleteKnowledgeBaseFile } from "@/service/knowledge-base/knowledgeBase";
import { KnowledgeBaseFile } from "@/service/knowledge-base/knowledgeBaseService";
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

interface KnowledgeBaseListProps {
  files: KnowledgeBaseFile[];
}

const KnowledgeBaseList: React.FC<KnowledgeBaseListProps> = ({ files }) => {
  const { mutate: deleteFile, isPending: isDeleting } = useDeleteKnowledgeBaseFile();
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
    else return (bytes / 1073741824).toFixed(1) + ' GB';
  };

  const getFileIcon = () => {
    // You can customize this based on file types
    return <FileIcon className="h-4 w-4" />;
  };

  const handleDelete = (id: string) => {
    setFileToDelete(id);
    deleteFile(id);
  };

  const groupFilesByDate = (files: KnowledgeBaseFile[]) => {
    const groups: { [key: string]: KnowledgeBaseFile[] } = {};

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

    // Sort the dates
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
    <div className="w-full gap-6 overflow-hidden border-t bg-white pt-6 h-full px-7 py-6">
      <div className="text-left text-base font-medium text-[#4d4d4d] mb-4">
        Knowledge Base Files
      </div>
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
              Size
            </th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500">
              Type
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
                      <div className="h-8 w-8 rounded-full bg-[#ef5a3c]/20 flex items-center justify-center">
                        {getFileIcon(file.fileExtention)}
                      </div>
                      <span className="text-sm font-medium text-[#575758]">
                        {file.fileName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#575758]">
                    {format(new Date(file.createdAt), "dd MMM yyyy, hh:mm a")}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#575758]">
                    {formatFileSize(file.fileSize)}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#575758]">
                    {file.fileExtention.toUpperCase()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
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
                              This action cannot be undone. This will permanently delete your file.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(file.id)}
                              className="bg-red-500 hover:bg-red-600"
                              disabled={isDeleting && fileToDelete === file.id}
                            >
                              {isDeleting && fileToDelete === file.id ? (
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
  );
};

export default KnowledgeBaseList; 