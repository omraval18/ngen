"use client";

import {
  MusicNotesSimpleIcon,
  StackIcon,
  UserSoundIcon,
} from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { cn } from "~/lib/utils";

export default function SidebarMenuItems() {
  const path = usePathname();

  let items = [
    {
      title: "Library",
      url: "/",
      icon: StackIcon,
      active: false,
    },
    {
      title: "Music",
      url: "/create",
      icon: MusicNotesSimpleIcon,
      active: false,
    },
    {
      title: "Text to Speech",
      url: "/tts",
      icon: UserSoundIcon,
      active: false,
    },
  ];

  items = items.map((item) => ({
    ...item,
    active: path === item.url,
  }));

  return (
    <>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={item.active}>
            <a href={item.url} className="flex items-center">
              <item.icon
                className={cn(!item.active && "text-muted-foreground")}
              />
              <span
                className={cn(
                  "text-sm font-medium text-black/80",
                  !item.active && "text-muted-foreground",
                )}
              >
                {item.title}
              </span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
}
