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
        console.log("Auth layout", user);
        if (user?.id) {
            return redirect("/");
        }
        return null;
    } catch (err) {
        const error = err as AxiosError<BackendError>;
        console.log("Auth Error", error);
        if (error.status === 401) {
            return null;
            // throw redirect("/auth/login");
        }
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