import axios from "axios";


const apiService = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL ?? "https://expexthub-trainings.onrender.com/",
})

export default apiService;
