import React from 'react'
import { Outlet } from 'react-router'

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