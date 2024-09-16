import axios from "axios";


const apiService = axios.create({
    baseURL: "https://seashell-app-nejbh.ondigitalocean.app/",
    //
})

export default apiService;
