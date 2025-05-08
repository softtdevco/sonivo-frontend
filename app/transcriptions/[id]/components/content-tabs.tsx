"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Transcript from "./Transcript";
import { useGetTranscriptionSummary, useGetTranscriptionInsight } from "@/service/transcriptions/transcriptions";
import { useParams } from "next/navigation";
import { SyncLoader } from "react-spinners";
import Summary from "./Summary";
import Insight from "./Insight";

type Tab = "transcript" | "summary" | "insights";

interface ContentTabsProps {
  transcription?: string;
  currentTime?: number;
}

const ContentTabs = ({ transcription, currentTime }: ContentTabsProps) => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<Tab>("transcript");

  const { data: summary, isLoading: summaryLoading } = useGetTranscriptionSummary(
    id as string,
    { enabled: activeTab === "summary" }
  );

  const { data: insight, isLoading: insightLoading } = useGetTranscriptionInsight(
    id as string,
    { enabled: activeTab === "insights" }
  );

  const tabs = [
    { id: "transcript", label: "Transcript" },
    { id: "summary", label: "Summary" },
    { id: "insights", label: "Insights" },
  ] as const;

  const renderContent = () => {
    switch (activeTab) {
      case "transcript":
        return transcription && (
          <Transcript 
            transcription={transcription} 
            currentTime={currentTime}
          />
        );
      case "summary":
        return summaryLoading ? (
          <div className="flex justify-center py-8">
            <SyncLoader color="#ef5a3c" size={8} />
          </div>
        ) : (
         <Summary summary={summary?.transctriptionSummary || ''} date={summary?.createdAt || ''} duration={summary?.duration || ''} />
        );
      case "insights":
        return insightLoading ? (
          <div className="flex justify-center py-8">
            <SyncLoader color="#ef5a3c" size={8} />
          </div>
        ) : (
          <Insight insight={insight?.transcriptionInsight || ""} date={insight?.createdAt || ""} duration={insight?.duration || ""}/>
        );
    }
  };

  return (
    <div className="space-y-6 overflow-x-hidden">
      <div className="flex gap-4 md:gap-8 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex flex-col items-center whitespace-nowrap"
          >
            <span
              className={cn(
                "text-sm md:text-base font-medium",
                activeTab === tab.id ? "text-[#ef5a3c]" : "text-[#4d4d4d]"
              )}
            >
              {tab.label}
            </span>
            {activeTab === tab.id && (
              <div className="h-[5px] w-full bg-[#ef5a3c] mt-2" />
            )}
          </button>
        ))}
      </div>

      <div className="min-h-[200px]">
        {renderContent()}
      </div>
    </div>
  );
};

export default ContentTabs; 