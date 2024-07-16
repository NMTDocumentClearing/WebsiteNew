import React, { useEffect, useState } from "react";




export const Online = () => {
    

    // console.log(userInfo);

    

  return (
    
        <div className="business_body">
        <div className="business_div">
        
            <img src="img/online.png" alt="Logo" style={{ display: "block", margin: "auto", width: "70px", height: "70px", marginBottom: "5px" }} />
            <h3 className="signin_heading">Driving Lisence</h3>

            
            <div style={{ display: "grid", marginTop: "20px" }}>
                    <button type="submit" className="business_btn" style={{backgroundColor:"#215AFF",color:"white",fontWeight:"500"}}>
                        Vehicle Registration
                    </button> 
            </div>
            <div style={{ display: "grid", marginTop: "20px" }}>
                    <button type="submit" className="business_btn" style={{backgroundColor:"#215AFF",color:"white",fontWeight:"500"}}>
                        Police Clearance Certificate
                    </button> 
            </div>
            <div style={{ display: "grid", marginTop: "20px" }}>
                    <button type="submit" className="business_btn" style={{backgroundColor:"#215AFF",color:"white",fontWeight:"500"}}>
                        Vehicle Registration
                    </button> 
            </div>
            <div style={{ display: "grid", marginTop: "20px" }}>
                    <button type="submit" className="business_btn" style={{backgroundColor:"#215AFF",color:"white",fontWeight:"500"}}>
                        Health Card
                    </button> 
            </div>
            
        

        </div>
    </div>
    
        
  );
};