import React from "react"
import { Outlet } from "react-router"
import Header from "./Header"
import Footer from "./Footer"
import MenuSidebar from "./MenuSidebar"
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar"

const AdminLayout = () => {
    return (
        <>


            <SidebarProvider className="min-h-screen grid grid-cols-1 md:grid-cols-[240px_1fr]">
                <MenuSidebar />
                <div className="flex-1 flex-col min-h-screen bg-white">

                    {/* <SidebarTrigger className="cursor-pointer bg-gray sidbar-collapse size-8 p-2 hover:bg-black" /> */}
                    <Header />

                    <main className="flex-1 overflow-y-auto bg-secondary dark:bg-gray-950 p-4 md:p-6">
                        <Outlet />
                    </main>
                </div>
            </SidebarProvider>

        </>
    )
}

export default AdminLayout
