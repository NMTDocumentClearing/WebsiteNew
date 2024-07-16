import axios from 'axios'
const baseURL = "http://localhost:5000"


const axiosInstance = axios.create({ baseURL });

const configure = axiosInstance.interceptors.request.use((req)=>{
                    if(localStorage.getItem('userInfo')){
                        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`;    }
                  return req;
                })


        
export default baseURL;


export const gridSpacing = 3;
export const drawerWidth = 280;
