import React, { useRef, useState } from 'react'
import {Form} from 'react-bootstrap'
import { forgetpasswordApi } from '../../api/service.api'
import { CustomButton, CustomInputText } from '../../component/Demo'
import CustomAlert from '../../utils/CustomAlert'
import Platform from './Platform';

import CircularProgress from '@mui/material/CircularProgress';



const ForgetPassword = () => {
  
  let formRef = useRef();
  const [email , setEmail] = useState();
  const [showAlert, setShowAlert] = useState(false);



  const [alertMessage, setalertMessage] = useState();
  const [spin, setspin] = useState(false);



  /* login */

  let clientforgetpasswordApi = async (e) =>{
    setspin(true)
    e.preventDefault();

    let res = await forgetpasswordApi({"email":email});
    if(res.status===true){
      setShowAlert(true);
      setalertMessage('Link sent to registred email');
      setEmail('');
      formRef.current.reset();
    }
    else{
      setShowAlert(true);
      setalertMessage(res.message);

    }
    setspin(false)

  }



  return (
    <>
          <Platform form={
               <Form ref={formRef} className='mx-auto' style={{maxWidth : '375px' , width:'100%'}} onSubmit={clientforgetpasswordApi}>
        <Form.Group  className=''>
        <Form.Label  className='text-uppercase fs-28-500'> Forgot Password </Form.Label>
        </Form.Group>


        <Form.Group  className='  my-3 d-flex flex-column'>
        <Form.Label>Email</Form.Label>
        <CustomInputText  className='w-100' id="outlined-basic" size='small' placeholder='xyz@gmail.com'  variant="outlined" onChange={(e)=>{setEmail(e.target.value)}}  />
        </Form.Group>

        <Form.Group  className=' my-3'>
        <CustomButton  variant="contained" size="medium" type='submit' >Reset { spin && <CircularProgress className='ms-1' size={15}  style={{color : 'white'}} /> }</CustomButton>
        </Form.Group>

                </Form>

          } />

{showAlert && <CustomAlert title={alertMessage} onSureBtn={false}  setShowAlertComp={setShowAlert} />}


    </>
  )
}

export default ForgetPassword