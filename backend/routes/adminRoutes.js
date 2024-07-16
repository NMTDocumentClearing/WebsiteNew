const express = require('express');
const {verifyToken}  = require('../middlewares/adminMiddlewares/verifyToken');
const { registerAdmin,
        loginAdmin,
        getAdminProfile, 
        getUsersData, 
        getUserDatas, 
        addLabours, 
        getLabourDatas, 
        deleteImage, 
        deleteLabourData, 
        editLabours, 
        getAllLaboursList, 
        addIncome, 
        addExpense, 
        getIncomes, 
        getExpenses, 
        getAdminsInfo, 
        getIncomesByCompany, 
        confirmReciept, 
        getTodayEarnings, 
        getAllApplications, 
        changeApplicationStatus, 
        addDocuments, 
        addReciept, 
        changeDocStatus, 
        getUserDataset, 
        deleteDocument,
        editDocuments, 
        changeProgress, 
        getTodayApplications, 
        getRecentApplications, 
        changeViewStatus, 
        getPendingUsers, 
        changeAdminAccessStatus} = require('../controllers/adminController');


const router = express.Router()


router.post("/signup",registerAdmin)
router.post("/login",loginAdmin)
router.get("/getprofile/:id",verifyToken,getAdminProfile)
router.get("/getusersdata",verifyToken,getUsersData)
router.get("/getusers",verifyToken,getUserDataset)
router.get("/getPendingUsers",verifyToken,getPendingUsers)
router.post("/changeadminaccessstatus",verifyToken,changeAdminAccessStatus)


router.get("/getuserdata/:id",verifyToken,getUserDatas)
router.get("/getlabourdata/:id",verifyToken,getLabourDatas)
router.post("/addLabour",verifyToken,addLabours)
router.post("/editlabour/:id",verifyToken,editLabours)
router.post("/delete-image/:folder/:id",verifyToken,deleteImage)
router.post("/deletelabourdata/:id",verifyToken,deleteLabourData)

router.get("/getalllabourslist",verifyToken,getAllLaboursList)

router.post("/addincome",verifyToken,addIncome)
router.post("/addexpense",verifyToken,addExpense)
router.post("/addreciept",verifyToken,addReciept)

router.get("/getincomes/:date",verifyToken,getIncomes)
router.get("/getexpenses/:date",verifyToken,getExpenses)
router.get("/getincomesbycompany/:company",verifyToken,getIncomesByCompany)
router.get("/getadminsinfo/:id",verifyToken,getAdminsInfo)
router.post("/confirmreceipt/:id",verifyToken,confirmReciept)

router.get("/getTodayEarnings",verifyToken,getTodayEarnings)
router.get("/getTodayApplications",verifyToken,getTodayApplications)

router.get("/getallapplications/:type",verifyToken,getAllApplications)
router.post("/changeStatus",verifyToken,changeApplicationStatus)
router.post("/changeViewStatus",verifyToken,changeViewStatus)

router.post('/changeprogress',verifyToken,changeProgress)

router.post("/adddocument",verifyToken,addDocuments)
router.post("/editdocument",verifyToken,editDocuments)
router.post("/changedocumentstatus",verifyToken,changeDocStatus)
// router.post("/deleteimage/Labours/*",verifyToken,deleteImage)
router.post("/deletedocument",verifyToken,deleteDocument)

router.get("/getAllRecentApplications",verifyToken,getRecentApplications)


module.exports = router