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
  Bot,
  Brain,
  CircleUser,
  Headphones,
  LayoutDashboard,
  NotepadText,
  Phone,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Credits from "@/app/settings/components/Credits";

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
          title: "Transcriptions",
          url: "/transcriptions",
          icon: <NotepadText />,
        },
        {
          title: "Assistants",
          url: "/assistants",
          icon: <Bot className="size-5" />,
        },
        {
          title: "Knowledge Base",
          url: "/knowledge-base",
          icon: <Brain className="size-5" />,
        },
        {
          title: "Phone Numbers",
          url: "/phone-numbers",
          icon: <Phone className="size-5" />,
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
          title: "Contact Transkript",
          url: "/contact",
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
      <SidebarHeader className="bg-white">
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
                  <SidebarMenuItem
                    key={item.title}
                    className={
                      pathname === item.url ? "rounded-md bg-[#f3f4f6]" : ""
                    }
                  >
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="flex items-center gap-2">
                        {item.icon && <span>{item.icon}</span>}
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
      <div className="px-2 py-4">
        <Credits />
      </div>
      <SidebarRail />
    </Sidebar>
  );
}
