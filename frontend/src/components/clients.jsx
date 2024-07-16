import React from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { red } from "@mui/material/colors";

const Image = styled('img')({
  maxWidth: '100px',
  marginBottom: '10px',
});


export const Clients = (props) => {
  return (
    <div id="clients" className="text-center" style={{ paddingBottom: '80px' }}>
  <div className="container">
    <div className="col-md-10 col-md-offset-1 section-title" style={{ marginBottom: '50px' }}>
      <h2>Our Clients</h2>
    </div>
    <Grid container spacing={2}>
      {props.data
        ? props.data.map((d, i) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={`${d.title}-${i}`}>
              <Box
                sx={{
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  bgcolor: 'rgba(255, 255, 255, 0.8)',
                  padding: 2,
                  alignItems: 'center',
                  height: '100%',
                  textAlign: 'center',
                  paddingBottom: 2,
                  minHeight: '150px', // Adjust the minimum height as needed
                }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  flexGrow={1}
                >
                  <Image alt="img" src={d.image} />
                </Box>
                <Typography variant="h6" style={{ fontWeight: 'bolder' }} color={'black'}>
                  {d.title}
                </Typography>
              </Box>
            </Grid>
          ))
        : 'Loading...'}
    </Grid>
  </div>
</div>
  );
};