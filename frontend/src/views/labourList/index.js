
import React, { useEffect, useState, useContext } from 'react';
import { Link,useLocation,useParams } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import { MdOutlineStorage } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin7Line } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { RiImageEditLine } from "react-icons/ri";
import { AppContext } from '../appContext';


import { Card, CardHeader, CardContent, Divider, Grid, Box, TextField, Pagination, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {BsFillCheckCircleFill} from 'react-icons/bs'

// project import
import Breadcrumb from '../../components/adminComponents/Breadcrumb';
import { gridSpacing } from '../../config';
import { addLabour, cloudinaryDelete, deleteLabourData, editLabour, getAllLaboursList, getLaboursList, getUserDatas, getUsersDatas, uploadCloudinary } from '../../api/adminAPI';
import { GrUserWorker } from "react-icons/gr";
import Modal from '../../components/modal';


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

const LabourPage = () => {
  
  const [userData,setUserData] = useState([])
  const [usersData,setUsersData] = useState([])
  const [labourData, setLabourdata] = useState([])
  const [addLabourModalOpen,setAddLabourModalOpen] = useState(false)
  const [image,setImage] = useState('')
  const [cloudinaryImage, setCloudinaryImage] = useState("")
  const [imgUploading, setImgUploading] = useState(false)
  const [uploadedImg, setUplodedImg] = useState(false)
  const [errorImg, setErrorImg] = useState('')
  const [activeSubmit, setActiveSubmit] = useState(false)
  const [image_url, setImage_url] = useState(null);
  const [deleteImage_url, setDeleteImage_url] = useState(null);
  const [deleteLabour, setDeleteLabour] = useState(null);
  const [public_id, setPublic_id] = useState(null);
  const [duplicateEntry,setDuplicateEntry] = useState('')
  const [successOpen,setSuccessOpen] = useState(false);
  const [deleteOpen,setDeleteOpen] = useState(false);
  const [added, setAdded] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [edited, setEdited] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')   
  const [name, setName] = useState('');
  const [nationality, setNationality] = useState('');
  const [position,setPosition] = useState('');
  const [labourCardExpiry, setLabourCardExpiry] = useState('')
  const [idCardExpiry, setIdCardExpiry] = useState('')
  const [expiryData, setExpiryData]= useState([])
  const [laboursData, setLaboursData] = useState([])

  const [formError,setFormError] = useState('')

  const [editModalOpen, setEditModalOpen]= useState(false)
  const [editModalData, setEditModalData]= useState(false)

  const [labourCardOpen,setLabourCardOpen] = useState(false)
  const [labourCardData,setLabourCardData] = useState('')

  const [idCardOpen,setIdCardOpen] = useState(false)
  const [idCardData,setIdCardData] = useState('')

  const [idCardNumber, setIdCardNumber] = useState(1234)
  const [labourCardNumber,setLabourCardNumber] = useState(1234)

  const [searchTerm, setSearchTerm] = useState('')
  const [totalPages, setTotalPages]= useState(1)

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const location = useLocation();
  const { id } = location.state || {};


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const getingformatDate = (date) =>{
    const datePart = date ? date.slice(0, 10) : '';
    return datePart
  }

  useEffect(()=>{
    async function getUsersData(){
        // const {laboursData} = await getLaboursList(id)
        const {data} = await getUsersDatas()
        if(data){
            // console.log(data.data);
            setUsersData(data.data)
        }
    }
    getUsersData()

 },[])

 useEffect(()=>{
  async function getUserData(){
      if(id !==''){
        const {data} = await getUserDatas(id)
        if(data){
            // console.log(data.data);
            setUserData(data.data)
        }
      }
  }
  getUserData()

},[])

useEffect(()=>{
  async function getLabourData(){
    const {data} = await getLaboursList(id)
    if(data){
      setLabourdata(data.data)
      setTotalPages(Math.ceil(data.data.length/rowsPerPage))
    }
  }
  getLabourData()
  async function getLaboursData(){
    const {data} = await getAllLaboursList()
    if(data){
      setLaboursData(data.data)
    }
  }
  getLaboursData()
  console.log(laboursData);

},[added,deleted,edited])

const filteredData = labourData.filter(val => {
  if (searchTerm === '') {
      return val;
  } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase()) || val.idCardExpiry.includes(searchTerm) || val.labourCardExpiry.includes(searchTerm)) {
      return val;
  }
  return null;
});

