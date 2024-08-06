import React from "react";

export const BusinessSetup = (props) => {
  return (
    <div id="businesssetup">
        <div className="container">
            <div className="row">
            <div className="col-xs-12 col-md-6" style={{ display: 'grid', placeItems: 'start' }}>
                <img src="img/bus3.png" className="img-responsive" alt="" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
            <div className="col-xs-12 col-md-6">
                <div className="about-text">
                <h2 style={{ marginTop: "20px", color:"white" }}>Build Your Future</h2>
                <p style={{fontSize:"50px", fontWeight:"bolder",marginTop:"-20px", color:"white"}}>With Us</p>
                <p style={{ fontSize:"16px",color: "white" }}>Embark on your entrepreneurial journey with our expert business setup services in the UAQ. Whether you're a seasoned investor or a budding entrepreneur, we provide comprehensive solutions tailored to your needs. From company formation to obtaining necessary licenses, our team ensures a smooth and efficient process.</p>
                <h3 style={{color:"white", fontWeight:"bolder"}}>For More Details...</h3>
                <p style={{fontSize:"14px",marginTop:"-10px", color:"white"}}>Contact Our Team</p>
                <div className="list-style">
                    <div className="col-lg-6 col-sm-6 col-xs-12" style={{marginLeft:"-14px", marginTop:"10px", marginBottom:"10px"}}>
                    <ul>
                            <li style={{fontWeight:"bold"}}>Company Formation</li>
                            <li style={{fontWeight:"bold"}}>Main Land And Freezone</li>
                            <li style={{fontWeight:"bold"}}>Reliable Sponser</li>
                            
                    </ul>
                    </div>
                    <div className="col-lg-6 col-sm-6 col-xs-12" style={{marginLeft:"-14px",marginTop:"10px", marginBottom:"10px"}}>
                    <ul>
                            <li style={{fontWeight:"bold"}}>Real Estate Assistance</li>
                            <li style={{fontWeight:"bold"}}>Bank Account Assistance</li>
                            <li style={{fontWeight:"bold"}}>PRO Services</li>
                    </ul>
                    </div>
                </div>
                <div className="contact-item">
                    <h3 style={{color:"white", fontWeight:"bold"}}>Contact Info</h3>
                    <p style={{color:"white"}}>
                        <span style={{color:"white", fontSize:"17px"}}>
                            <i className="fa fa-phone" style={{color:"white", fontSize:"20px"}}></i> Phone   
                        </span>
                        {":         "}+971 588 207 398
                    </p>
                    <p style={{color:"white"}}>
                        <span style={{color:"white", fontSize:"17px"}}>
                            <i className="fa fa-envelope" style={{color:"white", fontSize:"20px"}}></i> Email   
                        </span>
                        {":         "}nmtuaqpro@gmail.com
                    </p>
                </div>
                
                </div>
            </div>
            </div>
        </div>
    </div>
  );
};