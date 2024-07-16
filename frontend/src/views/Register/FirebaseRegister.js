import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from "react-router-dom";
import { adminsRegister } from "../../actions/adminActions";

import ErrorMessage from "../../components/errorMessage.jsx";
import Loading from "../../components/loading.jsx";

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Divider,
  FormHelperText,
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Google from '../../assets/sccs/images/social-google.svg';

// ==============================|| FIREBASE REGISTER ||============================== //

const FirebaseRegister = ({ ...rest }) => {
  const theme = useTheme();
  const [fullname, setFullname] = useState("")
  const [phonenumber, setPhonenumber] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')

  const userRegister = useSelector((state)=> state.userRegister)
  const {loading, error, userInfo} = userRegister

  const dispatch = useDispatch()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [showPassword, setShowPassword] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    if (passwordError === '' && emailError === '') {
        console.log(fullname, phonenumber, email, password);
        dispatch(adminsRegister(fullname, phonenumber, email, password));
        checkLocalStorage(); // Check for userInfo after dispatching the registration action
    }
};

const checkLocalStorage = () => {
    const adminInfo = localStorage.getItem('adminInfo');
    if (adminInfo) {
        // Redirect to the home page
        navigate('/admin') // Replace '/home' with the actual URL of your home page
    }
};

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const checkEmail = ()=>{
    if(!emailRegex.test(email)){
       setEmailError(`Email ${email} is not a valid email`)
    }else{
      setEmailError('')
    }
  }

  const checkPassword = ()=>{
    if(password.length > 0){
        if(password.length < 5){
            setPasswordError('Password should contain atleast 5 characters')
        }else{
            setPasswordError('')
        }
    }
  }

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Button
            fullWidth={true}
            sx={{
              fontSize: { md: '1rem', xs: '0.875rem' },
              fontWeight: 500,
              backgroundColor: theme.palette.grey[50],
              color: theme.palette.grey[600],
              textTransform: 'capitalize',
              '&:hover': {
                backgroundColor: theme.palette.grey[100]
              }
            }}
            size="large"
            variant="contained"
          >
            <img
              src={Google}
              alt="google"
              width="20px"
              style={{
                marginRight: '16px',
                '@media (maxWidth:900px)': {
                  marginRight: '8px'
                }
              }}
            />{' '}
            Register with Google
          </Button>
        </Grid>
      </Grid>

      <Box alignItems="center" display="flex" mt={2}>
        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
        <Typography color="textSecondary" variant="h5" sx={{ m: theme.spacing(2) }}>
          OR
        </Typography>
        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
      </Box>
      {error && <ErrorMessage message={error}>{error}</ErrorMessage>}
                {loading && <Loading />}
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={submitHandler} {...rest}>
            <TextField
              // error={Boolean(touched.email && errors.email)}
              fullWidth
              // helperText={touched.email && errors.email}
              label="Your Full Name"
              margin="normal"
              name="email"
              // onBlur={checkEmail}
              onChange={(e)=>setFullname(e.target.value)}
              type="text"
              // value={values.email}
              variant="outlined"
            />

            <TextField
              // error={Boolean(touched.email && errors.email)}
              fullWidth
              // helperText={touched.email && errors.email}
              label="Your Phone Number"
              margin="normal"
              name="phonenumber"
              // onBlur={checkEmail}
              onChange={(e)=>setPhonenumber(e.target.value)}
              type="Number"
              // value={values.email}
              variant="outlined"
            />

            <TextField
              error={Boolean(touched.email && errors.email)}
              fullWidth
              helperText={touched.email && errors.email}
              label="Email Address / Username"
              margin="normal"
              name="email"
              onBlur={checkEmail}
              onChange={(e)=>setEmail(e.target.value)}
              type="email"
              // value={values.email}
              variant="outlined"
            />

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ mt: theme.spacing(3), mb: theme.spacing(1) }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                // value={values.password}
                name="password"
                onBlur={checkPassword}
                onChange={(e)=>setPassword(e.target.value)}
                label="Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text">
                  {' '}
                  {errors.password}{' '}
                  { passwordError ?
                   <p>{passwordError}</p> :
                   null
                }
                </FormHelperText>
              )}
            </FormControl>

            {errors.submit && (
              <Box mt={3}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
            <Box my={0}>
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                }
                label={
                  <>
                    I have read the &nbsp;
                    <Link to="#">Terms and Conditions </Link>
                  </>
                }
              />
            </Box>
            <Box mt={2}>
              <Button color="primary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                Register
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseRegister;