const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);


const handleModalSubmit = async (e)=>{
   e.preventDefault();
   const companyName = userData.fullname
   if(name !== '' && image_url !== '' && public_id !== '' && nationality !== '' && position !== '' && idCardExpiry !== '' && companyName !== '' && labourCardExpiry !== '' && id !== ''){
     const {data} = await addLabour(name,nationality,image_url,public_id,position,idCardExpiry,companyName,labourCardExpiry,id,idCardNumber,labourCardNumber)
     if(data.data){
        setSuccessMessage('Labour Added Successfully')
        setAddLabourModalOpen(false)
        setSuccessOpen(true)
        setUplodedImg(false)
        setImgUploading(false)
        setActiveSubmit(false)
        setAdded(!added)
        setImage_url(null)
        setDuplicateEntry('')
        e.target.reset();
     }else{
        setDuplicateEntry(data)
     }
   }else{
     setFormError('All Fields required')
   }
 }

 const { setEmployeesWithExpiry } = useContext(AppContext);
 const { employeesWithExpiry } = useContext(AppContext);


 useEffect(()=>{
  const companyData = labourData.reduce((accumulator, currentValue) => {
    const labourString = currentValue.labourCardExpiry;
    const labourNew = new Date(labourString);
    const currentDate = new Date();
    const differenceInMs = labourNew - currentDate;
    const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

    const idString = currentValue.idCardExpiry;
    const idNew = new Date(idString);
    const IddifferenceInMs = idNew - currentDate;
    const IddifferenceInIdDays = IddifferenceInMs / (1000 * 60 * 60 * 24);

    if (!accumulator[currentValue.company]) {
      accumulator[currentValue.company] = {
          data: [currentValue],
          labourExpiry: differenceInDays < 15 ? [currentValue] : [],
          idExpiry: IddifferenceInIdDays < 15 ? [currentValue] : []
      };
  } else {
      // If exists, push the current value to the existing array
      accumulator[currentValue.company].data.push(currentValue);
      if (differenceInDays < 15) {
          accumulator[currentValue.company].labourExpiry.push(currentValue);
      }
      if (IddifferenceInIdDays < 15) {
          accumulator[currentValue.company].idExpiry.push(currentValue);
      }
  }
      return accumulator;
  }, {});

  const companyDataArray = Object.entries(companyData).map(([company, data]) => ({
    company,
    data: data.data,
    labourExpiry: data.labourExpiry,
    idExpiry: data.idExpiry
}));

  if(companyDataArray.length >0){
    setExpiryData(companyDataArray)
    const updatedArray = employeesWithExpiry.map(item => {
      if (item.company === companyDataArray[0].company) {
        // Assuming 'editedExpiryType' is either 'idExpiry' or 'labourExpiry'
        return {
          ...item,
          idExpiry: companyDataArray[0].idExpiry,
          labourExpiry:companyDataArray[0].labourExpiry 
        };
      }
      return item;
    });
    setEmployeesWithExpiry(updatedArray)
  }

},[labourData])




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

 const imageUpload = (async (e) =>{
      e.preventDefault();
      const uploadingImage = async (image)=>{
        if(image === ''){
          setErrorImg('Minimum One Document Required')
        }else{
          setImgUploading(true)
          setErrorImg('')
          try {
              const formData = new FormData();
              formData.append("file", image);
              formData.append("upload_preset", "NMT Document Clearings");
              const response = await uploadCloudinary(formData)
              const responseData = response.data;
              setImage_url(responseData.url);
              setPublic_id(responseData.public_id);
              setCloudinaryImage(responseData.secure_url);
  
              setImgUploading(false)
              setUplodedImg(true)
              setErrorImg('')
              setActiveSubmit(true)
          } catch (error) {
            console.log(error);
          }
        }
      }

      const docData = await uploadingImage(image)

 })

 const handleEditmodalSubmit = (async (e) =>{
    e.preventDefault();
    console.log(editModalData);
    const {_id,name,nationality,position,idCardExpiry,labourCardExpiry,idCardNumber,labourCardNumber} = editModalData
    const image_url = editModalData.image.image_url
    const public_id = editModalData.image.public_id
    const companyName = editModalData.company
    const id = editModalData.companyId
    const {data} = await editLabour(name,nationality,image_url,public_id,position,idCardExpiry,companyName,labourCardExpiry,id,_id,idCardNumber,labourCardNumber)
    if(data){
      setSuccessMessage('Labour Edited Successfully')
      setEditModalOpen(false)
      setSuccessOpen(true)
      setEdited(!edited)
    }
})


 

    
async function deleteCloudinaryImage(publicId) {
     const {data} = await cloudinaryDelete(publicId)
     return data
}

