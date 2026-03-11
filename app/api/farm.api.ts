import HTTP from "@/api/client";
import type { BackendError } from "@/types/AxiosErrors.type";
import type { AddBonusType, CreateFarmer, makeComplete, makeLifting } from "@/types/Farm";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

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


export const getFarmersList = async (filter: any) => {
    try {
        const response = await HTTP.get(`${FARMER_API_URL}/list`, {
            params: filter
        });
        if (response.data.status) {
            return response.data.data;
        }
        return [];
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
        // toast.error(err.response.data.message)
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
        let response = await HTTP.patch(`${FARMER_API_URL}/${farmID}/update`, updateData);
        if (response.data.status) {
            return response.data;
        }
        return [];
    } catch (error) {
        throw error;
    }
}


export const makeLifiting = async (payload: makeLifting) => {
    try {
        let response = await HTTP.post(`${FARMER_API_URL}/lifting/create`, payload);
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

export const getLfitingList = async ({ status }: { status: string }) => {
    try {
        let response = await HTTP.get(`${FARMER_API_URL}/lifting`, {
            params: {
                status: status
            }
        });

        if (response.data.status) {
            return response.data;
        }
    } catch (err) {
        throw err;
    }
}

export const viewSinglLifting = async ({ farm_id, order_id }: { farm_id: number, order_id: string }) => {
    try {
        let response = await HTTP.get(`${FARMER_API_URL}/lifting/${farm_id}`, {
            params: {
                order_id: order_id
            }
        });

        if (response.data.status) {
            return response.data.data;
        }
    } catch (err) {
        throw err;

    }
}

export const addBounus = async (payload: AddBonusType) => {
    try {
        let res = await HTTP.patch(`${FARMER_API_URL}/lifting/add-bonus`, payload);
        if (res.data.status) {
            return res.data;
        }

    } catch (er) {
        throw er;
    }
}
export const makeCompleteLifting = async (payload: makeComplete) => {
    try {
        let res = await HTTP.patch(`${FARMER_API_URL}/lifting/make-complete`, payload);
        if (res.data.status) {
            return res.data;
        }

    } catch (er) {
        throw er;
    }
}