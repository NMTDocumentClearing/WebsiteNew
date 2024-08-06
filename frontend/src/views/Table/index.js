import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';



// material-ui
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Card, CardHeader, CardContent, Divider, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MdOutlineStorage } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { BiSolidShow } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { Pagination } from '@mui/material';
import { InputText } from 'primereact/inputtext';

// project import
import Breadcrumb from '../../components/adminComponents/Breadcrumb';
import { gridSpacing } from '../../config';
import { addDocument, getUsersDatas } from '../../api/adminAPI';
import { useSelector } from 'react-redux';
import Modal from '../../components/modal';
import { IoLockClosed } from "react-icons/io5";
import Button from '@mui/material/Button';

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


  const moment = require('moment');
  
  

// ==============================|| SAMPLE PAGE ||============================== //

const TablePage = () => {
  const [userData,setUserData] = useState([])


  // const adminLogin = useSelector((state)=> state.adminLogin)
  // const {loading, error, adminInfo} = adminLogin
  // console.log(adminInfo);
  // const id = adminInfo._id
  
  const [tokenModalOpen, setTokenModalOpen] = useState(false)

  const [addDocumentModalOpen, setAddDocumentModalOpen] = useState(false)
  const [documentType,setDocumentType] = useState('')
  const [documentNumber,setDocumentNumber] = useState('')
  const [expiry,setExpiry] = useState('')
  const [issued,setIssued] = useState('')
  const [documentAddUserId,setDocumentAddUserId] = useState('')

  const [successMessage,setSuccessMessage] = useState('')
  const [successOpen,setSuccessOpen] = useState(false)
  const [formError, setFormError] = useState('')
  const [errorOpen, setErrorOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  
  const [totalPages, setTotalPages]= useState(1)

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  

  // const dataPerPage = 5

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };


  const navigate = useNavigate()

  const handleShowClick = (id) => {
    if(id !== ''){
      navigate('/admin/showlabourlist', { state: { id: id } });
    }
  };

  const handleShowDocClick = (id) => {
    if(id !== ''){
      navigate('/admin/showdocumentlist', { state: { id: id } });
    }
  };
  
  useEffect(()=>{
    async function getUsersData(){
      try {
        if(page !== undefined && rowsPerPage !== undefined){
          const {data} = await getUsersDatas()
          if(data){
              // console.log(data.numberOfPages);
              setUserData(data.data)
              setTotalPages(Math.ceil(data.data.length/rowsPerPage))
          }
        }
      } catch (error) {
        if(error.response.data.message === "Invalid token"){
          setTokenModalOpen(true)
        }
      }
    }
    getUsersData()

 },[page])

 const filteredData = userData.filter(val => {
  if (searchTerm === '') {
      return val;
  } else if (val.fullname.toLowerCase().includes(searchTerm.toLowerCase())) {
      return val;
  }
  return null;
});

 const totalFilteredPages = Math.ceil(filteredData.length / rowsPerPage);

 const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

 

 const handleShow = ()=>{
    navigate ('/admin/showdocuments')
 }

 const deliverTOLogin = ()=>{
  localStorage.removeItem('adminInfo');
  navigate('/admin/login')
}


 const getFormatedDate = (date) =>{
  const parsedDate = moment(date);
  return parsedDate.format('DD-MM-YYYY HH:mm');
 }


 const handleAddDocumentSubmit = async(e)=>{
   e.preventDefault();
   console.log(documentType,documentNumber,expiry);
      try {
        if(documentType !== '' && expiry !== ''){
          const data = await addDocument(documentType,documentNumber,issued,expiry,documentAddUserId)
          if(data && data.status === 201){
            
            setAddDocumentModalOpen(false)
            setSuccessMessage('Document Added Successfully')
            setSuccessOpen(true)
            setDocumentType('')
            setDocumentNumber('')
            setExpiry('')
            e.target.reset();
          }else{
            setFormError(`${documentType} already exists for your company`)
            setErrorOpen(true);
          }
        }else{
            setFormError('All Fields Required....!')
        }
      } catch (error) {
        if(error.response.data.message === "Invalid token"){
          setTokenModalOpen(true)
        }
      }
 }

 


  return (
    <>
      <Breadcrumb >
        <Typography component={Link} to="/admin" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb" style={{fontSize:"15px"}}>
          Companies
        </Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item style={{width:"100%"}}>
          <Card>
            <CardHeader
              title={
                <Typography component="div" className="card-header" style={{fontSize:"25px", textAlign:"center",fontWeight:"bold"}}>
                  Companies List
                </Typography>
              }
            />
              
            <Divider />
            <CardContent>
             
                <TableContainer component={Paper} >
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                  <Pagination style={{padding: '10px', margin: '10px'}} count={totalPages} page={page} onChange={handleChangePage} />
                  <div style={{ padding: '10px', margin: '10px', maxWidth: '300px' }} className="p-inputgroup flex-1">
                    <span style={{ padding: '10px' }} className="p-inputgroup-addon">
                      <i style={{ color: 'black' }} className="fa-solid fa-magnifying-glass"></i>
                    </span>
                    <InputText placeholder="Search Company...." onChange={(e)=>setSearchTerm(e.target.value)} />
                  </div>
                </div>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={{fontSize:"15px"}}>Company Name</StyledTableCell>
                                <StyledTableCell style={{fontSize:"14px"}} align="right">Email</StyledTableCell>
                                <StyledTableCell style={{fontSize:"14px"}} align="right">Phone Number</StyledTableCell>
                                <StyledTableCell style={{fontSize:"14px"}} align="right">Status</StyledTableCell>
                                <StyledTableCell style={{fontSize:"14px"}} align="right">Labours List</StyledTableCell>
                                <StyledTableCell style={{fontSize:"14px"}} align="right">Documents</StyledTableCell>
                                <StyledTableCell style={{fontSize:"14px"}} align="right">Last Updated</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedData.map((row) => (
                                <StyledTableRow key={row._id}>
                                <StyledTableCell component="th" scope="row" style={{fontSize:"11px",fontWeight:"bold"}}>
                                    {row.fullname}
                                </StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">{row.email}</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">{row.phonenumber}</StyledTableCell>
                                {row.status === 'active' ?
                                <StyledTableCell align="right" style={{color:"green",fontSize:"11px"}}>{row.status}</StyledTableCell> :
                                <StyledTableCell align="right" style={{color:"red",fontSize:"11px"}}>{row.status}</StyledTableCell>
                                }
                                <StyledTableCell align="right">
                                    <Button variant="outlined" color="warning" onClick={()=>{handleShowClick(row._id)}}>
                                      Show
                                    </Button>
                                  </StyledTableCell>
                                  <StyledTableCell align="center" className="dropdown" style={{ position: "relative", fontSize: "12px" }}>
                                    <div style={{ position: "relative", right: '0' }}>
                                      <MdOutlineStorage color="red" className="dropdown-toggle page-scroll" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" />
                                      <ul className="dropdown-menu" style={{ position: "absolute", height: '50px', bottom: "-10px", right: "-10px", backgroundColor: 'white' }}>
                                        <li
                                          style={{ textAlign: "center", justifyContent: 'center', alignItems: 'center', color: "blue", fontSize: "13px", backgroundColor: "white", height: "25px", paddingTop: '4px' }}
                                          onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }}
                                          onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'blue'; }}
                                          onClick={() => { handleShowDocClick(row._id); }}
                                        >
                                          Show <BiSolidShow />
                                        </li>
                                        <li
                                          style={{ textAlign: "center", color: 'red', justifyContent: 'center', alignItems: 'center', fontSize: "13px", backgroundColor: "white", height: "25px", paddingTop: '4px' }}
                                          onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }}
                                          onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'red'; }}
                                          onClick={() => { setAddDocumentModalOpen(true); setDocumentAddUserId(row._id); }}
                                        >
                                          Add <IoIosAddCircle />
                                        </li>
                                      </ul>
                                    </div>
                                  </StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">{getFormatedDate(row.updatedAt)}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {tokenModalOpen && (
        <Modal open={tokenModalOpen} onClose={() => setTokenModalOpen(false)}>
            <div className='text-center'>
                <IoLockClosed size={56} className='mx-auto text-red-600' style={{color:"red",fontSize:"40px", width:"30px",height:"30px"}}></IoLockClosed>
                <div className='mx-auto my-4 w-48'>
                    <h3 className='text-lg font-thin text-gray-800 '>You Token Expired</h3>
                    <p className='text-lg font-thin text-gray-800 '>Please Login Again</p>
                </div>
                <div className="flex gap-4">
                    
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
                    
                </div>
            </div>
        </Modal>
    )}

