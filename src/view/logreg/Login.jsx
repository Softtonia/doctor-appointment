import { Box, CircularProgress, FormControlLabel } from '@mui/material'
import React, { useState } from 'react'
import { Card, Col, Container, Form, Row } from 'react-bootstrap'
import {NavLink, useNavigate } from 'react-router-dom'
import { loginApi } from '../../api/service.api'
import { notify } from '../../App'
import { CustomButton, CustomCheckbox, CustomInputText } from '../../component/Demo'
import CustomAlert from '../../utils/CustomAlert'
import Platform from './Platform';
import { Cookies, useCookies } from 'react-cookie';



const Login = () => {

  let navigate = useNavigate();

  const loginFn = () =>{
      navigate('/')
  }
  const [cookies, setCookie , removeCookie] = useCookies(['email', 'password']);
  const [email , setEmail] = useState(cookies.email);
  const [password , setPassword] = useState(cookies.password);
  const [spin, setspin] = useState(false);


  console.log(cookies , 'cookiescookies')

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };



  /* login */

  let clientloginApi = async (e) =>{
    setspin(true);
    e.preventDefault();

    let res = await loginApi({email,password});

    console.log(res , 'login red')

    if(res.status===true){
      notify('Login success');
      navigate('/');

      setCookie('token', res.token);
      setCookie('user_id', res.user_id);

      if(isChecked){
        setCookie('email', email, { path: '/login' });
        setCookie('password', password, { path: '/login' });
        console.log('check on')
      }
      else{
        removeCookie('email',{ path: '/login' });
        removeCookie('password', { path: '/login' });
        console.log('check off')

      }
      
    }
    else{
      notify('Login failed');
    }

    setspin(false);

  }



  return (  
    <>

<Platform form={
   <Form className='mx-auto' style={{maxWidth : '375px' , width:'100%'}} onSubmit={clientloginApi} >
        <Form.Group  className=''>
        <Form.Label  className='text-uppercase fs-28-500'> log in </Form.Label>
        </Form.Group>


        <Form.Group  className='  my-3 d-flex flex-column'>
        <Form.Label>Email</Form.Label>
        <CustomInputText  className='w-100' id="outlined-basic" size='small' placeholder='xyz@gmail.com'  variant="outlined"  defaultValue={cookies.email? cookies.email : '' } onChange={(e)=>{setEmail(e.target.value)}}  />
        </Form.Group>

        <Form.Group  className='  my-3 d-flex flex-column'>
        <Form.Label>Password</Form.Label>
        <CustomInputText  className='w-100' id="outlined-basic" size='small' placeholder='******' variant="outlined" type='password' defaultValue={cookies.password? cookies.password : '' } onChange={(e)=>{setPassword(e.target.value)}}  />
        </Form.Group>

        <Form.Group  className='  my-3 d-flex flex-column'>
        <Box className='' display='flex' justifyContent='space-between' flexDirection='row' alignItems='center'>
        <FormControlLabel control={<CustomCheckbox style ={{
                      color: "#4F46E5",
                      borderRadius : '50px',
                    }} iconStyle={{color: 'red'}} onChange={handleCheckboxChange} checked={isChecked} />} label="Remember me" />
       
        <NavLink to='/forget-password' className='text-black link-tag' >Forgot Password?</NavLink>

        </Box>
        
        </Form.Group>


        <Form.Group  className=' my-3'>
        <CustomButton  variant="contained" size="medium" type='submit'>LOG IN{ spin && <CircularProgress className='ms-1' size={15}  style={{color : 'white'}} /> }</CustomButton>
        </Form.Group>

                </Form>

} />
 
    
    </>
  )
}

export default Login 