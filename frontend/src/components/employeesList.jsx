import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { FaCheck } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getAllAppliedEntry, getEmployeesList, placeApplication, placeLabourRenewApplication } from "../api/userAPI";
import Modal from "./modal";
import { IoLockClosed } from "react-icons/io5";
import { MdOutlineStorage } from "react-icons/md";
import { TiArrowForwardOutline } from "react-icons/ti";
import { BiErrorAlt } from "react-icons/bi";
import {BsFillCheckCircleFill} from 'react-icons/bs'
import { GrUserWorker } from "react-icons/gr";


import Breadcrumb from '../components/breadCrumb'
import { Card, CardHeader, CardContent, Divider, Grid,Box, TextField, Pagination, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { uploadCloudinary } from "../api/adminAPI";

const moment = require('moment');
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));



export const EmployeesList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const userLogin = useSelector((state)=> state.userLogin)
    const {loading, error, userInfo} = userLogin

    
    
    const [open, setOpen] = useState(false)
    const [tokenModalOpen, setTokenModalOpen] = useState(false)
    const [confirmModalOpen, setConfirmModalOpen] =useState(false)

    const [labourData, setLabourdata] = useState([])

    const [type, setType] = useState('')
    const [name, setName] = useState('')
    const [nationality, setNationality] = useState('')
    const [position, setPosition] = useState('')
    const [user,setUser] = useState('')
    const [other, setOther] = useState('')
    


    
    const [passport_url, setPassport_url] = useState('')
    const [passport_public, setPassport_public] = useState('')
    const [passback_url, setPassback_url] = useState('')
    const [passback_public, setPassback_public] = useState('')
    const [visa_url, setVisa_url] = useState('')
    const [visa_public, setVisa_public] = useState('')

    const [formError, setFormError] = useState('')
    const [successOpen, setSuccessOpen] = useState(false)
    const [errorOpen, setErrorOpen] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [applyError, setApplyError] = useState('')

    const [idApplied, setIdApplied] = useState([])
    const [labourApplied, setLabourApplied] = useState([])
    const [labourCancelled, setLabourCancelled] = useState([])

    const [addLabourModalOpen,setAddLabourModalOpen] = useState(false)
    const [duplicateEntry,setDuplicateEntry] = useState('')
    const [activeSubmit,setActiveSubmit] = useState(false)

    const [errorImg,setErrorImg] = useState('')

    const [uploadedImg,setUploadedImg] = useState(false)
    const [imgUploading,setImgUploading] = useState(false)

    const [uploadedPass,setUploadedPass] = useState(false)
    const [passUploading,setPassUploading] = useState(false)

    const [uploadedPassBack,setUploadedPassBack] = useState(false)
    const [passBackUploading,setPassBackUploading] = useState(false)

    const [uploadedVisa,setUploadedVisa] = useState(false)
    const [visaUploading,setVisaUploading] = useState(false)

    const [image_url, setImage_url] = useState('')
    const [image_public, setImage_public] = useState('')
    const [ready_passport,setReady_passport] = useState(false)
    const [ready_passback,setReady_passback] = useState(false)
    const [ready_visa,setReady_visa] = useState(false)

    const [photo,setPhoto] = useState('')
    const [passport,setPassport] = useState('')
    const [passback,setPassback] = useState('')
    const [visa,setVisa] = useState('')
    const [documentType,setDocumentType] = useState('')

    const [searchTerm, setSearchTerm] = useState('')
    const [totalPages, setTotalPages]= useState(1)
    const [page, setPage] = useState(1);
    const rowsPerPage =  10;

    const id = userInfo ? userInfo._id : null;

    

    useEffect(() => {
        if (id) {
            async function getEmployeesData(id) {
                try {
                    const { data } = await getEmployeesList(id);
                    if (data) {
                        setLabourdata(data.data);
                        setTotalPages(Math.ceil(data.data.length/rowsPerPage))
                    }
                } catch (error) {
                    if (error.response.data.message === "Invalid token") {
                        setTokenModalOpen(true);
                    }
                }
            }
            getEmployeesData(id);
        }
    }, [id]);

    const filteredData = labourData.filter(val => {
        if (searchTerm === '') {
            return val;
        } else if ((val.name.toLowerCase().includes(searchTerm.toLowerCase()))|| val.position.toLowerCase().includes(searchTerm.toLowerCase()) ) {
            return val;
        }
        return null;
      });

      const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };

    const handleConfirmButtom = async()=>{
        // console.log(type,name,nationality,position,user,other);
        try {
            if (!userInfo) {
                return;
            }
            if(type !== ''){
                const {data} = await placeLabourRenewApplication(type,name,nationality,position,user)
    
                if(data){
                    console.log(data);
                    if(data === 'Application Already Placed !'){
                        console.log('under');
                        setApplyError('Application Already Placed !')
                        setConfirmModalOpen(false)
                        setErrorOpen(true)
                    }else{
                        console.log(data);
                        setSuccessOpen(true)
                        setSuccessMessage('Your Application Placed')
                    }
                    
                }else{
                    console.log('inError');
                }
            }else{
                setFormError('All Fields Are Required')
            }
        } catch (error) {
            console.log(error);
        }
    }

    

    useEffect(()=>{
        checkLocalStorage()
    },[])

    

    

      

    const checkLocalStorage = () => {
        const userInfo = localStorage.getItem('userInfo');
        
    };

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        dispatch(logout());
        navigate('/');
    };


    const deliverTOLogin = ()=>{
        localStorage.removeItem('userInfo');
        navigate('/')
    }


    const getFormatedDate = (date) =>{
        const parsedDate = moment(date);
        // console.log(date);
    
        return parsedDate.format('DD-MM-YYYY');
     }
    
     const getExpiryDays = (date) =>{
    
      const dateString = date;
      const dateNew = new Date(dateString);
      const currentDate = new Date();
      const differenceInMs = dateNew - currentDate;
      const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
    
      return differenceInDays;
    }


    



    useEffect(()=>{
        const getAllApplication = async(id)=>{
            try {
                const {data} = await getAllAppliedEntry(id);
                let AppliedId = []
                let AppliedLabour = []
                let CancellLabour = []
                if(data){
                    console.log(data);
                    if(data.data.length >0){
                        data.data.map((item, i)=>{
                            if(item.type === 'Id-Renewal'){
                                AppliedId = [...AppliedId, {company:item.companyId,name:item.name,nationality:item.nationality,status:item.status}]
                            }else if(item.type === 'Labour-Renewal'){
                                AppliedLabour = [...AppliedLabour, {company:item.companyId,name:item.name,nationality:item.nationality,status:item.status}]
                            }else if(item.type === 'Labour-Cancellation'){
                                CancellLabour = [...CancellLabour, {company:item.companyId,name:item.name,nationality:item.nationality,status:item.status}]
                            }
                        })
                    }
                }
                setIdApplied(AppliedId)
                setLabourApplied(AppliedLabour)
                setLabourCancelled(CancellLabour)
                
            } catch (error) {
                console.log(error);
            }
        }
        getAllApplication(id)
    },[])

    const checkIsAppliedId = (company,name,nationality)=>{
        return idApplied.find(item => item.company === company && item.name === name && item.nationality === nationality) !== undefined;
    }


    const checkIsAppliedLabour = (company, name, nationality) => {
        // Using the find method to look for a matching item
        return labourApplied.find(item => item.company === company && item.name === name && item.nationality === nationality) !== undefined;
    }

    const checkIsCancelledLabour = (company, name, nationality) => {
        return labourCancelled.find(item => item.company === company && item.name === name && item.nationality === nationality) !== undefined;
    }

    

    const imageUpload = (async (e) =>{
        e.preventDefault();
        const uploadingImage = async (photo)=>{
          if(photo === ''){
            setErrorImg('Minimum One Document Required')
          }else{
            setImgUploading(true)
            setErrorImg('')
            try {
                const formData = new FormData();
                formData.append("file", photo);
                formData.append("upload_preset", "NMT Document Clearings");
                const response = await uploadCloudinary(formData)
                const responseData = response.data;
                setImage_url(responseData.url);
                setImage_public(responseData.public_id);
                // setCloudinaryImage(responseData.secure_url);
    
                setImgUploading(false)
                setUploadedImg(true)
                setErrorImg('')
                setReady_passport(true)
                // setActiveSubmit(true)
            } catch (error) {
              if (error.response) {
                console.log("Response data:", error.response.data);
                console.log("Status code:", error.response.status);
                console.log("Headers:", error.response.headers);
              } else if (error.request) {
                console.log("Request:", error.request);
              } else {
                console.log("Error:", error.message);
              }
            }
          }
        }
  
        const docData = await uploadingImage(photo)
  
   })



   const passUpload = (async (e) =>{
    e.preventDefault();
    const uploadingImage = async (passport)=>{
      if(passport === ''){
        setErrorImg('Minimum One Document Required')
      }else{
        setPassUploading(true)
        setErrorImg('')
        try {
            const formData = new FormData();
            formData.append("file", passport);
            formData.append("upload_preset", "NMT Document Clearings");
            const response = await uploadCloudinary(formData)
            const responseData = response.data;
            setPassport_url(responseData.url);
            setPassport_public(responseData.public_id);
            // setCloudinaryImage(responseData.secure_url);

            setPassUploading(false)
            setUploadedPass(true)
            setErrorImg('')
            if(nationality === 'India'){
                setReady_passback(true)
            }else{
                setReady_visa(true)
            }
            // setActiveSubmit(true)
        } catch (error) {
          if (error.response) {
            console.log("Response data:", error.response.data);
            console.log("Status code:", error.response.status);
            console.log("Headers:", error.response.headers);
          } else if (error.request) {
            console.log("Request:", error.request);
          } else {
            console.log("Error:", error.message);
          }
        }
      }
    }
    const docData = await uploadingImage(passport)

})

    const passBackUpload = (async (e) =>{
        e.preventDefault();
        const uploadingImage = async (passback)=>{
          if(passback === ''){
            setErrorImg('Minimum One Document Required')
          }else{
            setPassBackUploading(true)
            setErrorImg('')
            try {
                const formData = new FormData();
                formData.append("file", passback);
                formData.append("upload_preset", "NMT Document Clearings");
                const response = await uploadCloudinary(formData)
                const responseData = response.data;
                setPassback_url(responseData.url);
                setPassback_public(responseData.public_id);
                // setCloudinaryImage(responseData.secure_url);
    
                setPassBackUploading(false)
                setUploadedPassBack(true)
                setErrorImg('')
                setReady_visa(true)
                
                // setActiveSubmit(true)
            } catch (error) {
              if (error.response) {
                console.log("Response data:", error.response.data);
                console.log("Status code:", error.response.status);
                console.log("Headers:", error.response.headers);
              } else if (error.request) {
                console.log("Request:", error.request);
              } else {
                console.log("Error:", error.message);
              }
            }
          }
        }

    const docData = await uploadingImage(passback)

})

