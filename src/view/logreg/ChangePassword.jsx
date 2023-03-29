import { Box, FormControlLabel } from '@mui/material'
import React from 'react'
import { Card, Col, Container, Form, Row } from 'react-bootstrap'
import {NavLink } from 'react-router-dom'
import { CustomButton, CustomCheckbox, CustomInputText } from '../../component/Demo'
import Platform from './Platform'

const ChangePassword = () => {
  return (
    <>
          <Platform form={
               <Form className='mx-auto' style={{maxWidth : '375px' , width:'100%'}}>
        <Form.Group  className=''>
        <Form.Label  className='text-uppercase fs-28-500'> Change Password </Form.Label>
        </Form.Group>


        <Form.Group  className='  my-3 d-flex flex-column'>
        <Form.Label>New Password</Form.Label>
        <CustomInputText  className='w-100' size='small' placeholder='******'  variant="outlined"  />
        </Form.Group>
        <Form.Group  className='  my-3 d-flex flex-column'>
        <Form.Label>Confirm Password</Form.Label>
        <CustomInputText  className='w-100' size='small' placeholder='******'  variant="outlined"  />
        </Form.Group>
        

        <Form.Group  className=' my-3'>
        <CustomButton  variant="contained" size="medium" >SET PASSWORD</CustomButton>
        </Form.Group>

                </Form>
          } />
    </>
  )
}

export default ChangePassword