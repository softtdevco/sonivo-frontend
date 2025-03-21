"use client";
import {
  BreadcrumbLink,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import DashboardWrapper from "@/components/shared/dashboard-wrapper";
import React from "react";
import { useGetAssistantById } from "@/service/assistant/assistant";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FaPen } from "react-icons/fa6";
import {
  Phone,
  MessageSquare,
  PhoneCall,
  Copy,
  Trash2,
  Sparkles,
  Wrench,
  ArrowRight,
  Settings,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CallTab from "./components/CallTab";
import Model from "./components/Model";

const Page = ({ params }: { params: { id: string } }) => {
  const { data: assistant, isLoading } = useGetAssistantById(params.id);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
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
              <BreadcrumbPage>{assistant?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </div>
        </>
      }
    >
      <div className="bg-white px-7 py-6">
        <div className="h-full w-full overflow-hidden bg-white">
          <div className="inline-flex flex-col items-start justify-start gap-4">
            <div className="inline-flex items-center justify-center gap-3">
              <Input
                className="text-[21.30px] font-normal leading-relaxed text-[#1c2833] outline-0 focus:outline-0"
                value={assistant?.name}
              />
              <div data-svg-wrapper className="relative">
                <FaPen className="h-4 w-4 text-[#1c2833]" />
              </div>
            </div>
            <div className="mb-4 inline-flex items-start justify-start gap-4 flex-wrap">
              <div className="flex items-center gap-1.5 self-stretch rounded-xl bg-[#131313] px-5 py-3">
                <PhoneCall className="h-4 w-4 text-white" />
                <div className="strokeWidth text-center text-base font-medium leading-[14.40px] text-white">
                  Test Call
                </div>
              </div>
              <div className="flex h-[39px] w-fit items-center gap-1.5 rounded-xl border border-[#dedede] px-5 py-3">
                <MessageSquare className="text-black h-4 w-4" />
                <div className="strokeWidth text-center text-base font-medium leading-[14.40px] text-[#131313]">
                  Assign Number
                </div>
              </div>
              <div className="flex h-[39px] w-fit items-center gap-1.5 rounded-xl border border-[#dedede] px-5 py-3">
                <Phone className="text-black h-4 w-4" />
                <div className="strokeWidth text-center text-base font-medium leading-[14.40px] text-[#131313]">
                  Call Logs
                </div>
              </div>
              <div className="flex h-[39px] w-fit items-center gap-1.5 rounded-xl border border-[#dedede] px-5 py-3">
                <Copy className="text-black h-4 w-4" />
                <div className="strokeWidth text-center text-base font-medium leading-[14.40px] text-[#131313]">
                  Duplicate
                </div>
              </div>
              <div className="flex h-[39px] w-fit items-center gap-1.5 rounded-xl border border-[#dedede] px-5 py-3">
                <Trash2 className="text-black h-4 w-4" />
                <div className="strokeWidth text-center text-base font-medium leading-[14.40px] text-[#131313]">
                  Delete
                </div>
              </div>
            </div>
          </div>
          <div className="inline-flex flex-col items-start justify-start gap-6">
            <div className="h-[0.5px] w-full bg-[#E9EAF4]" />
            <div className="flex flex-col items-start justify-start gap-4">
              <div className="strokeWidth text-base font-normal leading-tight text-[#555e67]">
                Edit assistant
              </div>
              <Tabs defaultValue="call">
                <TabsList className="inline-flex items-center justify-start gap-px rounded-3xl bg-neutral-100 px-[5px] py-1 shadow-[inset_0px_-1px_12px_0px_rgba(0,0,0,0.02)]">
                  <TabsTrigger
                    value="model"
                    className="flex items-center justify-center gap-2 rounded-3xl px-4 py-2.5 text-[#979797] data-[state=active]:bg-black-900 data-[state=active]:text-white"
                  >
                    <Sparkles className="\\ h-4 w-4" />
                    <div className="strokeWidth text-sm font-semibold">
                      Model
                    </div>
                  </TabsTrigger>
                  <TabsTrigger
                    value="call"
                    className="flex items-center justify-center gap-2 rounded-3xl px-4 py-2.5 text-[#979797] data-[state=active]:bg-black-900 data-[state=active]:text-white"
                  >
                    <Phone className="h-4 w-4" />
                    <div className="strokeWidth text-sm font-medium">Call</div>
                  </TabsTrigger>
                  <TabsTrigger
                    value="tools"
                    className="flex items-center justify-center gap-2 rounded-3xl px-4 py-2.5 text-[#979797] data-[state=active]:bg-black-900 data-[state=active]:text-white"
                  >
                    <Wrench className="h-4 w-4" />
                    <div className="strokeWidth text-sm font-medium">Tools</div>
                  </TabsTrigger>
                  <TabsTrigger
                    value="post-processing"
                    className="flex items-center justify-center gap-2 rounded-3xl px-4 py-2.5 text-[#979797] data-[state=active]:bg-black-900 data-[state=active]:text-white"
                  >
                    <Settings className="h-4 w-4" />
                    <div className="strokeWidth text-sm font-medium">
                      Post-processing
                    </div>
                  </TabsTrigger>
                  <TabsTrigger
                    value="outbounds"
                    className="flex items-center justify-center gap-2 rounded-3xl px-4 py-2.5 text-[#979797] data-[state=active]:bg-black-900 data-[state=active]:text-white"
                  >
                    <ArrowRight className="h-4 w-4" />
                    <div className="strokeWidth text-sm font-medium">
                      Outbounds
                    </div>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="model">
                  {/* Model tab content here */}
                  <Model modelConfiguration={assistant?.modelConfiguration} />
                </TabsContent>
                <TabsContent value="call">
                  <CallTab callConfiguration={assistant?.callConfiguration} />
                </TabsContent>
                <TabsContent value="tools">
                  {/* Tools tab content here */}
                </TabsContent>
                <TabsContent value="post-processing">
                  {/* Post-processing tab content here */}
                </TabsContent>
                <TabsContent value="outbounds">
                  {/* Outbounds tab content here */}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default Page;
