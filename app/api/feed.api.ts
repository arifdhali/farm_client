import type { addFeed, editFeed, FeedDeliveryFormValues } from "@/types/Feed.type"
import HTTP from "./client"
import type { AxiosError } from "axios";
import type { BackendError } from "@/types/AxiosErrors.type";

const API = `/feed`

export const getFeedListAPI = async () => {
    try {
        let response = await HTTP.get(`${API}/list`);
        if (response.data.status) {
            return response.data.data;
        }

    } catch (err) {
        throw err;
    }
}



export const addFeedAPI = async (payload: addFeed) => {

    try {
        let response = await HTTP.post(`${API}/create`, payload);
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
export const getSingleFeedAPI = async (id: number) => {
    try {
        let response = await HTTP.get(`${API}/${id}`);
        if (response.data.status) {
            return response.data.data;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

export const editFeedAPI = async (payload: editFeed, id: number) => {


    try {
        let response = await HTTP.patch(`${API}/${id}/edit`, payload);
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


export const deleteFeeds = async (id: number) => {
    try {
        let response = await HTTP.delete(`${API}`, {
            params: {
                feed_id: id
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

export const deliveryFeed = async (payload: FeedDeliveryFormValues) => {
    try {
        const res = await HTTP.post(`${API}/delivered`, payload);
        return res.data;
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