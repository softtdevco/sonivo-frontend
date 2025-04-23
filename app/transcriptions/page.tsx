import DashboardWrapper from "@/components/shared/dashboard-wrapper";
import {
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import React from "react";
import UploadsList from "../dashboard/components/uploadsList";

const Page = () => {
  return (
    <DashboardWrapper
      header={
        <>
        <div className="flex items-center gap-2">
          <BreadcrumbItem className="text-[#4d4d4d] text-base font-medium">
            <BreadcrumbPage>Transcriptions</BreadcrumbPage>
          </BreadcrumbItem> 
        </div>
          
        </>
      }
    >
      <div className="">
     <UploadsList />    
      </div>
    
    </DashboardWrapper>
  );
};

export default Page;
