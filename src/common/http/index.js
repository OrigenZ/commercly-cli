import axios from "axios";
//Malakian were here
const API_URL = "https://commercly-srv.herokuapp.com/";
const axiosInstance = axios.create({
  baseURL: API_URL,
});
export default axiosInstance;