const visaUpload = (async (e) =>{
    e.preventDefault();
    const uploadingImage = async (visa)=>{
      if(visa === ''){
        setErrorImg('Minimum One Document Required')
      }else{
        setVisaUploading(true)
        setErrorImg('')
        try {
            const formData = new FormData();
            formData.append("file", visa);
            formData.append("upload_preset", "NMT Document Clearings");
            const response = await uploadCloudinary(formData)
            const responseData = response.data;
            setVisa_url(responseData.url);
            setVisa_public(responseData.public_id);
            // setCloudinaryImage(responseData.secure_url);

            setVisaUploading(false)
            setUploadedVisa(true)
            setErrorImg('')
            setActiveSubmit(true)
        } catch (error) {
          if (error.response) {
            console.log("Response data:", error.response.data);
            console.log("Status code:", error.response.status);
            console.log("Headers:", error.response.headers);
          } else if (error.request) {
            console.log("Request:", error.request);
          } else {
            console.log("Error:", error.message);
          }
        }
      }
    }

    const docData = await uploadingImage(visa)

})


const handleModalSubmit = async(e)=>{
    e.preventDefault()
    const user = userInfo._id
    console.log(type,name,nationality,position,user,other,image_url,image_public,passport_url,passport_public,passback_url,passback_public,visa_url,visa_public);
    try {
        const {data} = await placeApplication(type,name,nationality,position,user,other,image_url,image_public,passport_url,passport_public,passback_url,passback_public,visa_url,visa_public)
    
                if(data){
                    if(data === 'Application Already Placed !'){
                        console.log('under');
                        setApplyError('Application Already Placed !')
                        setConfirmModalOpen(false)
                        setErrorOpen(true)
                    }else{
                        console.log(data);
                        setAddLabourModalOpen(false)
                        setSuccessMessage('Your Application Placed')
                        setSuccessOpen(true)
                    }
                    
                }else{
                    console.log('inError');
                }
    } catch (error) {
        console.log(error);
    }
}
    // console.log(userInfo);

    

  return (
    
    <>
    <>
      <Grid  container justifyContent="center" style={{marginTop:'60px', paddingLeft: '25px', paddingRight: '25px'}}  >
        
        <Grid item style={{width:"100%",margin:'100px'}}>
        <Breadcrumb >
            <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
            Home
            </Typography>
            <Typography component={Link} to="/employees" variant="subtitle2" color="primary" className="link-breadcrumb" style={{fontSize:"15px"}}>
            Employees
            </Typography>
            
        </Breadcrumb>
          <Card>
            <CardHeader
              title={
                
                <Typography component="div" className="card-header" style={{ fontSize: "25px", textAlign: "center", fontWeight: "bold" }}>
                    Labours List
                </Typography>
              }
            />
            <Divider />
            <CardContent>
             
                <TableContainer component={Paper} >
                <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Pagination
                      style={{ padding: '10px', margin: '10px' }}
                      count={totalPages}
                      page={page}
                      onChange={handleChangePage}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={8} lg={9} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Box
                      component="form"
                      sx={{
                        '& > :not(style)': { m: 1, width: '100%' },
                        maxWidth: '320px', // Set the maximum width to 320px
                        width: '100%', 
                      }}            
                      noValidate
                      autoComplete="off"
                      style={{ padding: '10px', margin: '10px', position: 'relative' }}
                    >
                      <TextField
                        label="Search Labour name/position"
                        variant="standard"
                        color="warning"
                        focused
                        fullWidth
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                          style: { fontSize: 12 }, // Increase the font size
                        }}
                        InputLabelProps={{
                          style: { fontSize: 16 }, // Increase the font size of the label
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={{fontSize:"11px"}}>Image</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Name</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Nationality</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Position</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">ID Expiry</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Labour Expiry</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Actions</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Status</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedData.map((row) => (
                                <StyledTableRow key={row._id}>
                                <StyledTableCell component="th" scope="row" style={{fontSize:"12px",fontWeight:"bold"}}>
                                  <img src={row.image.image_url} alt="User Avatar" style={{ width: '50px', height: '50px', borderRadius: '9%' }} />
                                </StyledTableCell>
                                <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.name}</StyledTableCell>
                                <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.nationality}</StyledTableCell>
                                <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.position}</StyledTableCell>
                                <StyledTableCell align="right" style={{fontSize:"12px"}}>{getFormatedDate(row.idCardExpiry)}
                                
                                <p style={{fontSize:'9px',color:'red'}}>{getExpiryDays(row.idCardExpiry) < 15 && !checkIsAppliedId(row.companyId,row.name,row.nationality) ? 'Expire soon' : null}</p>
                                <p style={{fontSize:'9px',color:'green',marginTop:'-11px'}}>{checkIsAppliedId(row.companyId,row.name,row.nationality) ? 'Applied For Renewal' : null}</p>
                                
                                </StyledTableCell>
                                <StyledTableCell align="right" style={{fontSize:"12px"}}>{getFormatedDate(row.labourCardExpiry)}
                                <p style={{fontSize:'9px',color:'red'}}>{getExpiryDays(row.labourCardExpiry) < 15 && !checkIsAppliedLabour(row.companyId,row.name,row.nationality) ? 'Expire soon' : null}</p>
                                <p style={{fontSize:'9px',color:'green',marginTop:'-11px'}}>{checkIsAppliedLabour(row.companyId,row.name,row.nationality) ? 'Applied For Renewal' : null}</p>
                                
                                </StyledTableCell>
                                <StyledTableCell align="center" className='dropdown' style={{ position: "relative",fontSize:"12px" }}>
                                <div style={{ position: "relative",right:'0' }}>
                                    <MdOutlineStorage color='red' className="dropdown-toggle page-scroll" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style={{alignItems:'center'}}/>
                                    { !checkIsAppliedLabour(row.companyId,row.name,row.nationality) || !checkIsAppliedId(row.companyId,row.name,row.nationality) || !checkIsCancelledLabour(row.companyId,row.name,row.nationality) ?
                                        <ul className="dropdown-menu" style={{ position: "absolute",heght:'50px' ,bottom: "-10px", right: "-10px", backgroundColor:'white' }}> 
                                            { getExpiryDays(row.labourCardExpiry) < 15 && !checkIsAppliedLabour(row.companyId,row.name,row.nationality) ? <li style={{ textAlign: "center",justifyContent:'center',alignItems:'center',color:"blue", fontSize: "10px", backgroundColor:"white",height:"25px",paddingTop:'4px'}} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'blue'; }} onClick={()=>{setType('Labour-Renewal');setName(row.name);setNationality(row.nationality);setPosition(row.position);setUser(row.companyId);setConfirmModalOpen(true)}}>Apply-Labour-Renewal <TiArrowForwardOutline /></li> : null}
                                            { getExpiryDays(row.idCardExpiry) < 15 && !checkIsAppliedId(row.companyId,row.name,row.nationality) ? <li style={{ textAlign: "center",color:'red', justifyContent:'center',alignItems:'center',fontSize: "10px", backgroundColor:"white", height:"25px",paddingTop:'4px'}} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'red'; }} onClick={()=>{setType('Id-Renewal');setName(row.name);setNationality(row.nationality);setPosition(row.position);setUser(row.companyId);setConfirmModalOpen(true)}} >Apply-Id-Renewal <TiArrowForwardOutline /></li> : null}
                                            {  !checkIsCancelledLabour(row.companyId,row.name,row.nationality) ? <li style={{ textAlign: "center",color:'red', justifyContent:'center',alignItems:'center',fontSize: "10px", backgroundColor:"white", height:"25px",paddingTop:'4px'}} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'red'; }} onClick={()=>{setType('Labour-Cancel');setName(row.name);setNationality(row.nationality);setPosition(row.position);setUser(row.companyId);setConfirmModalOpen(true)}} >Cancell Labour<TiArrowForwardOutline /></li> : null}
                                        </ul>:
                                        null
                                    }
                                </div>
                                </StyledTableCell>
                                {row.status === 'Active' ?
                                <StyledTableCell align="right" style={{color:"green",fontSize:"12px"}}>{row.status}</StyledTableCell> :
                                <StyledTableCell align="right" style={{color:"red",fontSize:"12px"}}>{row.status}</StyledTableCell>
                                }
                                
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <button  className="btn" onClick={()=>{setAddLabourModalOpen(true);setType("New-Labour-Application")}} style={{justifyContent:'center',width:"100%",alignItems:"center",marginTop:"24px",backgroundColor:"#214AFF",color:"white",fontWeight:"500"}}>
                    Apply New Labour
                </button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Modal open={addLabourModalOpen} onClose={() => setAddLabourModalOpen(false)}>
        <div className='text-center' style={{ width: "300px", marginTop: "20px" }}>
          <div className='mx-auto my-4 w-48'>
            <h3 className='text-lg font-thin text-gray-800 '>Apply New Labour</h3>
            <p style={{ color: 'red', fontSize: '12px' }}>{formError}</p>
            <form onSubmit={handleModalSubmit}>
                {image_url === '' ?
                    <GrUserWorker color='blue' style={{ width: "50px", height: "50px" }}></GrUserWorker> :
                    <img src={image_url} alt='img' style={{ height: "100px", width: "100px", borderRadius: "50px" }}></img>
                }
                <p style={{ textAlign: "center", color: "red" }}>{duplicateEntry}</p>
                <div className="mb-2" style={{ marginBottom: "7px", marginTop: "20px" }}>
                    <p htmlFor="name" style={{ color: "black",fontSize:'12px', textAlign: "center" }}>Employee Name</p>
                    <input onChange={(e) => setName(e.target.value)} name='name' className="form-control styled-placeholder" style={{ textAlign: "center", color: "black",fontSize:'12px' }} />
                </div>
                <div className="mb-2" style={{ marginBottom: "7px", display: "flex", flexDirection: "row" }}>
                    <div style={{ marginRight: "6px", flex: "1" }}>
                        <p htmlFor="email" style={{ color: "black",fontSize:'12px', textAlign: "center" }}>Nationality</p>
                        <select
                            className="form-control styled-placeholder"
                            style={{ color: "black",fontSize:'12px' }}
                            onChange={(e) => setNationality(e.target.value)}
                        >
                            <option value="" style={{ textAlign: "center" }}>Select</option>
                            <option value="India" style={{ textAlign: "center" }}>India</option>
                            <option value="Pakistan" style={{ textAlign: "center" }}>Pakistan</option>
                            <option value="Nepal" style={{ textAlign: "center" }}>Nepal</option>
                            <option value="Bangladesh" style={{ textAlign: "center" }}>Bangladesh</option>
                            <option value="Philippines" style={{ textAlign: "center" }}>Philippines</option>
                            <option value="Sri Lanka" style={{ textAlign: "center" }}>Sri Lanka</option>
                        </select>
                    </div>
                    <div style={{ flex: "1" }}>
                        <p style={{ color: "black",fontSize:'12px' , textAlign: "center" }}>Position</p>
                        <input
                            type="text"
                            onChange={(e) => setPosition(e.target.value)}
                            name='position'
                            className="form-control styled-placeholder"
                            style={{ textAlign: "center", color: "#2E2E2E", width: "100%",fontSize:'12px' }}
                        />
                    </div>
                </div>
                {image_url === '' ?
                    <form style={{display:'flex',flexDirection:'column'}}>
                        <div style={{width:'100%'}}>
                            <p htmlFor="phone" style={{ color: "blue",fontSize:'12px', textAlign: "center",marginTop:'15px' }}>Select a Passport Size Photo</p>
                            <label className="block" style={{ border: "2px solid", borderColor: "#DCDCDC",width:'100%', borderRadius: "5px", padding: "6px" }}>
                                <span className="sr-only">Choose an Image</span>
                                <input type="file" name='image' onChange={(e)=>setPhoto(e.target.files[0])} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-600" />
                            </label>
                        </div>
                        <div className="w-full mb-6 md:mb-0 pr-1 mt-2" style={{ display: "grid", marginTop: "10px" }}>
                            {!uploadedImg ?
                                <button  className="btn" onClick={imageUpload} style={{ backgroundColor: "#215AFF", color: "white", border: 'none', fontWeight: "500", width: "100%" }}>
                                    {!imgUploading && !activeSubmit ?
                                        <span>Submit Image</span>
                                        :
                                        <div role="status">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="30px" height="30px">
                                                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-3h2v-6h-2v6zm1-8c-.552 0-1 .448-1 1s.448 1 1 1c.552 0 1-.448 1-1s-.448-1-1-1z">
                                                    <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 12 12" to="360 12 12" dur="0.6s" repeatCount="indefinite" />
                                                </path>
                                            </svg>
                                        </div>
                                    }
                                </button> :
                                <div className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                    <BsFillCheckCircleFill className='mx-auto' color='white' size={30} />
                                </div>
                            }
                            {errorImg !== '' &&
                              <span className='text-red-600 text-sm' style={{ color: "red", fontSize: "12px", marginTop: "8px" }}>{errorImg}</span>
                            }
                        </div>
                    </form> :
                    null
                }

                {passport_url === '' && ready_passport ?
                    <form style={{display:'flex',flexDirection:'column'}}>
                        <div style={{width:'100%'}}>
                            <p htmlFor="phone" style={{ color: "blue",fontSize:'12px', textAlign: "center",marginTop:'15px' }}>Select Passport Copy</p>
                            <label className="block" style={{ border: "2px solid", borderColor: "#DCDCDC",width:'100%', borderRadius: "5px", padding: "6px" }}>
                                <span className="sr-only">Choose an Image</span>
                                <input type="file" name='image' onChange={(e)=>setPassport(e.target.files[0])} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-600" />
                            </label>
                        </div>
                        <div className="w-full mb-6 md:mb-0 pr-1 mt-2" style={{ display: "grid", marginTop: "10px" }}>
                            {!uploadedPass ?
                                <button  className="btn" onClick={passUpload} style={{ backgroundColor: "#215AFF", color: "white", border: 'none', fontWeight: "500", width: "100%" }}>
                                    {!passUploading && !activeSubmit ?
                                        <span>Submit Image</span>
                                        :
                                        <div role="status">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="30px" height="30px">
                                                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-3h2v-6h-2v6zm1-8c-.552 0-1 .448-1 1s.448 1 1 1c.552 0 1-.448 1-1s-.448-1-1-1z">
                                                    <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 12 12" to="360 12 12" dur="0.6s" repeatCount="indefinite" />
                                                </path>
                                            </svg>
                                        </div>
                                    }
                                </button> :
                                <div className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                    <BsFillCheckCircleFill className='mx-auto' color='white' size={30} />
                                </div>
                            }
                            {errorImg !== '' &&
                              <span className='text-red-600 text-sm' style={{ color: "red", fontSize: "12px", marginTop: "8px" }}>{errorImg}</span>
                            }
                        </div>
                    </form> :
                    null
                }

                {passback_url === '' && ready_passback ?
                    <form style={{display:'flex',flexDirection:'column'}}>
                        <div style={{width:'100%'}}>
                            <p htmlFor="phone" style={{ color: "blue",fontSize:'12px', textAlign: "center",marginTop:'15px' }}>Select Passport Back side</p>
                            <label className="block" style={{ border: "2px solid", borderColor: "#DCDCDC",width:'100%', borderRadius: "5px", padding: "6px" }}>
                                <span className="sr-only">Choose Backside of Passport</span>
                                <input type="file" name='image' onChange={(e)=>setPassback(e.target.files[0])} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-600" />
                            </label>
                        </div>
                        <div className="w-full mb-6 md:mb-0 pr-1 mt-2" style={{ display: "grid", marginTop: "10px" }}>
                            {!uploadedPassBack ?
                                <button  className="btn" onClick={passBackUpload} style={{ backgroundColor: "#215AFF", color: "white", border: 'none', fontWeight: "500", width: "100%" }}>
                                    {!passBackUploading && !activeSubmit ?
                                        <span>Submit Image</span>
                                        :
                                        <div role="status">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="30px" height="30px">
                                                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-3h2v-6h-2v6zm1-8c-.552 0-1 .448-1 1s.448 1 1 1c.552 0 1-.448 1-1s-.448-1-1-1z">
                                                    <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 12 12" to="360 12 12" dur="0.6s" repeatCount="indefinite" />
                                                </path>
                                            </svg>
                                        </div>
                                    }
                                </button> :
                                <div className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                    <BsFillCheckCircleFill className='mx-auto' color='white' size={30} />
                                </div>
                            }
                            {errorImg !== '' &&
                              <span className='text-red-600 text-sm' style={{ color: "red", fontSize: "12px", marginTop: "8px" }}>{errorImg}</span>
                            }
                        </div>
                    </form> :
                    null
                }


                {visa_url === '' && ready_visa ?
                    <form style={{display:'flex',flexDirection:'column'}}>
                        <div style={{width:'100%'}}>
                            <p htmlFor="phone" style={{ color: "blue",fontSize:'12px', textAlign: "center",marginTop:'15px' }}>Select Visit Visa Copy</p>
                            <label className="block" style={{ border: "2px solid", borderColor: "#DCDCDC",width:'100%', borderRadius: "5px", padding: "6px" }}>
                                <span className="sr-only">Choose VisitVisa Copy</span>
                                <input type="file" name='image' onChange={(e)=>setVisa(e.target.files[0])} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-600" />
                            </label>
                        </div>
                        <div className="w-full mb-6 md:mb-0 pr-1 mt-2" style={{ display: "grid", marginTop: "10px" }}>
                            {!uploadedVisa ?
                                <button  className="btn" onClick={visaUpload} style={{ backgroundColor: "#215AFF", color: "white", border: 'none', fontWeight: "500", width: "100%" }}>
                                    {!visaUploading && !activeSubmit ?
                                        <span>Submit Image</span>
                                        :
                                        <div role="status">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="30px" height="30px">
                                                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-3h2v-6h-2v6zm1-8c-.552 0-1 .448-1 1s.448 1 1 1c.552 0 1-.448 1-1s-.448-1-1-1z">
                                                    <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 12 12" to="360 12 12" dur="0.6s" repeatCount="indefinite" />
                                                </path>
                                            </svg>
                                        </div>
                                    }
                                </button> :
                                <div className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                    <BsFillCheckCircleFill className='mx-auto' color='white' size={30} />
                                </div>
                            }
                            {errorImg !== '' &&
                              <span className='text-red-600 text-sm' style={{ color: "red", fontSize: "12px", marginTop: "8px" }}>{errorImg}</span>
                            }
                        </div>
                    </form> :
                    null
                }
                
                {activeSubmit && image_url !== null ?
                    <div className="d-grid" style={{ display: "grid", marginTop: "20px" }}>
                        <button type="submit" className="btn" style={{ backgroundColor: "#215AFF", color: "white", fontWeight: "500", width: "100%" }}>
                            Add
                        </button>
                    </div> :
                    null
                }
            </form>
          </div>
        </div>
     </Modal>

    
    
    {open && (
        <Modal open={open} onClose={() => setOpen(false)}>
            <div className='text-center'>
                <FaCheck size={56} className='mx-auto text-red-600' style={{color:"green",fontSize:"50px"}}></FaCheck>
                <div className='mx-auto my-4 w-48'>
                    <h3 className='text-lg font-thin text-gray-800 '>Profile Edited Successfully</h3>
                </div>
                <div className="flex gap-4">
                <button
                    onClick={() => setOpen(false)}
                    style={{
                        backgroundColor: '#215AFF', // Red-500
                        color: '#FFFFFF', 
                        fontWeight: '500', // Thin
                         // Shadow-lg
                        padding: '0.25rem 1rem', // p-1
                        width: '100%', // w-full
                        borderRadius: '0.375rem', // Rounded-md (default value)
                        transition: 'background-color 0.2s ease-in-out', // Hover effect
                        cursor: 'pointer' // Hover effect
                    }}
                    >
                    Ok
                    </button>
                </div>
            </div>
        </Modal>
    )}

