import { Button, Grid, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { login } from '../../state/auth/Action';

const LoginForm = () => {

  const navigate=useNavigate();
  const location=useLocation();
  const dispatch=useDispatch();


  const handleSubmit = (event) => {
      event.preventDefault();

      const data=new FormData(event.currentTarget);

      const userData={
        email:data.get("email"),
        password:data.get("password")
      }

      dispatch(login(userData));

      console.log(userData);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
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
              Login
            </Button>
          </Grid>
        </Grid>
      </form>

      <div className='flex justify-center flex-col items-center'>
        <div className='py-3 flex items-center'>
          <p>Don't have an account?</p>
          <Button 
          onClick={()=>navigate(`/register`)}
          className='ml-5'
          size='small'
          >
            Create an Account
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LoginForm