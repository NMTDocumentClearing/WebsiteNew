import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getAllAppliedEntry, getEmployeesList } from "../api/userAPI";
import Modal from "./modal";
import { IoLockClosed } from "react-icons/io5";
import { MdOutlinePendingActions } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";






import Breadcrumb from '../components/breadCrumb'
import { Card, CardHeader, CardContent, Divider, Grid,Box, TextField, Pagination, Typography,Select, MenuItem,InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

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



export const ApplicationsList = () => {
    const navigate = useNavigate()
    const userLogin = useSelector((state)=> state.userLogin)
    const {loading, error, userInfo} = userLogin

    
    
    const [open, setOpen] = useState(false)
    const [tokenModalOpen, setTokenModalOpen] = useState(false)

    const [labourData, setLabourdata] = useState([])
    const [applicationData, setApplicationData] = useState([])

    

    const [stepperOpen, setStepperOpen] = useState(false)
    const [stepperData, setStepperData] = useState([])
    const [rejectReason,setRejectReason] = useState('')

    const [applicationType, setApplicationType] = useState('labourApplications')

    const [searchTerm, setSearchTerm] = useState('')
    const [totalPages, setTotalPages]= useState(1)

    const [page, setPage] = useState(1);
    const rowsPerPage =  10;

    const id = userInfo ? userInfo._id : null;

    

    useEffect(()=>{
        try {
            async function getEmployeesData(id){
                try {
                    const {data} = await getEmployeesList(id)
                    if(data){
                        setLabourdata(data.data)
                    }else{
                        console.log("here");
                    }
                } catch (error) {
                    if(error.response.data.message === "Invalid token"){
                        console.log("sdgvjajavjahc");
                        setTokenModalOpen(true)
                    }
                }

            }
            getEmployeesData(id)
        } catch (error) {
            console.log(error);
        }

    },[])

    

    

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      }; 





    useEffect(()=>{
        const getAllApplication = async(id)=>{
            try {
                const {data} = await getAllAppliedEntry(id,applicationType);
                if(data){
                    setApplicationData(data.data)
                    setPage(1)
                    setTotalPages(Math.ceil(data.data.length/rowsPerPage))
                }
                
            } catch (error) {
                console.log(error);
            }
        }
        getAllApplication(id,applicationType)
    },[applicationType])


    const filteredData = applicationData.filter(val => {
        if (searchTerm === '') {
            return val;
        } else if ((val.name.toLowerCase().includes(searchTerm.toLowerCase()))|| val.position.toLowerCase().includes(searchTerm.toLowerCase()) ) {
            return val;
        }
        return null;
      });

      const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

      

    const changeTypes = (selectedValue)=>{
        setApplicationType(selectedValue)
    }

  return (
    <>
    <>
      
      <Grid  container justifyContent="center" style={{marginTop:'60px', paddingLeft: '25px', paddingRight: '25px'}}  >
        
        <Grid item style={{width:"100%",margin:'100px'}}>
        <Breadcrumb >
            <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
            Home
            </Typography>
            
            <Typography component={Link} to="/applications" variant="subtitle2" color="primary" className="link-breadcrumb" style={{fontSize:"15px"}}>
            Applications
            </Typography>
            
        </Breadcrumb>
          <Card>
            <CardHeader
              title={
                
                <Typography component="div" className="card-header" style={{ fontSize: "25px", textAlign: "center", fontWeight: "bold" }}>
                    Your Applications
                </Typography>
              }
            />
            <div  style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "50px",marginBottom:'10px' }}>

                <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <InputLabel id="company-label" style={{ textAlign: 'center', marginBottom: '5px' }}>Select Type</InputLabel>
                    <Select
                        id="company"
                        value={applicationType}
                        onChange={(e) => {setApplicationType(e.target.value);changeTypes(e.target.value)}}
                        style={{ marginRight: '5px', width: '200px' }}
                        labelId="company-label"
                    >   
                                
                            <MenuItem
                                 value='labourApplications'
                                    style={{
                                        fontSize: "10px",
                                        height: '25px',
                                        marginLeft: '8px',
                                        '&:hover': {
                                            backgroundColor: 'lightblue', // Background color on hover
                                            color: 'red', // Text color on hover
                                        }
                                    }}
                                >
                                Labour Applications
                            </MenuItem>
                            <MenuItem
                                    value='documentApplications'
                                    style={{
                                    fontSize: "10px",
                                    height: '25px',
                                    marginLeft: '8px',
                                    '&:hover': {
                                        backgroundColor: 'lightblue', // Background color on hover
                                        color: 'red', // Text color on hover
                                    }
                                    }}
                                >
                                Document Renewal Applications
                            </MenuItem>
                            <MenuItem
                                    value='newLabourApplications'
                                    style={{
                                    fontSize: "10px",
                                    height: '25px',
                                    marginLeft: '8px',
                                    '&:hover': {
                                        backgroundColor: 'lightblue', // Background color on hover
                                        color: 'red', // Text color on hover
                                    }
                                    }}
                                >
                                New Labour Applications
                            </MenuItem>
                        
                    </Select>
                </form>
            </div>
            <Divider />
            <CardContent>
             {applicationType === 'labourApplications' &&
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
                        label="Search Labour/Date"
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
                                <StyledTableCell style={{fontSize:"11px"}}>Type</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Name</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Nationality</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Position</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Status</StyledTableCell>
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedData.map((row) => (
                                <StyledTableRow key={row._id}>
                                    <StyledTableCell align="" style={{fontSize:"12px"}}>{row.type}</StyledTableCell>
                                    <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.name}</StyledTableCell>
                                    <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.nationality}</StyledTableCell>
                                    <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.position}</StyledTableCell>
                                        {row.status === 'Pending' && <StyledTableCell align="right" style={{fontSize:"12px",color:"blue"}}>{row.status}</StyledTableCell> }
                                        {row.status === 'Completed' && <StyledTableCell align="right" style={{fontSize:"12px",color:"green"}}>{row.status}</StyledTableCell> }
                                        {row.status === 'Under Process' && <StyledTableCell align="right" style={{fontSize:"12px",color:"blue"}}>{row.status}</StyledTableCell> }
                                        {row.status === 'Rejected' && <StyledTableCell align="right" style={{fontSize:"12px",color:"red"}} onClick={()=>setRejectReason(row.rejectReason)}>{row.status}
                                        {rejectReason !== '' && <p style={{fontSize:'9px',color:'red',textAlign:'end'}}>{rejectReason}</p>}
                                    </StyledTableCell> }
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                    
                </TableContainer>
             }
             {applicationType === 'newLabourApplications' &&
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
                        label="Search Labour/Particulars/Date"
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
                            <StyledTableCell style={{fontSize:"11px"}}>Type</StyledTableCell>
                            <StyledTableCell style={{fontSize:"11px"}} align="right">Name</StyledTableCell>
                            <StyledTableCell style={{fontSize:"11px"}} align="right">Nationality</StyledTableCell>
                            <StyledTableCell style={{fontSize:"11px"}} align="right">Position</StyledTableCell>
                            <StyledTableCell style={{fontSize:"11px"}} align="right">Progress</StyledTableCell>
                            <StyledTableCell style={{fontSize:"11px"}} align="right">Status</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((row) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell align="" style={{fontSize:"12px"}}>{row.type}</StyledTableCell>
                                <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.name}</StyledTableCell>
                                <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.nationality}</StyledTableCell>
                                <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.position}</StyledTableCell>
                                <StyledTableCell align="right" style={{fontSize:"12px"}} onClick={()=>{setStepperOpen(true);setStepperData(row.progress)}}><MdOutlinePendingActions style={{ fontSize: '20px',color:'red' }}/></StyledTableCell>
                                    {row.status === 'Pending' && <StyledTableCell align="right" style={{fontSize:"12px",color:"blue"}}>{row.status}</StyledTableCell> }
                                    {row.status === 'Completed' && <StyledTableCell align="right" style={{fontSize:"12px",color:"green"}}>{row.status}</StyledTableCell> }
                                    {row.status === 'Under Process' && <StyledTableCell align="right" style={{fontSize:"12px",color:"blue"}}>{row.status}</StyledTableCell> }
                                    {row.status === 'Rejected' && <StyledTableCell align="right" style={{fontSize:"12px",color:"red"}} onClick={()=>setRejectReason(row.rejectReason)}>{row.status}
                                    {rejectReason !== '' && <p style={{fontSize:'9px',color:'red',textAlign:'end'}}>{rejectReason}</p>}
                                </StyledTableCell> }
                            </StyledTableRow>
                            
                            ))}
                        </TableBody>
                    </Table>
                
                </TableContainer>
             }

            {applicationType === 'documentApplications' &&
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
                  
                </Grid>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell style={{fontSize:"11px"}}>Document Type</StyledTableCell>
                            <StyledTableCell style={{fontSize:"11px"}} align="right">Company</StyledTableCell>
                            <StyledTableCell style={{fontSize:"11px"}} align="right">Applied On</StyledTableCell>
                            <StyledTableCell style={{fontSize:"11px"}} align="right">Status</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((row) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell align="" style={{fontSize:"12px"}}>{row.type}</StyledTableCell>
                                <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.companyname}</StyledTableCell>
                                <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.createdAt.slice(0,10)}</StyledTableCell>
                                    {row.status === 'Pending' && <StyledTableCell align="right" style={{fontSize:"12px",color:"blue"}}>{row.status}</StyledTableCell> }
                                    {row.status === 'Completed' && <StyledTableCell align="right" style={{fontSize:"12px",color:"green"}}>{row.status}</StyledTableCell> }
                                    {row.status === 'Under Process' && <StyledTableCell align="right" style={{fontSize:"12px",color:"blue"}}>{row.status}</StyledTableCell> }
                                    {row.status === 'Rejected' && <StyledTableCell align="right" style={{fontSize:"12px",color:"red"}} onClick={()=>setRejectReason(row.rejectReason)}>{row.status}
                                    {rejectReason !== '' && <p style={{fontSize:'9px',color:'red',textAlign:'end'}}>{rejectReason}</p>}
                                </StyledTableCell> }
                            </StyledTableRow>
                            
                            ))}
                        </TableBody>
                    </Table>
                
                </TableContainer>
             }
                
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

    




    {stepperOpen && (
        <Modal open={setStepperOpen} onClose={() => setStepperOpen(false)}>
            <div className='text-center'>
                <FaCheck size={56} className='mx-auto text-red-600' style={{color:"green",fontSize:"50px"}}></FaCheck>
                <div className='mx-auto my-4 w-48'>
                    <h3 className='text-lg font-thin text-gray-800 '>Application Progress</h3>
                    <div className="card" tableStyle={{ minWidth: '50rem' }} >
                        <DataTable value={stepperData}  tableStyle={{ minWidth: '30rem',borderCollapse: 'collapse' }}>
                            <Column field="label" header="Stages" body={(rowData) => <span style={{ color: rowData.status ? 'green' : 'red', textAlign: 'start', paddingBottom: '5px', display: 'block' }}>{rowData.label}</span>}></Column>
                            <Column field="status" header="Status" body={(rowData) => <span style={{ color: rowData.status ? 'green' : 'red', textAlign: 'center', paddingBottom: '5px', display: 'block' }}>{rowData.status ? <IoIosCheckmarkCircle size={20}/> : <IoCloseCircle size={20}/> }</span>}></Column>
                        </DataTable>
                    </div>
                </div>
                <div className="flex gap-4">
                <button
                    onClick={() => {setStepperOpen(false)}}
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
                        cursor: 'pointer', // Hover effect
                        marginTop:'10px'
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
};