import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useSearchParams } from "react-router";
import Loading from "@/components/ui/Loading";
import { useResetPasswordMutation } from "@/query/Auth.queries";


const ResetPassword = () => {
    const inputRef = useRef<Record<string, HTMLInputElement | null>>({});
    const [searchParams] = useSearchParams();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    let token = searchParams.get("token");
    let navigate = useNavigate();

    const resetPassword = useResetPasswordMutation();

    useEffect(() => {
        if (!token) {
            navigate("/auth/login", { replace: true })
        }
    }, [])

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },

        validationSchema: Yup.object({
            password: Yup.string()
                .min(6, "Minimum 6 characters")
                .required("Password is required"),

            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password")], "Confirm password must match")
                .required("Confirm password is required"),
        }),

        onSubmit: (values) => {

            resetPassword.mutate({ password: values.password, token: token }, {
                onSuccess: () => {
                    formik.resetForm();
                    navigate("/auth/login", { replace: true })
                }
            })
        },
    });

    useEffect(() => {
        if (!formik.isSubmitting) return;
        let firstElement = Object.keys(formik.errors)[0]
        firstElement && inputRef.current?.[firstElement]?.focus();
    }, [formik.errors, formik.isSubmitting])

    return (
        <>
            {
                !token && <Loading />
            }

            <div className="bg-gray-100 py-12 px-4 min-h-screen">


                <div className="email-container">


                    <header className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-xl mb-4">
                            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">
                            {import.meta.env.VITE_APP_NAME}
                        </h2>
                    </header>


                    <main className="bg-white max-w-lg mx-auto p-8 shadow-lg text-center rounded-xl">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">
                            Reset Your Password
                        </h1>

                        <form onSubmit={formik.handleSubmit} className="space-y-6">


                            <div className="text-left">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    New Password
                                </label>

                                <div className="relative">
                                    <input
                                        ref={(el) => { el && (inputRef.current["password"] = el) }}
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter new password"
                                        className="w-full border border-gray-200 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                    />


                                    <button
                                        type="button"
                                        className="absolute right-3 top-3 text-gray-500"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? "🙈" : "👁️"}
                                    </button>
                                </div>

                                {formik.touched.password && formik.errors.password && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.password}
                                    </p>
                                )}
                            </div>


                            <div className="text-left">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>

                                <div className="relative">
                                    <input
                                        ref={(el) => { el && (inputRef.current["confirmPassword"] = el) }}
                                        type={showConfirm ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Confirm password"
                                        className="w-full border border-gray-200 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary"
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                    />

                                    <button
                                        type="button"
                                        className="absolute right-3 top-3 text-gray-500"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                    >
                                        {showConfirm ? "🙈" : "👁️"}
                                    </button>
                                </div>

                                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors.confirmPassword}
                                    </p>
                                )}
                            </div>


                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90"
                            >
                                Submit
                            </button>

                        </form>

                    </main>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;