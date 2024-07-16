import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getAllAppliedEntry, getProfileDatas, placeDocRenewApply } from "../api/userAPI";
import Modal from "./modal";
import { IoLockClosed } from "react-icons/io5";
import { MdOutlineStorage } from "react-icons/md";
import { TiArrowForwardOutline } from "react-icons/ti";
import { BiErrorAlt } from "react-icons/bi";

import Breadcrumb from '../components/breadCrumb'
import { Card, CardHeader, CardContent, Divider, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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



export const DocumentsList = () => {
    const navigate = useNavigate()
    const userLogin = useSelector((state)=> state.userLogin)
    const {loading, error, userInfo} = userLogin

    
    
    const [open, setOpen] = useState(false)
    const [tokenModalOpen, setTokenModalOpen] = useState(false)
    const [confirmModalOpen, setConfirmModalOpen] =useState(false)
    const [documentsData,setDocumentsData] = useState([])

    const [name, setName] = useState('')
    const [user,setUser] = useState('')
    const [formError, setFormError] = useState('')
    const [successOpen, setSuccessOpen] = useState(false)
    const [errorOpen, setErrorOpen] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [applyError, setApplyError] = useState('')

    const [idApplied, setIdApplied] = useState([])
    const [labourApplied, setLabourApplied] = useState([])
    const [labourCancelled, setLabourCancelled] = useState([])
    const [TenancyRenewal, setTenancyRenewal] = useState([])
    const [LicenseRenewal,setLicenseRenewal] = useState([])
    const [CivilRenewal,setCivilRenewal] = useState([])
    const [ChamberRenewal,setChamberRenewal] = useState([])
    const [documentType,setDocumentType] = useState('')
    const [edited,setEdited] = useState(true)

    

    const id = userInfo ? userInfo._id : null;

    

    useEffect(()=>{
        if (id) {
            async function getEmployeesData(id){
                try {
                    const {data} = await getProfileDatas(id)
                    if(data){
                        // console.log(data);
                        setDocumentsData(data.user)
                    }else{
                        // console.log("here");
                    }
                } catch (error) {
                    if(error.response.data.message === "Invalid token"){
                        console.log("sdgvjajavjahc");
                        setTokenModalOpen(true)
                    }
                }

            }
            getEmployeesData(id)
        }

    },[edited])


    
    const handleConfirmButtom = async()=>{
        console.log(documentType,name,user);
        try {
            if(documentType !== ''){
                const {data} = await placeDocRenewApply(documentType,name,user)
    
                if(data){
                    console.log(data);
                    if(data === 'Application Already Placed !'){
                        console.log('under');
                        setApplyError('Application Already Placed !')
                        setConfirmModalOpen(false)
                        setErrorOpen(true)
                    }else{
                        setEdited(!edited)
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

    const deliverTOLogin = ()=>{
        localStorage.removeItem('userInfo');
        navigate('/login')
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
                let LicenseRenewal = []
                let TenancyRenewal = []
                let CivilRenewal = []
                let ChamberRenewal = []
                if(data){
                    // console.log(data);
                    if(data.data.length >0){
                        data.data.map((item, i)=>{
                            if(item.type === 'Id-Renewal'){
                                AppliedId = [...AppliedId, {company:item.companyId,name:item.name,nationality:item.nationality,status:item.status}]
                            }else if(item.type === 'Labour-Renewal'){
                                AppliedLabour = [...AppliedLabour, {company:item.companyId,name:item.name,nationality:item.nationality,status:item.status}]
                            }else if(item.type === 'Labour-Cancellation'){
                                CancellLabour = [...CancellLabour, {company:item.companyId,name:item.name,nationality:item.nationality,status:item.status}]
                            }else if(item.type === 'License-Renewal'){
                                LicenseRenewal = [...LicenseRenewal, {company:item.companyId,name:item.name,status:item.status}]
                            }else if(item.type === 'Tenancy-Renewal'){
                                TenancyRenewal = [...TenancyRenewal, {company:item.companyId,name:item.name,status:item.status}]
                            }else if(item.type === 'Civil-Renewal'){
                                CivilRenewal = [...CivilRenewal, {company:item.companyId,name:item.name,status:item.status}]
                            }else if(item.type === 'Chamber-Renewal'){
                                ChamberRenewal = [...ChamberRenewal, {company:item.companyId,name:item.name,status:item.status}]
                            }
                        })
                    }
                    
                }
                setIdApplied(AppliedId)
                setLabourApplied(AppliedLabour)
                setLabourCancelled(CancellLabour)
                setTenancyRenewal(TenancyRenewal)
                setLicenseRenewal(LicenseRenewal)
                setCivilRenewal(CivilRenewal)
                setChamberRenewal(ChamberRenewal)
                
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
        return labourApplied.find(item => item.company === company && item.name === name && item.nationality === nationality) !== undefined;
    }

    

    const checkIsCancelledLabour = (company, name, nationality) => {
        return labourCancelled.find(item => item.company === company && item.name === name && item.nationality === nationality) !== undefined;
    }

 
  return (
    <>
      
      <Grid container justifyContent="center" style={{marginTop:'60px', paddingLeft: '25px', paddingRight: '25px'}} >
        
        <Grid item style={{width:"100%",margin:'100px'}}>
        <Breadcrumb >
            <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
            Home
            </Typography>
            <Typography component={Link} to="/employees" variant="subtitle2" color="primary" className="link-breadcrumb" style={{fontSize:"15px"}}>
            Documents
            </Typography>
            
        </Breadcrumb>
          <Card>
            <CardHeader
              title={
                
                <Typography component="div" className="card-header" style={{ fontSize: "25px", textAlign: "center", fontWeight: "bold" }}>
                    Documents List
                </Typography>
              }
            />
            <Divider />
            <CardContent>
             
                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">S.No</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Document</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Doc. Number</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Issued On</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Expiry</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Actions</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Status</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {documentsData && documentsData.documents && documentsData.documents.map((row,index) => (
                                <StyledTableRow key={row._id}>
                                <StyledTableCell align="right" style={{fontSize:"12px"}}>{index+1}</StyledTableCell>
                                <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.type}</StyledTableCell>
                                <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.documentNumber}</StyledTableCell>
                                <StyledTableCell align="right" style={{fontSize:"12px"}}>{getFormatedDate(row.issued)}
                                
                                        <p style={{fontSize:'9px',color:'red'}}>{getExpiryDays(row.idCardExpiry) < 15 && !checkIsAppliedId(row.companyId,row.name,row.nationality) ? 'Expire soon' : null}</p>
                                        <p style={{fontSize:'9px',color:'green',marginTop:'-11px'}}>{checkIsAppliedId(row.companyId,row.name,row.nationality) ? 'Applied For Renewal' : null}</p>
                                
                                </StyledTableCell>
                                <StyledTableCell align="right" style={{fontSize:"12px"}}>{getFormatedDate(row.expiry)}
                                    <p style={{fontSize:'9px',color:'red'}}>{getExpiryDays(row.labourCardExpiry) < 15 && !checkIsAppliedLabour(row.companyId,row.name,row.nationality) ? 'Expire soon' : null}</p>
                                    <p style={{fontSize:'9px',color:'green',marginTop:'-11px'}}>{checkIsAppliedLabour(row.companyId,row.name,row.nationality) ? 'Applied For Renewal' : null}</p>
                                
                                </StyledTableCell>
                                <StyledTableCell align="center" className='dropdown' style={{ position: "relative",fontSize:"12px" }}>
                                  <div style={{ position: "relative",right:'0' }}>
                                    <MdOutlineStorage color='red' className="dropdown-toggle page-scroll" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style={{alignItems:'center'}}/>
                                    { !checkIsAppliedLabour(row.companyId,row.name,row.nationality) || !checkIsAppliedId(row.companyId,row.name,row.nationality) || !checkIsCancelledLabour(row.companyId,row.name,row.nationality) ?
                                        <ul className="dropdown-menu" style={{ position: "absolute",heght:'50px' ,bottom: "-10px", right: "-10px", backgroundColor:'white' }}> 
                                            { row.status === 'Active' && <li style={{ textAlign: "center",justifyContent:'center',alignItems:'center',color:"blue", fontSize: "10px", backgroundColor:"white",height:"25px",paddingTop:'4px'}} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'blue'; }} >No Action Required <TiArrowForwardOutline /></li>}
                                            { row.status === 'Applied for renewal' && <li style={{ textAlign: "center",justifyContent:'center',alignItems:'center',color:"blue", fontSize: "10px", backgroundColor:"white",height:"25px",paddingTop:'4px'}} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'blue'; }} >No Action Required <TiArrowForwardOutline /></li>}
                                            { row.status === 'Expire Soon'  ? <li style={{ textAlign: "center",justifyContent:'center',alignItems:'center',color:"blue", fontSize: "10px", backgroundColor:"white",height:"25px",paddingTop:'4px'}} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'blue'; }} onClick={()=>{setDocumentType(row.type); setName(documentsData.fullname);setUser(documentsData._id);setConfirmModalOpen(true)}}>Apply for Renewal<TiArrowForwardOutline /></li> : null}
                                        </ul>:
                                        null
                                    }
                                  </div>
                                </StyledTableCell>
                                        {row.status === 'Active' &&
                                            <StyledTableCell align="right" style={{color:"green",fontSize:"12px"}}>{row.status}</StyledTableCell> 
                                        }
                                        {row.status === 'Applied for renewal' &&
                                            <StyledTableCell align="right" style={{color:"blue",fontSize:"12px"}}>{row.status}</StyledTableCell> 
                                        }

                                        {row.status === 'Expire Soon' &&
                                            <StyledTableCell align="right" style={{color:"red",fontSize:"10px"}}>{row.status}</StyledTableCell> 
                                        }
                                        

                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

     
    
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
                    <h3 className='text-lg font-thin text-gray-800 '>Your Token Expired</h3>
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
  );
}