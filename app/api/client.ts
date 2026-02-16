import axios from "axios";

const isServer = typeof window === "undefined";
console.log(isServer)
const HTTP = axios.create({
  baseURL: isServer
    ? process.env.API_URL
    : import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default HTTP;