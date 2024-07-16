import React, { useEffect, useState } from 'react';
import { Link,useLocation,useParams } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import { MdOutlineStorage } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin7Line } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { RiImageEditLine } from "react-icons/ri";


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

// project import
import Breadcrumb from '../../components/adminComponents/Breadcrumb';
import { gridSpacing } from '../../config';
import { changeDocumentStatus, deleteDocumentFromUser, editDocument, getUserDatas, } from '../../api/adminAPI';
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


  // const moment = require('moment');

// ==============================|| SAMPLE PAGE ||============================== //

const DocumentsPage = () => {
  
  const [userData,setUserData] = useState([])
  const [deleteDocument, setDeleteDocument] = useState(null);
  const [duplicateEntry,setDuplicateEntry] = useState('')
  const [successOpen,setSuccessOpen] = useState(false);
  const [deleteOpen,setDeleteOpen] = useState(false);
  const [deleted, setDeleted] = useState(false)
  const [edited, setEdited] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  

  const [editModalOpen, setEditModalOpen]= useState(false)
  const [editModalData, setEditModalData]= useState(false)


  const [statusChangeDocument, setStatusChangeDocument] = useState('')

  const location = useLocation();
  const { id } = location.state || {};
  // const userId = id
  // console.log(userId)



 useEffect(()=>{
  async function getUserData(){
      if(id !== ''){
        const {data} = await getUserDatas(id)
        if(data){
            setUserData(data.data)
        }
      }
  }
  getUserData()

},[deleted,edited])





 const handleEditmodalSubmit = (async (e) =>{
    e.preventDefault();
    console.log(editModalData);
    
    const {type,documentNumber,issued,expiry} = editModalData
    const userId = id
    // console.log(name,nationality,image_url,public_id,position,idCardExpiry,companyName,labourCardExpiry,id,_id);
    const {data} = await editDocument(type,documentNumber,issued,expiry,userId)
    if(data){
      setSuccessMessage('Document Edited Successfully')
      setEditModalOpen(false)
      setSuccessOpen(true)
      setEdited(!edited)
      console.log(data);
    }
})

 



const handleDeleteButtom = async (_id)=>{
          try {
            
                 const deleteData = await deleteDocumentFromUser(userData._id,deleteDocument)
                 if(deleteData.status === 201){
                  setDeleted(!deleted)
                  setDeleteOpen(false)
                  setSuccessOpen(true)
                  setSuccessMessage('Document Deleted Successfully')
                 }

          } catch (error) {
            console.error('Error deleting image:', error);
          }
}

useEffect(()=>{
  userData && userData.documents && userData.documents.forEach(row => {
    // console.log("herre");
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
          Documents
        </Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item style={{width:"100%"}}>
          <Card>
            <CardHeader
              title={
                
                <Typography component="div" className="card-header" style={{ fontSize: "25px", textAlign: "center", fontWeight: "bold" }}>
                    Documents List - <span style={{ color: "blue",fontSize:'20px' }}>{ userData ? userData.fullname : ''}</span>
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
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Document</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Document Number</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Issued On</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Expired On</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Actions</StyledTableCell>
                                <StyledTableCell style={{fontSize:"11px"}} align="right">Status</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userData && userData.documents && userData.documents.map((row,index) => (
                                <StyledTableRow key={row._id}>
                                <StyledTableCell component="th" scope="row" style={{fontSize:"12px",fontWeight:"bold"}}>
                                  <p>{index+1}</p>
                                </StyledTableCell>
                                <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.type}</StyledTableCell>
                                <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.documentNumber && row.documentNumber}</StyledTableCell>
                                <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.issued}</StyledTableCell>
                                
                                <StyledTableCell align="right" style={{fontSize:"12px"}}>{row.expiry}</StyledTableCell>

                                

                                <StyledTableCell align="center" className='dropdown' style={{ position: "relative",fontSize:"12px" }}>
                                <div style={{ position: "relative",right:'0' }}>
                                    <MdOutlineStorage color='red' className="dropdown-toggle page-scroll" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"/>
                                    <ul className="dropdown-menu" style={{ position: "absolute",heght:'50px' ,bottom: "-10px", right: "-10px", backgroundColor:'white' }}> 
                                        <li style={{ textAlign: "center",justifyContent:'center',alignItems:'center',color:"blue", fontSize: "13px", backgroundColor:"white",height:"25px",paddingTop:'4px'}} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'blue'; }} onClick={()=>{setEditModalOpen(true);setEditModalData(row)}}>Edit <FaRegEdit /></li>
                                        <li style={{ textAlign: "center",color:'red', justifyContent:'center',alignItems:'center',fontSize: "13px", backgroundColor:"white", height:"25px",paddingTop:'4px'}} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'red'; }} onClick={()=>{setDeleteOpen(true);setDeleteDocument(row.type);}}>Delete <RiDeleteBin7Line /></li>
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
                
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      


        <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
            <div className='text-center' style={{width:"300px",marginTop:"20px"}}>
                
                <div className='mx-auto my-4 w-48'>
                    <h3 className='text-lg font-thin text-gray-800 ' style={{color:'red'}}>Edit The Document</h3>
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

export default DocumentsPage;