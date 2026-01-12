import React from "react"
import { Outlet } from "react-router"
import Header from "./Header"
import Footer from "./Footer"
import MenuSidebar from "./MenuSidebar"
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar"

const AdminLayout = () => {
    return (
        <>
            <SidebarProvider>
                <div className="min-h-screen grid grid-cols-[auto_1fr] w-full">

                    <MenuSidebar />

                    <div className="flex flex-col min-h-screen bg-white">


                        <header className="flex items-center gap-3 border-b p-4">
                            <SidebarTrigger className="cursor-pointer bg-gray sidbar-collapse size-8 p-2 hover:bg-black" />
                            <Header />
                        </header>

                        <main className="flex-1 overflow-y-auto bg-secondary dark:bg-gray-950 p-4 md:p-6">
                            <Outlet />
                        </main>
                    </div>
                </div>
            </SidebarProvider>
            <Footer />
        </>
    )
}

export default AdminLayout
