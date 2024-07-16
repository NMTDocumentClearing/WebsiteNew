import { combineReducers, applyMiddleware, createStore} from "redux"
import { thunk } from 'redux-thunk';
// import { composeWithDevTools } from "redux-devtools-extension"
import { alertSlice, showLoading } from "./actions/alertSlice"
import { userEditProfileReducer, userLoginReducer, userRegisterReducer } from "./reducers/userReducer"
import { adminRegister } from "./actions/adminActions";
import { adminLoginReducer, adminRegisterReducer } from "./reducers/adminReducer";
import customizationReducer from "./store/customizationReducer";

 const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    loadingSlice: alertSlice.reducer,
    adminsRegister: adminRegisterReducer,
    adminLogin: adminLoginReducer,
    customization: customizationReducer
 })
 
 
 const userInfoFromStorage = localStorage.getItem("userInfo")
 ?JSON.parse(localStorage.getItem("userInfo")) : null;
 
 const adminInfoFromStorage = localStorage.getItem("adminInfo")
 ?JSON.parse(localStorage.getItem("adminInfo")) : null; 
 
 const superadminInfoFromStorage = localStorage.getItem("superadminInfo")
 ?JSON.parse(localStorage.getItem("superadminInfo")) : null; 
 
 const initialState = {
     userLogin: {userInfo: userInfoFromStorage},
     adminRegister: {adminInfo: adminInfoFromStorage},
     adminLogin: {adminInfo: adminInfoFromStorage},
     superadminLogin: {superadminInfo: superadminInfoFromStorage},
     superadminRegister: {superadminInfo: superadminInfoFromStorage},
 }
 
 const middleware = [thunk]
 const store = createStore(
     reducer,
     initialState,
     applyMiddleware(...middleware)
 )

 export default store;



