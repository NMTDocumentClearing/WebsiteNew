import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

// material-ui
import { Card, CardHeader, CardContent, Divider, Grid, Typography } from '@mui/material';

// project import
import Breadcrumb from '../../components/adminComponents/Breadcrumb';
import { gridSpacing } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProfileDatas } from '../../api/adminAPI';
import profile from '../../assets/sccs/images/profile.png';
import Modal from '../../components/modal';
import { IoLockClosed } from "react-icons/io5";

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => {
  const adminLogin = useSelector((state)=> state.adminLogin)
  const {loading, error, adminInfo} = adminLogin
   const navigate = useNavigate()
   const [fullname, setFullname] = useState('')
    const [edited, setEdited] = useState(false)
    const [phonenumber, setPhonenumber] = useState('')
    const [email, setEmail] = useState('')
    const [tokenModalOpen, setTokenModalOpen] = useState(false)

    const id = adminInfo._id

    useEffect(()=>{
      async function getProfileData(id){
        try {
          const {data} = await getAdminProfileDatas(id)
          if(data){
              setFullname(data.admin.fullname)
              setEmail(data.admin.email)
              setPhonenumber(data.admin.phonenumber)
          }
        } catch (error) {
          if(error.response.data.message === "Invalid token"){
            console.log("sdgvjajavjahc");
            setTokenModalOpen(true)
        }
        }
      }
      getProfileData(id)

   },[edited])

  


    useEffect(()=>{
        checkLocalStorage()
    },[edited])

    const checkLocalStorage = () => {
        const userInfo = localStorage.getItem('userInfo');
        
    };

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
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb" style={{fontSize:"15px"}}>
          Profile
        </Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item style={{width:"100%"}}>
          <Card>
            <CardHeader
              title={
                <Typography component="div" className="card-header" style={{fontSize:"25px", textAlign:"center",fontWeight:"bold"}}>
                  My Profile
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <form >
                  <img src={profile} alt="Logo" style={{ display: "block", margin: "auto", width: "70px", height: "70px", marginBottom: "5px" }} />
                  

                  <div className="mb-2" style={{ marginBottom: "10px", marginTop: "20px" }}>
                      <p htmlFor="name" style={{ color: "black", textAlign: "center" }}>Your Name</p>
                      <input value={fullname}   className="form-control styled-placeholder" style={{ textAlign: "center", fontWeight:"500", color:"blue" }} />
                  </div>

                  <div className="mb-2" style={{ marginBottom: "10px" }}>
                      <p htmlFor="email" style={{ color: "black", textAlign: "center" }}>Your Email</p>
                      <input value={email} className="form-control styled-placeholder" style={{ textAlign: "center", fontWeight:"500", color:"blue" }} />
                      
                          <p style={{ color:"red", textAlign:"center" }}></p>
                      
                  </div>

                  <div className="mb-2" style={{ marginBottom: "10px" }}>
                      <p htmlFor="phone" style={{ color: "black", textAlign: "center" }}>Your Phone Number</p>
                      <input value={phonenumber} className="form-control styled-placeholder" style={{ textAlign: "center", fontWeight:"500", color:"blue" }}/>
                  </div>

                  <div className="mb-2" style={{ marginBottom: "10px" }}>
                      <p htmlFor="status" style={{ color: "black", textAlign: "center" }}>Your Status</p>
                      {adminInfo.status === "active" ?
                        <input placeholder={adminInfo.status} readOnly className="form-control styled1-placeholder" style={{textAlign:"center",color:"green"}}/> :
                        <input placeholder={adminInfo.status} readOnly className="form-control styled2-placeholder" style={{textAlign:"center",color:"red"}}/>
                      }
                  </div>

                  <div className="d-grid" style={{ display: "grid", marginTop: "20px" }}>
                      
                          {/* <button type="submit" className="btn" style={{backgroundColor:"#215AFF",color:"white",fontWeight:"500"}}>
                              Save
                          </button>  */}
                          <button type="button" className="btn btn-danger" >
                              Edit
                          </button>
                      
                  </div>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
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

export default SamplePage;
