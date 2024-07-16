const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModel');
const User = require('../models/userModel');
const { adminGenerateToken } = require('../utils/generateToken');
const Labour = require('../models/labourModel');
const Income = require('../models/incomeModel');
const Expence = require('../models/expenceModel');
const Application = require('../models/applicationModel');
const Reciept = require('../models/recieptModel');
const DocumentRenewApplication = require('../models/documentRenewApplyModel');
const labourDocRenewApplication = require('../models/labourDocRenewModel');
const cloudinary = require('cloudinary').v2;

const cloud_name = process.env.CLOUD_NAME
const cloud_secret = process.env.CLOUD_API_SECRET_KEY
const api_key = process.env.CLOUD_API_KEY

cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: cloud_secret
  });

const registerAdmin = asyncHandler(async (req,res)=>{
    const {fullname, phonenumber, email, password} = req.body
    // console.log(req.body);
    const adminExists = await Admin.findOne({ email })

    if (adminExists) {
        // console.log("herere");
        // const errorMessage = `User ${email} already exists`;
        res.status(200).json(`User ${email} already exists`)
    }

    const admin = await Admin.create({
        fullname,
        phonenumber,
        email,
        password
    })


    if(admin){
        // console.log(admin);
        res.status(201).json({
            _id:admin._id,
            fullname: admin.fullname,
            phonenumber: admin.phonenumber,
            email: admin.email,
            token: adminGenerateToken(admin._id),
            status:admin.status,
        })
    }else{
        res.status(400)
        throw new Error('Error occured! Please try again')
    }

    
})



const loginAdmin = asyncHandler(async (req,res)=>{
    // console.log(req.body);
    const {email, password} = req.body
    const admin = await Admin.findOne({ email })
     
    if(admin){
        const match = await admin.matchPassword(password)
        if(match === true){
            const token = adminGenerateToken(admin._id)
            res.status(201).json({
                _id:admin._id,
                fullname: admin.fullname,
                phonenumber: admin.phonenumber,
                email: admin.email,
                status:admin.status,
                token:token,
            })
        }else{
            res.status(200).json('Invalid email or password !')
        }
    }else{
        res.status(400).json(`Invalid email or password !`)
    }

    
})

const getAdminProfile = async(req,res)=>{
    const id = req.params.id
    const admin = await Admin.findOne({ _id:id })
    // console.log(admin);
    if(admin){
        if(admin.status === 'inActive'){
            res.json({
                admin:admin,
                blocked:true
            })
        }else{
            res.json({
                admin:admin
            })
        }
    }else{
        res.status(400)
        throw new Error('Occured an error !')
    }
}

const getUsersData = async(req,res)=>{
    // const pageNumber = req.params.page
    // const limit = req.params.rowsPerPage
    // console.log(pageNumber,limit);

    // const userCount = await User.countDocuments({})
    // const numberOfPages = Math.ceil(userCount/limit)
    // const skippable = (pageNumber -1) * limit
    try {
        const users = await User.find({})
        // console.log(users);
        if(users){
            
                res.json({
                    data:users
                })
            
            
        }else{
            res.status(400)
            throw new Error('Occured an error !')
        }
    } catch (error) {
        console.log(error);
    }

    
}

const getUserDataset = async (req, res) => {
    try {
        const users = await User.find({})
        // console.log(users);
        if(users){
            
                res.json({
                    data:users
                })
            
            
        }else{
            res.status(400)
            throw new Error('Occured an error !')
        }
    } catch (error) {
        console.log(error);
    }
}

const getUserDatas = async (req,res)=>{
    const id = req.params.id
    const findUser =  await User.findOne({_id:id})
    if(findUser){
        
        res.json({
            data:findUser
        })
    
      
}else{
    res.status(400)
    throw new Error('Occured an error !')
}
}

const getPendingUsers = async (req,res)=>{
    try {
        const findPendingUsers =  await User.find({adminAccess:"Pending"})
        if(findPendingUsers){
            // console.log(findPendingUsers);
            res.json({
                data:findPendingUsers
            })     
        }else{
            res.status(400)
            throw new Error('Occured an error !')
        }
    } catch (error) {
        console.log(error);
    }
}

