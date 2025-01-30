import DashboardWrapper from "@/components/shared/dashboard-wrapper";
import {
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BreadcrumbLink } from "@/components/ui/breadcrumb";
import React from "react";

const Page = () => {
  return (
    <DashboardWrapper
      header={
        <>
        <div className="flex items-center gap-2">
           <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="#" className="text-[#4d4d4d] text-base font-medium">Building Your Application</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem className="text-[#4d4d4d] text-base font-medium">
            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
          </BreadcrumbItem> 
        </div>
          
        </>
      }
    >
      <h1>Transcriptions</h1>
    </DashboardWrapper>
  );
};

export default Page;
