import axios from "axios";





import adminaxiosInstance from "../utils/adminAxiosApi"
import cloudinaryUpload from "../utils/cloudinaryAPI";

export const getAdminProfileDatas = (id)=>adminaxiosInstance.get(`/admin/getprofile/${id}`)


export const getUsersDatas = ()=>adminaxiosInstance.get(`/admin/getusersdata`)
export const getNewUserDatas = ()=>adminaxiosInstance.get(`/admin/getPendingUsers`)
export const ChangeAdminAccessStatus = (id)=>adminaxiosInstance.post('/admin/changeadminaccessstatus',{id})


export const getUserDataWithout =()=>adminaxiosInstance.get(`/admin/getusers`)
export const getUserDatas = (id)=>adminaxiosInstance.get(`/admin/getuserdata/${id}`)
export const getLaboursList = (id)=>adminaxiosInstance.get(`/admin/getlabourdata/${id}`)

export const getAllLaboursList = ()=>adminaxiosInstance.get('admin/getalllabourslist')
export const editDocument = (type,documentNumber,issued,expiry,userId)=> adminaxiosInstance.post('/admin/editdocument',{type,documentNumber,issued,expiry,userId})

export const deleteLabourData = (id)=>adminaxiosInstance.post(`/admin/deletelabourdata/${id}`)

export const getIncomes = (date)=>adminaxiosInstance.get(`/admin/getincomes/${date}`)
export const getExpenses = (date)=>adminaxiosInstance.get(`/admin/getexpenses/${date}`)
export const getIncomesByCompany = (company)=>adminaxiosInstance.get(`/admin/getincomesbycompany/${company}`)

export const getAdminsInfo = (id)=>adminaxiosInstance.get(`/admin/getadminsinfo/${id}`)

export const addLabour = (name,nationality,image_url,public_id,position,idCardExpiry,companyName,labourCardExpiry,id,idCardNumber,labourCardNumber)=>adminaxiosInstance.post(`/admin/addLabour`,{name,nationality,image_url,public_id,position,idCardExpiry,companyName,labourCardExpiry,id,idCardNumber,labourCardNumber})
export const editLabour = (name,nationality,image_url,public_id,position,idCardExpiry,companyName,labourCardExpiry,id,_id,idCardNumber,labourCardNumber)=>adminaxiosInstance.post(`/admin/editlabour/${_id}`,{name,nationality,image_url,public_id,position,idCardExpiry,companyName,labourCardExpiry,id,idCardNumber,labourCardNumber})

export const uploadCloudinary = (formData)=> axios.post(`${cloudinaryUpload}`,formData);
export const cloudinaryDelete = (public_id)=> adminaxiosInstance.post(`/admin/delete-image/${public_id}`)
export const confirmReceipt = (id)=>adminaxiosInstance.post(`/admin/confirmreceipt/${id}`)

export const addIncome = (adminId,date,type,company,person,particular,sale,purchase,profit,paidBy)=> adminaxiosInstance.post('/admin/addincome',{adminId,date,type,company,person,particular,sale,purchase,profit,paidBy})
export const addExpense = (adminId,date,type,expenceName,expenceAmount,paidBy,note)=> adminaxiosInstance.post('/admin/addexpense',{adminId,date,type,expenceName,expenceAmount,paidBy,note})
export const addReciept = (adminId,date,type,recieptParticular,recieptAmount,note)=> adminaxiosInstance.post('/admin/addreciept',{adminId,date,type,recieptParticular,recieptAmount,note})


export const getTodayEarnings = ()=> adminaxiosInstance.get('/admin/getTodayEarnings')
export const getTodayApplications = ()=> adminaxiosInstance.get('/admin/getTodayApplications')

export const getAllApplications = (type)=>adminaxiosInstance.get(`/admin/getallapplications/${type}`)

export const changeStatus = (changeStatusId,rejectReason,statusToChange,applicationType)=>adminaxiosInstance.post('/admin/changeStatus',{changeStatusId,rejectReason,statusToChange,applicationType})
export const changeViewStatus = (viewApplicationId,statusToChange,viewChangeApplicationType) => adminaxiosInstance.post('/admin/changeViewStatus',{viewApplicationId,statusToChange,viewChangeApplicationType})
export const changeProgress = (id,progressData)=> adminaxiosInstance.post('/admin/changeprogress',{id,progressData})

export const addDocument= (documentType,documentNumber,issued,expiry,documentAddUserId)=> adminaxiosInstance.post('/admin/adddocument',{documentType,documentNumber,issued,expiry,documentAddUserId})
export const changeDocumentStatus = (id,type)=> adminaxiosInstance.post('/admin/changedocumentstatus',{id,type})
export const deleteDocumentFromUser = (id,deleteDocument) => adminaxiosInstance.post('/admin/deletedocument',{id,deleteDocument})
export const getRecentApplications = ()=> adminaxiosInstance.get('/admin/getAllRecentApplications')