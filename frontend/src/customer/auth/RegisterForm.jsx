import { Button, Grid, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { getUser, register } from '../../state/auth/Action';

const RegisterForm = () => {

  const navigate=useNavigate();
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt");
  const {auth}=useSelector(store=>store);

  const handleSubmit = (event) => {
      event.preventDefault();

      const data=new FormData(event.currentTarget);

      const userData={
        firstName:data.get("firstName"),
        lastName:data.get("lastName"),
        email:data.get("email"),
        password:data.get("password"),
        mobile:data.get("mobile"),
      }

      dispatch(register(userData));

      console.log("User",auth.user);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
            required
            id='firstName'
            name='firstName'
            label='First Name'
            fullWidth
            autoComplete
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
            required
            id='lastName'
            name='lastName'
            label='Last Name'
            fullWidth
            autoComplete
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
            required
            id='email'
            name='email'
            label='Email'
            fullWidth
            autoComplete
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
            id='mobile'
            name='mobile'
            label='Mobile No.'
            fullWidth
            autoComplete
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
            required
            id='password'
            name='password'
            label='Password'
            type='password'
            fullWidth
            autoComplete
            />
          </Grid>

          <Grid item xs={12}>
            <Button
            className='w-full'
            type='submit'
            variant='contained'
            size='large'
            sx={{padding:"0.8rem 0", bgcolor:"#9155fd"}}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>

      <div className='flex justify-center flex-col items-center'>
        <div className='py-3 flex items-center'>
          <p>Already have an account?</p>
          <Button 
          onClick={()=>navigate("/login")}
          className='ml-5'
          size='small'
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm