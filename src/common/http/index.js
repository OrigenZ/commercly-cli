import axios from "axios";
//Malakian were here
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
export default axiosInstance;
