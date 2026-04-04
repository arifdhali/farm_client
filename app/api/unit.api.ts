import HTTP from "./client";

const API_URL = `/unit-label`;

export const getUnitList = async () => {

    try {
        let res = await HTTP.get(`${API_URL}/list`);
        if (res.data.status) {
            return res.data.data;
        }
    } catch (error) {
        throw error;
    }
}
