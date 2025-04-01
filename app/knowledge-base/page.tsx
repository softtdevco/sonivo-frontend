"use client";
import React from "react";
import { BreadcrumbItem, BreadcrumbList } from "@/components/ui/breadcrumb";
import DashboardWrapper from "@/components/shared/dashboard-wrapper";
import EmptyKnowledge from "./components/EmptyKnowledge";
import CreateKnowledgeBase from "./components/CreateKnowledgeBase";
import KnowledgeBaseList from "./components/KnowledgeBaseList";
import { useKnowledgeBaseFiles } from "@/service/knowledge-base/knowledgeBase";
import { Loader2 } from "lucide-react";

const Page = () => {
  const { data: files, isLoading } = useKnowledgeBaseFiles();

  return (
    <DashboardWrapper
      header={
        <BreadcrumbList>
          <BreadcrumbItem className="hidden text-[21.30px] font-normal leading-relaxed text-[#1c2833] md:block">
            Knowledge Base
          </BreadcrumbItem>
        </BreadcrumbList>
      }
    >
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      ) : !files || files.length === 0 ? (
        <EmptyKnowledge />
      ) : (
        <>
          <CreateKnowledgeBase />
          <KnowledgeBaseList files={files} />
        </>
      )}
    </DashboardWrapper>
  );
};

export default Page;
