import { getMeQuery } from '@/query/Auth.queries';
import queryClient from '@/query/client';
import React from 'react'
import { Outlet, redirect } from 'react-router'


export async function first() {
    try {
        await queryClient.fetchQuery(getMeQuery());
        throw redirect("/");
    } catch {
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