import axios from "axios";
import baseURL from "../config";
import { ADMIN_LOGIN_FAIL, ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCCESS, ADMIN_LOGOUT, ADMIN_REGISTER_FAIL, ADMIN_REGISTER_REQUEST, ADMIN_REGISTER_SUCCESS } from "../constants/userConstants";








export const adminsRegister = (fullname,phonenumber,email,password) => async(dispatch)=> {
    console.log(fullname,phonenumber,email,password);
    try {
        dispatch({ type: ADMIN_REGISTER_REQUEST });
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        };
        const response = await axios.post(`${baseURL}/admin/signup`, {
            fullname,
            phonenumber,
            email,
            password,
        }, config);
    
        if (response.status === 200) {
            console.log(response);
            dispatch({
                type: ADMIN_REGISTER_FAIL,
                payload: response && response.data ? response.data : "Internal Server Error"
            });
        } else if (response.data) {
            console.log(response);
            dispatch({ type: ADMIN_REGISTER_SUCCESS, payload: response.data });
            dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: response.data });
            localStorage.setItem("adminInfo", JSON.stringify(response.data));
        } else {
            console.log("error");
        }
    } catch (error) {
        console.error("Error:", error.message);
        dispatch({
            type: ADMIN_REGISTER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}


export const adminlogin = (email,password) => async(dispatch) =>{
    
    try {
        dispatch({type: ADMIN_LOGIN_REQUEST})

        const config = {
            headers: {
                "Content-type":"application/json"
            }
        }
        const response = await axios.post(`${baseURL}/admin/login`,
         {
            email,
            password,
         },
         config
        )
        if(response.status === 200 ){
            dispatch({
                type: ADMIN_LOGIN_FAIL,
                payload: response && response.data ? response.data : "Internal Server Error"
            })
        }else if(response.data){
            dispatch({type: ADMIN_LOGIN_SUCCESS, payload: response.data})
            localStorage.setItem('adminInfo',JSON.stringify(response.data))
        }else{
            console.log("error");
        }
        
    } catch (error) {
        dispatch({
            type: ADMIN_LOGIN_FAIL,
            payload:error.response && error.response.data
            ? error.response.data
            :error.message
        })
        
    }
  }

  export const adminLogout = ()=> async (dispatch) =>{
    localStorage.removeItem("adminInfo")
    dispatch({type: ADMIN_LOGOUT})
  }