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
    <div id="features" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Alerts</h2>
        </div>
        <div className="row">
          {props.data
            ? 
              <>
                <div  className="col-xs-6 col-md-3" onClick={()=>navigate('/employees')}>
                  {" "}
                  <div style={{ position: 'relative', display: 'inline-block' }} >
                    <i className="fa-solid fa-id-card" style={{ fontSize: '30px', color: 'white', backgroundImage: 'linear-gradient(to right, #ff9999, #ff4d4d)', padding: '30px', borderRadius: '50%' }}></i>
                    <span style={{
                      position: 'absolute',
                      top: '0',
                      right: '0',
                      background: 'red',
                      color: 'white',
                      borderRadius: '50%',
                      padding: '5px 10px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      border: '3px solid white'
                    }}>
                    {idExpiring}
                    </span>
                  </div>
                  <h3>ID Expiring</h3>
                  <p> <span style={{color:'blue'}}>Click here</span> to show the emloyees Whose ID Card Is Expire Soon...</p>
                </div>

                <div  className="col-xs-6 col-md-3" onClick={()=>navigate('/employees')}>
                  {" "}
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <i className="fa-sharp fa-regular fa-address-card" style={{ fontSize: '30px', color: 'white', backgroundImage: 'linear-gradient(to right, #ff9999, #ff4d4d)', padding: '30px', borderRadius: '50%' }}></i>
                    <span style={{
                      position: 'absolute',
                      top: '0',
                      right: '0',
                      background: 'red',
                      color: 'white',
                      borderRadius: '50%',
                      padding: '5px 10px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      border: '3px solid white'
                    }}>
                      {labourExpiring}
                    </span>
                  </div>
                  <h3>Labour Card Expiring</h3>
                  <p> <span style={{color:'blue'}}>Click here</span> to show the emloyees Whose Labour Card Is Expire Soon...</p>
                </div>

                <div  className="col-xs-6 col-md-3" onClick={()=>navigate('/documents')}>
                  {" "}
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <i className="fa-regular fa-folder-open" style={{ fontSize: '30px', color: 'white', backgroundImage: 'linear-gradient(to right, #ff9999, #ff4d4d)', padding: '30px', borderRadius: '50%' }}></i>
                    <span style={{
                      position: 'absolute',
                      top: '0',
                      right: '0',
                      background: 'red',
                      color: 'white',
                      borderRadius: '50%',
                      padding: '5px 10px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      border: '3px solid white'
                    }}>
                      {documentExpiring}
                    </span>
                  </div>
                  <h3>Documents Expiring</h3>
                  <p> <span style={{color:'blue'}}>Click here</span> to show the documents which will Expire Soon...</p>
                </div>

                <div  className="col-xs-6 col-md-3" onClick={()=>navigate('/applications')} >
                  {" "}
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <i className="fa-solid fa-forward-fast" style={{ fontSize: '30px', color: 'white', backgroundImage: 'linear-gradient(to right, #ff9999, #ff4d4d)', padding: '30px', borderRadius: '50%' }}></i>
                    
                  </div>
                  <h3>Your Applications</h3>
                  <p> <span style={{color:'blue'}}>Click here</span> to show your applications and progress of your Applications</p>
                </div>
              </>
            :"Loading..."}
        </div>
        <Grid container spacing={2} style={{marginTop:'30px'}} >
          <Grid item xs={12} sm={6} md={3} >
            <Link to={'/documents'} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                bgcolor="rgba(0, 0, 0, 0.05)"
                height="100%"
                p={2}
                borderRadius={2}
                boxShadow={1}
                textAlign="center"
              >
                  <i className={'fa fa-book'} style={{ fontSize: '48px', marginBottom: '10px' }}></i>
                    <Box className="service-desc">
                      <Button
                          variant="contained"
                          sx={{ 
                            fontSize: '1.5rem', 
                            backgroundColor: '#ffffff', 
                            color: '#000000', 
                            textTransform: 'none', 
                            '&:hover': {
                              backgroundColor: '#000000',
                              color: '#ffffff',
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
                  bgcolor="rgba(0, 0, 0, 0.05)"
                  height="100%"
                  p={2}
                  borderRadius={2}
                  boxShadow={1}
                  textAlign="center"
                >
                <i className={'fa fa-users'} style={{ fontSize: '48px', marginBottom: '10px' }}></i>
                <Box className="service-desc">
                  <Button
                    variant="contained"
                    sx={{ 
                      fontSize: '1.5rem', 
                      backgroundColor: '#ffffff', 
                      color: '#000000', 
                      textTransform: 'none', 
                      '&:hover': {
                        backgroundColor: '#000000',
                        color: '#ffffff',
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
                bgcolor="rgba(0, 0, 0, 0.05)"
                height="100%"
                p={2}
                borderRadius={2}
                boxShadow={1}
                textAlign="center"
              >
                <i className={'fa fa-hourglass-end'} style={{ fontSize: '48px', marginBottom: '10px' }}></i>
                <Box className="service-desc">
                <Button
                    variant="contained"
                    sx={{ 
                      fontSize: '1.5rem', 
                      backgroundColor: '#ffffff', 
                      color: '#000000', 
                      textTransform: 'none', 
                      '&:hover': {
                        backgroundColor: '#000000',
                        color: '#ffffff',
                      }
                    }}
                  >
                    Applications List
                  </Button>
                </Box>
              </Box>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3} >
            <Link to={'/profile'} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                bgcolor="rgba(0, 0, 0, 0.05)"
                height="100%"
                p={2}
                borderRadius={2}
                boxShadow={1}
                textAlign="center"
              >
              <i className={'fa fa-user'} style={{ fontSize: '48px', marginBottom: '10px' }}></i>
              <Box className="service-desc">
                <Button
                    variant="contained"
                    sx={{ 
                      fontSize: '1.5rem', 
                      backgroundColor: '#ffffff', 
                      color: '#000000', 
                      textTransform: 'none', 
                      '&:hover': {
                        backgroundColor: '#000000',
                        color: '#ffffff',
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