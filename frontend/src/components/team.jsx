import React from "react";

export const Team = (props) => {
  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2 className="team-heading" id="team-head">Meet the Team</h2>
          <p>
             Discover a diverse group of professionals committed to providing efficient and reliable typing services tailored to your needs.
          </p>
        </div>
        <div id="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-3 col-sm-6 team">
                  <div className="thumbnail" style={{borderRadius:'5px'}}>
                    {" "}
                    <img src={d.img} alt="..." className="team-img" style={{borderRadius:'10px'}} />
                    <div className="caption">
                      <h4 style={{color:"black"}}>{d.name}</h4>
                      <p style={{color:"black"}}>{d.job}</p>
                      <p style={{color:"black"}}>{d.contact}</p>
                    </div>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};