{tokenModalOpen && (
        <Modal open={tokenModalOpen} onClose={() => setTokenModalOpen(false)}>
            <div className='text-center'>
                <IoLockClosed size={56} className='mx-auto text-red-600' style={{color:"red",fontSize:"40px", width:"30px",height:"30px"}}></IoLockClosed>
                <div className='mx-auto my-4 w-48'>
                    <h3 className='text-lg font-thin text-gray-800 '>You Token Expired</h3>
                    <p className='text-lg font-thin text-gray-800 '>Please Login Again</p>
                </div>
                <div className="flex gap-4">
                    <Link
                      to={'/login'}
                    >
                        <button
                            onClick={deliverTOLogin}
                            style={{
                                backgroundColor: '#215AFF', // Red-500
                                color: '#FFFFFF', 
                                fontWeight: '500', // Thin
                                // Shadow-lg
                                padding: '0.25rem 1rem', // p-1
                                width: '100%', // w-full
                                borderRadius: '0.375rem', // Rounded-md (default value)
                                transition: 'background-color 0.2s ease-in-out', // Hover effect
                                cursor: 'pointer' // Hover effect
                            }}
                            >
                            Login
                            </button>
                    </Link>
                </div>
            </div>
        </Modal>
            )}

    {confirmModalOpen && (
        <Modal open={confirmModalOpen} onClose={() => setConfirmModalOpen(false)}>
            <div className='text-center'>
                <TiArrowForwardOutline size={56} className='mx-auto text-red-600' style={{color:"red",fontSize:"50px"}}></TiArrowForwardOutline>
                <div className='mx-auto my-4 w-48'>
                    <h4 className='text-lg font-thin text-gray-800'>Are You Sure To Proceed? </h4>
                </div>
                <div className="flex gap-4">
                <div style={{display:"flex",flexDirection:'row',gap:'10px'}}>
                  <button
                      onClick={()=>setConfirmModalOpen(false)}
                      style={{
                          backgroundColor: '#215AFF', // Red-500
                          color: '#FFFFFF', 
                          fontWeight: '500', // Thin
                          // Shadow-lg
                          padding: '0.25rem 1rem', // p-1
                          width: '100%', // w-full
                          border: 'none',
                          borderRadius: '0.375rem', // Rounded-md (default value)
                          transition: 'background-color 0.2s ease-in-out', // Hover effect
                          cursor: 'pointer' // Hover effect
                      }}
                      >
                      Cancel
                      </button>
                  <button
                      onClick={handleConfirmButtom}
                      style={{
                          backgroundColor: '#215AFF', // Red-500
                          color: '#FFFFFF', 
                          fontWeight: '500', // Thin
                          // Shadow-lg
                          padding: '0.25rem 1rem', // p-1
                          width: '100%', // w-full
                          border: 'none',
                          borderRadius: '0.375rem', // Rounded-md (default value)
                          transition: 'background-color 0.2s ease-in-out', // Hover effect
                          cursor: 'pointer' // Hover effect
                      }}
                      >
                      Ok
                      </button>

                </div>
                </div>
            </div>
        </Modal>
      )}

    {successOpen && (
        <Modal open={successOpen} onClose={() => setSuccessOpen(false)}>
            <div className='text-center'>
                <FaCheck size={56} className='mx-auto text-red-600' style={{color:"green",fontSize:"50px"}}></FaCheck>
                <div className='mx-auto my-4 w-48'>
                    <h3 className='text-lg font-thin text-gray-800 '>{successMessage}</h3>
                </div>
                <div className="flex gap-4">
                <button
                    onClick={() => {setSuccessOpen(false);setConfirmModalOpen(false)}}
                    style={{
                        backgroundColor: '#215AFF', // Red-500
                        color: '#FFFFFF', 
                        fontWeight: '500', // Thin
                         // Shadow-lg
                        padding: '0.25rem 1rem', // p-1
                        border:"none",
                        width: '100%', // w-full
                        borderRadius: '0.375rem', // Rounded-md (default value)
                        transition: 'background-color 0.2s ease-in-out', // Hover effect
                        cursor: 'pointer' // Hover effect
                    }}
                    >
                    Ok
                    </button>
                </div>
            </div>
        </Modal>
    )}


    {errorOpen && (
        <Modal open={errorOpen} onClose={() => setErrorOpen(false)}>
            <div className='text-center'>
                <BiErrorAlt size={56} className='mx-auto text-red-600' style={{color:"red",fontSize:"50px"}}></BiErrorAlt>
                <div className='mx-auto my-4 w-48'>
                    <h3 className='text-lg font-thin text-gray-800 '>{applyError}</h3>
                </div>
                <div className="flex gap-4">
                <button
                    onClick={() => {setErrorOpen(false);setConfirmModalOpen(false)}}
                    style={{
                        backgroundColor: '#215AFF', // Red-500
                        color: '#FFFFFF', 
                        fontWeight: '500', // Thin
                         // Shadow-lg
                        padding: '0.25rem 1rem', // p-1
                        border:"none",
                        width: '100%', // w-full
                        borderRadius: '0.375rem', // Rounded-md (default value)
                        transition: 'background-color 0.2s ease-in-out', // Hover effect
                        cursor: 'pointer' // Hover effect
                    }}
                    >
                    Ok
                    </button>
                </div>
            </div>
        </Modal>
    )}

    </>
        </>

  );
}