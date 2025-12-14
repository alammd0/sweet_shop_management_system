import axios  from "axios";

const API_URL = "http://localhost:3000/api/v1";

const apiClient = axios.create({
    baseURL : API_URL,
    timeout : 10000
});

export default apiClient;