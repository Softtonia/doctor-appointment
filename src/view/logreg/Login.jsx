import { Box, FormControlLabel } from '@mui/material'
import React from 'react'
import { Card, Col, Container, Form, Row } from 'react-bootstrap'
import {NavLink, useNavigate } from 'react-router-dom'
import { CustomButton, CustomCheckbox, CustomInputText } from '../../component/Demo'
import Platform from './Platform'


const Login = () => {

  let navigate = useNavigate();

  const loginFn = () =>{
      navigate('/')
  }


  return (  
    <>

<Platform form={
   <Form className='mx-auto' style={{maxWidth : '475px' , width:'100%'}}>
        <Form.Group  className=' text-center'>
        <Form.Label  className='text-uppercase text-center fs-32-500'> log in </Form.Label>
        </Form.Group>


        <Form.Group  className='  my-3 d-flex flex-column'>
        <Form.Label>Email</Form.Label>
        <CustomInputText  className='w-100' id="outlined-basic" size='small' placeholder='xyz@gmail.com'  variant="outlined"  />
        </Form.Group>

        <Form.Group  className='  my-3 d-flex flex-column'>
        <Form.Label>Password</Form.Label>
        <CustomInputText  className='w-100' id="outlined-basic" size='small' placeholder='******' variant="outlined" type='password' />
        </Form.Group>

        <Form.Group  className='  my-3 d-flex flex-column'>
        <Box className='' display='flex' justifyContent='space-between' flexDirection='row' alignItems='center'>
        <FormControlLabel control={<CustomCheckbox style ={{
                      color: "#4F46E5",
                      borderRadius : '50px',
                    }} iconStyle={{color: 'red'}} defaultChecked />} label="Remember me" />
       
        <NavLink to='/forget-password' className='text-black' >Forgot Password?</NavLink>

        </Box>
        
        </Form.Group>


        <Form.Group  className=' my-3 d-flex justify-content-end'>
        <CustomButton  variant="contained" size="medium" onClick={()=>{loginFn()}}>LOG IN</CustomButton>
        </Form.Group>

                </Form>

} />


    
    
    </>
  )
}

export default Login 