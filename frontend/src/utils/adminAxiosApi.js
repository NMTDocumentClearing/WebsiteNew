import axios from "axios";
import baseURL from "../config";

const adminaxiosInstance = axios.create({
    baseURL: baseURL, 
  });

   adminaxiosInstance.interceptors.request.use(
    (config) => {
        const tokenInfo = localStorage.getItem('adminInfo')
        if(tokenInfo){
          if(config.headers) config.headers.token = `Bearer ${JSON.parse(localStorage.getItem('adminInfo')).token}`;
        }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  adminaxiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('adminInfo');
      }
      return Promise.reject(error);
    }
  );

  export default adminaxiosInstance;