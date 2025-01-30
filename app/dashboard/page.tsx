import DashboardWrapper from "@/components/shared/dashboard-wrapper";
import React from "react";
import Upload from "./components/upload";
import UploadsList from "./components/uploadsList";
import { BreadcrumbItem, BreadcrumbList } from "@/components/ui/breadcrumb";

const Page = () => {
  return (
    <DashboardWrapper
      header={
        <BreadcrumbList>
          <BreadcrumbItem className="hidden text-[21.30px] font-normal leading-relaxed text-[#1c2833] md:block">
            👋🏻 Welcome back
          </BreadcrumbItem>
        </BreadcrumbList>
      }
    >
      <div className="bg-white px-7 py-6">
        <Upload />
        
      </div>
      <UploadsList />
    </DashboardWrapper>
  );
};

export default Page;
