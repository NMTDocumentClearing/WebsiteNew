import React, { useEffect, useState, useContext } from 'react';
import { Link,useParams } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AppContext } from '../appContext';
import emailjs from "emailjs-com";



// material-ui
// import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
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
import {  getAllApplications, getRecentApplications, } from '../../api/adminAPI';
// import { GrUserWorker } from "react-icons/gr";
import Modal from '../../components/modal';


import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#265CCF',
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

const ApplicationPage = () => {
  
  const [userData,setUserData] = useState([])
  const [successOpen,setSuccessOpen] = useState(false);
  const [edited, setEdited] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const [confirmMessage, setConfirmMessage]= useState('')
  const [confirmModaOpen,setConfirmModalOpen] = useState(false)

  const [viewConfirmModalOpen, setViewConfirmModalOpen] = useState(false)

  const [expiringData, setExpiringData] = useState([])
  const [loading, setLoading] = useState(false)

  const [emailToSend,setEmailToSend] = useState('')
  const [emailSub, setEmailSub] = useState('')
  const [index,setIndex] = useState(0)

  const [emailSentStatus, setEmailSentStatus] = useState(
    expiringData.map(() => false) // Initial state: none of the emails are sent
  );

  const {id} = useParams();









const {expiringLabours} = useContext(AppContext)

useEffect(()=>{
    console.log(expiringLabours);
    setExpiringData(expiringLabours)
    console.log(expiringData);
},[expiringLabours])






const handleConfirmButtom = async ()=>{
  try {
        const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID
        const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID
        const userId = process.env.REACT_APP_EMAILJS_PUBLIC_KEY

          console.log(serviceId, templateId, userId);
          console.log(emailSub,emailToSend);
          const sendEmail = (index, emailToSend, emailSub) => {
            const templateParams = {
              to_email: emailToSend,
              subject:'Alert From NMT Document Clearing',
              message:emailSub, 
            };
            
            emailjs.send(serviceId, templateId, templateParams, userId)
              .then((response) => {
                setConfirmModalOpen(false)
                setSuccessMessage('Email Sent Successfully')
                const updatedStatus = [...emailSentStatus];
                updatedStatus[index] = true;
                setEmailSentStatus(updatedStatus);  
                setSuccessOpen(true)
                setTimeout(()=>{
                  setSuccessOpen(false)
                },2000)
                console.log('SUCCESS!', response.status, response.text);
              }, (error) => {
                console.log('FAILED...', error);
              });
          };
          if(emailToSend !== '' && emailSub !== ''){
              sendEmail(index,emailToSend, emailSub)
          }
      
    
  } catch (error) {
    console.error('Error deleting image:', error);
  }
}






 


  return (
    <>
      <Breadcrumb >
        <Typography component={Link} to="/admin" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Home
        </Typography>
        <Typography component={Link} to="/admin/notifications" variant="subtitle2" color="primary" className="link-breadcrumb" style={{fontSize:"15px"}}>
          Notifications
        </Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item style={{width:"100%"}}>
          <Card>
            <CardHeader
              title={
                <Typography component="div" className="card-header" style={{ fontSize: "25px", textAlign: "center", fontWeight: "bold" }}>
                  Notifications List<span style={{ color: "blue" }}>{ userData ? userData.fullname : ''}</span>
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              
                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={{fontSize:"11px"}}>Doc. Type</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Company Name</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Name</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Expire On</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Doc. Number</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Control</StyledTableCell>
                            </TableRow>
                        </TableHead> 
                        <TableBody>
                            {expiringData.map((row) => (
                                <StyledTableRow key={row._id}>
                                    {row.type ?
                                      <StyledTableCell align="" style={{fontSize:"12px"}}>{row.type}</StyledTableCell> :
                                      <StyledTableCell align="" style={{fontSize:"12px"}}>Id/Labour Card</StyledTableCell>
                                    }
                                    
                                      <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.companyId.fullname}</StyledTableCell> 
                                    
                                    {row.name ?
                                      <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.name}</StyledTableCell> :
                                      <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.docType}</StyledTableCell>
                                    }
                                    {row.idCardExpiry ?
                                      <StyledTableCell align="right" style={{fontSize:"12px",color:'red'}}>{row.idCardExpiry.slice(0,10)}</StyledTableCell> :
                                      <StyledTableCell align="right" style={{fontSize:"12px",color:'red'}}>{row.expiry}</StyledTableCell>
                                    }
                                    {row.idCardExpiry ?
                                      <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.idCardNumber}</StyledTableCell> :
                                      <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.docNumber}</StyledTableCell>
                                    }
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <div style={{ position: "relative"}}>
                                            <StyledTableCell   role="button" aria-haspopup="true" aria-expanded="false" align="right"  style={{fontSize:"10px"}}>
                                            <Button variant="outlined" color="success"
                                                onClick={()=>{setEmailToSend(row.companyId.email);
                                                  const emailSubject = row.idCardExpiry
                                                    ? `Your Employee ${row.name}'s Id/Labour Card is Expiring...Please go on with the renewal processes`
                                                    : `Your ${row.docType} is Expiring...Please go on with the renewal processes`;
                                                  setEmailSub(emailSubject);
                                                  setConfirmModalOpen(true);
                                                  setIndex(index)}}
                                                  disabled={emailSentStatus[index]}
                                                style={{
                                                    fontWeight: 'bold',
                                                    height:'30px',
                                                    padding: '0.25rem 1rem',
                                                    width: '100%',
                                                    borderRadius: '0.375rem',
                                                    transition: 'background-color 0.2s ease-in-out',
                                                    cursor: 'pointer'
                                                }}
                                                >
                                                <div style={{display:'flex',gap:'10px', flexDirection:'row', justifyContent:'space-between',alignItems: 'center'}}>
                                                  <div style={{backgroundColor:'white',padding:'auto',paddingTop:'3px',borderRadius:'2px', width:'25px'}}>
                                                    <ForwardToInboxIcon sx={{color: 'red'}} size={15} /> 
                                                  </div>
                                                  <div>
                                                    {emailSentStatus[index] ? 'Email Sent' : 'Send Email'}
                                                  </div>
                                                </div>
                                              </Button>
                                            </StyledTableCell>
                                        </div>
                                    </div>
                                </StyledTableRow>
                                
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>





        {successOpen && (
         <Modal open={successOpen} onClose={() => setSuccessOpen(false)}>
            <div className='text-center'>
                <FaCheck size={56} className='mx-auto text-red-600' style={{color:"green",fontSize:"50px"}}></FaCheck>
                <div className='mx-auto my-4 w-48'>
                    <h3 className='text-lg font-thin text-gray-800 '>{successMessage}</h3>
                </div>
                <div className="flex gap-4">
                <Button variant="outlined" color="error"
                    onClick={()=>setSuccessOpen(false)}
                    style={{
                         height:'30px',
                         // Shadow-lg
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


     



  {confirmModaOpen && (
        <Modal open={confirmModaOpen} onClose={() => setConfirmModalOpen(false)}>
            <div className='text-center'>
                <MdDelete size={56} className='mx-auto text-red-600' style={{color:"red",fontSize:"50px"}}></MdDelete>
                <div className='mx-auto my-4 w-48'>
                    <h4 className='text-lg font-thin text-gray-800'>Are You Sure? </h4>
                </div>
                <div className="flex gap-4">
                <div style={{display:"flex",flexDirection:'row',gap:'10px'}}>
                  <Button variant="outlined" color="error"
                      onClick={()=>{setConfirmModalOpen(false);setLoading(false)}}
                      style={{
                          height:'30px',
                          padding: '0.25rem 1rem',
                          width: '100%',
                          borderWidth: '2px',
                          borderRadius: '0.375rem',
                          transition: 'background-color 0.2s ease-in-out',
                          cursor: 'pointer',
                      }}
                      >
                      Cancel
                      </Button>
                      {
                        !loading ?
                        <Button variant="outlined" color="success"
                              onClick={()=>{handleConfirmButtom();setLoading(true);}}
                              style={{
                                  height:'30px',
                                  padding: '0.25rem 1rem',
                                  width: '100%',
                                  borderWidth: '2px',
                                  borderRadius: '0.375rem',
                                  transition: 'background-color 0.2s ease-in-out',
                                  cursor: 'pointer'
                              }}
                          >
                          Ok
                          </Button> :
                           <Button variant="outlined" color="success"
                           style={{
                               height:'30px',
                               padding: '0.25rem 1rem',
                               width: '100%',
                               borderWidth: '2px',
                               borderRadius: '0.375rem',
                               transition: 'background-color 0.2s ease-in-out',
                               cursor: 'pointer'
                           }}
                          >
                          <svg
                            width="24px"
                            height="24px"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="xMidYMid"
                            style={{ background: 'none', display: 'inline-block' }}
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="50"
                              cy="50"
                              r="32"
                              strokeWidth="8"
                              stroke="#000" 
                              strokeDasharray="50.26548245743669 50.26548245743669"
                              fill="none"
                            >
                              <animateTransform
                                attributeName="transform"
                                type="rotate"
                                repeatCount="indefinite"
                                dur="1s"
                                keyTimes="0;1"
                                values="0 50 50;360 50 50"
                              />
                            </circle>
                          </svg>
                          </Button>

                      }

                </div>
                </div>
            </div>
        </Modal>
      )}


    </>
  );
};

export default ApplicationPage;
