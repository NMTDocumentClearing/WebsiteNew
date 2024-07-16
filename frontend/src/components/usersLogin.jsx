import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./errorMessage";
import Loading from "./loading";



export const    UsersLogin = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const userLogin = useSelector((state)=> state.userLogin)
    const {loading, error, userInfo} = userLogin

    useEffect(() => {
        checkLocalStorage(); // Check for userInfo when the component mounts
    }, [userInfo]);
    

    const submitHandler = async(e) =>{
        e.preventDefault()
        if (password !== '' && email !== '') {
            console.log(email, password);
            dispatch(login(email,password));
            checkLocalStorage(); // Check for userInfo after dispatching the registration action
        }
      }

      const checkLocalStorage = () => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            // Redirect to the home page
            navigate('/') // Replace '/home' with the actual URL of your home page
        }
    };

  return (
    <div className="login_new" style={{backgroundColor:"black"}}>
        <div className="login_div">
            <form onSubmit={submitHandler}>
                <img src="img/logonmt.jpeg" alt="Logo" style={{display: "block", margin: "auto", width: "70px", height: "70px", marginBottom: "5px"}}></img>
                <h3 className="signin_heading">Sign In</h3>
                {error && <ErrorMessage message={error}>{error}</ErrorMessage>}
                {loading && <Loading />}
                <div className="mb-2" style={{marginBottom:"16px"}}>
                    <label htmlFor="email" style={{color: "black"}}>Email</label>
                    <input type="email" name="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" className="form-control" />
                </div>

                <div className="mb-2" style={{marginBottom:"16px"}}>
                    <label htmlFor="password" style={{color: "black"}}>Password</label>
                    <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" className="form-control" />
                </div>

                <div className="" style={{marginBottom:"16px"}}>
                <input type="checkbox" className="custom-control custom-checkbox" id="check"  />
                    <label htmlFor="check" className="custom-input-label" style={{color: "black", marginRight:"9px", justifyContent:"center", alignItems:"center"}}>
                        Remenber Me
                    </label>
                </div>

                <div className="d-grid" style={{display:"grid"}}>
                    <button className="btn btn-primary">Sign In</button>
                </div>
                <p className="text-right" style={{textAlign:"center", marginTop:"10px", color:"black"}}>
                    Forgot <a href="">Password?</a>
                </p>
                <p className="text-right" style={{textAlign:"center", marginTop:"10px", color:"black"}}>
                    You don't have an Account? <a href="/signup">Signup</a>
                </p>
            </form>
        </div>
    </div>
  );
};