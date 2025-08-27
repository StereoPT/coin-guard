"use client";

import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "./ui/sidebar";
import {
  LayoutDashboard,
  type LucideIcon,
  Table2Icon,
  TagIcon,
  Triangle,
} from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

type Route = {
  icon: LucideIcon;
  title: string;
  url: string;
};

type GroupedRoute = {
  key: string;
  label?: string;
  items: Route[];
};

const groupRoutes: GroupedRoute[] = [
  {
    key: "dashboard",
    items: [{ icon: LayoutDashboard, title: "Dashboard", url: ROUTES.home }],
  },
  {
    key: "mainMenu",
    label: "Main Menu",
    items: [
      {
        icon: Table2Icon,
        title: "Transactions",
        url: ROUTES.transactions,
      },
      {
        icon: TagIcon,
        title: "Categories",
        url: ROUTES.categories,
      },
    ],
  },
];

const isActive = (routeUrl: string, currentPath: string) => {
  if (routeUrl === "/") {
    return currentPath === "/";
  }

  return currentPath === routeUrl || currentPath.startsWith(routeUrl + "/");
};

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <ShadcnSidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground bg-gradient-to-r from-blue-500 to-blue-600">
                  <Triangle className="stroke-white" size={16} />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">CoinGuard</span>
                  <span className="">v5.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {groupRoutes.map(({ key, label, items }) => {
          return (
            <SidebarGroup key={key}>
              {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
              <SidebarMenu className="gap-2">
                {items.map(({ icon, title, url }) => {
                  const Icon = icon;

                  return (
                    <SidebarMenuItem key={title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive(url, pathname)}
                        tooltip={title}
                      >
                        <Link href={url}>
                          <Icon />
                          {title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
      <SidebarRail />
    </ShadcnSidebar>
  );
};
