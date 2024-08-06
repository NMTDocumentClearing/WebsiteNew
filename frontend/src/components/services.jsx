import React from "react";
import { Link } from "react-router-dom";

export const Services = ({ data }) => {
  return (
    <div id="services" className="text-center">
      <div className="video-background">
        {/* Optional video background */}
      </div>
      <div className="container content">
        <div className="section-title">
          <h2 style={{ color: "#100035" }}>Our Services</h2>
          <p style={{ color: "#100035" }}>
            Our comprehensive range of services at NMT is tailored to meet all your documentation needs under one roof.
          </p>
        </div>
        <div className="service-grid">
          {data
            ? data.map((d, i) => (
              <div className="service-card" key={`${d.name}-${i}`}>
                <Link to={`/${d.link}`} style={{ textDecoration: 'none' }}>
                  <i className={d.icon} style={{color:"#100035"}}></i>
                </Link>
              <div className="service-desc">
                <h4 id="servicetitle" style={{fontWeight:"bold"}}>{d.name}</h4>
                <p id="servicetext">{d.text}</p>
              </div>
            </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
