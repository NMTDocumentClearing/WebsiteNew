import React from "react";


export const Features = (props) => {
  return (
    <div id="features" className="features-section text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title" style={{marginLeft:"0px"}}>
          <h2 style={{color:"White", marginTop:"50px", marginBottom:"50px"}}>Features</h2>
        </div>
        <div className="features-card-container" style={{marginBottom:"80px"}}>
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.title}-${i}`} className="features-card">
                  <i className={d.icon} style={{color:"rgb(13, 0, 66)"}}></i>
                  <h3 style={{ color: "rgb(13, 0, 66)" }}>{d.title}</h3>
                  <p>{d.text}</p>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};