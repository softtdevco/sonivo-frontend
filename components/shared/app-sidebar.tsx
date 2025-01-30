"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Logo } from "@/assets/images";
import {
  CircleUser,
  Headphones,
  LayoutDashboard,
  NotepadText,
  PhoneCall,
} from "lucide-react";
import { usePathname } from "next/navigation";

const data = {
  navMain: [
    {
      title: "Main",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: <LayoutDashboard className="size-5" />,
        },
      ],
    },
    {
      title: "Menu",
      url: "#", 
      items: [
        {
          title: "Live Calls",
          url: "/live-calls",
          icon: <PhoneCall className="size-5" />,
        },
        {
          title: "Transcriptions",
          url: "/transcriptions",
          icon: <NotepadText />,
        },
      ],
    },
    {
      title: "User and Account Settings",
      url: "#",
      items: [
        {
          title: "Account Settings", 
          url: "/settings",
          icon: <CircleUser className="size-5" />,
        },
        {
          title: "Support",
          url: "/support",
          icon: <Headphones className="size-5" />,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Image src={Logo} alt="logo" width={100} height={100} />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="text-[11.15px] font-normal leading-none text-[#808080]">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <a href={item.url}>
                        {item.icon && <span className="">{item.icon}</span>}
                        {item.title}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
