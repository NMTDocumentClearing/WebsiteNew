import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {Badge, Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

// third party
import { useSelector, useDispatch } from 'react-redux';

// project import
import * as actionTypes from '../../../../../store/actions';

// assets
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getRecentApplications } from '../../../../../api/adminAPI';
import { AppContext } from '../../../../../views/appContext';


// ==============================|| NAV ITEM ||============================== //

const NavItem = ({ item, level }) => {
  const [recentApplication, setRecentApplication] = useState(0)

  useEffect(()=>{
    async function getAllRecentApplication(){
        try {
            const {data} = await getRecentApplications()
            if(data){
                setRecentApplication(data.data.length)
                // console.log(recentApplication);
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    getAllRecentApplication()
},[])
  

  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const dispatch = useDispatch();
  const Icon = item.icon;
  const itemColor = item.color;
  const itemIcon = item.icon ? <Icon color="inherit" /> : <ArrowForwardIcon color="inherit" fontSize={level > 0 ? 'inherit' : 'default'} />;
  const {expiringLabours} = useContext(AppContext)
  let itemTarget = '';
  if (item.target) {
    itemTarget = '_blank';
  }
  let listItemProps = { component: Link, to: item.url };
  if (item.external) {
    listItemProps = { component: 'a', href: item.url };
  }

  return (
    
    <ListItemButton
      disabled={item.disabled}
      sx={{
        ...(level > 1 && { backgroundColor: 'transparent !important', py: 1, borderRadius: '5px' }),
        borderRadius: '5px',
        marginBottom: '5px',
        pl: `${level * 16}px`,
        position: 'relative' // Ensure the button is positioned relative for the badge to be positioned correctly
      }}
      selected={customization.isOpen === item.id}
      component={Link}
      onClick={() => dispatch({ type: actionTypes.MENU_OPEN, isOpen: item.id })}
      to={item.url}
      target={itemTarget}
      {...listItemProps}
    >
      {item.title === 'Applications' &&
        <Badge
        color="error"
        badgeContent= {recentApplication}
        overlap="circular"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%'
        }}
      />
      }
      {item.title === 'Notifications' &&
        <Badge
        color="error"
        badgeContent= {expiringLabours.length}
        overlap="circular"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%'
        }}
      />
      }
      <ListItemIcon sx={{ minWidth: 25 }} style={{ width: "20px", height: "20px", color: itemColor }}>
        {itemIcon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography sx={{ pl: 1.4 }} variant={customization.isOpen === item.id ? 'subtitle1' : 'body1'} color="inherit">
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography variant="caption" sx={{ pl: 2 }} display="block" gutterBottom>
              {item.caption}
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
  icon: PropTypes.object,
  target: PropTypes.object,
  url: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  title: PropTypes.string,
  caption: PropTypes.string,
  chip: PropTypes.object,
  color: PropTypes.string,
  label: PropTypes.string,
  avatar: PropTypes.object
};

export default NavItem;
