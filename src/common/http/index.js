import axios from "axios";
//Malakian were here
const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
});
export default axiosInstance;
