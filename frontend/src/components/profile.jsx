import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editprofile, login, logout } from "../actions/userActions";
import { FaCheck } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "./errorMessage";
import Loading from "./loading";
import { getProfileDatas } from "../api/userAPI";
import Modal from "./modal";
import { IoLockClosed } from "react-icons/io5";



export const Profile = () => {
    const navigate = useNavigate()
    const userLogin = useSelector((state)=> state.userLogin)
    const {loading, error, userInfo} = userLogin

    const [fullname, setFullname] = useState('')
    const [edited, setEdited] = useState(false)
    const [phonenumber, setPhonenumber] = useState('')
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [profileData, setProfileData] = useState([])
    const [open, setOpen] = useState(false)
    const [tokenModalOpen, setTokenModalOpen] = useState(false)

    const id = userInfo ? userInfo._id : null;

    useEffect(()=>{
        if (id) {
            async function getProfileData(id){
                try {
                    const {data} = await getProfileDatas(id)
                    if(data){
                        setFullname(data.user.fullname)
                        setEmail(data.user.email)
                        setPhonenumber(data.user.phonenumber)
                    }else{
                        // console.log("here");
                    }
                } catch (error) {
                    if(error.response.data.message === "Invalid token"){
                        // console.log("sdgvjajavjahc");
                        setTokenModalOpen(true)
                    }
                }

            }
            getProfileData(id)
        }

    },[edited])

    const dispatch = useDispatch()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    

    const [editMode, setEditMode] = useState(false);

    const handleEditClick = (e) => {
        e.preventDefault();
        setEditMode(!editMode);
    };

    useEffect(()=>{
        checkLocalStorage()
    },[edited])

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        dispatch(logout());
        navigate('/');
    };

    

    const checkEmail = ()=>{
        if(!emailRegex.test(email)){
           setEmailError(`Email ${email} is not a valid email`)
        }else{
          setEmailError('')
        }
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = userInfo._id
        if( emailError === '') {
            dispatch(editprofile({fullname:fullname, phonenumber:phonenumber, email:email, userId:userId}));
            setEditMode(!editMode);
            setOpen(true)
            checkLocalStorage()
        }
    };

    const checkLocalStorage = () => {
        const userInfo = localStorage.getItem('userInfo');
        
    };

    const deliverTOLogin = ()=>{
        localStorage.removeItem('userInfo');
        navigate('/login')
    }

    // console.log(userInfo);

    

  return (
    <>
    <div className="login_new" style={{backgroundColor:'#0B0E33', marginTop:"70px"}}>
        <div className="login_div" style={{marginTop:'80px'}}>
        <form onSubmit={handleSubmit}>
            <img src="img/profile.png" alt="Logo" style={{ display: "block", margin: "auto", width: "70px", height: "70px", marginBottom: "5px",borderRadius:'10px' }} />
            <h3 className="signin_heading">Your Profile</h3>

            <div className="mb-2" style={{ marginBottom: "10px", marginTop: "20px"}}>
                <p htmlFor="name" style={{ color: "black", textAlign: "center" }}>Your Name</p>
                {editMode &&
                    <p style={{fontSize:'10px',marginTop:'-10px',marginBottom:'2px',color:'red',textAlign:'center'}}>You cannot change your name</p>
                }
                <input value={fullname} readOnly onChange={(e)=>setFullname(e.target.value)} className="form-control styled-placeholder" style={{ textAlign: "center", fontWeight:"500", color:"black",backgroundColor:'white' }} />
            </div>

            <div className="mb-2" style={{ marginBottom: "10px" }}>
                <p htmlFor="email" style={{ color: "black", textAlign: "center" }}>Your Email</p>
                {editMode &&
                    <p style={{fontSize:'10px',marginTop:'-10px',marginBottom:'2px',color:'red',textAlign:'center'}}>You cannot change your Email</p>
                }
                <input value={email} onBlur={checkEmail} readOnly onChange={(e)=>setEmail(e.target.value)} className="form-control styled-placeholder" style={{ textAlign: "center", fontWeight:"500", color:"black" }} />
                {emailError !== '' ?
                    <p style={{ color:"red", textAlign:"center" }}>{emailError}</p> :
                    null
                }
            </div>

            <div className="mb-2" style={{ marginBottom: "10px" }}>
                <p htmlFor="phone" style={{ color: "black", textAlign: "center" }}>Your Phone Number</p>
                <input value={phonenumber} type="number" readOnly={!editMode} onChange={(e)=>setPhonenumber(e.target.value)} className="form-control styled-placeholder" style={{ textAlign: "center", fontWeight:"500", color:"black" }}/>
            </div>

            <div className="mb-2" style={{ marginBottom: "10px" }}>
                <p htmlFor="status" style={{ color: "black", textAlign: "center" }}>Your Status</p>
                {userInfo && userInfo.status && userInfo.status === "active" &&
                    <input placeholder={userInfo.status} readOnly className="form-control styled1-placeholder"/>
                }
            </div>

            <div className="d-grid" style={{ display: "grid", marginTop: "20px" }}>
                {editMode ?
                    <button type="submit" className="btn" style={{backgroundColor:"#215AFF",color:"white",fontWeight:"500"}}>
                        Save
                    </button> :
                    <button type="button" className="btn btn-danger" onClick={handleEditClick}>
                        Edit
                    </button>
                }
            </div>
        </form>

        </div>
    </div>
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
        </>
  );
};