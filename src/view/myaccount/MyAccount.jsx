import { Edit } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { CustomButton, CustomInputText } from '../../component/Demo'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { adminprofileApi, adminUpdateApi } from '../../api/service.api';
import { useCookies } from 'react-cookie';
const MyAccount = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token','user_id']);
  const [updatestate , setupdatestate] = useState(true);


    /* get api */
    const [profileData , setprofileData] = useState([]);
  
    const getApi = async () =>{
  
      let res = await adminprofileApi(cookies.token);
      if(res.status===true){
      setprofileData(res.data)
      console.log(res , 'resresresres')
      }
  
    }
  
    useEffect(()=>{
      getApi();
    }, []);

    /* update api */
    const handelInp = (e) =>{
        let type = e.traget.type;
        let name = e.traget.name;

        let value;

        if(type==='file'){
          value = e.traget.files[0];
        }
        else{
          value = e.traget.value;
        }

        setprofileData({...profileData, [name]:value});
        

    }
    const updateApi = async () =>{
  
      let res = await adminUpdateApi(cookies.token);
      if(res.status===true){
      setprofileData(res.data)
      console.log(res , 'resresresres')
      }
  
    }

  return (
    <>
        <Row>
  <Col xs={12}>
    <Card className='py-lg-1 py-2 px-2 d-flex justify-content-lg-between justify-content-start align-items-lg-center align-items-end flex-lg-row flex-column px-3'>
    <div className="profile-box d-flex justify-content-start align-items-center">
      <img src={profileData.profile_image} alt="" style={{height : '100px', width: '100px', objectFit: "contain"}} className='rounded-circle py-1 px-2 bg-light' />
      <ul className="list-unstyled ms-2">
        <li className='fs-20-600 mb-1' >{`${profileData.first_name} ${profileData.last_name}`}</li>
        <li className='fs-14-400' >{profileData.email}</li>
      </ul>
    </div>

    <CustomButton size='sm' startIcon={<Edit />}   onClick={()=>{setupdatestate(false)}}>Edit Profile</CustomButton>
    </Card>
  </Col>

  <Col xs={12}>
    <Form className='row'>
      <Col lg={4} xs={6} className='my-3' >
        <Form.Group>
          <Form.Label>District</Form.Label>
          <CustomInputText className='w-100' placeholder='' size='small' disabled={updatestate} />
        </Form.Group>
      </Col>

      <Col lg={4} xs={6} className='my-3' >
        <Form.Group>
          <Form.Label>State</Form.Label>
          <CustomInputText className='w-100' placeholder='' size='small' disabled={updatestate} />
        </Form.Group>
      </Col>

      <Col lg={4} xs={6} className='my-3' >
        <Form.Group>
          <Form.Label>Country</Form.Label>
          <CustomInputText className='w-100' placeholder='' size='small' disabled={updatestate} />
        </Form.Group>
      </Col>

      <Col lg={4} xs={6} className='my-3' >
        <Form.Group>
          <Form.Label>Pincode</Form.Label>
          <CustomInputText className='w-100' placeholder='' size='small' disabled={updatestate} />
        </Form.Group>
      </Col>

      <Col lg={4} xs={6} className='my-3' >
        <Form.Group>
          <Form.Label>GST no.</Form.Label>
          <CustomInputText className='w-100' placeholder='' size='small' disabled={updatestate} />
        </Form.Group>
      </Col>
      <Col lg={4} xs={6} className='my-3' >
        <Form.Group>
          <Form.Label>TAX no.</Form.Label>
          <CustomInputText className='w-100' placeholder='' size='small' disabled={updatestate} />
        </Form.Group>
      </Col>


      <Col lg={4} xs={6} className='my-3' >
        <Form.Group>
          <Form.Label>E-Mail</Form.Label>
          <CustomInputText className='w-100' placeholder='' value={profileData.email} size='small' disabled={updatestate} />
        </Form.Group>
      </Col>

      <Col lg={4} xs={6} className='my-3' >
        <Form.Group>
          <Form.Label>Contact no.</Form.Label>
          <CustomInputText className='w-100' placeholder='' value={profileData.phone} size='small' disabled={updatestate} />
        </Form.Group>
      </Col>

      {updatestate ?

      
      null : 
      
        <Col lg={4} xs={6} className={`my-3 d-flex justify-content-start align-items-end `}>
          <Form.Group>
              <CustomButton startIcon={<FileUploadIcon />} >update</CustomButton>
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