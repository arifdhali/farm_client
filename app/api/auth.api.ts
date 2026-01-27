import HTTP from "@/api/client";
import type { LoginRequest } from "@/types/Auth.type";
import type { AxiosError } from "axios";
import type { BackendError } from "@/types/AxiosErrors.type";


import axios from "axios";

export const getMe = async (cookies?: string) => {
    try {
        const res = await HTTP.get("/auth/me", {
            headers: cookies ? { cookie: cookies } : undefined,
        });
        console.log(res, "getMe response");
        if (res.data.status) {
            return res.data.data;
        }
        throw new Error("getMe failed: status not success");
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 401) {
                return null;
            }
        }
        console.error("getMe failed:", err);
        throw err;
    }
};


export const Login = async (payload: LoginRequest) => {
    try {
        let response = await HTTP.post("/auth/login", payload);
        return response.data;
    } catch (err) {
        const error = err as AxiosError<BackendError>;
        throw {
            message:
                error.response?.data?.message ||
                "Something went wrong",
            fieldErrors: error.response?.data?.errors?.reduce(
                (acc: Record<string, string>, curr) => {
                    acc[curr.field] = curr.message;
                    return acc;
                },
                {}
            ) ?? {},
            status: error.response?.data?.status,
            statusCode: error.response?.status,
        };
    }
}

export const logout = async () => {
    await HTTP.post("/auth/logout");
};
