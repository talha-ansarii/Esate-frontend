import axios from "axios";

const apiRequest = axios.create({
    baseURL: "https://estate-1-m8y5.onrender.com/api",
    withCredentials: false
})

export default apiRequest;