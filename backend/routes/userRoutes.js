const express = require('express');
const {verifyToken}  = require('../middlewares/userMiddlewares/verifyToken');
const { loginUser, registerUser, editProfile, getProfile, getEmployeesList, placeApplication, getAllApplications, getMyData, placeDocumentRenew, getPlacelabourapplication, getExpiringLabours } = require('../controllers/userController');
const router = express.Router()


router.post("/login",loginUser)
router.post("/signup",registerUser)
router.post("/editprofile/:id",verifyToken,editProfile)
router.get("/getprofile/:id",verifyToken,getProfile)
router.get("/getemployeeslist/:id",verifyToken,getEmployeesList)
router.post("/placeapplication",verifyToken,placeApplication)
router.post("/placedocrenewapplication",verifyToken,placeDocumentRenew)
router.post("/placelabourapplication",verifyToken,getPlacelabourapplication)
router.post("/getallapplications/:id/:type",verifyToken,getAllApplications)


router.get('/getExpiringLabours/:id',verifyToken,getExpiringLabours)

module.exports = router