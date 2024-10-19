import axios from "axios";


const apiService = axios.create({
    baseURL: "https://seashell-app-nejbh.ondigitalocean.app/",
    // baseURL: "http://127.0.0.1:3001/",

})

export default apiService;
