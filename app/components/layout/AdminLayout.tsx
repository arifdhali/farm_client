import React from "react"
import { Outlet, redirect, useNavigation } from "react-router"
import Header from "./Header"
import Footer from "./Footer"
import MenuSidebar from "./MenuSidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar"
import Loading from "../ui/Loading"
import queryClient from "@/query/client"
import { getMeQuery } from "@/query/Auth.queries"
import type { AxiosError } from "axios"
import type { BackendError } from "@/types/AxiosErrors.type"


export async function loader({ request }: { request: Request }) {
    const cookie = request.headers.get("cookie") ?? undefined;
    try {
        let user = await queryClient.ensureQueryData(getMeQuery(cookie));
        console.log("Admin layout", user);
        if (!user) {
            throw redirect("/auth/login");
        }
        return null;
    } catch (err) {
        const error = err as AxiosError<BackendError>;
        if (!error.response?.data.status) {
            throw redirect("/auth/login");
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
