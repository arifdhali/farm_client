import React from "react"
import { Outlet, redirect, useNavigation } from "react-router"
import Header from "./Header"
import Footer from "./Footer"
import MenuSidebar from "./MenuSidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar"
import Loading from "../ui/Loading"
import queryClient from "@/query/client"
import { getMeQuery } from "@/query/Auth.queries"


export async function loader({ request }: { request: Request }) {
    const cookie = request.headers.get("cookie") ?? undefined;
    try {
        let user = await queryClient.ensureQueryData(getMeQuery(cookie));
        if (!user) {
            throw redirect("/auth/login");
        }
        return null;
    } catch (err) {
        if (err instanceof Response) {
            throw err;
        }
    }
}

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
