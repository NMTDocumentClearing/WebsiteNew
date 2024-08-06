import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import { SiOpenaccess } from "react-icons/si";
import { RiImageEditLine } from "react-icons/ri";


import { Card, CardHeader, CardContent, Divider, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

// project import
import Breadcrumb from '../../components/adminComponents/Breadcrumb';
import { gridSpacing } from '../../config';
import { ChangeAdminAccessStatus, changeDocumentStatus, getNewUserDatas } from '../../api/adminAPI';
import Modal from '../../components/modal';
import { IoLockClosed } from "react-icons/io5";


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


  // const moment = require('moment');

// ==============================|| SAMPLE PAGE ||============================== //

const DocumentsPage = () => {
  
  const [userData,setUserData] = useState([])
  const [duplicateEntry,setDuplicateEntry] = useState('')
  const [successOpen,setSuccessOpen] = useState(false);
  const [deleteOpen,setDeleteOpen] = useState(false);
  const [deleted, setDeleted] = useState(false)
  const [edited, setEdited] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  

  const [editModalOpen, setEditModalOpen]= useState(false)
  const [editModalData, setEditModalData]= useState(false)


  const [statusChangeId, setStatusChangeId] = useState('')
  const [statusChangeDocument, setStatusChangeDocument] = useState('')
  const [tokenModalOpen, setTokenModalOpen] = useState(false)

  const navigate = useNavigate()
  
  // const userId = id
  // console.log(userId)



 useEffect(()=>{
  async function getNewUserData(){
    try {
      const {data} = await getNewUserDatas()
      if(data){
        setUserData(data.data)
      }
    } catch (error) {
      if(error.response.data.message === "Invalid token"){
        setTokenModalOpen(true)
      }
    }
  }
  getNewUserData()

},[deleted,edited])




 



const handleChangeAdminStatus = async (_id)=>{
          try {

            if(statusChangeId !== ''){
                const editAdminAccessChange = await ChangeAdminAccessStatus(statusChangeId)
                if(editAdminAccessChange.status === 201){
                 setDeleted(!deleted)
                 setDeleteOpen(false)
                 setEdited(!edited)
                 setSuccessOpen(true) 
                 setSuccessMessage('Access Granted Successfully')
                }
            }

          } catch (error) {
                console.error('Error From Backend:', error);
          }
}

useEffect(()=>{
  userData && userData.documents && userData.documents.forEach(row => {
    const expiryDate = new Date(row.expiry);
    const timeDifference = expiryDate.getTime() - Date.now();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days
    
    if (daysDifference < 30) {
      setStatusChangeDocument(row.type)
        const getChangeStatus = async()=>{
          if(row.status === 'Active'){
            const {data} = await changeDocumentStatus(userData._id,row.type)
            if(data){
              console.log(data);
            }
          }
        }
        getChangeStatus()
    }
  });
},[userData,edited])

const deliverTOLogin = ()=>{
  localStorage.removeItem('adminInfo');
  navigate('/admin/login')
}
 


  return (
    <>
      <Breadcrumb >
        <Typography component={Link} to="/admin" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Home
        </Typography>
        <Typography component={Link} to="/admin/pendingusers" variant="subtitle2" color="primary" className="link-breadcrumb" style={{fontSize:"15px"}}>
          Login Requests
        </Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item style={{width:"100%"}}>
          <Card>
            <CardHeader
              title={
                
                <Typography component="div" className="card-header" style={{ fontSize: "25px", textAlign: "center", fontWeight: "bold" }}>
                    New Login Requests
                </Typography>
              }
            />
            <Divider />
            <CardContent>
             
                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={{fontSize:"11px"}}>S.No</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Company Name</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Email</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Phone Number</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Status</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Requested On</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Control</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userData &&  userData.map((row,index) => (
                                <StyledTableRow key={row._id}>
                                <StyledTableCell component="th" scope="row" style={{fontSize:"12px",fontWeight:"bold"}}>
                                  <p>{index+1}</p>
                                </StyledTableCell>
                                <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.fullname}</StyledTableCell>
                                <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.email}</StyledTableCell>
                                <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.phonenumber}</StyledTableCell>
                                
                                <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.status}</StyledTableCell>   
                                <StyledTableCell align="right" style={{color:"red",fontSize:"12px"}}>{row.createdAt.slice(0,10)}</StyledTableCell>
                                

                                <StyledTableCell align="center" className='dropdown' style={{ position: "relative", fontSize: "12px" }}>
                                    <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                                        <Button variant="outlined" color="error" onClick={()=>{setDeleteOpen(true); setStatusChangeId(row._id)}}>
                                            Allow Access
                                        </Button>
                                    </div>
                                </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      


        <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
            <div className='text-center' style={{width:"300px",marginTop:"20px"}}>
                
                <div className='mx-auto my-4 w-48'>
                    <h3 className='text-lg font-thin text-gray-800 ' style={{color:'red'}}>Edit The Document</h3>
                    <form >
                      {editModalData && editModalData.image && editModalData.image.image_url ?
                         <div style={{ position: 'relative', display: 'inline-block' }}>
                         <img 
                           src={editModalData.image.image_url} 
                           alt='img' 
                           style={{ height: "100px", width: "100px", borderRadius: "50px" }} 
                         />
                         <div 
                           style={{ 
                             position: 'absolute', 
                             bottom: '0', 
                             right: '0', 
                             backgroundColor: 'rgba(74, 126, 255)', 
                             padding: '5px', 
                             borderRadius: '50%',
                             cursor: 'pointer',
                           }}
                         >
                           <RiImageEditLine color='white'/>
                         </div>
                       </div> :
                         null
                      }
                      
                      
                      <p style={{textAlign:"center",color:"red"}}>{duplicateEntry}</p>
                      <div className="mb-2" style={{ marginBottom: "10px", marginTop: "20px" }}>
                        
                          <p htmlFor="name" style={{ color: "black", textAlign: "center",fontSize:'10px' }}>Document Type</p> 
                        
                          <input readOnly value={editModalData.type} name='name'  className="form-control styled-placeholder" style={{ textAlign: "center", color:"black",fontSize:'11px' }} />
                      </div>
                      
                      
                        <div className="mb-2" style={{ marginBottom: "10px", marginTop: "20px" }}>
                          
                            <p htmlFor="name" style={{ color: "black", textAlign: "center",fontSize:'10px' }}>Document Number</p> 
                          
                            <input onChange={(e)=>setEditModalData({...editModalData, documentNumber: e.target.value})} value={editModalData.documentNumber} name='name'  className="form-control styled-placeholder" style={{ textAlign: "center", color:"black",fontSize:'11px' }} />
                        </div>

                      

                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ marginRight: "6px", flex: "1" }}>
                          <p style={{ color: "black", textAlign: "center",fontSize:'10px' }}>Document Issued On</p>
                          <input 
                            
                            className="form-control styled-placeholder" 
                            style={{ textAlign: "center", color: "#2E2E2E", width: "100%",fontSize:'11px' }}
                            onFocus={(e) => e.target.type = 'date'}
                            onBlur={(e) => e.target.type = 'text'}
                            onChange={(e)=>setEditModalData({...editModalData, issued:e.target.value})}
                            value={editModalData.issued}
                          />
                        </div>
                        <div style={{ flex: "1" }}>
                          <p style={{ color: "black", textAlign: "center",fontSize:'10px' }}>Document Expiry</p>
                          <input 
                            className="form-control styled-placeholder"
                            style={{ textAlign: "center", color: "#2E2E2E", width: "100%",fontSize:'11px' }}
                            onFocus={(e) => e.target.type = 'date'}
                            onBlur={(e) => e.target.type = 'text'}
                            onChange={(e)=>setEditModalData({...editModalData,expiry:e.target.value})}
                            value={editModalData.expiry}
                          />
                        </div>
                      </div>

                      <div className="d-grid" style={{ display: "grid", marginTop: "20px" }}>
                              <button type="submit" className="btn" style={{backgroundColor:"#215AFF",color:"white",fontWeight:"500"}}>
                                  Edit
                              </button> 
                      </div>
                  </form>
                </div>
                
            </div>
        </Modal>




        {successOpen && (
        <Modal open={successOpen} onClose={() => setSuccessOpen(false)}>
            <div className='text-center'>
                <FaCheck size={56} className='mx-auto text-red-600' style={{color:"green",fontSize:"50px"}}></FaCheck>
                <div className='mx-auto my-4 w-48'>
                    <h3 className='text-lg font-thin text-gray-800 '>{successMessage}</h3>
                </div>
                <div className="flex gap-4">
                <Button variant="outlined" color="success"
                    onClick={() => setSuccessOpen(false)}
                    style={{
                         height:"30px",
                        fontWeight: 'bold', 
                        padding: '0.25rem 1rem',
                        width: '100%',
                        borderRadius: '0.375rem',
                        transition: 'background-color 0.2s ease-in-out',
                        cursor: 'pointer'
                    }}
                    >
                    Ok
                    </Button>
                </div>
            </div>
        </Modal>
    )}








    {deleteOpen && (
        <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
            <div className='text-center'>
                <SiOpenaccess size={56} className='mx-auto text-red-600' style={{color:"green",fontSize:"50px"}}></SiOpenaccess>
                <div className='mx-auto my-4 w-48'>
                    <h4 className='text-lg font-thin text-gray-800'>Are You Sure To Access User? </h4>
                </div>
                <div className="flex gap-4">
                <div style={{display:"flex",flexDirection:'row',gap:'10px'}}>
                  <Button variant="outlined" color="error"
                      onClick={()=>setDeleteOpen(false)}
                      style={{
                          fontSize:'10px',
                          height:'30px',
                          fontWeight: 'bold',
                          padding: '0.25rem 1rem',
                          width: '100%',
                          borderRadius: '0.375rem',
                          transition: 'background-color 0.2s ease-in-out',
                          cursor: 'pointer'
                      }}
                      >
                      No
                      </Button>
                  <Button variant="outlined" color="success"
                      onClick={handleChangeAdminStatus}
                      style={{
                            fontSize:'10px',
                            height:'30px',
                            fontWeight: 'bold',
                          padding: '0.25rem 1rem',
                          width: '100%',
                          borderRadius: '0.375rem',
                          transition: 'background-color 0.2s ease-in-out',
                          cursor: 'pointer'
                      }}
                      >
                      Yes
                      </Button>

                </div>
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
                    
                        <button
                            onClick={deliverTOLogin}
                            style={{
                                backgroundColor: '#215AFF', // Red-500
                                color: '#FFFFFF', 
                                fontWeight: '300', // Thin
                                // Shadow-lg
                                padding: '0.25rem 1rem', // p-1
                                width: '100%', // w-full
                                border:"none",
                                borderRadius: '0.375rem', // Rounded-md (default value)
                                transition: 'background-color 0.2s ease-in-out', // Hover effect
                                cursor: 'pointer' // Hover effect
                            }}
                            >
                            Login
                            </button>
                    
                </div>
            </div>
        </Modal>
    )}
    </>
  );
};

export default DocumentsPage;