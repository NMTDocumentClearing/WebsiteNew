import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import { Card, CardHeader, CardContent, Divider, Grid, Typography,TextField,Button } from '@mui/material';
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
import { getExpenses, getIncomes } from '../../api/adminAPI';
import { useSelector } from 'react-redux';
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
  
  const adminLogin = useSelector((state)=> state.adminLogin)
  const {loading, error, adminInfo} = adminLogin
  console.log(adminInfo);
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

  
  
  useEffect(()=>{
    async function getIncomeData(){
      try {
        const {data} = await getIncomes(date)
        if(data){
            // console.log(data.data);
            setIncomeData(data.data)
            // setUserData(data.data)
        }
      } catch (error) {
        if(error.response.data.message === "Invalid token"){
        //   console.log("sdgvjajavjahc");
          setTokenModalOpen(true)
        }
      }
    }

    async function getExpenseData(){
        try {
          const {data} = await getExpenses(date)
          if(data){
              console.log(data.data);
              setExpenseData(data.data)
              // setUserData(data.data)
          }
        } catch (error) {
          if(error.response.data.message === "Invalid token"){
          //   console.log("sdgvjajavjahc");
            setTokenModalOpen(true)
          }
        }
      }
      getIncomeData()
      getExpenseData()
    },[date])
    
    
 const deliverTOLogin = ()=>{
  localStorage.removeItem('adminInfo');
  navigate('/admin/login')
}




 const getFormatedDate = (date) =>{
  const parsedDate = moment(date);
  return parsedDate.format('DD-MM-YYYY');
 }


  return (
    <>
      <Breadcrumb >
        <Typography component={Link} to="/admin" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb" style={{fontSize:"15px"}}>
          Daysheet
        </Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item style={{width:"100%"}}>
          <Card>
            <CardHeader
              title={
                <Typography component="div" className="card-header" style={{fontSize:"25px", textAlign:"center",fontWeight:"bold"}}>
                  Day Sheet
                </Typography>
              }
            />
            <div  style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "50px",marginBottom:'10px' }}>

            <form style={{alignItems:'center'}}>
                <TextField
                    id="date"
                    label="Select Date"
                    type="date"
                    value={date}
                    onChange={(e)=>setDate(e.target.value)}
                    style={{marginRight:'5px'}}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                </form>
            </div>
            <Divider />
            <CardContent>
             
                <TableContainer component={Paper} >
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
                            
                            {incomeData.map((row) => (
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
                                
                                {row.status === 'Pending' ? <StyledTableCell align="right"><button className='btn' style={{color:"red",fontSize:"10px",backgroundColor:"#E9E9E9"}}>{row.status}</button></StyledTableCell> : <StyledTableCell align="right"><button className='btn' style={{color:"green",fontSize:"10px",backgroundColor:"#E9E9E9"}}>{row.status}</button></StyledTableCell> }
                                <StyledTableCell style={{fontSize:'12px'}} align="right">{row.admin.fullname}</StyledTableCell>
                                </StyledTableRow>
                            ))}

                            {expenseData.map((row) => (
                                <StyledTableRow key={row._id}>
                                <StyledTableCell component="th" scope="row"  style={{fontSize:'12px',color:'red'}}>
                                    {getFormatedDate(row.date)}
                                </StyledTableCell>
                                <StyledTableCell style={{fontSize:'12px',color:'red'}} align="right"></StyledTableCell>
                                <StyledTableCell  style={{fontSize:'12px',color:'red'}} align="right"></StyledTableCell>
                                <StyledTableCell style={{fontSize:'12px',color:'red'}} align="right">{row.particular}</StyledTableCell>
                                <StyledTableCell style={{fontSize:'12px',color:'red'}} align="right"></StyledTableCell>
                                <StyledTableCell style={{fontSize:'12px',color:'red'}} align="right">{row.amount}</StyledTableCell>
                                <StyledTableCell style={{fontSize:'12px',color:'red'}} align="right"></StyledTableCell>
                                
                                <StyledTableCell align="right"><button className='btn' style={{color:"red",fontSize:"10px",backgroundColor:"#E9E9E9"}}></button></StyledTableCell>
                                <StyledTableCell style={{fontSize:'12px'}} align="right">{row.admin.fullname}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {incomeData.length <1 && expenseData.length <1 &&
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
                                fontWeight: '500', 
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
    </>
  );
};

export default DaysheetPage;