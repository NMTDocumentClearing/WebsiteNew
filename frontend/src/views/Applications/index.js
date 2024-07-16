import React, { useEffect, useState, useContext } from 'react';
import { Link,useParams } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiImageEditLine } from "react-icons/ri";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaEye } from "react-icons/fa";



// material-ui
// import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Card, CardHeader, CardContent, Divider, Grid,Box, TextField, Pagination, Typography,Select, MenuItem,InputLabel } from '@mui/material';
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
import { changeProgress, changeStatus, changeViewStatus, getAllApplications, getRecentApplications, } from '../../api/adminAPI';
// import { GrUserWorker } from "react-icons/gr";
import Modal from '../../components/modal';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


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
  const [duplicateEntry,setDuplicateEntry] = useState('')
  const [successOpen,setSuccessOpen] = useState(false);
  const [deleteOpen,setDeleteOpen] = useState(false);
  const [edited, setEdited] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [applicationData, setApplicationData] = useState([])

  const [editModalOpen, setEditModalOpen]= useState(false)
  const [editModalData, setEditModalData]= useState(false)

  const [changeStatusId, setChangeStatusId]= useState('')
  const [rejectReason, setRejectReason]= useState('')
  const [confirmMessage, setConfirmMessage]= useState('')
  const [statusToChange, setStatusToChange]= useState('')
  const [rejectError,setRejectError]= useState('')

  const [stepperModalOpen, setStepperModalOpen]= useState(false)
  const [stepperData, setStepperData] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [confirmModaOpen,setConfirmModalOpen] = useState(false)
  const [progressUpdateId, setProgressUpdateId] = useState('')

  const [applicationType,setApplicationType]= useState('recentApplications')

  const [imageModalOpen, setimageModalOpen]= useState(false)
  const [recentApplications, setRecentApplications] = useState([])

  const [viewApplication, setViewApplication] = useState({})
  const [viewChangeApplicationType, setViewChangeApplicationType] = useState('')
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [viewConfirmModalOpen, setViewConfirmModalOpen] = useState(false)
  const [viewApplicationId, setViewApplicationId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const [totalPages, setTotalPages]= useState(1)

  const [page, setPage] = useState(1);
  const rowsPerPage =  10;

  const {id} = useParams();

  useEffect(()=>{
    setSelectedCategories(stepperData)
    // console.log(selectedCategories);
  },[selectedCategories,stepperData])


  useEffect(()=>{
    async function getAllRecentApplication(){
        try {
            const {data} = await getRecentApplications()
            if(data){
                setRecentApplications(data.data)
                if(applicationType === 'recentApplications'){
                  setPage(1)
                  setTotalPages(Math.ceil(data.data.length/rowsPerPage))
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    getAllRecentApplication()
},[edited,applicationType])

const filteredData = recentApplications.filter(val => {
  if (searchTerm === '') {
      return val;
  } 
  return null;
});

const filteredAppData = applicationData.filter(val => {
  if (searchTerm === '') {
      return val;
  } 
  return null;
});

// const totalFilteredPages = Math.ceil(filteredData.length / rowsPerPage);

const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

const paginatedAppData = filteredAppData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

const handleChangePage = (event, newPage) => {
  console.log(newPage);
  setPage(newPage);
}; 

  const getingformatDate = (date) =>{
    const datePart = date ? date.slice(0, 10) : '';
    return datePart
  }


useEffect(()=>{
    async function getAllApplication(){
        try {
            const {data} = await getAllApplications(applicationType);
            if(data){
                console.log(data.data);
                setApplicationData(data.data)
                setPage(1)
                setTotalPages(Math.ceil(data.data.length/rowsPerPage))
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    getAllApplication()
},[edited,applicationType])





const [docUrls, setDocUrls] = useState([])

let modalUrls = []

const setUPUrls = ({image,passport,passportback,visa})=>{
  //  console.log(image,passport,passportback,visa);
   modalUrls= [image,passport,passportback,visa]
  //  console.log(modalUrls);
   setDocUrls(modalUrls)
}

const handleDeleteButton = async ()=>{
          try {
              if(statusToChange === 'Rejected' && rejectReason === ''){
                  setRejectError('Reason required')
              }else{
                  const {data} = await changeStatus(changeStatusId,rejectReason,statusToChange,applicationType)
                  if(data){
                  setEdited(!edited)
                  setDeleteOpen(false)
                  setSuccessOpen(true)
                  setSuccessMessage('Status Changed Successfully')
                  }
              }
            
          } catch (error) {
            console.error('Error deleting image:', error);
          }
}

const handleViewButton = async ()=>{
  try {
    console.log(viewApplicationId,statusToChange,setViewChangeApplicationType);
      if(viewApplicationId !== '' && statusToChange !== ''&& setViewChangeApplicationType !== ''){
        const {data} = await changeViewStatus(viewApplicationId,statusToChange,viewChangeApplicationType)
        if(data){
        setViewModalOpen(false)
        setEdited(!edited)
        setViewConfirmModalOpen(false)
        // setDeleteOpen(false)
        setSuccessMessage('Status Changed Successfully')
        setSuccessOpen(true) 
        }
      }else{

      }
      
  } catch (error) {
    console.error('Error deleting image:', error);
  }
}


const handleConfirmButtom = async ()=>{
  try {
          const {data} = await changeProgress(progressUpdateId,selectedCategories)
          if(data){
          setStepperData(data.data.progress)
          setEdited(!edited)
          setConfirmModalOpen(false)
          setSuccessOpen(true)
          setSuccessMessage('Progress Added Successfully')
          }
      
    
  } catch (error) {
    console.error('Error deleting image:', error);
  }
}


const isImage = (url) => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  const extension = url.split('.').pop().toLowerCase();
  return imageExtensions.includes(extension);
};

const isPDF = (url) => {
  // console.log(url.split('.').pop().toLowerCase() === 'pdf');
  return url.split('.').pop().toLowerCase() === 'pdf';
};

const downloadImage = async (imageSrc, name) => {
  const imageBlob = await fetch(imageSrc)
    .then((response) => response.arrayBuffer())
    .then((buffer) => new Blob([buffer], { type: 'image/jpeg' }));
  const link = document.createElement('a');
  link.href = URL.createObjectURL(imageBlob);
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const downloadPDF = async (pdfSrc, name) => {
  console.log(pdfSrc);
  const response = await fetch(pdfSrc);
  if (!response.ok) {
    console.error('Failed to fetch PDF');
    return;
  }

  const pdfBlob = await response.blob();
  const link = document.createElement('a');
  link.href = URL.createObjectURL(pdfBlob);
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const changeTypes = (selectedType)=>{
    setApplicationType(selectedType)
}

const handleCheckboxChange = (label, checked) => {
  // Call the handleChange function passed from the parent component
  console.log(label,checked);
  const index = selectedCategories.findIndex(item => item.label === label);
  if (index !== -1) {
    selectedCategories[index].status = checked;

    console.log(selectedCategories);
  }

};
 


  return (
    <>
    
      <Breadcrumb >
        <Typography component={Link} to="/admin" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Home
        </Typography>
        <Typography component={Link} to="/admin/applications" variant="subtitle2" color="primary" className="link-breadcrumb" style={{fontSize:"15px"}}>
          Applications
        </Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item style={{width:"100%"}}>
          <Card>
            <CardHeader
              title={
                <Typography component="div" className="card-header" style={{ fontSize: "25px", textAlign: "center", fontWeight: "bold" }}>
                    Applications List<span style={{ color: "blue" }}>{ userData ? userData.fullname : ''}</span>
                </Typography>
              }
            />
            <div  style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "50px",marginBottom:'10px' }}>

                <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <InputLabel id="company-label" style={{ textAlign: 'center', marginBottom: '5px' }}>Select Application Type</InputLabel>
                    <Select
                        id="company"
                        value={applicationType}
                        onChange={(e) => { setApplicationType(e.target.value); changeTypes(e.target.value); }}
                        sx={{
                          marginRight: '5px',
                          backgroundColor: 'white',
                          color: 'black',
                          width: '200px',
                          '& .MuiSelect-icon': {
                            color: '#265CCF',
                          },
                        }}
                        labelId="company-label"
                      >
                            
                            <MenuItem
                                    value='recentApplications'
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
                                Recent Applications
                            </MenuItem>
                             
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

              {applicationType === 'newLabourApplications'  &&
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
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Company</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Position</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Progress</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Applied On</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Last Updated On</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Status</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedAppData.map((row) => (
                                <StyledTableRow key={row._id}>
                                  {row.type === 'New-Labour-Application' ?
                                    <StyledTableCell align="" style={{fontSize:"12px",fontStyle:'italic',color:'blue'}} onClick={()=>{setUPUrls({image:row.image,passport:row.passport,passportback:row.passportback,visa:row.visitvisa});setimageModalOpen(true)}}>{row.type}</StyledTableCell> :
                                    <StyledTableCell align="" style={{fontSize:"12px"}}>{row.type}</StyledTableCell>
                                  }
                                    <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.name}</StyledTableCell>
                                    <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.nationality}</StyledTableCell>
                                    <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.companyId.fullname}</StyledTableCell>
                                    <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.position}</StyledTableCell>
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <div style={{ position: "relative"}}>
                                            <StyledTableCell   role="button" aria-haspopup="true" aria-expanded="false" align="right" onClick={()=>{setStepperData(row.progress);setStepperModalOpen(true);setProgressUpdateId(row._id)}} style={{fontSize:"12px"}}><MdOutlinePendingActions style={{ fontSize: '20px',color:'red' }}/></StyledTableCell>
                                            {/* <ul className="dropdown-menu" style={{ position: "absolute", bottom: "-10px", right: "0", left: "auto", backgroundColor: 'white', textAlign: "center" }}> 
                                                <li style={{ color: "red", fontSize: "10px", backgroundColor: "white", height: "25px", paddingTop: '4px' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#3E3E3E '; e.target.style.color = 'white'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'black'; e.target.style.color = 'white'; }} onClick={() => { setChangeStatusId(row._id); setConfirmMessage('Are you Sure to Reject?'); setDeleteOpen(true); setStatusToChange('Rejected') }}>Reject</li>
                                                <li style={{ color: "blue", fontSize: "10px", backgroundColor: "white", height: "25px", paddingTop: '4px' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#3E3E3E'; e.target.style.color = 'white'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'black'; e.target.style.color = 'white'; }} onClick={() => { setChangeStatusId(row._id); setConfirmMessage('Are you Sure to Proceed?'); setDeleteOpen(true); setStatusToChange('Under Process') }} >Under Process</li>
                                            </ul>    */}
                                        </div>
                                    </div>
                                    <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.createdAt.slice(0,10)}</StyledTableCell>
                                    <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.updatedAt.slice(0,10)}</StyledTableCell>
                                    {
                                    row.status === 'Pending' &&
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <div style={{ position: "relative"}}>
                                            <StyledTableCell className="dropdown-toggle page-scroll" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style={{ fontSize: "12px", color: "blue", alignItems: 'center' }}>
                                                {row.status}
                                            </StyledTableCell>
                                            <ul className="dropdown-menu" style={{ position: "absolute", bottom: "-10px", right: "0", left: "auto", backgroundColor: 'white', textAlign: "center" }}> 
                                                <li style={{ color: "red", fontSize: "10px", backgroundColor: "white", height: "25px", paddingTop: '4px' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'red'; }} onClick={() => { setChangeStatusId(row._id); setConfirmMessage('Are you Sure to Reject?'); setDeleteOpen(true); setStatusToChange('Rejected') }}>Reject</li>
                                                <li style={{ color: "blue", fontSize: "10px", backgroundColor: "white", height: "25px", paddingTop: '4px' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'blue'; }} onClick={() => { setChangeStatusId(row._id); setConfirmMessage('Are you Sure to Proceed?'); setDeleteOpen(true); setStatusToChange('Under Process') }} >Under Process</li>
                                                <li style={{ color: 'green', fontSize: "10px", backgroundColor: "white", height: "25px", paddingTop: '4px' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'green'; }} onClick={() => { setChangeStatusId(row._id); setConfirmMessage('Are you Sure, Completed?'); setDeleteOpen(true); setStatusToChange('Completed') }}  >Completed</li>
                                            </ul>
                                        </div>
                                    </div>
                                  
                                  }
                                  {
                                    row.status === 'Under Process' &&
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <div style={{ position: "relative"}}>
                                            <StyledTableCell className="dropdown-toggle page-scroll" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style={{ fontSize: "12px", color: "blue", alignItems: 'center' }}>
                                                {row.status}
                                            </StyledTableCell>
                                            <ul className="dropdown-menu" style={{ position: "absolute", bottom: "-10px", right: "0", left: "auto", backgroundColor: 'white', textAlign: "center" }}> 
                                                <li style={{ color: 'green', fontSize: "10px", backgroundColor: "white", height: "25px", paddingTop: '4px' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'green'; }} onClick={() => { setChangeStatusId(row._id); setConfirmMessage('Are you Sure, Completed?'); setDeleteOpen(true); setStatusToChange('Completed') }}  >Completed</li>
                                            </ul>
                                        </div>
                                    </div>
                                  }
                                  {
                                    row.status === 'Rejected' &&
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <div style={{ position: "relative"}}>
                                            <StyledTableCell className="dropdown-toggle page-scroll" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style={{ fontSize: "12px", color: "red", alignItems: 'center' }}>
                                                {row.status}
                                            </StyledTableCell>
                                            <ul className="dropdown-menu" style={{ position: "absolute", bottom: "-10px", right: "0", left: "auto", backgroundColor: 'white', textAlign: "center" }}> 
                                                <li style={{ color: 'green', fontSize: "10px", backgroundColor: "white", height: "25px", paddingTop: '4px' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'green'; }} onClick={() => { setChangeStatusId(row._id); setConfirmMessage('Are you Sure, Completed?'); setDeleteOpen(true); setStatusToChange('Completed') }}  >Completed</li>
                                            </ul>
                                        </div>
                                    </div>
                                  }
                                  {
                                    row.status === 'Completed' &&
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <StyledTableCell align="right" style={{ fontSize: "12px", color: "green" }}>{row.status}</StyledTableCell>
                                    </div>
                                  }
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
              }

              {applicationType === 'recentApplications'  &&
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
                                <StyledTableCell style={{fontSize:"11px"}}>Type</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Company Name</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Applied On</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Last Updated On</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Status</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">View Status</StyledTableCell>
                            </TableRow>
                        </TableHead> 
                        <TableBody>
                            {paginatedData.map((row) => (
                                <StyledTableRow key={row._id}>
                                  {row.type === 'New-Labour-Application' ?
                                    <StyledTableCell align="" style={{fontSize:"12px",fontStyle:'italic',color:'blue'}} onClick={()=>{setUPUrls({image:row.image,passport:row.passport,passportback:row.passportback,visa:row.visitvisa});setimageModalOpen(true)}}>{row.type}</StyledTableCell> :
                                    <StyledTableCell align="" style={{fontSize:"12px"}}>{row.type}</StyledTableCell>
                                  }
                                    <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.companyId.fullname}</StyledTableCell>
                                    <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.createdAt.slice(0,10)}</StyledTableCell>
                                    <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.updatedAt.slice(0,10)}</StyledTableCell>
                                    <StyledTableCell align="right" style={{fontSize:"12px",color:'red'}}>{row.status}</StyledTableCell>
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <div style={{ position: "relative"}}>
                                            <StyledTableCell   role="button" aria-haspopup="true" aria-expanded="false" align="right" onClick={()=>{setViewApplication(row);setViewModalOpen(true)}} style={{fontSize:"10px"}}><FaEye style={{ fontSize: '18px',color:'red' }}/></StyledTableCell>
                                            {/* <ul className="dropdown-menu" style={{ position: "absolute", bottom: "-10px", right: "0", left: "auto", backgroundColor: 'white', textAlign: "center" }}> 
                                                <li style={{ color: "red", fontSize: "10px", backgroundColor: "white", height: "25px", paddingTop: '4px' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#3E3E3E '; e.target.style.color = 'white'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'black'; e.target.style.color = 'white'; }} onClick={() => { setChangeStatusId(row._id); setConfirmMessage('Are you Sure to Reject?'); setDeleteOpen(true); setStatusToChange('Rejected') }}>Reject</li>
                                                <li style={{ color: "blue", fontSize: "10px", backgroundColor: "white", height: "25px", paddingTop: '4px' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#3E3E3E'; e.target.style.color = 'white'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'black'; e.target.style.color = 'white'; }} onClick={() => { setChangeStatusId(row._id); setConfirmMessage('Are you Sure to Proceed?'); setDeleteOpen(true); setStatusToChange('Under Process') }} >Under Process</li>
                                            </ul>    */}
                                        </div>
                                    </div>
                                </StyledTableRow>
                                
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
              }


              {applicationType === 'labourApplications'  &&
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
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Company</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Nationality</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Position</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Applied On</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Last Updated On</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Status</StyledTableCell>
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedAppData.map((row) => (
                                <StyledTableRow key={row._id}>
                                  {row.type === 'New-Labour-Application' ?
                                    <StyledTableCell align="" style={{fontSize:"12px",fontStyle:'italic',color:'blue'}} onClick={()=>{setUPUrls({image:row.image,passport:row.passport,passportback:row.passportback,visa:row.visitvisa});setimageModalOpen(true)}}>{row.type}</StyledTableCell> :
                                    <StyledTableCell align="" style={{fontSize:"12px"}}>{row.type}</StyledTableCell>
                                  }
                                    <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.name}</StyledTableCell>
                                    <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.companyId.fullname}</StyledTableCell>
                                    <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.nationality}</StyledTableCell>
                                    <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.position}</StyledTableCell>
                                    <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.createdAt.slice(0,10)}</StyledTableCell>
                                    <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.updatedAt.slice(0,10)}</StyledTableCell>
                                    {
                                    row.status === 'Pending' &&
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <div style={{ position: "relative"}}>
                                            <StyledTableCell className="dropdown-toggle page-scroll" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style={{ fontSize: "12px", color: "blue", alignItems: 'center' }}>
                                                {row.status}
                                            </StyledTableCell>
                                            <ul className="dropdown-menu" style={{ position: "absolute", bottom: "-10px", right: "0", left: "auto", backgroundColor: 'white', textAlign: "center" }}> 
                                                <li style={{ color: "red", fontSize: "10px", backgroundColor: "white", height: "25px", paddingTop: '4px' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'red'; }} onClick={() => { setChangeStatusId(row._id); setConfirmMessage('Are you Sure to Reject?'); setDeleteOpen(true); setStatusToChange('Rejected') }}>Reject</li>
                                                <li style={{ color: "blue", fontSize: "10px", backgroundColor: "white", height: "25px", paddingTop: '4px' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'blue'; }} onClick={() => { setChangeStatusId(row._id); setConfirmMessage('Are you Sure to Proceed?'); setDeleteOpen(true); setStatusToChange('Under Process') }} >Under Process</li>
                                                <li style={{ color: 'green', fontSize: "10px", backgroundColor: "white", height: "25px", paddingTop: '4px' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'green'; }} onClick={() => { setChangeStatusId(row._id); setConfirmMessage('Are you Sure, Completed?'); setDeleteOpen(true); setStatusToChange('Completed') }}  >Completed</li>
                                            </ul>
                                        </div>
                                    </div>
                                  
                                  }
                                  {
                                    row.status === 'Under Process' &&
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <div style={{ position: "relative"}}>
                                            <StyledTableCell className="dropdown-toggle page-scroll" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style={{ fontSize: "12px", color: "blue", alignItems: 'center' }}>
                                                {row.status}
                                            </StyledTableCell>
                                            <ul className="dropdown-menu" style={{ position: "absolute", bottom: "-10px", right: "0", left: "auto", backgroundColor: 'white', textAlign: "center" }}> 
                                                <li style={{ color: 'green', fontSize: "10px", backgroundColor: "white", height: "25px", paddingTop: '4px' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'green'; }} onClick={() => { setChangeStatusId(row._id); setConfirmMessage('Are you Sure, Completed?'); setDeleteOpen(true); setStatusToChange('Completed') }}  >Completed</li>
                                            </ul>
                                        </div>
                                    </div>
                                  }
                                  {
                                    row.status === 'Rejected' &&
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <div style={{ position: "relative"}}>
                                            <StyledTableCell className="dropdown-toggle page-scroll" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style={{ fontSize: "12px", color: "red", alignItems: 'center' }}>
                                                {row.status}
                                            </StyledTableCell>
                                            <ul className="dropdown-menu" style={{ position: "absolute", bottom: "-10px", right: "0", left: "auto", backgroundColor: 'white', textAlign: "center" }}> 
                                                <li style={{ color: 'green', fontSize: "10px", backgroundColor: "white", height: "25px", paddingTop: '4px' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'green'; }} onClick={() => { setChangeStatusId(row._id); setConfirmMessage('Are you Sure, Completed?'); setDeleteOpen(true); setStatusToChange('Completed') }}  >Completed</li>
                                            </ul>
                                        </div>
                                    </div>
                                  }
                                  {
                                    row.status === 'Completed' &&
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <StyledTableCell align="right" style={{ fontSize: "12px", color: "green" }}>{row.status}</StyledTableCell>
                                    </div>
                                  }
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
              }

              {applicationType === 'documentApplications'  &&
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
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Company</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Applied On</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Last Updated On</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Status</StyledTableCell>
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedAppData.map((row) => (
                                <StyledTableRow key={row._id}>
                                  {row.type === 'New-Labour-Application' ?
                                    <StyledTableCell align="" style={{fontSize:"12px",fontStyle:'italic',color:'blue'}} onClick={()=>{setUPUrls({image:row.image,passport:row.passport,passportback:row.passportback,visa:row.visitvisa});setimageModalOpen(true)}}>{row.type}</StyledTableCell> :
                                    <StyledTableCell align="" style={{fontSize:"12px"}}>{row.type}</StyledTableCell>
                                  }
                                    <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.companyname}</StyledTableCell>
                                    <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.createdAt.slice(0,10)}</StyledTableCell>
                                    <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.updatedAt.slice(0,10)}</StyledTableCell>
                                    {
                                    row.status === 'Pending' &&
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <div style={{ position: "relative"}}>
                                            <StyledTableCell className="dropdown-toggle page-scroll" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style={{ fontSize: "12px", color: "blue", alignItems: 'center' }}>
                                                {row.status}
                                            </StyledTableCell>
                                            <ul className="dropdown-menu" style={{ position: "absolute", bottom: "-10px", right: "0", left: "auto", backgroundColor: 'white', textAlign: "center" }}> 
                                                <li style={{ color: "red", fontSize: "10px", backgroundColor: "white", height: "25px", paddingTop: '4px' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'red'; }} onClick={() => { setChangeStatusId(row._id); setConfirmMessage('Are you Sure to Reject?'); setDeleteOpen(true); setStatusToChange('Rejected') }}>Reject</li>
                                                <li style={{ color: "blue", fontSize: "10px", backgroundColor: "white", height: "25px", paddingTop: '4px' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'blue'; }} onClick={() => { setChangeStatusId(row._id); setConfirmMessage('Are you Sure to Proceed?'); setDeleteOpen(true); setStatusToChange('Under Process') }} >Under Process</li>
                                                <li style={{ color: 'green', fontSize: "10px", backgroundColor: "white", height: "25px", paddingTop: '4px' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'green'; }} onClick={() => { setChangeStatusId(row._id); setConfirmMessage('Are you Sure, Completed?'); setDeleteOpen(true); setStatusToChange('Completed') }}  >Completed</li>
                                            </ul>
                                        </div>
                                    </div>
                                  
                                  }
                                  {
                                    row.status === 'Under Process' &&
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <div style={{ position: "relative"}}>
                                            <StyledTableCell className="dropdown-toggle page-scroll" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style={{ fontSize: "12px", color: "blue", alignItems: 'center' }}>
                                                {row.status}
                                            </StyledTableCell>
                                            <ul className="dropdown-menu" style={{ position: "absolute", bottom: "-10px", right: "0", left: "auto", backgroundColor: 'white', textAlign: "center" }}> 
                                                <li style={{ color: 'green', fontSize: "10px", backgroundColor: "white", height: "25px", paddingTop: '4px' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'green'; }} onClick={() => { setChangeStatusId(row._id); setConfirmMessage('Are you Sure, Completed?'); setDeleteOpen(true); setStatusToChange('Completed') }}  >Completed</li>
                                            </ul>
                                        </div>
                                    </div>
                                  }
                                  {
                                    row.status === 'Rejected' &&
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <div style={{ position: "relative"}}>
                                            <StyledTableCell className="dropdown-toggle page-scroll" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style={{ fontSize: "12px", color: "red", alignItems: 'center' }}>
                                                {row.status}
                                            </StyledTableCell>
                                            <ul className="dropdown-menu" style={{ position: "absolute", bottom: "-10px", right: "0", left: "auto", backgroundColor: 'white', textAlign: "center" }}> 
                                                <li style={{ color: 'green', fontSize: "10px", backgroundColor: "white", height: "25px", paddingTop: '4px' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'green'; }} onClick={() => { setChangeStatusId(row._id); setConfirmMessage('Are you Sure, Completed?'); setDeleteOpen(true); setStatusToChange('Completed') }}  >Completed</li>
                                            </ul>
                                        </div>
                                    </div>
                                  }
                                  {
                                    row.status === 'Completed' &&
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <StyledTableCell align="right" style={{ fontSize: "12px", color: "green" }}>{row.status}</StyledTableCell>
                                    </div>
                                  }
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


      {imageModalOpen && (
      <Modal open={imageModalOpen} onClose={() => setimageModalOpen(false)}>
        <div className='text-center'>
          <div className="flex flex-wrap justify-center gap-3" style={{ display: 'flex', flexWrap: "wrap", justifyItems: 'center', gap: '15px' }}>
            {docUrls.map((item, index) => (
              item.image_url !== '' && (
                <div key={index} style={{ position: 'relative', width: '200px', height: '200px' }}>
                  {isImage(item.image_url) && (
                    <>
                      <img src={item.image_url} alt='img' style={{ width: '100%', height: '100%' }} />
                      {/* Download button */}
                      <p onClick={() => downloadImage(item.image_url, `Image_${index}.jpg`)} style={{ position: 'absolute', bottom: '5px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '5px', borderRadius: '50%', textDecoration: 'none' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M8 2.5a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 1 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 8.293V3a.5.5 0 0 1 .5-.5zM2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10a.5.5 0 0 1-.5-.5z" />
                        </svg>
                      </p>
                    </>
                  )}
                  {isPDF(item.image_url) && (
                    <>
                      <embed src={item.image_url} type="application/pdf" width="100%" height="100%" />
                      {/* Download button */}
                      <p onClick={() => downloadPDF(item.image_url, `Document_${index}.pdf`)} style={{ position: 'absolute', bottom: '5px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '5px', borderRadius: '50%', textDecoration: 'none' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M8 2.5a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 1 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 8.293V3a.5.5 0 0 1 .5-.5zM2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10a.5.5 0 0 1-.5-.5z" />
                        </svg>
                      </p>
                    </>
                  )}
                </div>
              )
            ))}
          </div>
          {/* Optional: Add a button to close the modal */}
        </div>
      </Modal>
    )}

       


        <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
            <div className='text-center' style={{width:"300px",marginTop:"20px"}}>
                
                <div className='mx-auto my-4 w-48'>
                    <h3 className='text-lg font-thin text-gray-800 '>Add A Labour</h3>
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
                             borderRadius: '50%', // To make it a circle
                             cursor: 'pointer' // Optional, adds a pointer cursor when hovering
                           }}
                         >
                           <RiImageEditLine color='white'/>
                         </div>
                       </div> :
                         null
                      }
                      
                      
                      <p style={{textAlign:"center",color:"red"}}>{duplicateEntry}</p>
                      <div className="mb-2" style={{ marginBottom: "10px", marginTop: "20px" }}>
                        
                          <p htmlFor="name" style={{ color: "black", textAlign: "center",fontSize:'10px' }}>Employee Name</p> 
                        
                          <input onChange={(e) => setEditModalData({...editModalData, name: e.target.value})}  value={editModalData.name} name='name'  className="form-control styled-placeholder" style={{ textAlign: "center", color:"black" }} />
                      </div>

                      

                      <div className="mb-2" style={{ marginBottom: "10px",display: "flex", flexDirection: "row" }}>
                        <div style={{marginRight: "6px",flex: "1"}}>
                              <p htmlFor="email" style={{ color: "black", textAlign: "center",fontSize:'10px' }}>Nationality</p>
                              <select 
                                className="form-control styled-placeholder" 
                                style={{ color:"black"}}
                                value={editModalData.nationality}
                                onChange={(e)=>setEditModalData({...editModalData, nationality: e.target.value})}
                                >
                                <option value="" style={{textAlign:"center"}}>Select</option>
                                <option value="India" style={{textAlign:"center"}}>India</option>
                                <option value="Pakistan" style={{textAlign:"center"}}>Pakistan</option>
                                <option value="Nepal" style={{textAlign:"center"}}>Nepal</option>
                                <option value="Bangladesh" style={{textAlign:"center"}}>Bangladesh</option>
                                <option value="Philipine" style={{textAlign:"center"}}>Philipine</option>
                                <option value="Srilanka" style={{textAlign:"center"}}>Srilanka</option>
                                
                            </select>
                        </div>
                        <div style={{ flex: "1" }}>
                          <p style={{ color: "black", textAlign: "center",fontSize:'10px' }}>Position</p>
                          <input 
                            type="text"
                            value={editModalData.position}
                            onChange={(e)=>setEditModalData({...editModalData,position:e.target.value})}
                            name='position'
                            className="form-control styled-placeholder" 
                            style={{ textAlign: "center", color: "#2E2E2E", width: "100%" }}
                            
                          />
                        </div>
                      </div>

                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ marginRight: "6px", flex: "1" }}>
                          <p style={{ color: "black", textAlign: "center",fontSize:'10px' }}>ID Card Expiry</p>
                          <input 
                            
                            className="form-control styled-placeholder" 
                            style={{ textAlign: "center", color: "#2E2E2E", width: "100%" }}
                            onFocus={(e) => e.target.type = 'date'}
                            onBlur={(e) => e.target.type = 'text'}
                            onChange={(e)=>setEditModalData({...editModalData, idCardExpiry:e.target.value})}
                            value={getingformatDate(editModalData.idCardExpiry)}
                          />
                        </div>
                        <div style={{ flex: "1" }}>
                          <p style={{ color: "black", textAlign: "center",fontSize:'10px' }}>Labour card Exp.</p>
                          <input 
                            className="form-control styled-placeholder"
                            style={{ textAlign: "center", color: "#2E2E2E", width: "100%" }}
                            onFocus={(e) => e.target.type = 'date'}
                            onBlur={(e) => e.target.type = 'text'}
                            onChange={(e)=>setEditModalData({...editModalData,labourCardExpiry:e.target.value})}
                            value={getingformatDate(editModalData.labourCardExpiry)}
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



        <Modal open={viewModalOpen} onClose={() => setViewModalOpen(false)}>
            <div className='text-center' style={{width:"300px",marginTop:"20px"}}>
                
                <div className='mx-auto my-4 w-48'>
                    <h3 style={{fontWeight:'bold',color:'black'}} className='text-lg font-thin text-gray-800 '>Application Details </h3>
                    {(viewApplication.type === 'Id-Renewal' || viewApplication.type === 'Labour-Renewal') &&
                     (<div className="card flex justify-content-center">
                        <div style={{display:'flex',flexDirection:'row', justifyContent: 'space-between', width: '100%', marginTop:'20px'}}>
                          <div>
                            <h6>Application Type:</h6>
                          </div>
                          <div>
                            <h6 style={{color:"#215AFF"}}>{viewApplication.type}</h6>
                          </div>
                        </div>

                        <div style={{display:'flex',flexDirection:'row', justifyContent: 'space-between', width:'100%',marginTop:'-10px'}}>
                          <div >
                            <h6>Company Name</h6>
                          </div>
                          <div>
                            <h6 style={{color:"#215AFF"}}>{viewApplication.companyId.fullname}</h6>
                          </div>
                        </div>

                        <div style={{display:'flex',flexDirection:'row', justifyContent: 'space-between', width:'100%',marginTop:'-10px'}}>
                          <div >
                            <h6>Labour Name:</h6>
                          </div>
                          <div>
                            <h6 style={{color:"#215AFF"}}>{viewApplication.name}</h6>
                          </div>
                        </div>
                        <div style={{display:'flex',flexDirection:'row', justifyContent: 'space-between', width:'100%',marginTop:'-10px'}}>
                          <div >
                            <h6>Labour Nationality:</h6>
                          </div>
                          <div>
                            <h6 style={{color:"#215AFF"}}>{viewApplication.nationality}</h6>
                          </div>
                        </div>
                        

                        <div style={{display:'flex',flexDirection:'row', justifyContent: 'space-between', width:'100%',marginTop:'-10px'}}>
                          <div >
                            <h6>Applied On:</h6>
                          </div>
                          <div>
                            <h6 style={{color:"red"}}>{viewApplication.createdAt.slice(0,10)}</h6>
                          </div>
                        </div>

                        <div className="d-grid" style={{ display: "grid", marginTop: "10px" }}>
                              <Button variant="outlined" color="error" style={{fontSize:'12px'}} onClick={() => { setViewApplicationId(viewApplication._id); setStatusToChange('Under Process') ;setViewChangeApplicationType('labourApplications'); setViewConfirmModalOpen(true); setConfirmMessage('Are you Sure') }}>
                                  Change Status As On Progress
                              </Button>
                        </div>

                    </div>
                    )}

                    {(viewApplication.type === 'License' || 
                      viewApplication.type === 'Civil Defence' || 
                      viewApplication.type === 'Chamber' || 
                      viewApplication.type === 'Tenancy') && (
                        <div className="card flex justify-content-center">
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: '20px' }}>
                                <div>
                                    <h6>Application Type:</h6>
                                </div>
                                <div>
                                    <h6 style={{ color: "#215AFF" }}>{viewApplication.type} Renewal</h6>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: '-10px' }}>
                                <div>
                                    <h6>Company Name</h6>
                                </div>
                                <div>
                                    <h6 style={{ color: "#215AFF" }}>{viewApplication.companyname}</h6>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: '-10px' }}>
                                <div>
                                    <h6>Applied On:</h6>
                                </div>
                                <div>
                                    <h6 style={{ color: "red" }}>{viewApplication.createdAt.slice(0, 10)}</h6>
                                </div>
                            </div>

                            <div className="d-grid" style={{ display: "grid", marginTop: "10px" }}>
                                <Button variant="outlined" color="error" style={{ fontSize: '12px' }} onClick={() => { setViewApplicationId(viewApplication._id); setStatusToChange('Under Process'); setViewChangeApplicationType('documentApplications'); setViewConfirmModalOpen(true); setConfirmMessage('Are you Sure') }}>
                                    Change Status As On Progress
                                </Button>
                            </div>
                        </div>
                    )}


                    {(viewApplication.type === 'New-Labour-Application' ) && (
                        <div className="card flex justify-content-center">
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: '20px' }}>
                                <div>
                                    <h6>Application Type:</h6>
                                </div>
                                <div>
                                    <h6 style={{ color: "#215AFF" }}>{viewApplication.type}</h6>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: '-10px' }}>
                                <div>
                                    <h6>Company Name</h6>
                                </div>
                                <div>
                                    <h6 style={{ color: "#215AFF" }}>{viewApplication.companyId.fullname}</h6>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: '-10px' }}>
                                <div>
                                    <h6>Name</h6>
                                </div>
                                <div>
                                    <h6 style={{ color: "#215AFF" }}>{viewApplication.name}</h6>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: '-10px' }}>
                                <div>
                                    <h6>Nationality</h6>
                                </div>
                                <div>
                                    <h6 style={{ color: "#215AFF" }}>{viewApplication.nationality}</h6>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: '-10px' }}>
                                <div>
                                    <h6>Position</h6>
                                </div>
                                <div>
                                    <h6 style={{ color: "#215AFF" }}>{viewApplication.position}</h6>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: '-10px' }}>
                                <div>
                                    <h6>Applied On:</h6>
                                </div>
                                <div>
                                    <h6 style={{ color: "red" }}>{viewApplication.createdAt.slice(0, 10)}</h6>
                                </div>
                            </div>

                            <div className="d-grid" style={{ display: "grid", marginTop: "10px" }}>
                                <Button variant="outlined" color="error" style={{ fontSize: '12px' }} onClick={() => { setViewApplicationId(viewApplication._id); setStatusToChange('Under Process'); setViewChangeApplicationType('newLabourApplications'); setViewConfirmModalOpen(true); setConfirmMessage('Are you Sure') }}>
                                    Change Status As On Progress
                                </Button>
                            </div>
                        </div>
                    )}


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
                <Button variant="outlined" color="error"
                    onClick={() => setSuccessOpen(false)}
                    style={{
                         height:'30px',
                         // Shadow-lg
                        padding: '0.25rem 1rem', // p-1
                        width: '100%', // w-full
                        borderRadius: '0.375rem', // Rounded-md (default value)
                        transition: 'background-color 0.2s ease-in-out', // Hover effect
                        cursor: 'pointer' // Hover effect
                    }}
                    >
                    Ok
                    </Button>
                </div>
            </div>
        </Modal>
    )}


     {stepperModalOpen && (
        <Modal open={stepperModalOpen} onClose={() => setStepperModalOpen(false)}>
            <div className='text-center'>
                <FaCheck size={56} className='mx-auto text-red-600' style={{color:"green",fontSize:"50px"}}></FaCheck>
                <div className='mx-auto my-4 w-48'>
                    <h3 className='text-lg font-thin text-gray-800 ' style={{paddingBottom:'10px'}}>Progress Of Application</h3>
                    <div className="card flex justify-content-center">
                    <FormGroup>
                        {stepperData.map((item, index) => (
                            <FormControlLabel
                                key={index}
                                control={<Checkbox 
                                            defaultChecked={item.status} 
                                            sx={{ width: '40px', height: '40px' }}
                                            onChange={(e) => handleCheckboxChange(item.label, e.target.checked)}
                                            style={{transform: 'scale(1.5)', color: 'red', marginLeft:'70px',width:'20px', height:'20px' }}
                                        />}
                                label={<span style={{ fontSize: '14px',marginLeft:'20px' }}>{item.label}</span>}
                                style={{ color: 'black', fontSize: '30px' }}
                                disabled={item.disabled} // Assuming there's a 'disabled' property in your stepperData
                                classes={{
                                    label: 'label-style' // Apply styles to the label
                                }}
                            />
                        ))}
                    </FormGroup>
                  </div>
                </div>
                <div className="flex gap-4" style={{display:'flex',flexDirection:'row',gap:'5px', paddingTop:'10px'}}>
                  <Button variant="outlined" color="success"
                    onClick={() => setStepperModalOpen(false)}
                    style={{
                        height:'30px',
                        fontWeight: 'bolder', // Thin
                         // Shadow-lg
                        padding: '0.5rem 1rem', // p-1
                        width: '100%', // w-full
                        borderWidth: '2px',
                        borderRadius: '0.375rem', // Rounded-md (default value)
                        transition: 'background-color 0.2s ease-in-out', // Hover effect
                        cursor: 'pointer', // Hover effect
                        
                    }}
                    >
                    Cancel
                    </Button>

                    <Button variant="outlined" color="error"
                    onClick={() => {setStepperModalOpen(false);setConfirmModalOpen(true)}}
                    style={{
                        height:'30px',
                        fontWeight: 'bold', // Thin
                         // Shadow-lg
                        padding: '0.5rem 1rem', // p-1
                        width: '100%', // w-full
                        borderWidth: '2px',
                        borderRadius: '0.375rem', // Rounded-md (default value)
                        transition: 'background-color 0.2s ease-in-out', // Hover effect
                        cursor: 'pointer', // Hover effect
                        
                    }}
                    >
                    Submit
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
                      onClick={()=>setConfirmModalOpen(false)}
                      style={{
                          height:'30px',
                          // Shadow-lg
                          padding: '0.25rem 1rem', // p-1
                          width: '100%', // w-full
                          borderWidth: '2px',
                          borderRadius: '0.375rem', // Rounded-md (default value)
                          transition: 'background-color 0.2s ease-in-out', // Hover effect
                          cursor: 'pointer' // Hover effect
                      }}
                      >
                      Cancel
                      </Button>
                  <Button variant="outlined" color="success"
                        onClick={handleConfirmButtom}
                        style={{
                            height:'30px',
                            padding: '0.25rem 1rem', // p-1
                            width: '100%', // w-full
                            borderWidth: '2px',
                            borderRadius: '0.375rem', // Rounded-md (default value)
                            transition: 'background-color 0.2s ease-in-out', // Hover effect
                            cursor: 'pointer' // Hover effect
                        }}
                    >
                      Ok
                      </Button>

                </div>
                </div>
            </div>
        </Modal>
      )}




    {deleteOpen && (
        <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
            <div className='text-center'>
                {confirmMessage === 'Are you Sure to Reject?' ?
                  <MdDelete size={56} className='mx-auto text-red-600' style={{color:"red",fontSize:"50px"}}></MdDelete> :
                  <FaCheck size={56} className='mx-auto text-red-600' style={{color:"green",fontSize:"50px"}}></FaCheck>
                }
                  <div className='mx-auto my-4 w-48'>
                      <h4 className='text-lg font-thin text-gray-800'>{confirmMessage}</h4>
                  </div>
                {statusToChange === "Rejected" ?
                  <div>
                      <div className="mx-auto my-4 w-48" style={{ marginBottom: "10px", marginTop: "10px" }}>
                          <p htmlFor="name" style={{ color: "black", textAlign: "center" }}>Reason for rejection</p> 

                          <input onChange={(e)=>setRejectReason(e.target.value)} name='name'  className="form-control styled-placeholder" style={{ textAlign: "center", color:"black",fontSize:"11px" }} />
                      </div>
                  </div> :
                  null
                }
                
                {rejectError !== '' && 
                  <p style={{fontSize:'10px',color:'red'}}>{rejectError}</p>
                }

                <div className="flex gap-4">
                <div style={{display:"flex",flexDirection:'row',gap:'10px'}}>
                  <Button variant="outlined" color="success"
                      onClick={()=>setDeleteOpen(false)}
                      style={{
                          height:'30px',
                          fontWeight: 'bolder', // Thin
                          // Shadow-lg
                          padding: '0.25rem 1rem', // p-1
                          width: '100%', // w-full
                          borderWidth: '2px',
                          borderRadius: '0.375rem', // Rounded-md (default value)
                          transition: 'background-color 0.2s ease-in-out', // Hover effect
                          cursor: 'pointer' // Hover effect
                      }}
                      >
                      Cancel
                      </Button>
                  <Button variant="outlined" color="error"
                      onClick={handleDeleteButton}
                      style={{
                          height:'30px',
                          fontWeight: 'bolder', // Thin
                          // Shadow-lg
                          padding: '0.25rem 1rem', // p-1
                          width: '100%', // w-full
                          borderWidth: '2px', 
                          borderRadius: '0.375rem', // Rounded-md (default value)
                          transition: 'background-color 0.2s ease-in-out', // Hover effect
                          cursor: 'pointer' // Hover effect
                      }}
                      >
                      Ok
                      </Button>

                </div>
                </div>
            </div>
        </Modal>
      )} 


    {viewConfirmModalOpen && (
        <Modal open={viewConfirmModalOpen} onClose={() => setViewConfirmModalOpen(false)}>
            <div className='text-center'>
                
                <FaCheck size={56} className='mx-auto text-red-600' style={{color:"green",fontSize:"50px"}}></FaCheck>
                
                <div className='mx-auto my-4 w-48'>
                    <h4 className='text-lg font-thin text-gray-800'>{confirmMessage}</h4>
                </div>
                
                <div className="flex gap-4">
                <div style={{display:"flex",flexDirection:'row',gap:'10px'}}>
                  <Button variant="outlined" color="success"
                      onClick={()=>setViewConfirmModalOpen(false)}
                      style={{
                          fontWeight: 'bold', // Thin
                          height:'30px',
                          // Shadow-lg
                          padding: '0.25rem 1rem', // p-1
                          width: '100%', // w-full
                          borderRadius: '0.375rem', // Rounded-md (default value)
                          transition: 'background-color 0.2s ease-in-out', // Hover effect
                          cursor: 'pointer' // Hover effect
                      }}
                      >
                      Cancel
                      </Button>
                  <Button variant="outlined" color="error"
                      onClick={handleViewButton}
                      style={{
                          
                          fontWeight: '500', // Thin
                          height:'30px',
                          // Shadow-lg
                          padding: '0.25rem 1rem', // p-1
                          width: '100%', // w-full
                          borderRadius: '0.375rem', // Rounded-md (default value)
                          transition: 'background-color 0.2s ease-in-out', // Hover effect
                          cursor: 'pointer' // Hover effect
                      }}
                      >
                      Ok
                      </Button>

                </div>
                </div>
            </div>
        </Modal>
      )}

    </>
  );
};

export default ApplicationPage;
