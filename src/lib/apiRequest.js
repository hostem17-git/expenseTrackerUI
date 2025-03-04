import axios from "axios";

const apiRequest = axios.create({
    // baseURL: "http://localhost:3000/api/v1",
    baseURL: "https://expensetracker-u51b.onrender.com/api/v1",
    withCredentials: true
})

export default apiRequest;