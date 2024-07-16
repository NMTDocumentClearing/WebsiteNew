import useraxiosInstance from "../utils/axiosAPI";


export const editProfileData = (fullname,email,phonenumber,userId,config)=>useraxiosInstance.post(`/editprofile/${userId}`,{fullname,email,phonenumber},config)
export const getProfileDatas = (id)=>useraxiosInstance.get(`/getprofile/${id}`)


export const getEmployeesList = (id)=>useraxiosInstance.get(`/getemployeeslist/${id}`)

export const placeApplication = (type,name,nationality,position,user,other,image_url,image_public,passport_url,passport_public,passback_url,passback_public,visa_url,visa_public)=>useraxiosInstance.post('/placeapplication',{type,name,nationality,position,user,other,image_url,image_public,passport_url,passport_public,passback_url,passback_public,visa_url,visa_public})
export const placeDocRenewApply = (documentType,name,user)=> useraxiosInstance.post('/placedocrenewapplication',{documentType,name,user})
export const placeLabourRenewApplication = (type,name,nationality,position,user)=>useraxiosInstance.post('/placelabourapplication',{type,name,nationality,position,user})

export const getIdExpiringLabours = (id)=>useraxiosInstance.get(`/getExpiringLabours/${id}`)


export const getAllAppliedEntry = (id,applicationType)=>useraxiosInstance.post(`/getallapplications/${id}/${applicationType}`)