{addDocumentModalOpen && (
        <Modal open={addDocumentModalOpen} onClose={() => setAddDocumentModalOpen(false)}>
            <div className='text-center' >
                <IoIosAddCircle size={56} className='mx-auto text-red-600' style={{color:"red",fontSize:"40px", width:"30px",height:"30px"}}></IoIosAddCircle>
                <div className='mx-auto my-4 w-48'>
                    <h3 className='text-lg font-thin text-gray-800 '>Add Company Document</h3>
                    
                </div>
                <div className="flex gap-4">
                    
                <form onSubmit={handleAddDocumentSubmit}>
                      
                        <div style={{marginRight: "6px",flex: "1",marginTop:'10px'}}>
                              <p htmlFor="email" style={{ color: "black", textAlign: "center",fontSize:'10px' }}>Document Type</p>
                              <select 
                                className="form-control styled-placeholder" 
                                style={{ color:"black",fontSize:'11px'}}
                                onChange={(e)=>setDocumentType(e.target.value)}
                                >
                                <option value="" style={{textAlign:"center"}}>Select</option>
                                <option value="Lisense" style={{textAlign:"center"}}>Lisense</option>
                                <option value="Tenancy" style={{textAlign:"center"}}>Tenancy</option>
                                <option value="Civil Defence" style={{textAlign:"center"}}>Civil Defence</option>
                                <option value="Chamber" style={{textAlign:"center"}}>Chamber</option>
                                
                            </select>
                        </div>
                        
                          <div style={{ marginRight: "6px", flex: "1",marginTop:'10px' }}>
                            <p style={{ color: "black", textAlign: "center",fontSize:'10px' }}>Document Number</p>
                            <input 
                              
                              className="form-control styled-placeholder" 
                              style={{ textAlign: "center", color: "#2E2E2E", width: "100%",fontSize:'11px' }}
                            
                              onChange={(e)=>setDocumentNumber(e.target.value)}
                            />
                          </div>
                        <div style={{ marginRight: "6px", flex: "1",marginTop:'10px' }}>
                          <p style={{ color: "black", textAlign: "center",fontSize:'10px' }}>Document Issued on</p>
                          <input 
                            
                            className="form-control styled-placeholder" 
                            style={{ textAlign: "center", color: "#2E2E2E", width: "100%",fontSize:'11px' }}
                            onFocus={(e) => e.target.type = 'date'}
                            onBlur={(e) => e.target.type = 'text'}
                            onChange={(e)=>setIssued(e.target.value)}
                          />
                        </div>

                        <div style={{ marginRight: "6px", flex: "1",marginTop:'10px' }}>
                          <p style={{ color: "black", textAlign: "center",fontSize:'10px' }}>Document Expiry</p>
                          <input 
                            
                            className="form-control styled-placeholder" 
                            style={{ textAlign: "center", color: "#2E2E2E", width: "100%",fontSize:'11px' }}
                            onFocus={(e) => e.target.type = 'date'}
                            onBlur={(e) => e.target.type = 'text'}
                            onChange={(e)=>setExpiry(e.target.value)}
                          />
                        </div>

                      <div className="d-grid" style={{ display: "grid", marginTop: "20px" }}>
                          
                      <p style={{color:'red',fontSize:'11px'}}>{formError}</p>
                              <button type="submit" className="btn" style={{backgroundColor:"#215AFF",color:"white",fontWeight:"500"}}>
                                  Add
                              </button> 
                          
                      </div>
                  </form>
                    
                </div>
            </div>
        </Modal>
    )}

