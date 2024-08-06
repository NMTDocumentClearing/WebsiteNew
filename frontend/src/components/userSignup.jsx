import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { register } from "../actions/userActions";
import ErrorMessage from "./errorMessage";
import Loading from "./loading";
import { Navigate, useNavigate } from "react-router-dom";



export const UsersSignup = (props) => {
  const [fullname, setFullname] = useState("")
  const [phonenumber, setPhonenumber] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')

  const userRegister = useSelector((state)=> state.userRegister)
  const {loading, error, userInfo} = userRegister

  const dispatch = useDispatch()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  

//   const userRegister = useSelector((state)=> state.userRegister)

        const navigate = useNavigate();

        useEffect(() => {
            checkLocalStorage(); // Check for userInfo when the component mounts
        }, [userInfo]);

        const submitHandler = async (e) => {
            e.preventDefault();
            if (passwordError === '' && emailError === '') {
                console.log(fullname, phonenumber, email, password);
                dispatch(register(fullname, phonenumber, email, password));
                checkLocalStorage(); // Check for userInfo after dispatching the registration action
            }
        };

        const checkLocalStorage = () => {
            const userInfo = localStorage.getItem('userInfo');
            if (userInfo) {
                // Redirect to the home page
                navigate('/') // Replace '/home' with the actual URL of your home page
            }
        };

  const checkEmail = ()=>{
    if(!emailRegex.test(email)){
       setEmailError(`Email ${email} is not a valid email`)
    }else{
      setEmailError('')
    }
  }

  const checkPassword = ()=>{
    if(password.length > 0){
        if(password.length < 5){
            setPasswordError('Password should contain atleast 5 characters')
        }else{
            setPasswordError('')
        }
    }
  }

  return (
    <div className="login_new"  style={{backgroundColor:"#100035"}}>
        <div className="login_div">
            <form onSubmit={submitHandler}>
                <img src="img/logonmt.jpeg" alt="Logo" style={{display: "block", margin: "auto", width: "70px", height: "70px", marginBottom: "5px"}}></img>
                <h3 className="signin_heading" style={{marginBottom:"15px"}}>Register Here</h3>
                
                {error && <ErrorMessage message={error}>{error}</ErrorMessage>}
                {loading && <Loading />}
                <div className="flex-container" style={{display: "flex", gap:"10px"}}>
                    <div className="flex-item" style={{flex: "1", marginBottom:"16px"}}>
                        <label htmlFor="name" style={{color: "black"}}>Full Name</label>
                        <input type="text" name="fullname" onChange={(e)=>setFullname(e.target.value)} placeholder="Enter Name" className="form-control" />
                    </div>
                    <div className="flex-item" style={{flex: "1", marginBottom:"16px"}}>
                        <label htmlFor="phone" style={{color: "black"}}>Mobile Number</label>
                        <input type="number" name="phonenumber" onChange={(e)=>setPhonenumber(e.target.value)} id="number_feild" placeholder="Enter Your Number" className="form-control" />
                    </div>
                </div>

                <div className="mb-2" style={{marginBottom:"16px"}}>
                    <label htmlFor="email" style={{color: "black"}}>Email</label>
                    <input type="email" onBlur={checkEmail} name="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" className="form-control" />
                </div>
                    {emailError &&
                               <p  style={{text:"center",fontSize:'13px',color:"red"}}>{emailError}</p>
                    }

                <div className="mb-2" style={{marginBottom:"16px"}}>
                    <label htmlFor="password" style={{color: "black"}}>Password</label>
                    <input type="password" onBlur={checkPassword} name="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" className="form-control" />
                </div>
                    {passwordError &&
                               <p style={{text:"center",fontSize:'13px',color:"red"}}>{passwordError}</p>
                    }

                <div className="" style={{marginBottom:"16px"}}>
                    <input type="checkbox" className="custom-control custom-checkbox" id-check />
                    <label htmlFor="check" className="custom-input-label" style={{color: "black", marginRight:"9px", justifyContent:"center", alignItems:"center"}}>
                        Remenber Me
                    </label>
                </div>

                <div className="d-grid" style={{display:"grid"}}>
                    <button className="btn sign_btn btn-primary" style={{backgroundColor:'blue'}}>Register</button>
                </div>

                <div className="d-grid" style={{display:"grid", marginTop:"10px"}}>
                    <button className="btn btn-secondary" style={{backgroundColor:"#100035", color:"white"}} onClick={() => window.location.href = '/'}>
                        Back to Home
                    </button>
                </div>

                <p className="text-right" style={{textAlign:"center", marginTop:"10px", color:"black"}}>
                    Forgot <a href="">Password?</a>
                </p>
                <p className="text-right" style={{textAlign:"center", marginTop:"10px", color:"black"}}>
                    Do you have an Account ? <a href="/login">Login</a>
                </p>
            </form>
        </div>
    </div>
  );
};