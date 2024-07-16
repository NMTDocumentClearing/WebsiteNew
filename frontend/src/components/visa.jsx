import React, { useEffect, useState } from "react";




export const Visa = () => {
    

    // console.log(userInfo);

    

  return (
    
        <div className="business_body">
        <div className="business_div">
        
            <img src="img/visa.jpg" alt="Logo" style={{ display: "block", margin: "auto", width: "70px", height: "70px", marginBottom: "5px" }} />
            <h3 className="signin_heading">Visa Services</h3>

            
            <div style={{ display: "grid", marginTop: "20px" }}>
                    <button type="submit" className="business_btn" style={{backgroundColor:"#215AFF",color:"white",fontWeight:"500"}}>
                        Employment Visa
                    </button> 
            </div>
            <div style={{ display: "grid", marginTop: "20px" }}>
                    <button type="submit" className="business_btn" style={{backgroundColor:"#215AFF",color:"white",fontWeight:"500"}}>
                        ID Services
                    </button> 
            </div>
            <div style={{ display: "grid", marginTop: "20px" }}>
                    <button type="submit" className="business_btn" style={{backgroundColor:"#215AFF",color:"white",fontWeight:"500"}}>
                        Medical
                    </button> 
            </div>
            <div style={{ display: "grid", marginTop: "20px" }}>
                    <button type="submit" className="business_btn" style={{backgroundColor:"#215AFF",color:"white",fontWeight:"500"}}>
                        Emigration Services
                    </button> 
            </div>
            
        

        </div>
    </div>
    
        
  );
};