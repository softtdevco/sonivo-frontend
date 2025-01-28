import DashboardWrapper from "@/components/shared/dashboard-wrapper";
import React from "react";
import Upload from "./components/upload";
import UploadsList from "./components/uploadsList";

const Page = () => {
  return (
    <DashboardWrapper>
      <div className="px-7 py-6 bg-white">
        <Upload />
        <UploadsList />
      </div>
    </DashboardWrapper>
  );
};

export default Page;
