"use client";
import React, { useState } from "react";
import { BreadcrumbItem, BreadcrumbList } from "@/components/ui/breadcrumb";
import DashboardWrapper from "@/components/shared/dashboard-wrapper";
import { Loader2 } from "lucide-react";
import EmptyState from "./components/EmptyState";
import { useGetPhoneNumbers } from "@/service/phone-numbers/phoneNumbers";
import CreatePhoneNumbers from "./components/CreatePhoneNumbers";
import Lists from "./components/Lists";

export interface PhoneNumber {
  id: string;
  phonenumber: string;
  label: string;
  country: string;
  provider: string;
  createdAt: string;
}

const Page = () => {
  const { data: phoneNumbers, isLoading } = useGetPhoneNumbers();
  const [showModal, setShowModal] = useState(false);

  return (
    <DashboardWrapper
      header={
        <BreadcrumbList>
          <BreadcrumbItem className="hidden text-[21.30px] font-normal leading-relaxed text-[#1c2833] md:block">
            Phone Numbers
          </BreadcrumbItem>
        </BreadcrumbList>
      }
    >
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin" />
        </div>
      ) : phoneNumbers.data.length === 0 ? (
        <EmptyState />
      ) : (
        <>
        <CreatePhoneNumbers setShowModal={setShowModal} showModal={showModal}/>
        <Lists phoneNumbers={phoneNumbers.data}/>
         
        </>
      )}
    </DashboardWrapper>
  );
};

export default Page;
