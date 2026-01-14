import React from "react"
import { Outlet } from "react-router"
import Header from "./Header"
import Footer from "./Footer"
import MenuSidebar from "./MenuSidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar"

const AdminLayout = () => {
    return (
        <>


            <SidebarProvider >
                <MenuSidebar />

                <SidebarInset>
                    <Header />
                   <div className="p-6"> <Outlet /></div>
                </SidebarInset>

            </SidebarProvider>

        </>
    )
}

export default AdminLayout
