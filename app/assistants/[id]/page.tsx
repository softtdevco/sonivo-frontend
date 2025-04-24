"use client";
import {
  BreadcrumbLink,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import DashboardWrapper from "@/components/shared/dashboard-wrapper";
import React, { useState, useEffect } from "react";
import {
  useGetAssistantById,
  useUpdateAssistantName,
  useAssignPhoneNumber,
  useUnassignPhoneNumber,
  usePublishAssistant,
} from "@/service/assistant/assistant";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FaPen, FaCheck } from "react-icons/fa6";
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
import { toast } from "react-toastify";
import { ErrorResponse } from "@/service/auth/authServices";

import { useGetPhoneNumbers } from "@/service/phone-numbers/phoneNumbers";
import AssignPhoneNumberModal from "./components/AssignPhoneNumberModal";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import ToolsTab from "./components/ToolsTab";
import VoiceAssistant from "./components/VoiceAssistant";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const unwrappedParams = React.use(params);
  const { data, isLoading, isError } = useGetAssistantById(unwrappedParams.id);
  const { mutate: updateAssistantName } = useUpdateAssistantName(
    unwrappedParams.id,
  );
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isPhoneNumberModalOpen, setIsPhoneNumberModalOpen] = useState(false);
  const { data: phoneNumbers } = useGetPhoneNumbers();
  const { mutateAsync: assignPhoneNumber } = useAssignPhoneNumber(
    unwrappedParams.id,
  );
  const { mutateAsync: unassignPhoneNumber } = useUnassignPhoneNumber(
    unwrappedParams.id,
  );
  const { mutateAsync: publishAssistant } = usePublishAssistant(
    unwrappedParams.id,
  );
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setName(data.assist?.name);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">Error loading assistant</p>
      </div>
    );
  }

  const assistant = data?.assist;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!name) {
      toast.error("Name is required");
      return;
    }
    updateAssistantName(
      { name: name },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
        onError: (error: unknown) => {
          const typedError = error as ErrorResponse;
          toast.error(typedError.response.data.message);
        },
      },
    );
  };

  const handleAssignNumber = async (phoneNumberId: string) => {
    try {
      await assignPhoneNumber(
        { phoneNumberId },
        {
          onSuccess: () => {
            setIsPhoneNumberModalOpen(false);
            toast.success("Phone number assigned successfully");
          },
          onError: (error: unknown) => {
            const typedError = error as ErrorResponse;
            toast.error(typedError.response.data.message);
          },
        },
      );
    } catch (error: unknown) {
      const typedError = error as ErrorResponse;
      toast.error(typedError.response.data.message);
    }
  };

  const handleUnassignNumber = async (phoneNumberId: string) => {
    try {
      await unassignPhoneNumber(
        { phoneNumberId },
        {
          onSuccess: () => {
            setIsPhoneNumberModalOpen(false);
            toast.success("Phone number unassigned successfully");
          },
          onError: (error: unknown) => {
            const typedError = error as ErrorResponse;
            toast.error(typedError.response.data.message);
          },
        },
      );
    } catch (error: unknown) {
      const typedError = error as ErrorResponse;
      toast.error(typedError.response.data.message);
    }
  };

  const openPublishModal = () => {
    setIsPublishModalOpen(true);
  };

  const handlePublishConfirm = async () => {
    setIsPublishing(true);
    try {
      await publishAssistant(
        {},
        {
          onSuccess: () => {
            toast.success(
              `Assistant ${assistant?.isPublished ? "unpublished" : "published"} successfully`,
            );
          },
          onError: (error: unknown) => {
            const typedError = error as ErrorResponse;
            toast.error(typedError.response.data.message);
          },
        },
      );
    } catch (error: unknown) {
      const typedError = error as ErrorResponse;
      toast.error(typedError.response.data.message);
    } finally {
      setIsPublishing(false);
      setIsPublishModalOpen(false);
    }
  };

  return (
    <DashboardWrapper
      header={
        <>
          <div className="flex items-center gap-2">
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink
                href="/assistants"
                className="text-base font-medium text-[#4d4d4d]"
              >
                Assistants
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
                value={name}
                onChange={handleNameChange}
                type="text"
                defaultValue={assistant.name!}
              />
              <div
                data-svg-wrapper
                className="relative cursor-pointer"
                onClick={isEditing ? handleSave : undefined}
              >
                {isEditing ? (
                  <FaCheck className="h-4 w-4 text-green-600" />
                ) : (
                  <FaPen className="h-4 w-4 text-[#1c2833]" />
                )}
              </div>
            </div>
            <div className="mb-4 inline-flex flex-wrap items-start justify-start gap-4">
              <VoiceAssistant assistance={data.assistClientData!} />
              <div
                className="flex h-[39px] w-fit cursor-pointer items-center gap-1.5 rounded-xl border border-[#dedede] px-5 py-3"
                onClick={() => setIsPhoneNumberModalOpen(true)}
              >
                <MessageSquare className="text-black h-4 w-4" />
                <div className="strokeWidth text-center text-base font-medium leading-[14.40px] text-[#131313]">
                  {assistant?.assignedNumber ? (
                    <span>{assistant.assignedNumber.phonenumber}</span>
                  ) : (
                    "Assign Number"
                  )}
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
              <div
                className={`flex h-[39px] w-fit cursor-pointer items-center gap-1.5 rounded-xl px-5 py-3 ${
                  assistant?.isPublished
                    ? "border border-red-200 bg-red-50 hover:bg-red-100"
                    : "border border-[#dedede] hover:bg-gray-50"
                }`}
                onClick={openPublishModal}
              >
                <Sparkles
                  className={`h-4 w-4 ${assistant?.isPublished ? "text-red-500" : "text-black"}`}
                />
                <div
                  className={`strokeWidth text-center text-base font-medium leading-[14.40px] ${
                    assistant?.isPublished ? "text-red-500" : "text-[#131313]"
                  }`}
                >
                  {isPublishing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : assistant?.isPublished ? (
                    "Unpublish"
                  ) : (
                    "Publish"
                  )}
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
              <Tabs defaultValue="model">
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
                  <Model
                    modelConfiguration={assistant?.modelConfiguration}
                    id={unwrappedParams.id}
                  />
                </TabsContent>
                <TabsContent value="call">
                  <CallTab callConfiguration={assistant?.callConfiguration} />
                </TabsContent>
                <TabsContent value="tools">
                  {/* Tools tab content here */}
                  <ToolsTab tools={assistant?.tools} id={unwrappedParams.id} />
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

      <AssignPhoneNumberModal
        isOpen={isPhoneNumberModalOpen}
        onOpenChange={setIsPhoneNumberModalOpen}
        phoneNumbers={phoneNumbers?.data}
        onAssign={handleAssignNumber}
        onUnassign={handleUnassignNumber}
        assignedNumber={assistant?.assignedNumber}
      />

      <AlertDialog
        open={isPublishModalOpen}
        onOpenChange={setIsPublishModalOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {assistant?.isPublished
                ? "Unpublish Assistant"
                : "Publish Assistant"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {assistant?.isPublished
                ? "Are you sure you want to unpublish this assistant? It will no longer be available for use."
                : "Are you sure you want to publish this assistant? It will be available for use."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handlePublishConfirm}
              className={
                assistant?.isPublished ? "bg-red-600 hover:bg-red-700" : ""
              }
            >
              {isPublishing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : assistant?.isPublished ? (
                "Unpublish"
              ) : (
                "Publish"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardWrapper>
  );
};

export default Page;
