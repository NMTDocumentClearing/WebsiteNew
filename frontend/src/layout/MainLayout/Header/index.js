import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Grid, IconButton } from '@mui/material';

// project import
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';
import { drawerWidth } from '../../../config';

// assets
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import logo from '../../../assets/sccs/images/logonmt.jpeg';
import { useNavigate } from 'react-router-dom';

// ==============================|| HEADER ||============================== //

const Header = ({ drawerToggle }) => {
  const navigate = useNavigate()

  const adminInfo = localStorage.getItem("adminInfo");

  useEffect(()=>{
      if(adminInfo === undefined){
        navigate('/admin')
      }
  },[adminInfo])
  
  const theme = useTheme();

  return (
    <>
      <Box width={drawerWidth}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Grid item>
              <Box mt={0.5} >
                <div style={{display:"flex",flexDirection:"row", gap:"10px"}}>
                  <img style={{width:"40px",height:"40px", borderRadius:"10px"}} src={logo} alt="Logo" />
                  <h5>NMT Doc. Clearing</h5>
                </div>
              </Box>
            </Grid>
          </Box>
          <Grid item>
            <IconButton
              edge="start"
              sx={{ mr: theme.spacing(1.25) }}
              color="inherit"
              aria-label="open drawer"
              onClick={drawerToggle}
              size="large"
            >
              <MenuTwoToneIcon sx={{ fontSize: '1.5rem' }} />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <SearchSection theme="light" />
      <NotificationSection />
      <ProfileSection />
    </>
  );
};

Header.propTypes = {
  drawerToggle: PropTypes.func
};

export default Header;
