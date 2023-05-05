import { Box, FormControlLabel } from '@mui/material'
import React, { useState } from 'react'
import { Card, Col, Container, Form, Row } from 'react-bootstrap'
import {NavLink, useNavigate, useParams } from 'react-router-dom'
import { CustomButton, CustomCheckbox, CustomInputText } from '../../component/Demo'
import Platform from './Platform'
import {resetpasswordApi } from '../../api/service.api'
import { SweetAlertSingle } from '../../utils/SweetAlert'

const ChangePassword = () => {

  let params = useParams();
  let navigate = useNavigate();

  let [password,setPassword] = useState();
  let [cpassword,setcPassword] = useState();


  let updatePassword = async (e) =>{
    e.preventDefault();
    let res = await resetpasswordApi({
      ftoken : params.token,
      password : password,
      cpassword : cpassword
    });
    if(res.status===true){
      SweetAlertSingle({title:'Reset Password' , text : res.message , icon : 'success', showCancelButton:false});
      navigate('/login');

    }
    else{
      SweetAlertSingle({title:'Request Failed' , text : res.message , icon : 'warning', showCancelButton:false});
   
    }
  }

  return (
    <>
          <Platform form={
               <Form className='mx-auto' style={{maxWidth : '375px' , width:'100%'}} onSubmit={updatePassword} >
        <Form.Group  className=''>
        <Form.Label  className='text-uppercase fs-28-500'> Change Password </Form.Label>
        </Form.Group>


        <Form.Group  className='  my-3 d-flex flex-column'>
        <Form.Label>New Password</Form.Label>
        <CustomInputText  className='w-100' size='small' placeholder='******'  variant="outlined" onChange={(e)=>{setPassword(e.target.value)}} />
        </Form.Group>
        <Form.Group  className='  my-3 d-flex flex-column'>
        <Form.Label>Confirm Password</Form.Label>
        <CustomInputText  className='w-100' size='small' placeholder='******'  variant="outlined" onChange={(e)=>{setcPassword(e.target.value)}} />
        </Form.Group>
        

        <Form.Group  className=' my-3'>
        <CustomButton  variant="contained" type='submit' size="medium" >SET PASSWORD</CustomButton>
        </Form.Group>

                </Form>
          } />
    </>
  )
}

export default ChangePassword