import type { cashType } from "@/types/Cash.type";
import HTTP from "./client";
import type { AxiosError } from "axios";
import type { BackendError } from "@/types/AxiosErrors.type";

const API_URL = `/expenses`;

export const getCashList = async () => {

    try {
        let res = await HTTP.get(`${API_URL}/list`);
        if (res.data.status) {
            return res.data.data;
        }
        return [];
    } catch (error) {
        throw error;
    }
}


export const addCash = async (payload: cashType) => {
    try {
        let response = await HTTP.post(`${API_URL}/add`, payload)
        if (response.data.status) {
            return response.data;
        }
        return null;
    } catch (err) {
        const error = err as AxiosError<BackendError>;
        throw {
            message: error.response?.data?.message || "Something went wrong",
            fieldErrors: error.response?.data?.errors?.reduce((acc: Record<string, string>, curr) => {
                acc[curr.field] = curr.message;
                return acc;
            }, {}) ?? {},
            status: error.response?.data?.status,
            statusCode: error.response?.status,
        };
    }
}