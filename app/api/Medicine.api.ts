import type { MedicineDeliveryFormValues, MedicineFormValues } from "@/types/Medicine";
import HTTP from "./client";
import type { AxiosError } from "axios";
import type { BackendError } from "@/types/AxiosErrors.type";
const API = "/medicine";

export const addMedicine = async (payload: MedicineFormValues) => {
    try {
        const res = await HTTP.post(`${API}/create`, payload);
        console.log(res);
        // return res.data;
    } catch (err) {
        const error = err as AxiosError<BackendError>;
        console.log(error);
        throw {
            message:
                error.response?.data?.message ||
                "Something went wrong",
            fieldErrors: error.response?.data?.errors?.reduce((acc: Record<string, string>, curr) => {
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

export const deliveryMedicine = async (payload: MedicineDeliveryFormValues) => {
    try {
        const res = await HTTP.post(`${API}/delivered`, payload);
        return res.data;
    } catch (err) {
        const error = err as AxiosError<BackendError>;
        console.log(error);
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


export const getMedicineList = async () => {
    try {
        let response = await HTTP.get(`${API}/list`);
        if (response.data.status) {
            return response.data.data;
        }
        return null;

    } catch (err) {
        throw err;
    }
}


export const getSingleMedicine = async (id: number) => {
    try {
        const response = await HTTP.get(`${API}/${id}`);
        if (response.data.status) {
            return response.data.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const updateMedicine = async ({ updateData, id }: { updateData: any, id: number }) => {
    try {
        let response = await HTTP.patch(`${API}/${id}/edit`, updateData);
        if (response.data.status) {
            return response.data.data;
        }
        return null;

    } catch (err) {
        const error = err as AxiosError<BackendError>;
        console.log(error);
        throw {
            message:
                error.response?.data?.message ||
                "Something went wrong",
            fieldErrors: error.response?.data?.errors?.reduce((acc: Record<string, string>, curr) => {
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

export const sendToFarmer = () => { }