const changeAdminAccessStatus = async (req,res)=>{
    const {id} = req.body;
    try {
        const EditUser =  await User.findByIdAndUpdate({_id:id},{
            adminAccess:"Access granted"
        })
        if(EditUser){
            // console.log(findPendingUsers);
            res.status(201).json({
                success:true
            })     
        }else{
            res.status(400)
            throw new Error('Occured an error !')
        }
    } catch (error) {
        console.log(error);
    }
}



const getLabourDatas = async (req,res)=>{
    // console.log(req.params.id);
    const id = req.params.id
    const findLabours =  await Labour.find({companyId:id})
    if(findLabours){
        // console.log(findLabours);
        res.json({
            data:findLabours
        })
    
      
}else{
    res.status(400)
    throw new Error('Occured an error !')
}
}

const getAllLaboursList = async (req,res)=>{
    const findLabours =  await Labour.find({}).populate('companyId')
    if(findLabours){
        // console.log(findLabours);
        res.json({
            data:findLabours
        })
    
      
}else{
    res.status(400)
    throw new Error('Occured an error !')
}
}


const addLabours = async (req,res)=>{
    // console.log(req.body);
    const {name,nationality,image_url,public_id,position,idCardExpiry,companyName,labourCardExpiry,id,idCardNumber,labourCardNumber} = req.body
    try {
        const labourExists = await Labour.findOne({ name,company:companyName })
        if(labourExists){
            // console.log(`Labour ${name} already exists`);
            res.status(200).json(`Labour ${name} already exists`)
        
        }else{
            const labourCreated = await Labour.create({
                name,
                nationality,
                position,
                company:companyName,
                image:{
                    image_url:image_url,
                    public_id:public_id
                },
                companyId:id,
                labourCardExpiry,
                idCardExpiry,
                idCardNumber,
                labourCardNumber,
        
            })
        
            if(labourCreated){
                // console.log(labourCreated);
                res.status(201).json({
                    data:labourCreated
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
}


const addIncome = async (req,res)=>{
    const {adminId,date,type,company,person,particular,sale,purchase,profit,paidBy} = req.body
    try {
        const incomeExists = await Income.findOne({ company:company,labour:person,particular:particular })
        if(incomeExists){
            // console.log(`Income already exists`);
            res.status(200).json(`Income already exists`)
        
        }else{
            const incomeCreated = await Income.create({
                date,
                company,
                labour:person,
                particular,
                admin:adminId,
                sale,
                purchase,
                profit,
                paidBy
        
            })
        
            if(incomeCreated){
                // console.log(labourCreated);
                res.status(201).json({
                    data:incomeCreated
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const addExpense =  async (req,res)=>{
    const {adminId,date,type,expenceName,expenceAmount,paidBy,note} = req.body
    // console.log(adminId,date,type,expenceName,expenceAmount,paidBy,note);
    try {
        
            const expenseCreated = await Expence.create({
                date,
                particular:expenceName,
                amount:expenceAmount,
                admin:adminId,
                paidBy:paidBy,
                note:note
            })
        
            if(expenseCreated){
                // console.log(labourCreated);
                res.status(201).json({
                    data:expenseCreated
                })
            }
        
    } catch (error) {
        console.log(error);
    }
}

const addReciept = async (req, res) => {
    const {adminId,date,type,recieptParticular,recieptAmount,note} = req.body;
    try {
        
        const recieptCreated = await Reciept.create({
            date,
            particular:recieptParticular,
            amount:recieptAmount,
            admin:adminId,
            note:note
        })
    
        if(recieptCreated){
            // console.log(labourCreated);
            res.status(201).json({
                data:recieptCreated
            })
        }
    
    } catch (error) {
        console.log(error);
    }
}



const editLabours = async (req,res)=>{
    // console.log(req.body);
    // console.log(req.params);
    const _id = req.params.id;
    const {name,nationality,image_url,public_id,position,idCardExpiry,companyName,labourCardExpiry,id,idCardNumber,labourCardNumber} = req.body
    try {
        const labourExists = await Labour.findOne({ _id:_id })
        if(!labourExists){
            // console.log(`Labour ${name} doesn't exists`);
            res.status(200).json(`Labour ${name} doesn't exists`)
        
        }else{
            // console.log(labourExists);
            const labourEdit = await Labour.findByIdAndUpdate({_id:_id},{
                name,
                nationality,
                position,
                company:companyName,
                image:{
                    image_url:image_url,
                    public_id:public_id
                },
                labourCardExpiry,
                idCardExpiry,
                idCardNumber,
                labourCardNumber
            })
        
            if(labourEdit){
                // console.log(labourCreated);
                res.status(201).json({
                    data:labourEdit
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
}


const deleteImage  = async(req, res) => {
    // console.log(req.params);
    try {
        const { id } = req.params;
        const {folder} = req.params;
        const publicId = folder + '/' + id;
        const result = await cloudinary.uploader.destroy(publicId, { invalidate: true });
        res.json({ message: 'Image deleted successfully', result });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete image', message: error.message });
      }
}

const deleteLabourData  = async (req, res) => {
    // console.log(req.params);
    try {
        const id = req.params.id
        const data = await Labour.findByIdAndDelete({_id:id});
        if(data){
            res.status(201).json({ message: 'Labour deleted successfully'});
        }

    } catch (error) {
        res.status(500).json({ message:"Labour Deletion Failed"})
        console.log(error);
    }
}

const getIncomes = async (req,res)=>{
    const date = req.params.date
    try {
        const findIncomes =  await Income.find({date:date}).populate('admin');
        if(findIncomes){
            res.json({
                data:findIncomes
            })
            }else{
                res.status(400)
                throw new Error('Occured an error !')
            }
    } catch (error) {
        console.log(error);
    }
}

const getIncomesByCompany = async (req,res)=>{
    const company = req.params.company
    try {
        const findIncomes =  await Income.find({company:company}).populate('admin').sort({ createdAt: -1 });
        if(findIncomes){
            res.json({
                data:findIncomes
            })
            }else{
                res.status(400)
                throw new Error('Occured an error !')
            }
    } catch (error) {
        console.log(error);
    }
}

const getExpenses = async (req,res)=>{
    const date = req.params.date
    try {
        const findExpenses =  await Expence.find({date:date}).populate('admin');
        if(findExpenses){
            res.json({
                data:findExpenses
            })
            }else{
                res.status(400)
                throw new Error('Occured an error !')
            }
    } catch (error) {
        console.log(error);
    }
}

const getAdminsInfo = async (req,res)=>{
    try {
        const id  = req.params.id
        // console.log(id);
        const findAdmin =  await Admin.find({_id:id})
        if(findAdmin){
            res.json({
                data:findAdmin
            })
            }else{
                res.status(400)
                throw new Error('Occured an error!')
            }
    } catch (error) {
        console.log(error);
    }
}

const confirmReciept = async (req,res)=>{
    try {
        const id  = req.params.id
        // console.log(id);
        const findIncome =  await Income.findOneAndUpdate(
            { _id: id },
            { $set: { status: 'Recieved' } }, 
            { new: true }
          );
        if(findIncome){
            res.json({
                data:findIncome
            })
            }else{
                res.status(400)
                throw new Error('Occured an error!')
            }
    } catch (error) {
        console.log(error);
    }
}

const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const getTodayEarnings = async (req,res)=>{
    try {
        const today = getCurrentDate();
        const FindIncome =  await Income.find({date:today})
        const findExpense = await Expence.find({date:today})
        if(FindIncome){
            res.json({
                data:FindIncome,
                expense:findExpense
            })
        }else{
                res.status(400)
                throw new Error('Occured an error !')
            }
    } catch (error) {
        console.log(error);
    }
}

const getTodayApplications = async (req,res)=>{
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to the start of the day (midnight)
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const numberOfCompanies = await User.find({}).count()
        const numberOfLabours = await Labour.find({}).count()
        const numberOfAdmins = await Admin.find({}).count()
        const findApplications =  await Application.find({
            createdAt: {
                $gte: today,
                $lt: tomorrow
            }
        });
        if(findApplications){
            res.json({
                applicationcount:findApplications,
                companiesCount:numberOfCompanies,
                laboursCount:numberOfLabours,
                adminsCount:numberOfAdmins
            })
        }else{
                res.status(400)
                throw new Error('Occured an error !')
            }
    } catch (error) {
        console.log(error);
    }
}

const getAllApplications = async (req,res)=>{
    const type = req.params.type
    try{
        if(type === 'newLabourApplications'){
            const findApplications = await Application.find({}).populate('companyId')
            if(findApplications){
                    res.json({
                        data:findApplications
                    })
                
            }else{
                res.status(400)
                throw new Error('Occured an error !')
            }
        }else if (type === 'documentApplications'){
            const findApplications = await DocumentRenewApplication.find({}).populate('companyId')
            if(findApplications){
                    res.json({
                        data:findApplications
                    })
                
            }else{
                res.status(400)
                throw new Error('Occured an error !')
            }
        }else if (type === 'labourApplications'){
            const findApplications = await labourDocRenewApplication.find({}).populate('companyId')
            if(findApplications){
                    res.json({
                        data:findApplications
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



const getRecentApplications = async (req,res)=>{
    // console.log("heteteet");
    try{
        const newArray = []
            const findNewLabourApplications = await Application.find({viewStatus:"Not Viewed"}).populate('companyId')
            if(findNewLabourApplications){
                 findNewLabourApplications.map((e)=>{
                     newArray.push(e)
                 })
            }else{
                res.status(400)
                throw new Error('Occured an error !')
            }
            const findDocumentApplications = await DocumentRenewApplication.find({viewStatus:"Not Viewed"}).populate('companyId')
            if(findDocumentApplications){
                findDocumentApplications.map((e)=>{
                    newArray.push(e)
                })
            }else{
                res.status(400)
                throw new Error('Occured an error !')
            }
            const findLabourDocRenewApplicationc = await labourDocRenewApplication.find({viewStatus:"Not Viewed"}).populate('companyId')
            if(findLabourDocRenewApplicationc){
                findLabourDocRenewApplicationc.map((e)=>{
                    newArray.push(e)
                })
            }else{
                res.status(400)
                throw new Error('Occured an error !')
            }
            // console.log(newArray);
            res.status(201).json({
                data: newArray
            })

    } catch (error) {
        console.log(error);
    }   
}


const changeApplicationStatus = async (req,res)=>{
    const {changeStatusId,rejectReason,statusToChange,applicationType} = req.body
    try {
        if(applicationType === 'newLabourApplications'){
            const changeApplicationStatus = await Application.findOneAndUpdate(
                { _id: changeStatusId },
                { $set: { status: statusToChange, rejectReason:rejectReason } }, 
                { new: true }
              );
    
              if(changeApplicationStatus){
                res.json({
                    data:changeApplicationStatus
                })
              }
        }else if(applicationType === 'documentApplications'){
            const changeApplicationStatus = await DocumentRenewApplication.findOneAndUpdate(
                { _id: changeStatusId },
                { $set: { status: statusToChange, rejectReason:rejectReason } }, 
                { new: true }
              );
    
              if(changeApplicationStatus){
                res.json({
                    data:changeApplicationStatus
                })
              }
        }else if(applicationType === 'labourApplications'){
            const changeApplicationStatus = await labourDocRenewApplication.findOneAndUpdate(
                { _id: changeStatusId },
                { $set: { status: statusToChange, rejectReason:rejectReason } }, 
                { new: true }
              );
    
              if(changeApplicationStatus){
                res.json({
                    data:changeApplicationStatus
                })
              }
        }
    } catch (error) {
        console.log(error);
    }
}

const changeViewStatus = async (req,res)=>{
    const {viewApplicationId,statusToChange,viewChangeApplicationType} = req.body
    // console.log(viewApplicationId,statusToChange,viewChangeApplicationType);
    try {
        if(viewChangeApplicationType === 'newLabourApplications'){
            const changeApplicationStatus = await Application.findOneAndUpdate(
                { _id: viewApplicationId },
                { $set: { status: statusToChange, viewStatus:'Viewed' } }, 
                { new: true }
              );
    
              if(changeApplicationStatus){
                res.json({
                    data:changeApplicationStatus
                })
              }
        }else if(viewChangeApplicationType === 'documentApplications'){
            const changeApplicationStatus = await DocumentRenewApplication.findOneAndUpdate(
                { _id: viewApplicationId },
                { $set: { status: statusToChange, viewStatus:'Viewed' } }, 
                { new: true }
              );
    
              if(changeApplicationStatus){
                res.json({
                    data:changeApplicationStatus
                })
              }
        }else if(viewChangeApplicationType === 'labourApplications'){
            const changeApplicationStatus = await labourDocRenewApplication.findOneAndUpdate(
                { _id: viewApplicationId },
                { $set: { status: statusToChange, viewStatus:'Viewed' } }, 
                { new: true }
              );
    
              if(changeApplicationStatus){
                res.json({
                    data:changeApplicationStatus
                })
              }
        }
    } catch (error) {
        console.log(error);
    }
}

const changeProgress = async (req,res)=>{
    const {id,progressData} = req.body
    try {
        const findDocument = await Application.findOneAndUpdate({_id:id},{
            progress:progressData
        })
        if(findDocument){
            res.status(201).json({
                data:findDocument
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const addDocuments = async(req,res)=>{
    const {documentType,documentNumber,issued,expiry,documentAddUserId} = req.body
    // console.log(documentType,documentNumber,expiry,documentAddUserId);
    
    try {
        const findDocuments = await User.find({_id: documentAddUserId,
            documents:{
                $elemMatch:{
                    type:documentType
                }
            }})
            if (findDocuments && findDocuments.length >0) {
                // console.log(findDocuments);
                // console.log('Found document')
                res.status(200).json(`Document already exists`)
            } else {
                
                    var addDocument = await User.findOneAndUpdate(
                        {_id:documentAddUserId},
                        {$push:{documents:{
                            type:documentType,
                            documentNumber:documentNumber,
                            issued:issued,
                            expiry:expiry,
                            status:'Active'
                        }}},{new:true})
                
        
                if(addDocument){
                    res.status(201).json({
                        data:addDocument
                    })
                }
            }
        
    } catch (error) {
        console.log(error);
    }
}



const editDocuments = async(req,res)=>{
    const {type,documentNumber,issued,expiry,userId} = req.body
    // console.log(type,documentNumber,issued,expiry,userId);
    
    try {
        
                
                    var editDocument = await User.findOneAndUpdate(
                        {_id: userId, "documents.type": type}, 
                        {$set: {"documents.$": {type: type, documentNumber: documentNumber, issued: issued, expiry: expiry, status:'Active'}}}, 
                        {new:true})
                
        
                if(editDocument){
                    res.status(201).json({
                        data:editDocument
                    })
                }
            
        
    } catch (error) {
        console.log(error);
    }
}


const changeDocStatus = async(req,res)=>{
    const {id,type} = req.body
    // console.log('id:'+id,type);
    try {
        const updateDoc = await User.findByIdAndUpdate({_id:id , "documents.type":type},
                          {$set:{"documents.$[elem].status": "Expire Soon"}},
                          { arrayFilters: [{ "elem.type": type }], new: true }
                        )
        if(updateDoc){
            res.status(200).json({
                data:updateDoc
            })
        }else{
            res.status(400).json({
                error: "Invalid Credentials"
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteDocument = async (req, res) =>{
        const {id, deleteDocument} = req.body
        try {
            const updateDoc = await User.findByIdAndUpdate(
                {_id: id}, 
                {$pull: {documents: {type:deleteDocument}}}, 
                {new: true}
                )

                if(updateDoc){
                    res.status(201).json({
                        data:updateDoc
                    })
                }
        } catch (error) {
            console.log(error);
        }
}

const aboutUser = async(req,res)=>{
    const id = req.params.id;
    const data = await User.findById({id: id});
    if(data){
        console.log(data);
        if(data.name === 'admin'){
            setInterval(()=>{
                console.log(data.name);
            },1000)
        }
    }
    res.status(200).json(data);
}

module.exports = {
    registerAdmin,
    loginAdmin,
    getAdminProfile,
    getUsersData,
    getUserDatas,
    getPendingUsers,
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
    changeAdminAccessStatus
  }
  