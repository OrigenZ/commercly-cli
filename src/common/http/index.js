import axios from "axios";
//Malakian were here
const API_URL = "http://localhost:5005/";
const axiosInstance = axios.create({
  baseURL: API_URL,
});
export default axiosInstance;
