import axios from "axios";


const apiService = axios.create({
    baseURL: "https://seashell-app-nejbh.ondigitalocean.app/",
    // baseURL: "http://localhost:3001/"

})

export default apiService;
