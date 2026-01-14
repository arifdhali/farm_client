"use client";

import React, { useState, useEffect } from "react";

import {
  LayoutDashboard,
  Warehouse,
  Wheat,
  Users,
  IndianRupee,
  Pill,
  Egg,
  LogOut,
  ChevronDown,
  NotebookIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/" },
  {
    title: "Chicks",
    icon: Egg,
    url: "/chicks",
    children: [{ title: "Delivered", url: "/chicks/delivered" }],
  },
  {
    title: "Farms",
    icon: Warehouse,
    url: "/farms",
    children: [
      { title: "List", url: "/farms/list" },
      { title: "Lifting", url: "/farms/lifting" },
      { title: "Mortality", url: "/mortality" },
    ],
  },
  {
    title: "Feed",
    icon: Wheat,
    url: "/feed",
    children: [
      { title: "List", url: "/feed/list" },
      { title: "Mortality", url: "/feed/mortality" },
    ],
  },
  { title: "Users", icon: Users, url: "/users" },
  {
    title: "Cash",
    icon: IndianRupee,
    url: "/cash",
    children: [
      { title: "Expenses", url: "/cash/expenses" },
      { title: "Collections", url: "/cash/collection" },
    ],
  },
  {
    title: "Medicine",
    icon: Pill,
    url: "/medicine",
    children: [
      { title: "List", url: "/medicine/list" },
      { title: "Delivered", url: "/medicine/delivered" },
    ],
  },
  { title: "Reports", icon: NotebookIcon, url: "/reports" },
];

export default function MenuSidebar() {
  const location = useLocation();
  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.children?.some((c) => location.pathname.startsWith(c.url))) {
        setOpenMenu(item.title);
      }
    });
    console.log(openMenu);
  }, [location.pathname]);

  return (
    <Sidebar className="border-r border-r-[#dddbe6] bg-white dark:bg-slate-900">
      {/* Header */}
      <SidebarHeader className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-white rounded-lg p-2">🌱</div>
          <div>
            <h1 className="text-sm font-bold">AgroDash</h1>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Management v1.0
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* Menu */}
      <SidebarContent className="px-3">
        <SidebarMenu>
          {menuItems.map((item) => {
            const isOpen = openMenu === item.title;

            return (
              <SidebarMenuItem key={item.title} className="space-y-1">
                {/* Parent */}
                <SidebarMenuButton
                  onClick={() =>
                    item.children
                      ? setOpenMenu(isOpen ? null : item.title)
                      : null
                  }
                  asChild={!item.children}
                  className={` flex w-full items-center gap-3 rounded-lg px-3 py-2 transition
                    ${
                      isActive(item.url)
                        ? "bg-primary/10 text-primary font-semibold"
                        : "hover:text-primary hover:bg-primary/10 transition-all duration-300"
                    }`}
                >
                  {item.children ? (
                    <p className="w-full flex items-center gap-3 ">
                      <item.icon size={20} />
                      <span className="flex-1 text-left">{item.title}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </p>
                  ) : (
                    <Link to={item.url}>
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </Link>
                  )}
                </SidebarMenuButton>
                {item.children && (
                  <div
                    className={`ml-9 overflow-hidden transition-all duration-300 ease-in-out
                      ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <div className="flex flex-col gap-1 py-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.title}
                          to={child.url}
                          className={`rounded-md px-3 py-1.5 text-sm transition
                            ${
                              isActive(child.url)
                                ? " text-primary font-medium"
                                : "text-muted-foreground hover:bg-muted"
                            }`}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center gap-3 rounded-xl bg-muted p-2">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc8MReypv_84juSm1htT8mC7NE7-sSbHYeXXTbIBEDLlob-48DszqeuyYuWxKTefjVo6ibaYpAiS-sFMyQRUFwZ_McZouz8vi0iHIvYpILETBYKqj0saTVLCMXfNYEY2qA8wstaw8coMRJ3nXctC2jSfg6Op2aMtBc8VtegKJx1bC7GL7dkbR5RqirPfSd6HCnXkU-WMiSc8XHFxraMUtJ1PZE2Y7ZXDM4WIlmYecD_fpLC2LyU7xEI4QRqAv4evYI7aOsqP4FxIsg"
            className="h-9 w-9 rounded-full"
          />
          <div className="min-w-0">
            <p className="text-xs font-bold truncate">Alex Morgan</p>
            <p className="text-[10px] text-muted-foreground truncate">
              Administrator
            </p>
          </div>
          <button className="ml-auto text-muted-foreground hover:text-foreground">
            <LogOut size={16} />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
