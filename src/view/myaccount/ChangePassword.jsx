import React, { useEffect, useRef, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { CustomButton, CustomInputText} from '../../component/Demo'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { changepasswordApi } from '../../api/service.api';
import { SweetAlertSingle } from '../../utils/SweetAlert';
import { useCookies } from 'react-cookie';


const ManageMyPassword = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token','user_id']);
    let formRef = useRef();

    let [password,setpassword] = useState();
    let [cpassword,setcpassword] = useState();

    let changePasswordFn = async (e) =>{
        e.preventDefault();
        let res = await changepasswordApi({password,cpassword},cookies.token);
        if(res.status===true){
            SweetAlertSingle({title: 'Password Changed' , icon : 'success'});
            formRef.current.reset();
            setpassword('');
            setcpassword('');

        }
        else{
            SweetAlertSingle({title: 'Request Failed', text : res.message , icon : 'warning'})
        }
    }

  return (
    <>

<Row>
       <Col xs={12} className=''> <span className="title-box fs-24-500">Change Password</span> </Col>
 
       <Col md={6} xs={12} className='my-3 mx-auto'>
       
       <Form className='row' onSubmit={changePasswordFn} ref={formRef}>
        <Col lg={12} className='my-3'>
          <Form.Group>
          <Form.Label>New Password</Form.Label>
            <CustomInputText size='small' className='w-100' placeholder='New Password' variant='outlined' onChange={(e)=>{setpassword(e.target.value)}} />
          </Form.Group>
        </Col>
        <Col lg={12} className='my-3'>
          <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
            <CustomInputText size='small' className='w-100' placeholder='Confirm Password' variant='outlined' onChange={(e)=>{setcpassword(e.target.value)}} />
          </Form.Group>
        </Col>

        <Col lg={6} className={`my-3 `}>
          <Form.Group>
   
     <CustomButton startIcon={<FileUploadIcon />} type='submit'>  Change </CustomButton>
          </Form.Group>
 
        </Col>

       </Form>
  
       </Col> 
 
     </Row>
    
    </>
  )
}

export default ManageMyPassword