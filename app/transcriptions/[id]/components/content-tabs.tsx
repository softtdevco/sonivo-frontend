"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Transcript from "./Transcript";

type Tab = "transcript" | "summary" | "insights";

interface ContentTabsProps {
  transcription: string;
  currentTime?: number;
}

const ContentTabs = ({ transcription, currentTime }: ContentTabsProps) => {
  const [activeTab, setActiveTab] = useState<Tab>("transcript");

  const tabs = [
    { id: "transcript", label: "Transcript" },
    { id: "summary", label: "Summary" },
    { id: "insights", label: "Insights" },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="h-10 flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex flex-col items-center"
          >
            <span
              className={cn(
                "text-base font-medium",
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

      <div>
        {activeTab === "transcript" && (
          <Transcript 
            transcription={transcription} 
            currentTime={currentTime}
          />
        )}
        {activeTab === "summary" && <div>Summary content</div>}
        {activeTab === "insights" && <div>Insights content</div>}
      </div>
    </div>
  );
};

export default ContentTabs; 