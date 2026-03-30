import type { AxiosError } from "axios";
import HTTP from "./client";
import type { BackendError } from "@/types/AxiosErrors.type";
import type { CreateCustomer } from "@/types/Customers.type";
const API_URL = `/customer`;



export const getCustomersList = async (filter: any) => {
    try {
        const response = await HTTP.get(`${API_URL}/list`,{
            params: filter
        });
        if (response.data.status) {
            return response.data.data;
        }
        return [];
    } catch (error) {
        throw error;
    }
}
export const getCustomersLifting = async (id: number) => {
    try {
        const response = await HTTP.get(`${API_URL}/${id}`);
        if (response.data.status) {
            return response.data.data;
        }
        return [];
    } catch (error) {
        throw error;
    }
}
export const getCustomerById = async (id: number) => {
    try {
        const response = await HTTP.get(`${API_URL}/${id}/view`);
        if (response.data.status) {
            return response.data.data;
        }
        console.log(response.data)
        return [];
    } catch (error) {
        throw error;
    }
}
export const getCustomerByStatus = async (id: number, status: string) => {
    try {
        const response = await HTTP.get(`${API_URL}/${id}/${status}`);
        if (response.data.status) {
            return response.data.data;
        }
        console.log(response.data)
        return [];
    } catch (error) {
        throw error;
    }
}

export const addCustomer = async (payload: CreateCustomer) => {
    try {
        let response = await HTTP.post(`${API_URL}/create`, payload);
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

export const deleteCustomer = async (customerid: number) => {
    try {
        let response = await HTTP.delete(`${API_URL}`, {
            params: {
                customer_id: customerid
            }
        });
        if (response.data.status) {
            return response.data;
        }
        return null;
    } catch (error) {
        throw error;
    }
}