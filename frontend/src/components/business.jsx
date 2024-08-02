import React, { useEffect, useState } from "react";




export const Business = () => {

    
    

  return (
    
        <div className="business_body">
        <div className="business_div">
        
            <img src="img/icon-for-business-8.jpg" alt="Logo" style={{ display: "block", margin: "auto", width: "70px", height: "70px", marginBottom: "5px" }} />
            <h3 className="signin_heading">Build Your Business</h3>
            <h5 className="signin_subheading" style={{color:"blue",textAlign:"center"}}>with Us</h5>

            
            <div style={{ display: "grid", marginTop: "20px" }}>
                    <button type="submit" className="business_btn" style={{backgroundColor:"#215AFF",color:"white",fontWeight:"500"}}>
                        Trade Name Reservation
                    </button> 
            </div>
            <div style={{ display: "grid", marginTop: "20px" }}>
                    <button type="submit" className="business_btn" style={{backgroundColor:"#215AFF",color:"white",fontWeight:"500"}}>
                        Company Formation
                    </button> 
            </div>
            <div style={{ display: "grid", marginTop: "20px" }}>
                    <button type="submit" className="business_btn" style={{backgroundColor:"#215AFF",color:"white",fontWeight:"500"}}>
                        Tenancy
                    </button> 
            </div>
            <div style={{ display: "grid", marginTop: "20px" }}>
                    <button type="submit" className="business_btn" style={{backgroundColor:"#215AFF",color:"white",fontWeight:"500"}}>
                        Agreement
                    </button> 
            </div>

            <div className="d-grid" style={{ display: "grid", marginTop: "20px" }}>
                    <button type="submit" className="business_btn" style={{backgroundColor:"#215AFF",color:"white",fontWeight:"500"}}>
                        Memorandom of Association
                    </button>
            </div>

            <div style={{ display: "grid", marginTop: "20px" }}>
                    <button type="submit" className="business_btn" style={{backgroundColor:"#215AFF",color:"white",fontWeight:"500"}}>
                        Power of Atorny
                    </button> 
            </div>
            <div style={{ display: "grid", marginTop: "20px" }}>
                    <button type="submit" className="business_btn" style={{backgroundColor:"#215AFF",color:"white",fontWeight:"500"}}>
                        Trade Lisence
                    </button> 
            </div>
        

        </div>
    </div>
    
        
  );
};