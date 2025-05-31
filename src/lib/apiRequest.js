import axios from "axios";

const apiRequest = axios.create({
  // baseURL: "http://localhost:3000/api/v1",
  baseURL: "https://expensetracker-u51b.onrender.com/api/v1",
  withCredentials: true,
});

apiRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {

      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default apiRequest;