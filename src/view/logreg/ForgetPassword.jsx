import React from 'react'
import {Form} from 'react-bootstrap'
import { CustomButton, CustomInputText } from '../../component/Demo'
import Platform from './Platform'

const ForgetPassword = () => {
  return (
    <>
          <Platform form={
               <Form className='mx-auto' style={{maxWidth : '475px' , width:'100%'}}>
        <Form.Group  className=' text-center'>
        <Form.Label  className='text-uppercase text-center fs-32-500'> Forgot Password </Form.Label>
        </Form.Group>


        <Form.Group  className='  my-3 d-flex flex-column'>
        <Form.Label>Email</Form.Label>
        <CustomInputText  className='w-100' id="outlined-basic" size='small' placeholder='xyz@gmail.com'  variant="outlined"  />
        </Form.Group>

        <Form.Group  className=' my-3 d-flex justify-content-end'>
        <CustomButton  variant="contained" size="medium" >Reset</CustomButton>
        </Form.Group>

                </Form>
          } />
    </>
  )
}

export default ForgetPassword