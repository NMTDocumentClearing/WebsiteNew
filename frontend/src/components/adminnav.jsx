import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import { Link } from "react-router-dom";

export const AdminNav = (props) => {
    const dispatch = useDispatch();
    const [showOptions, setShowOptions] = useState(false);
    

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const logoutHandler = ()=>{
        localStorage.removeItem("userInfo")
        dispatch(logout())
      }

    return (
        <nav id="menu" className="adminnavbar navbar-default" style={{ position: "fixed", top: 0, width: "100%" }}>
          <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand page-scroll" href="#page-top">NMT</a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item">
                        <a href="#features" style={{fontWeight:"bold"}} className="page-scroll">Features</a>
                    </li>
                    <li>
                        <a href="#about" style={{fontWeight:"bold"}} className="page-scroll">About</a>
                    </li>
                    <li className="nav-item">
                        <a href="#services" style={{fontWeight:"bold"}} className="page-scroll">Services</a>
                    </li>
                    <li className="nav-item">
                        <a href="#testimonials" style={{fontWeight:"bold"}} className="page-scroll">Testimonials</a>
                    </li>
                    <li className="nav-item">
                        <a href="#team" style={{fontWeight:"bold"}} className="page-scroll">Team</a>
                    </li>
                    <li className="nav-item">
                        <a href="#contact" style={{fontWeight:"bold"}} className="page-scroll">Contact</a>
                    </li>
                    
                </ul>
            </div>
        </div>
    </nav>
    );
  };