{successOpen && (
        <Modal open={successOpen} onClose={() => setSuccessOpen(false)}>
            <div className='text-center'>
                <FaCheck size={56} className='mx-auto text-red-600' style={{color:"green",fontSize:"50px"}}></FaCheck>
                <div className='mx-auto my-4 w-48'>
                    <h3 className='text-lg font-thin text-gray-800 ' style={{fontSize:"20px"}}>{successMessage}</h3>
                </div>
                <div className="flex gap-4">
                <button
                    onClick={() => {setSuccessOpen(false)}}
                    style={{
                        backgroundColor: '#215AFF',
                        color: '#FFFFFF', 
                        fontWeight: '500',
                        padding: '0.25rem 1rem',
                        border:"none",
                        width: '100%',
                        borderRadius: '0.375rem',
                        transition: 'background-color 0.2s ease-in-out',
                        cursor: 'pointer'
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
            <IoLockClosed size={56} className='mx-auto text-red-600' style={{color:"red",fontSize:"40px", width:"30px",height:"30px"}}></IoLockClosed>
                <div className='mx-auto my-4 w-48'>
                    <p className='text-lg font-thin text-gray-800 ' style={{fontSize:"15px"}}>{formError}</p>
                </div>
                <div className="flex gap-4">
                <button
                    onClick={() => {setErrorOpen(false);setFormError('')}}
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
};

export default TablePage;