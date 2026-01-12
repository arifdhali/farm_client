import React, { useEffect, useState } from "react"
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  ChevronDown,
} from "lucide-react"
import { Link, useLocation } from "react-router"

import {
  Sidebar as UIsidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../ui/sidebar"

const menuItems = [
  {
    title: "Feeds",
    icon: Home,
    children: [
      { title: "Feed Stock", url: "/feeds/stock" },
      { title: "Feed Usage", url: "/feeds/usage" },
    ],
  },
  {
    title: "Farms",
    icon: Inbox,
    url: "/farms",
    children: [
      { title: "List Stock", url: "/farms/list" },
      { title: "Feed Usage", url: "/feeds/usage" },
    ],
  },
  {
    title: "Medicine",
    icon: Calendar,
    children: [
      { title: "Inventory", url: "/medicine/inventory" },
      { title: "Usage", url: "/medicine/usage" },
    ],
  },
  {
    title: "Cash",
    icon: Search,
    url: "/cash",
  },
  {
    title: "Morality",
    icon: Settings,
    url: "/morality",
  },
]

const MenuSidebar = () => {
  const location = useLocation()
  const [openMenu, setOpenMenu] = useState(null)

  // auto open parent if child route is active
  useEffect(() => {
    menuItems.forEach((item) => {
      if (
        item.children?.some((child) =>
          location.pathname.startsWith(child.url)
        )
      ) {
        setOpenMenu(item.title)
      }
    })
  }, [location.pathname])

  const toggleMenu = (title) => {
    setOpenMenu(openMenu === title ? null : title)
  }

  const isActive = (path) => location.pathname.startsWith(path)

  return (
    <UIsidebar className="bg-white pb-10">
      {/* Logo */}
      <div className="py-5 w-24 mx-auto">
        <img src="/logo.png" alt="Logo" />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const parentActive =
                  item.url && isActive(item.url) ||
                  item.children?.some((c) => isActive(c.url))

                const isOpen = openMenu === item.title

                return (
                  <SidebarMenuItem className="" key={item.title}>
                    {/* Parent with submenu */}
                    {item.children ? (
                      <>
                        <SidebarMenuButton
                          onClick={() => toggleMenu(item.title)}
                          className={`cursor-pointer flex justify-between items-center transition
                            ${parentActive
                              ? "bg-primary/10 text-primary font-medium"
                              : ""
                            }`}
                        >
                          <div className="flex items-center gap-2">
                            <item.icon size={18} />
                            <span>{item.title}</span>
                          </div>

                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                              }`}
                          />
                        </SidebarMenuButton>


                        <div
                          className={`ml-6 overflow-hidden transition-all duration-300 ease-in-out
                            ${isOpen
                              ? "max-h-40 opacity-100 mt-1"
                              : "max-h-0 opacity-0"
                            }`}
                        >
                          {item.children.map((sub) => {
                            const subActive = isActive(sub.url)

                            return (
                              <Link
                                key={sub.title}
                                to={sub.url}
                                className={`block py-2 text-sm rounded-md px-2 transition
                                  ${subActive
                                    ? "text-primary font-medium"
                                    : "text-muted-foreground hover:text-foreground"
                                  }`}
                              >
                                {sub.title}
                              </Link>
                            )
                          })}
                        </div>
                      </>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        className={`transition ${parentActive
                            ? "bg-primary/10 text-primary font-medium"
                            : ""
                          }`}
                      >
                        <Link
                          to={item.url}
                          className="flex items-center gap-2"
                        >
                          <item.icon size={18} />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </UIsidebar>
  )
}

export default MenuSidebar
