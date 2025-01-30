"use client";
import DashboardWrapper from "@/components/shared/dashboard-wrapper";
import {
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BreadcrumbLink } from "@/components/ui/breadcrumb";
import { useParams} from "next/navigation";
import React, { useState } from "react";

import {
  useGetTranscription,
} from "@/service/transcriptions/transcriptions";

import { SyncLoader } from "react-spinners";
import ContentTabs from "./components/content-tabs";
import AudioPlayer from "./components/audio-player";

export interface Transcription {
  id: string;
  transcriptionStatus: string;
  transcription: string;
  transccriptionMedia: {
    publicUrl: string;
  };
}

const Page = () => {
  const { id } = useParams();
  const [currentTime, setCurrentTime] = useState(0);
  const { data: transcription, isLoading } = useGetTranscription(id as string, {
    refetchInterval: (query) => 
      query.state.data?.transcriptionStatus === "PROCESSING" ? 3000 : false,
  });

  // Return loading state if either loading or no transcription data yet
  if (isLoading || !transcription?.transcription) {
    return (
      <div className="flex h-screen items-center justify-center">
        <SyncLoader color="#ef5a3c" size={10} />
      </div>
    );
  }

  // Separate check for processing status
  if (transcription.transcriptionStatus === "PROCESSING") {
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-4">
        <p className="text-gray-500">Transcription in progress...</p>
        <SyncLoader color="#ef5a3c" size={10} />
      </div>
    );
  }

  return (
    <DashboardWrapper
      header={
        <>
          <div className="flex items-center gap-2">
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink
                href="/dashboard"
                className="text-base font-medium text-[#4d4d4d]"
              >
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem className="text-base font-medium text-[#4d4d4d]">
              <BreadcrumbPage>{id}</BreadcrumbPage>
            </BreadcrumbItem>
          </div>
        </>
      }
    >
      <div className="bg-white px-7 py-6">
        {transcription?.transccriptionMedia?.publicUrl && (
          <AudioPlayer
            audioUrl={transcription.transccriptionMedia.publicUrl}
            onTimeUpdate={setCurrentTime}
          />
        )}
        
        <div className="mt-8">
          {transcription?.transcription && (
            <ContentTabs
              transcription={transcription.transcription}
              currentTime={currentTime}
            />
          )}
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default Page;
