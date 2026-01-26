import HTTP from "@/api/client";
import type { LoginRequest } from "@/types/Auth.type";
import type { AxiosError } from "axios";
import type { BackendError } from "@/types/AxiosErrors.type";



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
            ),
            status: error.response?.data?.status,
            statusCode: error.response?.status,
        };
    }
}
