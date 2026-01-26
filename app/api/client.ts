import axios from "axios";

const HTTP = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

export default HTTP;
