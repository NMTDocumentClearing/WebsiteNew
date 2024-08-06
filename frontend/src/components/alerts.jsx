import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";


export const Alerts = (props) => {
  const navigate = useNavigate()
  const [idExpiring, setIdExpiring] = useState(0)
  const [labourExpiring, setLabourExpiring] = useState(0)
  const [documentExpiring, setDocumentExpiring] = useState(0)


  useEffect(()=>{
    setIdExpiring(props.idExpiringData.length)
    setLabourExpiring(props.labourExpiringData.length)
    setDocumentExpiring(props.documentExpiring.length)
  },[props.idExpiringData,props.labourExpiringData,props.documentExpiring])
  
  return (
    <div id="alerts" className="text-center" style={{marginTop:"100px"}}>
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2 style={{color:"white"}}>Alerts</h2>
        </div>
        <div className="card-container" style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '20px',
  width: '100%',
  margin: '0 auto',
  padding: '10px'
}}>
  {props.data ? (
    <>
      {[
        { text: "ID Expiring", count: idExpiring, icon: "fa-id-card", link: "/employees", desc: "Click here to show the employees whose ID card is expiring soon..." },
        { text: "Labour Card Expiring", count: labourExpiring, icon: "fa-address-card", link: "/employees", desc: "Click here to show the employees whose labour card is expiring soon..." },
        { text: "Documents Expiring", count: documentExpiring, icon: "fa-folder-open", link: "/documents", desc: "Click here to show the documents which will expire soon..." },
        { text: "Your Applications", count: null, icon: "fa-forward-fast", link: "/applications", desc: "Click here to show your applications and their progress." },
      ].map((item, index) => (
        <div
          key={index}
          className="card"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            boxSizing: 'border-box',
            minHeight: '200px', // Minimum height for consistent card height
            height: '100%', // Ensures card stretches to fill grid cell
          }}
          onClick={() => navigate(item.link)}
        >
          <div style={{ position: "relative", display: "inline-block" }}>
            <i
              className={`fa-solid ${item.icon}`}
              style={{
                fontSize: "30px",
                color: "#ffffff",
                backgroundImage: "linear-gradient(to right, #100035, #100035)",
                padding: "30px",
                borderRadius: "50%",
              }}
            ></i>
            {item.count !== null && (
              <span
                style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  background: "#EF4336",
                  color: "white",
                  borderRadius: "50%",
                  padding: "5px 10px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  border: "3px solid white",
                }}
              >
                {item.count}
              </span>
            )}
          </div>
          <h3 style={{ color: "#100035", fontWeight: "bold", textAlign: "center", margin: '10px 0' }}>{item.text}</h3>
          <p
            style={{
              color: "#100035",
              // opacity: "0.4",
              backgroundColor: "#c8cceb",
              borderRadius: "10px",
              fontWeight: "normal",
              padding: "10px",
              margin: 0,
              textAlign: "center",
            }}
          >
            {item.desc}
          </p>
        </div>
      ))}
    </>
  ) : (
    "Loading..."
  )}
</div>



        <Grid container spacing={2} style={{marginTop:'30px',padding:"10px"}} >
          <Grid item xs={12} sm={6} md={3} >
              <Link to={'/documents'} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  bgcolor="#FFFFFF"
                  height="100%"
                  opacity="0.1"
                  p={2}
                  borderRadius={2}
                  boxShadow={1}
                  textAlign="center"
                >
                    <i className={'fa fa-book'} style={{
                fontSize: "30px",
                color: "#FFFFFF",
                backgroundImage: "linear-gradient(to right, #100035, #100035)",
                padding: "30px",
                borderRadius: "50%",
              }}></i>
                      <Box className="service-desc" width="100%" mt={2}>
                        <Button
                            variant="contained"
                            sx={{ 
                              width: '100%',
                              marginTop:"10px",
                              fontSize: '1.5rem', 
                              backgroundColor: '#0F1447', 
                              color: '#FFFFFF',
                              opacity:"100%", 
                              textTransform: 'none', 
                              '&:hover': {
                                backgroundColor: '#FFFFFF',
                                color: 'black',
                              }
                            }}
                          >
                            Documents List
                        </Button>
                      </Box>
                  </Box>
                </Link>
              </Grid>
            <Grid item xs={12} sm={6} md={3} >
            <Link to={'/employees'} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  bgcolor="#FFFFFF"
                  height="100%"
                  p={2}
                  borderRadius={2}
                  boxShadow={1}
                  textAlign="center"
                >
                <i className={'fa fa-users'} style={{
                fontSize: "30px",
                color: "#FFFFFF",
                backgroundImage: "linear-gradient(to right, #100035, #100035)",
                padding: "30px",
                borderRadius: "50%",
              }}></i>
                <Box className="service-desc" width="100%" mt={2}>
                  <Button
                    variant="contained"
                    sx={{ 
                      width: '100%',
                      marginTop:"10px",
                      fontSize: '1.5rem', 
                      backgroundColor: '#0F1447', 
                      color: '#FFFFFF',
                      opacity:"100%", 
                      textTransform: 'none', 
                      '&:hover': {
                        backgroundColor: '#FFFFFF',
                        color: 'black',
                      }
                    }}
                  >
                    Employees List
                  </Button>
                </Box>
              </Box>
              </Link>
            </Grid>

            <Grid item xs={12} sm={6} md={3} >
            <Link to={'/applications'} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                bgcolor="#FFFFFF"
                height="100%"
                p={2}
                borderRadius={2}
                boxShadow={1}
                textAlign="center"
              >
                <i className={'fa fa-hourglass-end'} style={{
                fontSize: "30px",
                color: "#FFFFFF",
                backgroundImage: "linear-gradient(to right, #100035, #100035)",
                padding: "30px",
                borderRadius: "50%",
              }}></i>
                <Box className="service-desc" width="100%" mt={2}>
                <Button
                    variant="contained"
                    sx={{ 
                      width: '100%',
                      marginTop:"10px",
                              fontSize: '1.5rem', 
                              backgroundColor: '#0F1447', 
                              color: '#FFFFFF',
                              opacity:"100%", 
                              textTransform: 'none', 
                              '&:hover': {
                                backgroundColor: '#FFFFFF',
                                color: 'black',
                              }
                    }}
                  >
                    Applications List
                  </Button>
                </Box>
              </Box>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Link to={'/profile'} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  bgcolor="#FFFFFF"
                  height="100%"
                  p={2}
                  borderRadius={2}
                  boxShadow={1}
                  textAlign="center"
                >
                  <i className={'fa fa-user'} style={{
                    fontSize: "30px",
                    color: "#FFFFFF",
                    backgroundImage: "linear-gradient(to right, #100035, #100035)",
                    padding: "30px",
                    borderRadius: "50%",
                  }}></i>
                  <Box className="service-desc" width="100%" mt={2}>
                    <Button
                      variant="contained"
                      sx={{ 
                        width: '100%', // Ensures the button takes the full width of its container
                        fontSize: '1.5rem', 
                        backgroundColor: '#0F1447', 
                        color: '#FFFFFF',
                        textTransform: 'none', 
                        '&:hover': {
                          backgroundColor: '#FFFFFF',
                          color: 'black',
                        }
                      }}
                    >
                      Your Profile
                    </Button>
                  </Box>
                </Box>
              </Link>
            </Grid>

          </Grid>
      </div>  
    </div>
  );
};