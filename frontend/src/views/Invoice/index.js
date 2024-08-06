import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import { Card, CardHeader, CardContent, Divider, Grid,Box, TextField, Pagination, Typography,Select, MenuItem,InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// project import
import Breadcrumb from '../../components/adminComponents/Breadcrumb';
import { gridSpacing } from '../../config';

import { confirmReceipt, getExpenses, getExpensesByCompany, getIncomes, getIncomesByCompany, getUserDataWithout, getUsersDatas } from '../../api/adminAPI';
import { useSelector } from 'react-redux';
import Modal from '../../components/modal';
import { IoLockClosed } from "react-icons/io5";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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

function createData(
    name = String,
    calories = Number,
    fat = Number,
    carbs = Number,
    protein = Number,
  ) {
    return { name, calories, fat, carbs, protein };
  }
  const moment = require('moment');
  
  

// ==============================|| SAMPLE PAGE ||============================== //

const DaysheetPage = () => {
  const [userData,setUserData] = useState([])
  
  const adminLogin = useSelector((state)=> state.adminLogin)
  const {loading, error, adminInfo} = adminLogin
//   console.log(adminInfo);
  // const id = adminInfo._id

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
  
  const [tokenModalOpen, setTokenModalOpen] = useState(false)
  const navigate = useNavigate()
  const [incomeData,setIncomeData] = useState([])
  const [expenseData,setExpenseData] = useState([])
  const [date,setDate] = useState(getCurrentDate())
  const [company,setCompany] = useState('')
  const [confirmRecieved,setConfirmRecieved] = useState(false)
  const [recieptId,setReceiptId] = useState('')
  const [recieptChange,setReceiptChange] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')
  const [totalPages, setTotalPages]= useState(1)

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  
  useEffect(()=>{
    async function getIncomeData(){
      try {
        const {data} = await getIncomesByCompany(company)
        if(data){
            setIncomeData(data.data)
            setTotalPages(Math.ceil(data.data.length/rowsPerPage))
        }
      } catch (error) {
        if(error.response.data.message === "Invalid token"){
          setTokenModalOpen(true)
        }
      }
    }

    
      getIncomeData()
    },[company,recieptChange])
    

    const filteredData = incomeData.filter(val => {
      console.log(val);
      if (searchTerm === '') {
          return val;
      } else if ((val.purchase && val.purchase.toString().includes(searchTerm))|| val.date.includes(searchTerm) || val.labour.toLowerCase().includes(searchTerm.toLowerCase()) || val.particular.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val;
      }
      return null;
    });

    const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
      console.log(newPage);
      setPage(newPage);
    };
    
    const deliverTOLogin = ()=>{
      localStorage.removeItem('adminInfo');
      navigate('/admin/login')
    }

    useEffect(()=>{
      async function getUsersData(){
        try {
          const {data} = await getUserDataWithout()
          if(data){
              console.log(data.data);
              setUserData(data.data)
          }
        } catch (error) {
          if(error.response.data.message === "Invalid token"){
            setTokenModalOpen(true)
          }
        }
      }
      getUsersData()
    },[])


 const getFormatedDate = (date) =>{
  const parsedDate = moment(date);
  return parsedDate.format('DD-MM-YYYY');
 }

 const handleRecieve = async(id) =>{
    console.log(recieptId);
    try {
        const {data} = await confirmReceipt(recieptId)
        if(data.data){
            console.log(data.data);
            setConfirmRecieved(false)
            setReceiptChange(!recieptChange)
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
          Invoices
        </Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item style={{width:"100%"}}>
          <Card>
            <CardHeader
              title={
                <Typography component="div" className="card-header" style={{fontSize:"25px", textAlign:"center",fontWeight:"bold"}}>
                  Company Invoice
                </Typography>
              }
            />

            <div  style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "50px",marginBottom:'10px' }}>

                <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <InputLabel id="company-label" style={{ textAlign: 'center', marginBottom: '5px' }}>Select Company</InputLabel>
                    <Select
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        style={{ marginRight: '5px', width: '200px' }}
                        labelId="company-label"
                    >   
                                {userData.map((item, index)=>(
                                <MenuItem
                                    key={item._id}
                                    value={item.fullname}
                                    onChange={(e)=>setCompany(e.target.value)}
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
                                {item.fullname}
                              </MenuItem>

                              ))}
                        
                    </Select>
                </form>
            </div>
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
                        <TableHead >
                            <TableRow>
                               
                                <StyledTableCell style={{fontSize:"15px"}}>Date</StyledTableCell>
                                <StyledTableCell style={{fontSize:"14px"}} align="right">Company</StyledTableCell>
                                <StyledTableCell style={{fontSize:"14px"}} align="right">Labour</StyledTableCell>
                                <StyledTableCell style={{fontSize:"14px"}} align="right">Particulars</StyledTableCell>
                                <StyledTableCell style={{fontSize:"14px"}} align="right">Amount</StyledTableCell>
                                <StyledTableCell style={{fontSize:"14px"}} align="right">Expense</StyledTableCell>
                                <StyledTableCell style={{fontSize:"14px"}} align="right">Profit</StyledTableCell>
                                <StyledTableCell style={{fontSize:"14px"}} align="right">Status</StyledTableCell>
                                <StyledTableCell style={{fontSize:"14px"}} align="right">Added By</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                            
                            {paginatedData.map((row) => (
                                <StyledTableRow key={row._id}>
                                <StyledTableCell component="th" scope="row"  style={{fontSize:'12px',color:'green'}}>
                                    {getFormatedDate(row.date)}
                                </StyledTableCell>
                                <StyledTableCell style={{fontSize:'12px',color:'green'}} align="right">{row.company}</StyledTableCell>
                                <StyledTableCell style={{fontSize:'12px',color:'green'}} align="right">{row.labour}</StyledTableCell>
                                <StyledTableCell style={{fontSize:'12px',color:'green'}} align="right">{row.particular}</StyledTableCell>
                                <StyledTableCell style={{fontSize:'12px',color:'green'}} align="right">{row.sale}</StyledTableCell>
                                <StyledTableCell style={{fontSize:'12px',color:'green'}} align="right">{row.purchase}</StyledTableCell>
                                <StyledTableCell style={{fontSize:'12px',color:"green"}} align="right">{row.profit}</StyledTableCell>
                                
                                {row.status === 'Pending' ? <StyledTableCell align="right"><button onClick={()=>{setConfirmRecieved(true);setReceiptId(row._id)}} className='btn' style={{color:"red",fontSize:"10px",backgroundColor:"#F1F1F1"}}>{row.status}</button></StyledTableCell> : <StyledTableCell align="right"><button className='btn' style={{color:"blue",fontSize:"10px",backgroundColor:"#F1F1F1"}}>{row.status}</button></StyledTableCell> }
                                <StyledTableCell style={{fontSize:'12px'}} align="right">{row.admin.fullname}</StyledTableCell>
                                </StyledTableRow>
                            ))}

                            
                        </TableBody>
                    </Table>
                        {incomeData.length <1 &&
                               <p style={{fontSize:'12px',color:'red',textAlign:"center",marginTop:'7px'}}>No Records Found</p>
                        }
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

    {confirmRecieved && (
        <Modal open={confirmRecieved} onClose={() => setConfirmRecieved(false)}>
            <div className='text-center'>
                <CheckCircleIcon size={56} className='mx-auto text-red-600' style={{color:"green",fontSize:"50px"}}></CheckCircleIcon>
                <div className='mx-auto my-4 w-48'>
                    <h4 className='text-lg font-thin text-gray-800'>Are You Recieved the Amount? </h4>
                </div>
                <div className="flex gap-4">
                <div style={{display:"flex",flexDirection:'row',gap:'10px'}}>
                  <button
                      onClick={()=>setConfirmRecieved(false)}
                      style={{
                          backgroundColor: 'red', // Red-500
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
                      No
                      </button>
                  <button
                      onClick={handleRecieve}
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
                      Yes
                      </button>

                </div>
                </div>
            </div>
        </Modal>
      )}
    </>
  );
};

export default DaysheetPage;