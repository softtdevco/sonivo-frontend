"use client";
import React, { useState } from "react";
import { BreadcrumbItem, BreadcrumbList } from "@/components/ui/breadcrumb";
import DashboardWrapper from "@/components/shared/dashboard-wrapper";
import EmptyState from "./components/EmptyState";
import CreateAssistant from "./components/CreateAssistant";
import Lists from "./components/Lists";



export type Assistant = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

const Page = () => {
  const [assistants, setAssistants] = useState<Assistant[]>([
    {
      id: "fc6b2b1b-f9fe-4bbb-b322-fa12c03a50bd",
      name: "My Assistant",
      description: "Description 1",
      createdAt: "17 Jan 2025, 10:45 AM",
      updatedAt: "2021-01-01",
    },
  ]);

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
      {assistants.length === 0 ? (
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
