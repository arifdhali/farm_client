import HTTP from "@/api/client";
import type { CreateFarmer } from "@/types/Farm";

const FARMER_API_URL = "/farm";

export const createFarmer = async (payload: CreateFarmer) => {
    try {


        const response = await HTTP.post(`${FARMER_API_URL}/create`, payload);
        if (response.data.status) {
            return response.data;
        }
        return null;

    } catch (error) {
        throw error;
    }
}


export const getFarmersList = async () => {
    try {
        const response = await HTTP.get(`${FARMER_API_URL}/list`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getSingleFarm = async (id: number) => {
    try {
        const response = await HTTP.get(`${FARMER_API_URL}/${id}`);
        console.log();
        if (response.data.status) {
            return response.data.data.farm;
        }
    } catch (error) {
        throw error;
    }
}

export const getLastOrderID = async (id: number) => {
    try {

        const response = await HTTP.get(`${FARMER_API_URL}/last-order`, {
            params: {
                farm_id: id
            },

        });
        if (response.data.status) {
            return response.data.data;
        }
        return null;
    } catch (err) {
        throw err;
    }
}


export const deleteFarms = async (farmid: number) => {
    try {
        let response = await HTTP.delete(`${FARMER_API_URL}`, {
            params: {
                id: farmid
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

export const updateFarm = async ({ updateData, farmID }: { updateData: any, farmID: number }) => {
    try {
        let response = await HTTP.patch(`${FARMER_API_URL}/${farmID}/update`);
        console.log(response);
    } catch (error) {
        throw error;
    }
}