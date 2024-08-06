const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Labour = require('../models/labourModel')
const {userGenerateToken} = require('../utils/generateToken')
const Application = require('../models/applicationModel')
const DocumentRenewApplication = require('../models/documentRenewApplyModel')
const labourDocRenewApplication = require('../models/labourDocRenewModel')




const loginUser = asyncHandler(async (req,res)=>{
    const {email, password} = req.body
    const user = await User.findOne({ email })

    if(user){

        const match = await user.matchPassword(password)
        if(match === true){
            if(user.adminAccess === "Pending"){
                res.status(200).json("Your Request is Waiting for Admin's Approval")
            }else{
                const token = userGenerateToken(user._id)
                res.status(201).json({
                    _id:user._id,
                    fullname: user.fullname,
                    phonenumber: user.phonenumber,
                    email: user.email,
                    status:user.status,
                    token:token,
                })
            }
        }else{
                res.status(200).json('Invalid email or password !')
        }
    }else{
        res.status(200).json(`Invalid email or password !`)
    }

    
})



const registerUser = asyncHandler(async (req,res)=>{
    // console.log(req.body);
    const {fullname, phonenumber, email, password} = req.body
    
    const userExists = await User.findOne({ email })

    if (userExists) {
        // console.log("herere");
        // const errorMessage = `User ${email} already exists`;
        res.status(200).json(`User ${email} already exists`)
    }

    const user = await User.create({
        fullname,
        phonenumber,
        email,
        password
    })


    if(user){
        // console.log(user);
        res.status(200).json(`Your request is waiting for administrator approval`)
        
    }else{
        res.status(400)
        throw new Error('Error occured! Please try again')
    }
})


const editProfile = asyncHandler(async (req,res)=>{
    // console.log(req.body);
    const id = req.params.id
    const data = await User.findOneAndUpdate({ _id:id },{
        $set: {
            fullname: req.body.fullname,
            email: req.body.email,
            phonenumber: req.body.phonenumber
    }},{new:true})
    
    if(data){
        res.status(201).json({
            data
        })
    }else{
        res.status(400)
        throw new Error('Occured an error !')
    }

    
})

const getProfile = async(req,res)=>{
    const id = req.params.id
    // console.log(id);
    const user = await User.findOne({_id:id})
    if(user){
        if(user.status === 'inActive'){
            res.json({
                user:user,
                blocked:true
            })
        }else{
            res.json({
                user:user
            })
        }
    }else{
        res.status(400)
        throw new Error('Occured an error !')
    }
}

const getEmployeesList = async(req,res)=>{
    const id = req.params.id
    // console.log(id);
    const findEmployess = await Labour.find({ companyId:id })
    try {
        if(findEmployess){
            res.json({
                data:findEmployess
            })
        }else{
            res.status(400)
            throw new Error('Occured an error !')
        }
    } catch (error) {
        console.log(error);
    }   
}

const getExpiringLabours = async (req,res)=>{
    const id = req.params.id
    // console.log(id);
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
    try {
        const findEmployess = await Labour.find({ companyId:id, idCardExpiry: { $lte: oneMonthFromNow } })
        const findLabourExpiry = await Labour.find({ companyId:id, labourCardExpiry: { $lte: oneMonthFromNow } })
        const user = await User.findById(id);
        if (user && user.documents) {
            var expiringDocuments = user.documents.filter(document => document.status === 'Expire Soon');
          } else {
            // console.log('User not found or no documents.');
          }
        
        if(findEmployess && findLabourExpiry && expiringDocuments){
            
            res.json({
                data:findEmployess,
                labourData:findLabourExpiry,
                ducumentsData:expiringDocuments
            })
        }else{
            res.status(400)
            throw new Error('Occured an error !')
        }
    } catch (error) {
        console.log(error);
    }   
}

const placeApplication = async (req,res)=>{
    try {
        const {type,name,nationality,position,user,other,image_url,image_public,passport_url,passport_public,passback_url,passback_public,visa_url,visa_public} = req.body
        const findApplication = await Application.findOne({type:type,name:name,companyId:user})
        if(findApplication){
            res.status(200).json('Application Already Placed !')
        }else{
            const createApplication = await Application.create({
                type,
                name,
                nationality,
                position,
                companyId:user,
                other,
                image:{
                    image_url:image_url,
                    public_id:image_public
                },
                passport:{
                    image_url:passport_url,
                    public_id:passport_public
                },
                passportback:{
                    image_url:passback_url,
                    public_id:passback_public
                },
                visitvisa:{
                    image_url:visa_url,
                    public_id:visa_public
                }
            })
                res.json({
                    data:createApplication
                })
        }
    } catch (error) {
        console.log(error);
    }
}



const placeDocumentRenew = async (req,res)=>{
    try {
        const {documentType,name,user} = req.body
        // console.log(documentType,name,user);
        const findApplication = await DocumentRenewApplication.findOne({type:documentType,companyId:user})
        if(findApplication){
            res.status(200).json('Application Already Placed !')
        }else{
            const createApplication = await DocumentRenewApplication.create({
                type:documentType,
                companyname:name,
                companyId:user
            })
    
            if(createApplication){
                if(documentType === 'Tenancy' || documentType === 'Lisence' || documentType === 'Civil Defence' || documentType === 'Chamber' || documentType === 'Establishment'){
                    var updateDoc = await User.updateOne({_id:user, "documents.type":documentType},
                                                         {$set: {'documents.$.status': 'Applied for renewal'}}
                                                        )
                }
                if(updateDoc){
                    res.json({
                        data:createApplication
                    })
                }
            }else{
                res.status(400)
                throw new Error('Occured an error !')
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const getPlacelabourapplication = async (req,res)=>{
    try {
        const {type,name,nationality,position,user} = req.body
        // console.log(type,name,nationality,position,user);
        const findApplication = await labourDocRenewApplication.findOne({type:type,name:name,position:position,companyId:user})
        if(findApplication){
            res.status(200).json('Application Already Placed !')
        }else{
            const createApplication = await labourDocRenewApplication.create({
                type:type,
                name:name,
                nationality:nationality,
                position:position,
                companyId:user
            })
            if(createApplication){
                    res.json({
                        data:createApplication
                    })
            }else{
                res.status(400)
                throw new Error('Occured an error !')
            }
        }
    } catch (error) {
        console.log(error);
    }
}




const getAllApplications = async(req,res)=>{
    const id = req.params.id
    const applicationType = req.params.type
    if(applicationType === 'newLabourApplications'){
        const findApplications = await Application.find({companyId:id})
        if(findApplications){
            res.json({
                data:findApplications
            })
        }else{
            res.status(400)
            throw new Error('Occured an error !')
        }
    }else if(applicationType === 'labourApplications'){
        const findApplications = await labourDocRenewApplication.find({companyId:id})
        if(findApplications){
                res.json({
                    data:findApplications
                })
        }else{
            res.status(400)
            throw new Error('Occured an error !')
        }
    }else if(applicationType === 'documentApplications'){
        const findApplications = await DocumentRenewApplication.find({companyId:id})
        if(findApplications){
            res.json({
                data:findApplications
            })
        }else{
            res.status(400)
            throw new Error('Occured an error !')
        }
    }
}

module.exports = {
    loginUser,
    registerUser,
    editProfile,
    getProfile,
    getEmployeesList,
    placeApplication,
    getAllApplications,
    placeDocumentRenew,
    getPlacelabourapplication,
    getExpiringLabours
  }

  