import { getMeQuery } from '@/query/Auth.queries';
import queryClient from '@/query/client';
import React from 'react'
import { Outlet, redirect } from 'react-router'


export async function loader({ request }: { request: Request }) {
    const cookie = request.headers.get("cookie") ?? undefined;
    try {
        let user = await queryClient.ensureQueryData(getMeQuery(cookie));
        if (user) {
            throw redirect("/");
        }
        return null;
    } catch (err) {
        if (err instanceof Response) {
            throw err;
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