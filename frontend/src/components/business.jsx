import React, { useEffect, useState } from "react";




export const Business = (props) => {

    
    

  return (
    
        <div className="business_body" style={{marginTop:"100px"}}>
        <div className="business_div">
        
            <img src="img/icon-for-business-8.jpg" alt="Logo" style={{ display: "block", margin: "auto", width: "70px", height: "70px", marginBottom: "5px" }} />
            <h3 className="signin_heading" style={{color:"white"}}>Build Your Business</h3>
            <h1 className="signin_subheading" style={{fontSize:"40px", fontWeight:'bolder',color:"white",textAlign:"center"}}>with Us</h1>

                <div className="features-card-container" style={{marginBottom:"80px", marginTop:"50px"}}>
                
                        
                                {props.data
                                ? props.data.map((d, i) => (
                                        <div key={`${d.title}-${i}`} className="features-card">
                                                <i className={d.icon} style={{color:"#ffffff"}}></i>
                                                <h3 style={{ color: "rgb(13, 0, 66)" }}>{d.heading}</h3>
                                                <p>{d.text}</p>
                                        </div>
                                ))
                                : "Loading..."}
                                
                        
                        
                    
                </div>
        

        </div>
    </div>
    
        
  );
};