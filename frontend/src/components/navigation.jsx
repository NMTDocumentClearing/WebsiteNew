import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Link as MuiLink, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export const Navigation = (props) => {
    const dispatch = useDispatch();
    const [showOptions, setShowOptions] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        dispatch(logout());
    }

    const handleScroll = () => {
        const headerHeight = document.getElementById('header').offsetHeight;
        const scrollTop = document.querySelector('.user-home').scrollTop;
        if (scrollTop > headerHeight) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };
    
      useEffect(() => {
        if(props.status === 'No Home'){
          setScrolled(true)
        }
        const userHomeElement = document.querySelector('.user-home');
        if (userHomeElement) {
          userHomeElement.addEventListener('scroll', handleScroll);
      
          return () => {
            userHomeElement.removeEventListener('scroll', handleScroll);
          };
        }
      }, []);
    

    return (
        <nav id="menu" className={`navbar navbar-default navbar-fixed-top ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <img alt="img" src="/img/NMT_page-0001-removebg-preview.png" style={{ width: '35px', height: '35px', marginRight: '10px' }}></img>
            <a className="navbar-brand page-scroll" href="#page-top" style={{ display: 'inline-block', verticalAlign: 'middle' }}>NMT</a>
          </div>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            {props.status !== 'No Home' &&
              <li className="nav-item">
                <a href="#features" style={{ fontWeight: "bold", color: '#BFBFBF' }} className="page-scroll">Features</a>
              </li>
            }
            {props.status !== 'No Home' &&
              <li>
                <a href="#about" style={{ fontWeight: "bold", color: '#BFBFBF' }} className="page-scroll">About</a>
              </li>
            }
            {props.status !== 'No Home' &&
              <li className="nav-item">
                <a href="#services" style={{ fontWeight: "bold", color: '#BFBFBF' }} className="page-scroll">Services</a>
              </li>
            }
            {props.status !== 'No Home' &&
              <li className="nav-item">
                <a href="#testimonials" style={{ fontWeight: "bold", color: '#BFBFBF' }} className="page-scroll">Testimonials</a>
              </li>
            }
            {props.status !== 'No Home' &&
              <li className="nav-item">
                <a href="#team" style={{ fontWeight: "bold", color: '#BFBFBF' }} className="page-scroll">Team</a>
              </li>
            }
            {props.status !== 'No Home' &&
              <li className="nav-item">
                <a href="#contact" style={{ fontWeight: "bold", color: '#BFBFBF' }} className="page-scroll">Contact</a>
              </li>
            }
            
              <li className="nav-item">
                <a href="/" style={{ fontWeight: "bold", color: '#BFBFBF' }} className="page-scroll">Home</a>
              </li>
            
            {props.data !== null && props.data !== undefined ?
              <li className="nav-item dropdown">
                <a href=" " style={{ fontWeight: "bold", color: '#BFBFBF' }} className="dropdown-toggle page-scroll" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" onClick={toggleOptions}>
                  Options <span className="caret"></span>
                </a>  
                <ul className="dropdown-menu">
                  <li style={{ textAlign: "center", fontSize: "14px" }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = ''; e.target.style.color = ''; }}><Link to={'/profile'}>My Profile</Link></li>
                  <li style={{ textAlign: "center", fontSize: "14px" }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = ''; e.target.style.color = ''; }}><Link to={'/employees'}>Employees</Link></li>
                  <li style={{ textAlign: "center", fontSize: "14px" }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = ''; e.target.style.color = ''; }}><Link to={'/documents'}>Documents</Link></li>
                  <li style={{ textAlign: "center", fontSize: "14px" }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = ''; e.target.style.color = ''; }}><Link to={'/applications'}>Applications</Link></li>
                  <li style={{ textAlign: "center", fontSize: "14px" }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = ''; e.target.style.color = ''; }}><a href="" onClick={logoutHandler} className="page-scroll">Logout</a></li>
                </ul>
              </li> :
              <li className="nav-item">
                <Link to={'/login'} className="page-scroll" style={{ color: "blue", fontWeight: "bold" }}>Login</Link>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
    );
  };