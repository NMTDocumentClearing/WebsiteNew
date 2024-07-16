import React, { useContext, useEffect, useState } from 'react';


import { useTheme } from '@mui/material/styles';
import {
  Button,
  Chip,
  ClickAwayListener,
  Fade,
  Grid,
  Paper,
  Popper,
  Avatar,
  List,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  ListItemSecondaryAction,
  Typography,
  ListItemButton
} from '@mui/material';
import Badge from '@mui/material/Badge';

import PerfectScrollbar from 'react-perfect-scrollbar';

import QueryBuilderTwoToneIcon from '@mui/icons-material/QueryBuilderTwoTone';
import NotificationsNoneTwoToneIcon from '@mui/icons-material/NotificationsNoneTwoTone';

import IDCard from '../../../../assets/sccs/images/users/Emirates-id-check-3.jpg';
import LabourCard from '../../../../assets/sccs/images/users/labourr-card-in-UAE-01-1.png'
import { AppContext } from '../../../../views/appContext';

// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);


  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const {employeesWithExpiry} = useContext(AppContext)

  
  const notificationCout = (array)=>{
      var count = (array.length)*2
      array.forEach((e) => {
        if (e.idExpiry.length === 0) {
          count--;
        }
      });
      return count
  }

  return (
    <>
  <Button
    sx={{
      minWidth: { sm: 50, xs: 35 },
      position: 'relative' // Add relative positioning to the button
    }}
    ref={anchorRef}
    aria-controls={open ? 'menu-list-grow' : undefined}
    aria-haspopup="true"
    aria-label="Notification"
    onClick={handleToggle}
    color="inherit"
  >
    <Badge
      badgeContent={notificationCout(employeesWithExpiry)}
      color="error"
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      style={{ padding: '2px', fontSize: '3rem' }} // Adjust the padding as needed
    >
      <NotificationsNoneTwoToneIcon sx={{ fontSize: '1.5rem' }} />
    </Badge>
  </Button>
  <Popper
    placement="bottom-end"
    open={open}
    anchorEl={anchorRef.current}
    role={undefined}
    transition
    disablePortal
    modifiers={[
      {
        name: 'offset',
        options: {
          offset: [0, 10]
        }
      },
      {
        name: 'preventOverflow',
        options: {
          altAxis: true // false by default
        }
      }
    ]}
    style={{ width: '300px', overflow: 'hidden' }}
  >
    {({ TransitionProps }) => (
      <Fade {...TransitionProps}>
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <List
              sx={{
                width: '100%',
                maxWidth: 350,
                minWidth: 250,
                maxHeight: 400, // Set maximum height for the list
                backgroundColor: theme.palette.background.paper,
                pb: 0,
                borderRadius: '10px',
                overflow: 'auto' // Ensure overflow is set to auto to enable scrolling
              }}
            >
              <PerfectScrollbar>
                <>
                  <ListSubheader disableSticky>
                    <Chip size="small" color="primary" label="ID Expiry" style={{ backgroundColor: 'red', color: 'white' }} />
                  </ListSubheader>

                  {employeesWithExpiry.map((item, index) => (
                    <ListItemButton alignItemsFlexStart sx={{ pt: 0 }} key={index}>
                      {item.idExpiry.length > 0 ? (
                        <>
                          <ListItemAvatar>
                            <Avatar alt="John Doe" src={IDCard} />
                          </ListItemAvatar>

                          <ListItemText
                            primary={<Typography variant="subtitle1">{item.company}</Typography>}
                            secondary={<Typography variant="subtitle2" style={{ color: "red" }}>{item.idExpiry.length} Labour's ID Expiring</Typography>}
                          />
                          <ListItemSecondaryAction sx={{ top: 22 }}>
                            <Grid container justifyContent="flex-end">
                              <Grid item>
                                <QueryBuilderTwoToneIcon
                                  sx={{
                                    fontSize: '0.75rem',
                                    mr: 0.5,
                                    color: theme.palette.grey[400]
                                  }}
                                />
                              </Grid>
                              <Grid item>
                                <Typography variant="caption" display="block" gutterBottom sx={{ color: theme.palette.grey[400] }}>
                                  now
                                </Typography>
                              </Grid>
                            </Grid>
                          </ListItemSecondaryAction>
                        </>
                      ) : null}
                    </ListItemButton>
                  ))}

                </>

                <>
                  <ListSubheader disableSticky>
                    <Chip size="small" color="primary" label="Labour Expiry" style={{ backgroundColor: 'red', color: 'white' }} />
                  </ListSubheader>

                  {employeesWithExpiry.map((item, index) => (
                    <ListItemButton alignItemsFlexStart sx={{ pt: 0 }} key={index}>
                      {item.labourExpiry.length > 0 ? (
                        <>
                          <ListItemAvatar>
                            <Avatar alt="John Doe" src={LabourCard} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={<Typography variant="subtitle1">{item.company}</Typography>}
                            secondary={<Typography variant="subtitle2" style={{ color: "red" }}>{item.labourExpiry.length} Labour's Labour Card Expiring</Typography>}
                          />
                          <ListItemSecondaryAction sx={{ top: 22 }}>
                            <Grid container justifyContent="flex-end">
                              <Grid item>
                                <QueryBuilderTwoToneIcon
                                  sx={{
                                    fontSize: '0.75rem',
                                    mr: 0.5,
                                    color: theme.palette.grey[400]
                                  }}
                                />
                              </Grid>
                              <Grid item>
                                <Typography variant="caption" display="block" gutterBottom sx={{ color: theme.palette.grey[400] }}>
                                  now
                                </Typography>
                              </Grid>
                            </Grid>
                          </ListItemSecondaryAction>
                        </>
                      ) : null}
                    </ListItemButton>
                  ))}

                </>

                {/* <ListSubheader disableSticky>
                  <Chip size="small" variant="outlined" label="EARLIER" />
                </ListSubheader>
                <ListItemButton alignItemsFlexStart sx={{ pt: 0 }}>
                  <ListItemAvatar>
                    <Avatar alt="Joseph William" src={User2} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography variant="subtitle1">Joseph William</Typography>}
                    secondary={<Typography variant="subtitle2">Purchase a new product</Typography>}
                  />
                  <ListItemSecondaryAction sx={{ top: 20 }}>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <QueryBuilderTwoToneIcon
                          sx={{
                            fontSize: '0.75rem',
                            mr: 0.5,
                            color: theme.palette.grey[400]
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="caption" display="block" gutterBottom sx={{ color: theme.palette.grey[400] }}>
                          10 min
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItemSecondaryAction>
                </ListItemButton>
                <ListItemButton alignItemsFlexStart>
                  <ListItemAvatar>
                    <Avatar alt="Sara Soudein" src={User3} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography variant="subtitle1">Sara Soudein</Typography>}
                    secondary={<Typography variant="subtitle2">Currently Login</Typography>}
                  />
                  <ListItemSecondaryAction sx={{ top: 30 }}>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <QueryBuilderTwoToneIcon
                          sx={{
                            fontSize: '0.75rem',
                            mr: 0.5,
                            color: theme.palette.grey[400]
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="caption" display="block" gutterBottom sx={{ color: theme.palette.grey[400] }}>
                          12 min
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItemSecondaryAction>
                </ListItemButton>
                <ListItemButton alignItemsFlexStart>
                  <ListItemAvatar>
                    <Avatar alt="Sepha Wilon" src={User4} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography variant="subtitle1">Sepha Wilon</Typography>}
                    secondary={<Typography variant="subtitle2">Purchase a new product</Typography>}
                  />
                  <ListItemSecondaryAction sx={{ top: 30 }}>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <QueryBuilderTwoToneIcon
                          sx={{
                            fontSize: '0.75rem',
                            mr: 0.5,
                            color: theme.palette.grey[400]
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="caption" display="block" gutterBottom sx={{ color: theme.palette.grey[400] }}>
                          30 min
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItemSecondaryAction>
                </ListItemButton> */}
              </PerfectScrollbar>
            </List>
          </ClickAwayListener>
        </Paper>
      </Fade>
    )}
  </Popper>
</>
  );
};

export default NotificationSection;
