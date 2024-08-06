import React from "react";


export const LabourService = (props) => {
  return (
    <div id="labourservice">
  <div className="container">
    <div className="row">
      <div className="col-xs-12 col-md-6" style={{padding:"50px", }}>
        <div className="about-text">
          <h2 style={{ marginTop: "20px", color: "#100035" }}>Expert Guidance for</h2>
          <p style={{ fontSize: "50px", fontWeight: "bolder", marginTop: "-20px", color: "#100035",lineHeight: "1" }}>Seamless Journey</p>
          <p style={{ fontSize: "16px", color: "#100035" }}>
            Unlock new opportunities in the UAE with our comprehensive visa and labor services. Our dedicated team offers streamlined solutions for visa applications, work permits, and labor compliance.
          </p>
          <div className="list-style">
            <div className="col-lg-6 col-sm-6 col-xs-12" style={{marginLeft:"-14px", marginTop:"10px", marginBottom:"10px"}}>
              <ul>
                <li style={{ fontWeight: "bold" }}>Labour Services</li>
                <li style={{ fontWeight: "bold" }}>Immigration Services</li>
                <li style={{ fontWeight: "bold" }}>Family Visa</li>
              </ul>
            </div>
            <div className="col-lg-6 col-sm-6 col-xs-12" style={{marginLeft:"-14px", marginTop:"10px", marginBottom:"10px"}}>
              <ul>
                <li style={{ fontWeight: "bold" }}>Health Insurance</li>
                <li style={{ fontWeight: "bold" }}>Attestation</li>
                <li style={{ fontWeight: "bold" }}>Certificate Translation</li>
              </ul>
            </div>
          </div>
          <h3 style={{ color: "#100035", fontWeight: "bolder", marginTop:"20px" }}>For More Details...</h3>
          
          <div className="contact-item">
            <h3 style={{ color: "#100035", fontWeight: "bold",marginTop:'-7px' }}>Contact Us</h3>
            <p style={{ color: "#100035" }}>
              <span style={{ color: "#100035", fontSize: "17px" }}>
                <i className="fa fa-phone" style={{ color: "#100035", fontSize: "20px" }}></i> Phone
              </span>
              {":         "}+971 588 207 407
            </p>
            <p style={{ color: "#100035" }}>
              <span style={{ color: "#100035", fontSize: "17px" }}>
                <i className="fa fa-envelope" style={{ color: "#100035", fontSize: "20px" }}></i> Email
              </span>
              {":         "}nmtuaq@gmail.com
            </p>
          </div>
        </div>
      </div>
      <div className="col-xs-12 col-md-6" style={{ display: 'grid', placeItems: 'start', marginTop:"50px"}}>
        <img src="img/visa2.png" className="img-responsive image-slide-in" alt="" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>
    </div>
  </div>
</div>

  );
};