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
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleOptions = (e) => {
        setShowOptions(!showOptions);
        e.preventDefault(); // Prevent the default action
        e.stopPropagation(); // Stop the event from bubbling up
        setDropdownOpen(!dropdownOpen);
    };

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        dispatch(logout());
    }

    const handleScroll = () => {
        
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

      const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
      };
    

    return (
        <nav id="menu" className={`navbar navbar-default navbar-fixed-top  ${isCollapsed ? 'navbar-collapsed' : ''} ${scrolled ? 'navbar-scrolled' : 'navbar-scrolled'}`} style={{marginBottom:"0px"}}>
        <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" onClick={toggleCollapse}>
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <img
                alt="img"
                src="/img/NMT_page-0001-removebg-preview.png"
                style={{ width: '55px', height: '55px', marginRight: '0px' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0' }}>
              <a className="navbar-brand page-scroll" href="#page-top" style={{ color: scrolled ? 'white' : 'white', paddingBottom: '0px' }}>
                NMT
              </a>
              <a className="navbar-brand2 page-scroll" href="#page-top" style={{ color: scrolled ? 'white' : 'white', alignSelf: 'flex-start', marginTop:'-7px', justifyContent: 'flex-start' }}>
                Document Clearing
              </a>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems:'start', justifyContent:'start', flexDirection: 'column', paddingLeft:"5px" }}>
            </div> 
          </div>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            {props.status !== 'No Home' &&
              <li className="nav-item">
                <a href="#features" style={{ fontWeight: "bold", color: scrolled ? 'white' : 'white' }} className="page-scroll">Features</a>
              </li>
            }
            {props.status !== 'No Home' &&
              <li>
                <a href="#about" style={{ fontWeight: "bold", color: scrolled ? 'white' : 'white' }} className="page-scroll">About</a>
              </li>
            }
            {props.status !== 'No Home' &&
              <li className="nav-item">
                <a href="#services" style={{ fontWeight: "bold", color: scrolled ? 'white' : 'white' }} className="page-scroll">Services</a>
              </li>
            }
            {props.status !== 'No Home' &&
              <li className="nav-item">
                <a href="#testimonials" style={{ fontWeight: "bold", color: scrolled ? 'white' : 'white' }} className="page-scroll">Testimonials</a>
              </li>
            }
            {props.status !== 'No Home' &&
              <li className="nav-item">
                <a href="#team" style={{ fontWeight: "bold", color: scrolled ? 'white' : 'white' }} className="page-scroll">Team</a>
              </li>
            }
            {props.status !== 'No Home' &&
              <li className="nav-item">
                <a href="#contact" style={{ fontWeight: "bold", color: scrolled ? 'white' : 'white' }} className="page-scroll">Contact</a>
              </li>
            }
            
              <li className="nav-item">
                <a href="/" style={{  fontWeight: "bolder", color: scrolled ? 'white' : 'white' }} className="page-scroll">Home</a>
              </li>
            
            {props.data !== null && props.data !== undefined ?
            
              <li className={`nav-item dropdown ${dropdownOpen ? 'open' : ''}`}>
                <a href=" " style={{ fontWeight: "bolder", color: scrolled ? 'white' : 'white' }} className="dropdown-toggle page-scroll" role="button" aria-haspopup="true" aria-expanded={dropdownOpen} onClick={toggleOptions}>
                  Options <span className="caret"></span>
                </a>  
                <ul className="dropdown-menu">
                  <li style={{ textAlign: "center", fontSize: "14px" }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = ''; e.target.style.color = ''; }}><Link to={'/profile'}>My Profile</Link></li>
                  <li style={{ textAlign: "center", fontSize: "14px" }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = ''; e.target.style.color = ''; }}><Link to={'/employees'}>Employees</Link></li>
                  <li style={{ textAlign: "center", fontSize: "14px" }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = ''; e.target.style.color = ''; }}><Link to={'/documents'}>Documents</Link></li>
                  <li style={{ textAlign: "center", fontSize: "14px" }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = ''; e.target.style.color = ''; }}><Link to={'/applications'}>Applications</Link></li>
                  <li style={{ textAlign: "center", fontSize: "14px" }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = ''; e.target.style.color = ''; }}><a href=" " onClick={logoutHandler} className="page-scroll">Logout</a></li>
                </ul>
              </li>
             : 
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