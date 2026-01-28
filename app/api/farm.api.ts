import HTTP from "@/api/client";
import type { CreateFarmer } from "@/types/Farm";

const FARMER_API_URL = "/farm";

export const createFarmer = async (payload: CreateFarmer) => {
    try {
        const response = await HTTP.post(`${FARMER_API_URL}/create`, payload);
        console.log(response);
        return response.data;

    } catch (error) {
        console.log(error);
    }
}


export const getFarmers = async () => {
    try {
        const response = await HTTP.get(`${FARMER_API_URL}/list`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}