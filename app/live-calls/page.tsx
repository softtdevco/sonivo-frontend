import DashboardWrapper from "@/components/shared/dashboard-wrapper";
import { BreadcrumbItem, BreadcrumbList } from "@/components/ui/breadcrumb";
import React from "react";
import StartCall from "./components/StartCall";

const Page = () => {
  return (
    <DashboardWrapper
      header={
        <BreadcrumbList>
          <BreadcrumbItem className="hidden text-[21.30px] font-normal leading-relaxed text-[#1c2833] md:block">
            Live Calls{" "}
          </BreadcrumbItem>
        </BreadcrumbList>
      }
    >
      <div className="bg-white px-7 py-6">
        <StartCall />
      </div>
    </DashboardWrapper>
  );
};

export default Page;
