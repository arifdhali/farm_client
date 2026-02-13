import type { DeliveryFormValues } from "@/types/Chicks";
import HTTP from "./client";

const API = `/chicks`

export const getDeliveredList = async (filter: any) => {
    try {
        let response = await HTTP.get(`${API}/delivered/list`, {
            params: filter
        });
        if (response.data.status) {
            return response.data.data;
        }
        return null;

    } catch (err) {
        throw err;
    }
}


export const makeChicksDelivery = async (payload: DeliveryFormValues) => {
    try {
        let response = await HTTP.post(`${API}/delivered`, payload);
        if (response.data.status) {
            return response.data;
        }
        return null;
    } catch (error) {
        throw error;
    }
}
