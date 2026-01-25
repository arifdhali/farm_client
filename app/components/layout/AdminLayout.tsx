import React from "react"
import { Outlet, useNavigation } from "react-router"
import Header from "./Header"
import Footer from "./Footer"
import MenuSidebar from "./MenuSidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar"
import Loading from "../ui/Loading"

const AdminLayout = () => {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";

    return (
        <>

            {
                isLoading ? (
                    <Loading />
                ) : (
                    <SidebarProvider >
                        <MenuSidebar />

                        <SidebarInset>
                            <Header />
                            <div className="p-6"> <Outlet /></div>
                        </SidebarInset>

                    </SidebarProvider>

                )
            }


        </>
    )
}

export default AdminLayout
