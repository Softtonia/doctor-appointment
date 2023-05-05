import React, { useEffect, useState } from 'react'
import { Col, Form, Nav, Row } from 'react-bootstrap'
import { CustomButton, CustomInputText} from '../../component/Demo'
import { Button} from '@mui/material';
import {notificationApi, notificationUpdateApi } from '../../api/service.api';
import { useCookies } from 'react-cookie';
import { SweetAlertSingle } from '../../utils/SweetAlert';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



const Notification = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token','user_id']);

  /* ======== other states ========= */
  const [actionType , setactionType] = useState('list');
  let [activeSlug , setactiveSlug] = useState('forgetpassword');

  /* ======== get api ========= */
  // const [store , setstore] = useState([]);
  // const getApi = async (props) =>{
  //   let res  = await notificationApi(props || 'forgetpassword');
  //   if(res.status===true){
  //     setstore(res.data[0]);
  //   }
  // }

  // useEffect(()=>{
  //   getApi();
  // }, []);



  /* ======== update api ========= */
  const [EditData , setEditData] = useState();

let [activeTab , setactiveTab] = useState(0);


const data = [
  {id:0,title:'forget password',slug:'forgetpassword', redirect:true },
  {id:1,title:'otp',slug:'otp', redirect:false },
  {id:2,title:'offer',slug:'offer', redirect:false },
  {id:3,title:'signup',slug:'signup', redirect:true },
  {id:4,title:'subscription',slug:'subscription', redirect:false },
  {id:5,title:'letterpad',slug:'letterpad', redirect:false },
  {id:6,title:'invoice',slug:'invoice', redirect:false },
]
let changeTab = (props) => {
  setactiveTab(props.id);
  setactiveSlug(props.value);
  // getApi(props.value)
}

   return (
 
     <>
     <Row>
     <Col xs={12}> <span className="title-box fs-24-500">Customize Template</span> </Col>

      <Col xs={12}  className='mt-5'>
        <Row>
        <Col md={2}> 
      
      <ul className='list-unstyled'>
              {data.map((val,index)=>(<li key={val.id} className=''> <Button size='small' style={{background :  index === activeTab ?  '#4f46e5' : 'transparent', color :  index === activeTab ?  'white' : '#4f46e5', height : '40px'}} className='text-uppercase w-100 mb-2 text-start' onClick={()=>{changeTab({id:index , value: val.slug })}} variant={ index === activeTab ? 'contained' : 'outlined'}  >{val.title}</Button> </li>)) }
           </ul>
      </Col>
      <Col md={8} className='mx-auto'> 
     
     <ul className='list-unstyled'>
             {data.map((val,index)=>(index === activeTab && <li className='' key={val.id}>
            <FormTemplate activeSlug={activeSlug} />
            </li>)) }
     </ul>
     </Col>
        </Row>
      </Col>
     </Row>
     
     
     </>
   )
}

export default Notification;

const FormTemplate = (props) =>{
  const [cookies, setCookie, removeCookie] = useCookies(['token','user_id']);
  const [data, setData] = useState([]);
  console.log(props , 'props')

  const [subject , setsubject ] = useState();
  const [redirect_link , setredirect_link ] = useState();
  const [value, setValue] = useState(data?.body);


  const getApi = async () =>{
    let res  = await notificationApi(props.activeSlug || 'forgetpassword');
    if(res.status===true){
      setData(res.data[0]);
    }
  }

  useEffect(()=>{
    getApi();
  }, []);


  const editApi = async (e) =>{
    e.preventDefault();
    let email= {
      subject : subject,
      body : value,
      redirect_link : redirect_link
    }

    let res = await notificationUpdateApi(email ,props.activeSlug , cookies.token);
    if(res.status===true){
      SweetAlertSingle({title:'Updation' , text : res.message , icon : 'success', showCancelButton:false});
      setsubject(res.data?.subject);
      setredirect_link(res.data?.redirect_link);
      setValue(res.data?.body);
    }
    else{
      SweetAlertSingle({title:'Request Failed' , text : res.message , icon : 'warning', showCancelButton:false});
    }
}

  return(
    <Form onSubmit={editApi}>
      <Form.Group className='mb-3'>
        <Form.Label>Subject</Form.Label>
       <Form.Control type='text' className='' placeholder='Enter Subject' defaultValue={data?.subject || ''} onChange={(e)=>{setsubject(e.target.value)}} />
      </Form.Group>

     <Form.Group className='mb-3'>
        <Form.Label>Redirect Link</Form.Label>       
       <Form.Control type='text' className='' placeholder='Enter Redirect Link' defaultValue={data?.redirect_link || ''} onChange={(e)=>{setredirect_link(e.target.value)}} />
        {/* <CustomInputText type='text' size='small' className='w-100' placeholder='Enter Redirect Link' defaultValue={props.store?.redirect_link || ''} onChange={(e)=>{setredirect_link(e.target.value)}} /> */}
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Body</Form.Label>
        <ReactQuill theme="snow" value={value || data?.body} onChange={setValue} style={{background : 'white' }}  />
      </Form.Group>

      <Form.Group className='mb-3'>
        <CustomButton size='small' type='submit' className=''> Update </CustomButton>
      </Form.Group>

    </Form>
  )
}