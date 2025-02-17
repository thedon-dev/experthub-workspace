import axios from "axios";

const apiService = axios.create({
  baseURL: "https://backend-workspace-experthub.onrender.com/",
  // https://experthub-20f6efa1a0d9.herokuapp.com/auth/login
  // baseURL: "http://localhost:3002/"
});

export default apiService;
