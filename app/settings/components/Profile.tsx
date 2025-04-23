"use client";
import { FormFieldWrapper } from "@/app/(auth)/register/components/form-field-wrapper";
import { useUserContext } from "@/app/contexts/userContext";
import { Input } from "@/components/ui/input";
import CameraIcon from "@/assets/icons/Camera";
import { FormField } from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import { profileSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useUpdateUser } from "@/service/auth/auth";
import { toast } from "react-toastify";
import ArrorTopRight from "@/assets/icons/ArrorTopRight";
import { useGetUserSubscription } from "@/service/subscriptions/subscription";
const Profile = () => {
  const { user } = useUserContext();
  const { mutate: updateUser, isPending } = useUpdateUser();
  const { data: subscription } = useGetUserSubscription();
  const INPUT_BASE_CLASSES = "-mt-1 rounded-xl border bg-neutral-50 px-[20.52px] py-5 pl-10";
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      companyName: user?.companyName || "",
    },
  });

  React.useEffect(() => {
    if (user) {
      form.reset({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        companyName: user.companyName,
      });
    }
  }, [user, form]);

  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    try {
      updateUser(data, {
        onSuccess: () => {
            toast.success("Profile updated successfully");
          }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getInputClassName = (error?: boolean) => `
  ${INPUT_BASE_CLASSES} ${
    error
      ? "border-red-500 text-red-500 focus-visible:ring-red-500"
      : "border-[#e7e7e7] px-3"
  }`;

  return (
    <>
      <div className="-mt-[11px] inline-flex h-[120px] w-[70%] items-center justify-between border-t-2 border-[#dadada] pb-6 pt-10">
        <div className="flex items-center justify-start gap-6">
          <div className="relative h-24 w-24 overflow-hidden rounded-[61px]">
            <div className="absolute left-0 top-0 h-24 w-24 bg-[#EF5A3C]">
              <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-medium text-white">
                {user?.fullName
                  ?.split(" ")
                  .map((name: string) => name[0])
                  .join("")}
              </p>
            </div>
            <div className="absolute left-[-1px] top-[62px] h-[34px] w-[97px]">
              <div className="bg-black/50 absolute left-0 top-0 z-40 h-[34px] w-[97px]" />
              <div data-svg-wrapper className="absolute left-[42px] top-[9px]">
                <CameraIcon className="text-white" />
              </div>
            </div>
          </div>
          <div className="inline-flex flex-col items-start justify-center gap-2 pr-2.5">
            <div className="flex h-[50px] flex-col items-start justify-start gap-1.5 self-stretch">
              <div className="font-['Inter'] text-xl font-medium leading-normal text-[#273240]">
                {user?.fullName}
              </div>
              <div className="flex flex-col items-start justify-center gap-1">
                <div className="font-['Inter'] text-base font-normal leading-tight text-[#555e67]">
                  {user?.email}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="inline-flex flex-col items-start justify-start gap-2">
          <div className="inline-flex items-center justify-start gap-1">
            <div className="font-['Inter'] text-base font-normal leading-tight text-[#555e67]">
              Current plan:
            </div>
            <div className="font-['Inter'] text-base font-medium leading-tight text-[#272728]">
              {subscription?.active ? "Paid" : "Free"}
            </div>
          </div>
          <div className="inline-flex items-center justify-start">
            <div className="font-['Inter'] text-base font-medium leading-tight text-[#272728] underline">
              Upgrade
            </div>
            <div data-svg-wrapper className="relative">
              <ArrorTopRight />
            </div>
          </div>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4 mt-12 w-[70%]"
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormFieldWrapper
                label="Full name"
                error={!!form.formState.errors.fullName}
              >
                <div className="relative">
                  <Input
                    {...field}
                    className={getInputClassName(
                      !!form.formState.errors.fullName,
                    )}
                    placeholder="Enter your name"
                  />
                </div>
              </FormFieldWrapper>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormFieldWrapper
                label="Email address"
                error={!!form.formState.errors.email}
              >
                <div className="relative">
                  <Input
                    {...field}
                    type="email"
                    className={getInputClassName(!!form.formState.errors.email)}
                    placeholder="Enter email"
                    disabled
                  />
                </div>
              </FormFieldWrapper>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormFieldWrapper
                label="Phone number"
                error={!!form.formState.errors.phone}
              >
                <div className="relative">
                  <Input
                    {...field}
                    className={getInputClassName(!!form.formState.errors.phone)}
                    placeholder="Enter phone number"
                  />
                </div>
              </FormFieldWrapper>
            )}
          />

          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormFieldWrapper
                label="Company name"
                error={!!form.formState.errors.phone}
              >
                <div className="relative">
                  <Input
                    {...field}
                    className={getInputClassName(!!form.formState.errors.phone)}
                    placeholder="Enter company name"
                  />
                </div>
              </FormFieldWrapper>
            )}
          />

          <div className="flex items-center justify-start pt-6">
            <Button
              type="submit"
              className="flex max-w-[160px] items-center justify-between rounded-xl bg-[#131313] px-5 py-3 text-white transition-all duration-200 hover:scale-105 hover:bg-[#2b2b2b]"
              disabled={isPending}
            >
              {isPending && <Loader2 className="animate-spin" />}
              Save changes
           
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default Profile;
