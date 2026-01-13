import React from "react"
import {
  LayoutDashboard,
  Warehouse,
  Wheat,
  Users,
  IndianRupee,
  Pill,
  Egg,
  LogOut,
} from "lucide-react"


import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router"

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
  { title: "Farms", icon: Warehouse, url: "/farms" },
  { title: "Feed", icon: Wheat, url: "/feed" },
  { title: "Users", icon: Users, url: "/users" },
  { title: "Cash", icon: IndianRupee, url: "/cash" },
  { title: "Medicine", icon: Pill, url: "/medicine" },
  { title: "Chicks", icon: Egg, url: "/chicks" },
]

export default function MenuSidebar() {
  const location = useLocation()
  const isActive = (path: string) => location.pathname.startsWith(path)

  return (
    <Sidebar className="border-r bg-white dark:bg-slate-900">
      {/* Header / Logo */}
      <SidebarHeader className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-white rounded-lg p-2">
            🌱
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 dark:text-white">
              AgroDash
            </h1>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Management v1.0
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* Menu */}
      <SidebarContent className="px-3">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className={`flex gap-3 rounded-lg px-3 py-2 transition
                  ${
                    isActive(item.url)
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
              >
                <Link to={item.url}>
                  <item.icon size={20} />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer / Profile */}
      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center gap-3 rounded-xl bg-muted p-2">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc8MReypv_84juSm1htT8mC7NE7-sSbHYeXXTbIBEDLlob-48DszqeuyYuWxKTefjVo6ibaYpAiS-sFMyQRUFwZ_McZouz8vi0iHIvYpILETBYKqj0saTVLCMXfNYEY2qA8wstaw8coMRJ3nXctC2jSfg6Op2aMtBc8VtegKJx1bC7GL7dkbR5RqirPfSd6HCnXkU-WMiSc8XHFxraMUtJ1PZE2Y7ZXDM4WIlmYecD_fpLC2LyU7xEI4QRqAv4evYI7aOsqP4FxIsg"
            className="h-9 w-9 rounded-full object-cover"
            alt="User"
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
  )
}
