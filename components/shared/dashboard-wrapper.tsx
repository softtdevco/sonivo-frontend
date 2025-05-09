"use client"
import { useUserContext } from "@/app/contexts/userContext";
import { AppSidebar } from "@/components/shared/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useGetUser } from "@/service/auth/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineLogout } from "react-icons/md";

const DashboardWrapper = ({
  children,
  header
}: {
  children: React.ReactNode;
  header: React.ReactNode;
}) => {
  const { data: user } = useGetUser();
  const { setUser } = useUserContext()

  useEffect(() => {
    if (user === null || localStorage.getItem("access_token") === null) {
      redirect("/login")
    } else {
      setUser(user)
    }
  }, [user])
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b-2 bg-white px-4">
          <SidebarTrigger className="-ml-1 md:hidden" />
          {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
          <Breadcrumb className="flex w-full items-center justify-between">
            {header}
            <BreadcrumbList>
              <BreadcrumbItem className=" ">
                <FaCircleUser className="size-5 mr-4" />
              </BreadcrumbItem>
              <BreadcrumbItem onClick={() => {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                redirect("/login");
              }} className="cursor-pointer">
                <MdOutlineLogout className="size-5" />
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardWrapper;
