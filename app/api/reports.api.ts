import type { DeliveryFormValues } from "@/types/Chicks";
import HTTP from "./client";

const API = `/report`

export const getFarmer = async () => {
    try {
        let response = await HTTP.get(`${API}/farm`);

        if (response.data.status) {
            return response.data.data;
        }
        return null;

    } catch (err) {
        throw err;
    }
}
