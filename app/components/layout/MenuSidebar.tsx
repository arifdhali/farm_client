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
  PenLineIcon,
  TrashIcon,
  LogOutIcon,
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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { useLogoutMutation } from "@/query/Auth.queries";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/" },
  {
    title: "Chicks",
    icon: Egg,
    url: "/chicks",
    children: [
      { title: "Send Farmer", url: "/chicks/delivery" },
      { title: "Delivered list", url: "/chicks/list" }
    ],
  },
  {
    title: "Farms",
    icon: Warehouse,
    url: "/farms",
    children: [
      { title: "Add Farmer", url: "/farms/add" },
      { title: "List", url: "/farms/list" },
      { title: "Lifting", url: "/farms/lifting" },
    ],
  },
  {
    title: "Feed",
    icon: Wheat,
    url: "/feeds",
    children: [
      { title: "Add Feed", url: "/feeds/add" },
      { title: "List", url: "/feeds/list" },
      { title: "Delivered", url: "/feeds/delivered" },
    ],
  },
  { title: "Users", icon: Users, url: "/users" },
  {
    title: "Cash",
    icon: IndianRupee,
    url: "/cash",
    children: [
      { title: "Expense List", url: "/cash/list" },
      { title: "Expense Add", url: "/cash/add" },
      { title: "Collections", url: "/cash/collection" },
    ],
  },
  {
    title: "Medicine",
    icon: Pill,
    url: "/medicine",
    children: [
      { title: "Add Medicine", url: "/medicine/add" },
      { title: "List", url: "/medicine/list" },
      { title: "Delivered", url: "/medicine/delivery" },
    ],
  },
  { title: "Reports", icon: NotebookIcon, url: "/reports" },
  {
    title: "Mortality", icon: PenLineIcon, url: "/mortality",
    children: [
      { title: "Add Mortality", url: "/mortality/add" },
      { title: "List", url: "/mortality/list" },
    ]
  },

];

export default function MenuSidebar() {
  const { mutate: logoutUser, isPending } = useLogoutMutation();
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
  }, [location.pathname]);
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const handleDelete = () => {
    setOpenAlert(!openAlert);
  };
  return (
    <Sidebar className="border-r border-r-[#dddbe6] bg-white dark:bg-slate-900">
      {/* Header */}
      <SidebarHeader className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-white rounded-lg p-2">🌱</div>
          <div>
            <h1 className="text-sm font-bold">SohanaChicken</h1>
            <p className="text-[12px] text-muted-foreground">
              Manage your business
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
                    ${isActive(item.url)
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
                        className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""
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
                            ${isActive(child.url)
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
          <button onClick={handleDelete} className="ml-auto text-muted-foreground hover:text-foreground">
            <LogOut size={16} />
          </button>
        </div>
      </SidebarFooter>

      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent className="p-8 w-110 border-0 items-center">
          <div className="mx-auto p-4 w-fit flex items-center justify-center bg-red-600 rounded-full">
            <LogOutIcon className="text-white" />
          </div>
          <AlertDialogHeader className="mb-8 mt-4 items-center">
            <AlertDialogTitle className="text-2xl font-bold text-[#181111] dark:text-white leading-tight">
              Confirmation
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#896161] text-sm leading-relaxed mt-3 text-center">
              Are you sure you want to Logout?

            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="grid grid-cols-2 gap-4">
            <AlertDialogAction onClick={() => logoutUser()} className={`flex items-center justify-center rounded-lg h-12 bg-red-600 text-white text-sm font-bold hover:bg-primary/90  shadow-lg shadow-primary/20 ${isPending ? "cursor-not-allowed bg-[#896161]" : ""}`}>
              {isPending ? "Processing..." : "Yes"}
            </AlertDialogAction>
            <AlertDialogCancel className="flex items-center justify-center rounded-lg h-12 bg-gray-200 dark:bg-[#3a1d1d] text-[#181111] dark:text-white hover:text-white border-0 text-sm font-bold  hover:bg-primary/90 dark:hover:bg-[#4d2727] ">
              No
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Sidebar>
  );
}
