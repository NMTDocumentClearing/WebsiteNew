import { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

var initialState = {
  from_name: "",
  email: "",
  message: "",
};
export const Contact = (props) => {
  const [{ from_name, email, message }, setState] = useState(initialState);
  const contactName = document.getElementById('contact_name')
  const contactEmail = document.getElementById('contact_email')
  const contactMessage = document.getElementById('contact_message')
  const errorMessage = document.getElementById('new_error')

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
    
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(from_name, email, message);
    
    
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID2
    const userId = process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    
    if(from_name !== '' && email !== '' && message !== '') {
      emailjs
        .sendForm(serviceId, templateId, e.target, userId)
        .then(
          (result) => {
            contactName.value ='';
            contactEmail.value ='';
            contactMessage.value ='';
            errorMessage.classList.add('color-first');
            errorMessage.textContent = 'Message sent successfully ✔️'
            setTimeout(()=>{
              errorMessage.textContent= '';
            },5000)
          },
          (error) => {
            console.log(error.text);
          }
        );
    }else{
        errorMessage.textContent = "All Feilds are required."
        setTimeout(()=>{
          errorMessage.textContent= '';
        },5000)
    }
  };
  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8" style={{backgroundColor:"#100035", padding:"20px 50px", borderRadius:"15px"}}>
            <div className="row">
              <div className="section-title">
                <h2>Get In Touch</h2>
                <p>
                  Please fill out the form below to send us an email and we will
                  get back to you as soon as possible.
                </p>
              </div>
              <form name="sentMessage" validate onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="contact_name"
                        name="from_name"
                        className="form-control"
                        placeholder="Name"
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        id="contact_email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="contact_message"
                    className="form-control"
                    rows="4"
                    placeholder="Message"
                    onChange={handleChange}
                  ></textarea>
                  <p className="help-block text-danger"></p>
                  <p class="error__message" id="new_error"></p>
                </div>
                <div id="success"></div>
                <button type="submit" className="btn btn-custom btn-lg">
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info" >
            <div className="contact-item">
              <h3 style={{color:"#100035", fontWeight:"bold"}}>Contact Info</h3>
              <p style={{color:"#100035"}}>
                <span style={{color:"#100035", fontWeight:"bold", fontSize:"17px"}}>
                  <i className="fa fa-compass" style={{color:"#100035", fontSize:"20px"}}></i> Address
                </span>
                {props.data ? props.data.address : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p  style={{color:"#100035"}}>
                <span  style={{color:"#100035", fontWeight:"bold", fontSize:"17px"}}>
                  <i className="fa fa-phone" style={{color:"#100035", fontSize:"20px"}}></i> Phone
                </span>{" "}
                {props.data ? props.data.phone : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p style={{color:"#100035"}}>
                <span  style={{color:"#100035", fontWeight:"bold", fontSize:"17px"}}>
                  <i className="fa fa-envelope" style={{color:"#100035", fontSize:"20px"}}></i> Email
                </span>{" "}
                {props.data ? props.data.email : "loading"}
              </p>
            </div>
          </div>
          
        </div>
      </div>
      <div id="footer" >
        <div className="container text-center" >
            <div id="newfooter" className="list-style" style={{paddingTop:'30px'}}>
                    <div className="col-lg-3 col-sm-6 col-xs-12">
                      <ul style={{textAlign:"start"}}>
                              <img style={{width:"160px"}} alt="NMT" src="/img/nmtpng.png" ></img>
                              <li style={{fontSize:"16px", color:"#100035", marginBottom:"3px"}}>NMT Document Clearing</li>
                              <li style={{fontSize:"14px", color:"#8e8e8e", marginBottom:"3px"}}>Welcome to NMT, where precision meets efficiency. We provide comprehensive typing services designed to handle all your document needs with speed and accuracy.</li>
                              
                      </ul>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-xs-12">
                      <ul style={{textAlign:"start"}}>
                              <li style={{fontSize:"17px", color:"#100035",fontWeight:"bolder", marginBottom:"3px"}}>Our Services</li>
                              <li style={{fontSize:"16px", color:"#747474", marginBottom:"3px",marginTop:"10px"}}>Business Setup</li>
                              <li style={{fontSize:"16px", color:"#747474", marginBottom:"3px"}}>PRO Services</li>
                              <li style={{fontSize:"16px", color:"#747474", marginBottom:"3px"}}>Labour Services</li>
                              <li style={{fontSize:"16px", color:"#747474", marginBottom:"3px"}}>Immigration Services</li>
                              <li style={{fontSize:"16px", color:"#747474", marginBottom:"3px"}}>Health Insurance</li>
                              <li style={{fontSize:"16px", color:"#747474", marginBottom:"3px"}}>Labour Services</li>
                              <li style={{fontSize:"16px", color:"#747474", marginBottom:"3px"}}>Vehicle Registration</li>
                      </ul>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-xs-12">
                      <ul style={{textAlign:"start"}}>
                              <li style={{fontSize:"17px", color:"#100035",fontWeight:"bolder", marginBottom:"3px"}}>Address</li>
                              <li style={{fontSize:"16px", color:"#747474", marginBottom:"3px", marginTop:"10px"}}>New Industrial Area</li>
                              <li style={{fontSize:"16px", color:"#747474", marginBottom:"3px"}}>Umm Al Thoub</li>
                              <li style={{fontSize:"16px", color:"#747474", marginBottom:"3px"}}>Al Rafaa City</li>
                              <li style={{fontSize:"16px", color:"#747474", marginBottom:"3px"}}>Umm Al Quwain</li>
                              <li style={{fontSize:"17px", color:"#100035",fontWeight:"bolder", marginBottom:"3px", marginTop:"10px"}}>Contact</li>
                              <li style={{fontSize:"16px", color:"#747474", marginBottom:"3px"}}>0588 207 407</li>
                              <li style={{fontSize:"16px", color:"#747474", marginBottom:"3px"}}>0588 207 398</li>
                      </ul>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-xs-12">
                      <ul style={{textAlign:"start"}}>
                              <li style={{fontSize:"17px", color:"#100035",fontWeight:"bolder", marginBottom:"3px"}}>Working Hours</li>
                              <li style={{fontSize:"16px", color:"#100035", marginBottom:"3px", marginTop:"10px"}}>8.AM - 8.PM (Monday-Saturday)</li>
                              <li style={{fontSize:"16px", color:"#100035", marginBottom:"3px"}}>Sunday - Off</li>
                              <li style={{fontSize:"17px", color:"#100035",fontWeight:"bolder", marginBottom:"3px", marginTop:"10px"}}>Reach Us Through</li>
                              <li style={{fontSize:"16px", color:"#100035", marginBottom:"3px"}}>
                              <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
                                  <a 
                                      href="https://www.facebook.com/profile.php?id=100083858767521&mibextid=ZbWKwL" 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      style={{ 
                                          textDecoration: "none", 
                                          color: "inherit",
                                          display: "inline-flex" 
                                      }}
                                  >
                                      <FaFacebook 
                                          size={30} 
                                          style={{ 
                                              marginTop: "15px", 
                                              color: "#3b5998" 
                                          }} 
                                          onMouseOver={(e) => e.currentTarget.style.color = "#1877F2"} 
                                          onMouseOut={(e) => e.currentTarget.style.color = "#3b5998"} 
                                      />
                                  </a>
                                  <a 
                                      href="https://www.instagram.com/nmtuaq/" 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      style={{ 
                                          textDecoration: "none", 
                                          color: "inherit",
                                          display: "inline-flex" 
                                      }}
                                  >
                                      <RiInstagramFill 
                                          size={35} 
                                          style={{ 
                                              marginTop: "15px", 
                                              color: "#d30076" 
                                          }} 
                                          onMouseOver={(e) => e.currentTarget.style.color = "#E1306C"} 
                                          onMouseOut={(e) => e.currentTarget.style.color = "#d30076"} 
                                      />
                                  </a>
                              </div>
                                 
                              </li>
                      </ul>
                    </div>
                </div>
        </div>
        <div className="container text-center" style={{marginTop:"30px"}}>
          <p>
            &copy; 2024 NMT Document Clearings. Design by {" "}
            {/* <a href="http://www.templatewire.com" rel="nofollow">
              TemplateWire
            </a> */}
          </p>
        </div>
      </div>
    </div>
    
  );
};