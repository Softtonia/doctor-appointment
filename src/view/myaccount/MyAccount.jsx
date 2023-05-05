import { Edit } from '@mui/icons-material'
import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { CustomButton, CustomInputText } from '../../component/Demo'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { adminprofileApi, adminUpdateApi } from '../../api/service.api';
import { useCookies } from 'react-cookie';
import {GlobalData} from '../../App'
import { SweetAlertSingle } from '../../utils/SweetAlert';
const MyAccount = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token','user_id']);
  const [updatestate , setupdatestate] = useState(true);
  let globaldata = useContext(GlobalData)


  const [myaccount , setmyaccount] = useState();
    useEffect(()=>{
      if(globaldata.profile){
        setmyaccount(globaldata.profile);
      }
    }, [globaldata])

    const [updateData , setupdateData] = useState({
      first_name: "",
      last_name: "",
      email: "",
      hospital : "",
      address : "",
      district:"",
      phone : "",
      alternative_number: "",
      fax_no : "",
      logo : "",
      state:"",
      country:"",
      pincode:"",
      gst:"",
      tax:""
      });


    /* update api */
    const handelInp = (e) =>{

        let type = e.target.type;
        let name = e.target.name;

        let value;

        if(type==='file'){
          value = e.target.files[0];
        }
        else{
          value = e.target.value;
        }

        setupdateData({...updateData, [name]:value});
        

    }
    const updateApi = async (e) =>{
      e.preventDefault();

      console.log('clicked',updateData,'===============',cookies.user_id,cookies.token)

  
      let res = await adminUpdateApi(cookies.user_id,cookies.token,updateData);
      if(res.status===true){
      console.log(res , 'resresresres')
      }
      else{
        SweetAlertSingle({title:'Request Failed' , text : res.message , icon : 'warning', showCancelButton:false});
      }
  
    }

  return (
    <>
        <Row>
  <Col xs={12}>
    <Card className='py-lg-1 py-2 px-2 d-flex justify-content-lg-between justify-content-start align-items-lg-center align-items-end flex-lg-row flex-column px-3'>
    <div className="profile-box d-flex justify-content-start align-items-center">
      <img src={globaldata.profile?.profile_image} alt="" style={{height : '100px', width: '100px', objectFit: "contain"}} className='rounded-circle py-1 px-2 bg-light' />
      <ul className="list-unstyled ms-2">
        <li className='fs-20-600 mb-1' >{`${globaldata.profile?.first_name} ${globaldata.profile?.last_name}`}</li>
        <li className='fs-14-400' >{globaldata.profile?.email}</li>
      </ul>
    </div>

    <CustomButton size='sm' startIcon={<Edit />}   onClick={()=>{setupdatestate(false)}}>Edit Profile</CustomButton>
    </Card>
  </Col>

  <Col xs={12}>
    <Form className='row' onSubmit={updateApi}>

    <Col lg={4} xs={6} className='my-3' >
        <Form.Group>
          <Form.Label>Hospital Name</Form.Label>
          <CustomInputText type='text' className='w-100' placeholder='' size='small'  defaultValue={globaldata.profile?.district} name='district' onChange={(e)=>{handelInp(e)}} disabled={updatestate} />
        </Form.Group>
      </Col>

      <Col lg={4} xs={6} className='my-3' >
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <CustomInputText type='text' className='w-100' placeholder='' size='small'  defaultValue={globaldata.profile?.district} name='district' onChange={(e)=>{handelInp(e)}} disabled={updatestate} />
        </Form.Group>
      </Col>

      
      <Col lg={4} xs={6} className='my-3' >
        <Form.Group>
          <Form.Label>District</Form.Label>
          <CustomInputText type='text' className='w-100' placeholder='' size='small'  defaultValue={globaldata.profile?.district} name='district' onChange={(e)=>{handelInp(e)}} disabled={updatestate} />
        </Form.Group>
      </Col>

      <Col lg={4} xs={6} className='my-3' >
        <Form.Group>
          <Form.Label>State</Form.Label>
          <CustomInputText type='text' className='w-100' placeholder='' size='small' defaultValue={globaldata.profile?.state} name='state' onChange={(e)=>{handelInp(e)}} disabled={updatestate} />
        </Form.Group>
      </Col>

      <Col lg={4} xs={6} className='my-3' >
        <Form.Group>
          <Form.Label>Country</Form.Label>
          <CustomInputText type='text' className='w-100' placeholder='' size='small' defaultValue={globaldata.profile?.country} name='country' onChange={(e)=>{handelInp(e)}} disabled={updatestate} />
        </Form.Group>
      </Col>

      <Col lg={4} xs={6} className='my-3' >
        <Form.Group>
          <Form.Label>Pincode</Form.Label>
          <CustomInputText type='text' className='w-100' placeholder='' size='small' defaultValue={globaldata.profile?.pincode} name='pincode' onChange={(e)=>{handelInp(e)}} disabled={updatestate} />
        </Form.Group>
      </Col>

      <Col lg={4} xs={6} className='my-3' >
        <Form.Group>
          <Form.Label>GST no.</Form.Label>
          <CustomInputText type='text' className='w-100' placeholder='' size='small' defaultValue={globaldata.profile?.gst} name='gst' onChange={(e)=>{handelInp(e)}} disabled={updatestate} />
        </Form.Group>
      </Col>
      <Col lg={4} xs={6} className='my-3' >
        <Form.Group>
          <Form.Label>TAX no.</Form.Label>
          <CustomInputText type='text' className='w-100' placeholder='' size='small' defaultValue={globaldata.profile?.tax} name='tax' onChange={(e)=>{handelInp(e)}} disabled={updatestate} />
        </Form.Group>
      </Col>


      <Col lg={4} xs={6} className='my-3' >
        <Form.Group>
          <Form.Label>E-Mail</Form.Label>
          <CustomInputText type='text' className='w-100' placeholder='' defaultValue={globaldata.profile?.email} size='small' name='email' onChange={(e)=>{handelInp(e)}} disabled={updatestate} />
        </Form.Group>
      </Col>

      <Col lg={4} xs={6} className='my-3' >
        <Form.Group>
          <Form.Label>Contact no.</Form.Label>
          <CustomInputText type='text' className='w-100' placeholder='' defaultValue={globaldata.profile?.phone} size='small' name='phone' onChange={(e)=>{handelInp(e)}} disabled={updatestate} />
        </Form.Group>
      </Col>

      <Col lg={4} xs={6} className='my-3' >
        <Form.Group>
          <Form.Label>Alternative Contact no.</Form.Label>
          <CustomInputText type='text' className='w-100' placeholder='' defaultValue={globaldata.profile?.phone} size='small' name='phone' onChange={(e)=>{handelInp(e)}} disabled={updatestate} />
        </Form.Group>
      </Col>

      <Col lg={4} xs={6} className='my-3' >
        <Form.Group>
          <Form.Label>Fax no.</Form.Label>
          <CustomInputText type='text' className='w-100' placeholder='' defaultValue={globaldata.profile?.phone} size='small' name='phone' onChange={(e)=>{handelInp(e)}} disabled={updatestate} />
        </Form.Group>
      </Col>

      <Col lg={4} xs={6} className='my-3' >
        <Form.Group>
          <Form.Label>Logo</Form.Label>
          <CustomInputText type='file' className='w-100'  placeholder='' defaultValue={globaldata.profile?.phone} size='small' name='phone' onChange={(e)=>{handelInp(e)}} disabled={updatestate} />
        </Form.Group>
      </Col>


      {updatestate ?

      
      null : 
      
        <Col lg={4} xs={6} className={`my-3 d-flex justify-content-start align-items-end `}>
          <Form.Group>
              <CustomButton startIcon={<FileUploadIcon />} type='submit' >update</CustomButton>
          </Form.Group>
 
        </Col>

         }


    </Form>
  </Col>
        </Row> 
    </>
  )
}

export default MyAccount