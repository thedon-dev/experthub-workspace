import axios from "axios";


const apiService = axios.create({
    baseURL: "http://localhost:3001/",
    // https://seashell-app-nejbh.ondigitalocean.app/
})

export default apiService;
