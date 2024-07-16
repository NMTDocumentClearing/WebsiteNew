import axios from "axios";
import baseURL from "../config";
import { USER_EDITPROFILE_FAIL, USER_EDITPROFILE_REQUEST, USER_EDITPROFILE_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants";
import { editProfileData } from "../api/userAPI";





export const register = (fullname,phonenumber,email,password) => async(dispatch)=> {
    
    try {
        dispatch({ type: USER_REGISTER_REQUEST });
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        };
        const response = await axios.post(`${baseURL}/signup`, {
            fullname,
            phonenumber,
            email,
            password,
        }, config);
    
        if (response.status === 200) {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload: response && response.data ? response.data : "Internal Server Error"
            });
        } else if (response.data) {
            console.log(response);
            dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data });
            dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data });
            localStorage.setItem("userInfo", JSON.stringify(response.data));
        } else {
            console.log("error");
        }
    } catch (error) {
        console.error("Error:", error.message);
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}


export const editprofile = ({userId,fullname,phonenumber,email}) => async(dispatch)=> {
    try {
        dispatch({ type: USER_EDITPROFILE_REQUEST });
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        };
        const {data} = await editProfileData(fullname,email,phonenumber,userId,config);
    
        if (data){
            dispatch({ type: USER_EDITPROFILE_SUCCESS, payload: data.data });
        }
    } catch (error) {
        console.error("Error:", error.message);
        dispatch({
            type: USER_EDITPROFILE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}


export const login = (email,password) => async(dispatch) =>{
    try {
        dispatch({type: USER_LOGIN_REQUEST})

        const config = {
            headers: {
                "Content-type":"application/json"
            }
        }
        const response = await axios.post(`${baseURL}/login`,
         {
            email,
            password,
         },
         config
        )
        if(response.status === 200 ){
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: response && response.data ? response.data : "Internal Server Error"
            })
        }else if(response.status === 200){
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: response && response.data ? response.data : "Internal Server Error"
            })
        }else if(response.data){
            dispatch({type: USER_LOGIN_SUCCESS, payload: response.data})
            localStorage.setItem('userInfo',JSON.stringify(response.data))
        }else{
            console.log("error");
        }
        
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:error.response && error.response.data
            ? error.response.data
            :error.message
        })
        
    }
  }


export const logout = ()=> async (dispatch) =>{
    localStorage.removeItem("userInfo")
    dispatch({type: USER_LOGOUT})
  }