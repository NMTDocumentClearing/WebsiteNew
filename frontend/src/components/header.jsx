import React from "react";

export const Header = (props) => {
  return (
  <header id="header">
  <div className="intro">
    <video src="img/3129671-uhd_3840_2160_30fps.mp4" autoPlay muted loop>
        <source src="" type="video/mp4"  />
        {/* Add additional video sources for compatibility */}
    </video>
    <div className="overlay">
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 intro-text">
            <h1>
              {props.data ? props.data.title : "Loading"}
              <span></span>
            </h1>
            <p>{props.data ? props.data.paragraph : "Loading"}</p>
            <a href="#features" className="btn btn-custom btn-lg page-scroll">
              Learn More
            </a>{" "}
          </div>
        </div>
      </div>
     </div>
    </div>
   </header>
  );
};