const handleDeleteButtom = async (_id,public_id)=>{
          try {
            const data =await deleteCloudinaryImage(deleteImage_url);
            if(data){
                 const deleteData = await deleteLabourData(deleteLabour)
                 if(deleteData.status === 201){
                  setDeleted(!deleted)
                  setDeleteOpen(false)
                  setSuccessOpen(true)
                  setSuccessMessage('Labour Deleted Successfully')
                 }
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
        <Typography component={Link} to="/admin/companies" variant="subtitle2" color="primary" className="link-breadcrumb" style={{fontSize:"15px"}}>
          Companies
        </Typography>
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb" style={{fontSize:"15px"}}>
          Labours
        </Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item style={{width:"100%"}}>
          <Card>
            <CardHeader
              title={
                
                <Typography component="div" className="card-header" style={{ fontSize: "25px", textAlign: "center", fontWeight: "bold" }}>
                    Labours List - <span style={{ color: "blue" }}>{ userData ? userData.fullname : ''}</span>
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
                        label="Search Labour"
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
                                  <img src={row.image.image_url} alt="User Avatar" style={{ width: '35px', height: '35px', borderRadius: '50%' }} />
                                </StyledTableCell>
                                <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.name}</StyledTableCell>
                                <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.nationality}</StyledTableCell>
                                <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.position}</StyledTableCell>
                                
                                <StyledTableCell align="right" onClick={()=>{setIdCardOpen(true);setIdCardData(row)}} style={{fontSize:"12px"}}>{getFormatedDate(row.idCardExpiry)}
                                  <p style={{fontSize:'9px',color:'red'}}>{getExpiryDays(row.idCardExpiry) < 15 ? 'Expire soon' : null}</p>
                                </StyledTableCell>

                                <StyledTableCell align="right" onClick={()=>{setLabourCardData(row);setLabourCardOpen(true)}} style={{fontSize:"12px"}}>{getFormatedDate(row.labourCardExpiry)}
                                  <p style={{fontSize:'9px',color:'red'}}>{getExpiryDays(row.labourCardExpiry) < 15 ? 'Expire soon' : null}</p>
                                </StyledTableCell>

                                <StyledTableCell align="center" className='dropdown' style={{ position: "relative",fontSize:"12px" }}>
                                <div style={{ position: "relative",right:'0' }}>
                                    <MdOutlineStorage color='red' className="dropdown-toggle page-scroll" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"/>
                                    <ul className="dropdown-menu" style={{ position: "absolute",heght:'50px' ,bottom: "-10px", right: "-10px", backgroundColor:'white' }}> 
                                        <li style={{ textAlign: "center",justifyContent:'center',alignItems:'center',color:"blue", fontSize: "13px", backgroundColor:"white",height:"25px",paddingTop:'4px'}} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'blue'; }} onClick={()=>{setEditModalOpen(true);setEditModalData(row);setIdCardExpiry(getFormatedDate(row.idCardExpiry));setLabourCardExpiry(getFormatedDate(row.labourCardExpiry))}}>Edit <FaRegEdit /></li>
                                        <li style={{ textAlign: "center",color:'red', justifyContent:'center',alignItems:'center',fontSize: "13px", backgroundColor:"white", height:"25px",paddingTop:'4px'}} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'red'; }} onClick={()=>{setDeleteOpen(true);setDeleteImage_url(row.image.public_id);setDeleteLabour(row._id)}}>Delete <RiDeleteBin7Line /></li>
                                    </ul>
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
                <button onClick={()=>setAddLabourModalOpen(true)} className="btn" style={{justifyContent:'center',width:"100%",alignItems:"center",marginTop:"24px",backgroundColor:"#214AFF",color:"white",fontWeight:"500"}}>
                    Add A Labour
                </button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Modal open={addLabourModalOpen} onClose={() => setAddLabourModalOpen(false)}>
            <div className='text-center' style={{width:"300px",marginTop:"20px"}}>
                
                <div className='mx-auto my-4 w-48'>
                    <h3 className='text-lg font-thin text-gray-800 '>Add A Labour</h3>
                    <p style={{color:'red',fontSize:'11px'}}>{formError}</p>
                    <form onSubmit={handleModalSubmit}>
                      {image_url === null ?
                        <GrUserWorker color='blue' style={{width:"50px",height:"50px"}}></GrUserWorker> :
                        <img src={image_url} alt='img' style={{height:"100px",width:"100px",borderRadius:"50px"}}></img>
                      }
                      
                    <p style={{textAlign:"center",color:"red"}}>{duplicateEntry}</p>
                      <div className="mb-2" style={{ marginBottom: "10px", marginTop: "20px",fontSize:'11px' }}>
                        
                          <p htmlFor="name" style={{ color: "black", textAlign: "center" }}>Employee Name</p> 
                        
                          <input onChange={(e)=>setName(e.target.value)} name='name'  className="form-control styled-placeholder" style={{ textAlign: "center", color:"black",fontSize:'12px' }} />
                      </div>

                      

                      <div className="mb-2" style={{ marginBottom: "10px",display: "flex", flexDirection: "row",fontSize:'11px' }}>
                        <div style={{marginRight: "6px",flex: "1"}}>
                              <p htmlFor="email" style={{ color: "black", textAlign: "center",fontSize:'12px' }}>Nationality</p>
                              <select 
                                className="form-control styled-placeholder" 
                                style={{ color:"black",fontSize:'11px'}}
                                onChange={(e)=>setNationality(e.target.value)}
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
                          <p style={{ color: "black", textAlign: "center",fontSize:'11px' }}>Position</p>
                          <input 
                            type="text"
                            onChange={(e)=>setPosition(e.target.value)}
                            name='position'
                            className="form-control styled-placeholder" 
                            style={{ textAlign: "center", color: "#2E2E2E", width: "100%",fontSize:'12px' }}
                            
                          />
                        </div>

                      </div>


                      <div className="mb-2" style={{ marginBottom: "10px",display: "flex", flexDirection: "row",fontSize:'11px',gap:'10px' }}>
                        <div style={{ flex: "1" }}>
                          <p style={{ color: "black", textAlign: "center",fontSize:'11px' }}>Id card number</p>
                          <input 
                            type="number"
                            onChange={(e)=>setIdCardNumber(e.target.value)}
                            name='position'
                            className="form-control styled-placeholder" 
                            style={{ textAlign: "center", color: "#2E2E2E", width: "100%",fontSize:'12px' }}
                            
                          />
                        </div>
                        <div style={{ flex: "1" }}>
                          <p style={{ color: "black", textAlign: "center",fontSize:'11px' }}>Labour card number</p>
                          <input 
                            type="number"
                            onChange={(e)=>setLabourCardNumber(e.target.value)}
                            name='position'
                            className="form-control styled-placeholder" 
                            style={{ textAlign: "center", color: "#2E2E2E", width: "100%",fontSize:'12px' }}
                            
                          />
                        </div>
                      </div>

                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ marginRight: "6px", flex: "1" }}>
                          <p style={{ color: "black", textAlign: "center",fontSize:'11px' }}>ID Card Expiry</p>
                          <input 
                            type="date" 
                            className="form-control styled-placeholder" 
                            style={{ textAlign: "center", color: "#2E2E2E", width: "100%",fontSize:'11px' }}
                            onFocus={(e) => e.target.type = 'date'}
                            onBlur={(e) => e.target.type = 'text'}
                            onChange={(e)=>setIdCardExpiry(e.target.value)}
                            placeholder=""
                          />
                        </div>
                        <div style={{ flex: "1" }}>
                          <p style={{ color: "black", textAlign: "center",fontSize:'11px' }}>Labour card Exp.</p>
                          <input 
                            type="date" 
                            className="form-control styled-placeholder" 
                            style={{ textAlign: "center", color: "#2E2E2E", width: "100%",fontSize:'11px' }}
                            onFocus={(e) => e.target.type = 'date'}
                            onBlur={(e) => e.target.type = 'text'}
                            onChange={(e)=>setLabourCardExpiry(e.target.value)}
                            placeholder=""
                          />
                        </div>
                      </div>

                      
                    {image_url === null ?
                    
                      <form action="" style={{width:"100%",marginTop:"10px"}}>
                                <p htmlFor="phone" style={{ color: "black", textAlign: "center",fontSize:'11px' }}>Select The Image</p>
                                      <label className="block" style={{border:"2px solid",borderColor:"#DCDCDC",borderRadius:"5px", padding:"6px",fontSize:'11px'}}>
                                          <span className="sr-only">Choose an Image</span>
                                              <input type="file" name='image' className="block w-full text-sm text-gray-500
                                              file:mr-4 file:py-2 file:px-4
                                              file:rounded-md file:border-0
                                              file:text-sm file:font-semibold
                                              file:bg-black file:text-white
                                              hover:file:bg-gray-600
                                              "
                                              onChange={(e)=>setImage(e.target.files[0])}
                                              />
                                      </label>
                                      
                                      <div className="w-full  mb-6 md:mb-0 pr-1 mt-2" style={{ display: "grid", marginTop: "10px" }}>
                                            
                                      {!uploadedImg ?
                                                <button onClick={imageUpload} className="btn" style={{backgroundColor:"#215AFF",color:"white",border:'none',fontWeight:"500"}}>
                                                    {!imgUploading && !activeSubmit ?
                                                        <span>Submit Image</span>
                                                        :
                                                        <div role="status">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="30px" height="30px">
                                                              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-3h2v-6h-2v6zm1-8c-.552 0-1 .448-1 1s.448 1 1 1c.552 0 1-.448 1-1s-.448-1-1-1z">
                                                                  <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 12 12" to="360 12 12" dur="0.6s" repeatCount="indefinite"/>
                                                              </path>
                                                            </svg>
                                                        </div>
                                                    }
                                                </button>:
                                                <div className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                                    <BsFillCheckCircleFill className='mx-auto' color='white' size={30}/>
                                                </div>
                                            }
                                            {errorImg !== '' &&
                                                <span className='text-red-600 text-sm' style={{color:"red",fontSize:"12px",marginTop:"8px"}}>{errorImg}</span>
                                            }
                                    </div>
                        </form> :
                        null
                        }
                      {activeSubmit && image_url !== null?
                      <div className="d-grid" style={{ display: "grid", marginTop: "20px" }}>
                          
                              <button type="submit" className="btn" style={{backgroundColor:"#215AFF",color:"white",fontWeight:"500"}}>
                                  Add
                              </button> 
                          
                      </div> :
                      null
                      }
                  </form>
                </div>
                
            </div>
        </Modal>


        <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
            <div className='text-center' style={{width:"300px",marginTop:"20px"}}>
                
                <div className='mx-auto my-4 w-48'>
                    <h3 className='text-lg font-thin text-gray-800 ' style={{color:'red'}}>Edit The Labour</h3>
                    <form onSubmit={handleEditmodalSubmit}>
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
                        
                          <input onChange={(e) => setEditModalData({...editModalData, name: e.target.value})}  value={editModalData.name} name='name'  className="form-control styled-placeholder" style={{ textAlign: "center", color:"black",fontSize:'11px' }} />
                      </div>

                      

                      <div className="mb-2" style={{ marginBottom: "10px",display: "flex", flexDirection: "row" }}>
                        <div style={{marginRight: "6px",flex: "1"}}>
                              <p htmlFor="email" style={{ color: "black", textAlign: "center",fontSize:'10px' }}>Nationality</p>
                              <select 
                                className="form-control styled-placeholder" 
                                style={{ color:"black",fontSize:'11px'}}
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
                            style={{ textAlign: "center", color: "#2E2E2E", width: "100%",fontSize:'11px' }}
                            
                          />
                        </div>

                      </div>

                      <div className="mb-2" style={{ marginBottom: "10px",display: "flex", flexDirection: "row",gap:'7px' }}>
                        <div style={{ flex: "1" }}>
                          <p style={{ color: "black", textAlign: "center",fontSize:'10px' }}>ID Card No.</p>
                          <input 
                            type="number"
                            value={editModalData.idCardNumber}
                            onChange={(e)=>setEditModalData({...editModalData,idCardNumber:e.target.value})}
                            name='position'
                            className="form-control styled-placeholder" 
                            style={{ textAlign: "center", color: "#2E2E2E", width: "100%",fontSize:'11px' }}
                            
                          />
                        </div>
                        <div style={{ flex: "1" }}>
                          <p style={{ color: "black", textAlign: "center",fontSize:'10px' }}>Labour Card No.</p>
                          <input 
                            type="number"
                            value={editModalData.labourCardNumber} 
                            onChange={(e)=>setEditModalData({...editModalData,labourCardNumber:e.target.value})}
                            name='position'
                            className="form-control styled-placeholder" 
                            style={{ textAlign: "center", color: "#2E2E2E", width: "100%",fontSize:'11px' }}
                            
                          />
                        </div>

                      </div>

                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ marginRight: "6px", flex: "1" }}>
                          <p style={{ color: "black", textAlign: "center",fontSize:'10px' }}>ID Card Expiry</p>
                          <input 
                            
                            className="form-control styled-placeholder" 
                            style={{ textAlign: "center", color: "#2E2E2E", width: "100%",fontSize:'11px' }}
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
                            style={{ textAlign: "center", color: "#2E2E2E", width: "100%",fontSize:'11px' }}
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




        {successOpen && (
        <Modal open={successOpen} onClose={() => setSuccessOpen(false)}>
            <div className='text-center'>
                <FaCheck size={56} className='mx-auto text-red-600' style={{color:"green",fontSize:"50px"}}></FaCheck>
                <div className='mx-auto my-4 w-48'>
                    <h3 className='text-lg font-thin text-gray-800 '>{successMessage}</h3>
                </div>
                <div className="flex gap-4">
                <button
                    onClick={() => setSuccessOpen(false)}
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

{idCardOpen && (
        <Modal open={idCardOpen} onClose={() => setIdCardOpen(false)}>
            <div className='text-center' style={{marginTop:'-18px'}}>
                {/* <FaCheck size={56} className='mx-auto text-red-600' style={{color:"green",fontSize:"50px"}}></FaCheck> */}
                <div className='mx-auto my-4 w-48' style={{backgroundColor:'#A5A5A5', borderRadius:'7px 7px 0px 0px'}}>
                    <h3 className='text-lg font-thin text-gray-800' style={{padding:'10px',fontWeight:'bold',fontFamily:'monospace',color:'white'}}>ID Card Data</h3>
                </div>

                <div className='' style={{display:'flex',flexDirection:'row',gap:'10px'}}>
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <img src={idCardData.image.image_url} alt="LabourImage" style={{ width: '90px', height: '105px', borderRadius: '4%' }} />
                    </div>
                    <div style={{alignItems:'flex-start'}}>
                        <p style={{color:'red',textAlign:'start',fontSize:'15px'}}><span style={{color:'#A5A5A5',fontSize:'12px',fontWeight:'normal'}}>Name:</span> {idCardData.name}</p>
                        <p style={{color:'black',textAlign:'start',fontSize:'15px'}}><span style={{color:'#A5A5A5',fontSize:'12px',fontWeight:'normal'}}>Nationality:</span> {idCardData.nationality}</p>
                        <p style={{color:'black',textAlign:'start',fontSize:'15px'}}><span style={{color:'#A5A5A5',fontSize:'12px',fontWeight:'normal'}}>Position:</span> {idCardData.position}</p>
                        <p style={{color:'blue',textAlign:'start',fontWeight:'bold',fontSize:'15px'}}><span style={{color:'#A5A5A5',fontSize:'12px',fontWeight:'normal'}}>IdCard Number:</span> {idCardData.idCardNumber}</p>
                    </div>
                </div>
                <div className="flex gap-4">
                <button
                    onClick={() => setIdCardOpen(false)}
                    style={{
                        backgroundColor: '#A5A5A5', // Red-500
                        color: '#FFFFFF', 
                        fontWeight: '500', // Thin
                         // Shadow-lg
                        padding: '0.25rem 1rem', // p-1
                        border:"none",
                        width: '100%', // w-full
                        borderRadius:'0px 0px 7px 7px', // Rounded-md (default value)
                        transition: 'background-color 0.2s ease-in-out', // Hover effect
                        cursor: 'pointer', // Hover effect
                        marginTop:'20px'
                    }}
                    >
                    Ok
                    </button>
                </div>
            </div>
        </Modal>
    )}



{labourCardOpen && (
        <Modal open={labourCardOpen} onClose={() => setLabourCardOpen(false)}>
            <div className='text-center' style={{marginTop:'-18px'}}>
                {/* <FaCheck size={56} className='mx-auto text-red-600' style={{color:"green",fontSize:"50px"}}></FaCheck> */}
                <div className='mx-auto my-4 w-48' style={{backgroundColor:'#A5A5A5', borderRadius:'7px 7px 0px 0px'}}>
                    <h3 className='text-lg font-thin text-gray-800' style={{padding:'10px',fontWeight:'bold',fontFamily:'monospace',color:'white'}}>Labour Card</h3>
                </div>

                <div className='' style={{display:'flex',flexDirection:'row',gap:'10px'}}>
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <img src={labourCardData.image.image_url} alt="LabourImage" style={{ width: '90px', height: '105px', borderRadius: '4%' }} />
                    </div>
                    <div style={{alignItems:'flex-start'}}>
                        <p style={{color:'red',textAlign:'start',fontSize:'15px',fontFamily:'inherit'}}><span style={{color:'#A5A5A5',fontSize:'12px',fontWeight:'normal'}}>Name:</span> {labourCardData.name}</p>
                        <p style={{color:'black',textAlign:'start',fontSize:'15px',fontFamily:'inherit'}}><span style={{color:'#A5A5A5',fontSize:'12px',fontWeight:'normal'}}>Nationality:</span> {labourCardData.nationality}</p>
                        <p style={{color:'black',textAlign:'start',fontSize:'15px',fontFamily:'inherit'}}><span style={{color:'#A5A5A5',fontSize:'12px',fontWeight:'normal'}}>Position:</span> {labourCardData.position}</p>
                        <p style={{color:'blue',textAlign:'start',fontWeight:'bold',fontSize:'15px',fontFamily:'inherit'}}><span style={{color:'#A5A5A5',fontSize:'12px',fontWeight:'normal'}}>LabourCard Number:</span> {labourCardData.labourCardNumber}</p>
                    </div>
                </div>
                <div className="flex gap-4">
                <button
                    onClick={() => setLabourCardOpen(false)}
                    style={{
                        backgroundColor: '#A5A5A5', // Red-500
                        color: '#ffffff', 
                        fontWeight: '500', // Thin
                         // Shadow-lg
                        padding: '0.25rem 1rem', // p-1
                        border:"none",
                        width: '100%', // w-full
                        borderRadius:'0px 0px 7px 7px', // Rounded-md (default value)
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


    {deleteOpen && (
        <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
            <div className='text-center'>
                <MdDelete size={56} className='mx-auto text-red-600' style={{color:"red",fontSize:"50px"}}></MdDelete>
                <div className='mx-auto my-4 w-48'>
                    <h4 className='text-lg font-thin text-gray-800'>Are You Sure To Delete? </h4>
                </div>
                <div className="flex gap-4">
                <div style={{display:"flex",flexDirection:'row',gap:'10px'}}>
                  <button
                      onClick={()=>setDeleteOpen(false)}
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
                      onClick={handleDeleteButtom}
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
    </>
  );
};

export default LabourPage;