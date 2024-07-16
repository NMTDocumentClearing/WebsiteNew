import React from "react";
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const Services = (props) => {
  return (
    <div id="services" className="text-center">
  <div className="video-background">
    <video autoPlay muted loop id="video">
      <source src="img/3129671-uhd_3840_2160_30fps.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
  <div className="container content">
    <div className="section-title">
      <h2>Our Services</h2>
      <p>
        Our comprehensive range of services at NMT is tailored to meet all your documentation needs under one roof.
      </p>
    </div>
    <Grid container spacing={2}>
      {props.data
        ? props.data.map((d, i) => (
            <Grid item xs={12} sm={6} md={4} key={`${d.name}-${i}`}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                bgcolor="rgba(255, 255, 255, 0.1)"
                height="100%"
                p={2}
                borderRadius={2}
                boxShadow={1}
                textAlign="center"
              >
                <Link to={`/${d.link}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <i className={d.icon} style={{ fontSize: '48px', marginBottom: '10px' }}></i>
                </Link>
                <Box className="service-desc">
                <Typography variant="h6" gutterBottom color='#FFFFFF' sx={{ fontSize: '2.1rem' }}>
                    {d.name}
                  </Typography>
                  <Typography variant="body1" color='#FFFFFF' sx={{ fontSize: '1.3rem' }}>{d.text}</Typography>
                </Box>
              </Box>
            </Grid>
          ))
        : "loading"}
    </Grid>
  </div>
</div>
  );
};