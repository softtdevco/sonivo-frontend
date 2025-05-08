"use client";
import React from "react";
import { BreadcrumbItem, BreadcrumbList } from "@/components/ui/breadcrumb";
import DashboardWrapper from "@/components/shared/dashboard-wrapper";
import EmptyState from "./components/EmptyState";
import CreateAssistant from "./components/CreateAssistant";
import Lists from "./components/Lists";
import { useGetAssistants } from "@/service/assistant/assistant";
import { Loader2 } from "lucide-react";

export type Assistant = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

const Page = () => {
  const {data: assistants, isLoading} = useGetAssistants();

  return (
    <DashboardWrapper
      header={
        <BreadcrumbList>
          <BreadcrumbItem className="hidden text-[21.30px] font-normal leading-relaxed text-[#1c2833] md:block">
            Assistants
          </BreadcrumbItem>
        </BreadcrumbList>
      }
    >
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      ) : assistants.length === 0 ? (
        <EmptyState />
      ) : (
        <>
           <CreateAssistant />
        <Lists assistants={assistants} />
        </>
      )}
    </DashboardWrapper>
  );
};

export default Page;
