import HTTP from "@/api/client";
import type { CreateFarmer } from "@/types/Farm";

const FARMER_API_URL = "/farmers";

export const createFarmer = async (payload: CreateFarmer) => {
    try {
        const response = await HTTP.post<CreateFarmer[]>(`${FARMER_API_URL}`, payload);
        console.log(response);
        // return response.data;

    } catch (error) {
        console.log(error);
    }
}


