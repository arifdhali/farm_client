import { getMeQuery } from '@/query/Auth.queries';
import queryClient from '@/query/client';
import type { BackendError } from '@/types/AxiosErrors.type';
import type { AxiosError } from 'axios';
import React from 'react'
import { Outlet, redirect } from 'react-router'


export async function loader({ request }: { request: Request }) {
    const cookie = request.headers.get("cookie") ?? undefined;
    try {
        let user = await queryClient.ensureQueryData(getMeQuery(cookie));
        if (user?.id) {
            return redirect("/");
        }
        return null;
    } catch (error) {
        if (error instanceof Response) throw error;
        return null;
    }
}

const AuthLayout = () => {
    return (

        <>
            <div className="auth-pages flex justify-center items-center h-screen">
                <Outlet />
            </div>
        </>
    )
}

export default AuthLayout