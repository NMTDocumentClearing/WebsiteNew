import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const Image = styled('img')({
  maxWidth: '100%',
  height: 'auto',
  borderRadius: '50%',
  marginBottom: '10px',
});

export const Testimonials = ({ data }) => {
  return (
    <div id="testimonials">
      <div className="container">
        <div className="section-title text-center">
          <h2>What our clients say</h2>
        </div>

        <Grid container spacing={2}>
          {data
            ? data.map((d, i) => (
                <Grid item xs={12} sm={6} md={4} key={`${d.name}-${i}`}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    bgcolor="rgba(255, 255, 255, 0.4)"
                    height="100%"
                    p={2}
                    borderRadius={2}
                    boxShadow={1}
                    minHeight="220px" // Adjust the fixed minimum height as needed
                  >
                    <Image src={d.img} alt="" />
                    <FadeInText text={`"${d.text}"`} />
                    <Typography
                      variant="subtitle1"
                      className="testimonial-meta"
                      color="black"
                    >
                      - {d.name}
                    </Typography>
                  </Box>
                </Grid>
              ))
              
            : 'loading'}
        </Grid>
      </div>
    </div>
  );
};

const FadeInText = ({ text }) => {
  const [animatedText, setAnimatedText] = useState('');

  useEffect(() => {
    animateText(text);
  }, [text]);

  const animateText = (text) => {
    let index = 0;
    const intervalId = setInterval(() => {
      setAnimatedText((prevText) => text.slice(0, index + 1)); // Slicing to get the portion of text up to current index
      index++;
      if (index === text.length) {
        clearInterval(intervalId);
        setTimeout(() => {
          setAnimatedText(''); // Reset animatedText after delay
          animateText(text); // Restart animation
        }, 10000); // Restart animation after 10 seconds
      }
    }, 100); // Adjust the interval for animation speed
  };

  return (
    <Typography variant="h6" sx={{ fontSize: '1.3rem', color: '#8A8A8A' }}>
      {animatedText}
    </Typography>
  );
};