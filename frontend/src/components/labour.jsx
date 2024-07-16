import React, { useEffect, useState } from "react";




export const Labour = () => {
    

    // console.log(userInfo);

    

  return (
    
        <div className="business_body">
        <div className="business_div">
        
            <img src="img/labour.png" alt="Logo" style={{ display: "block", margin: "auto", width: "70px", height: "70px", marginBottom: "5px" }} />
            <h3 className="signin_heading">Labour Services</h3>

            
            <div style={{ display: "grid", marginTop: "20px" }}>
                    <button type="submit" className="business_btn" style={{backgroundColor:"#215AFF",color:"white",fontWeight:"500"}}>
                        Offer Letter
                    </button> 
            </div>
            <div style={{ display: "grid", marginTop: "20px" }}>
                    <button type="submit" className="business_btn" style={{backgroundColor:"#215AFF",color:"white",fontWeight:"500"}}>
                        Insurance Services
                    </button> 
            </div>
            <div style={{ display: "grid", marginTop: "20px" }}>
                    <button type="submit" className="business_btn" style={{backgroundColor:"#215AFF",color:"white",fontWeight:"500"}}>
                        Labour Card Services
                    </button> 
            </div>
            <div style={{ display: "grid", marginTop: "20px" }}>
                    <button type="submit" className="business_btn" style={{backgroundColor:"#215AFF",color:"white",fontWeight:"500"}}>
                        Labour Card Renewal
                    </button> 
            </div>
            
        

        </div>
    </div>
    
        
  );
};