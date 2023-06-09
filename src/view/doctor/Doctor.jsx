import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { CustomButton, CustomButtonClose, CustomInputText, CustomSelectBox } from '../../component/Demo'

import SearchIcon from '@mui/icons-material/Search';
import CustomTable from '../../utils/CustomTable';
import { Button, IconButton, Input, MenuItem, Select, TextareaAutosize } from '@mui/material';
import {Edit, Delete, RemoveRedEye, Cookie} from '@mui/icons-material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DescriptionIcon from '@mui/icons-material/Description';
import BackupIcon from '@mui/icons-material/Backup';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {assigntimeslotsApi, assigntimeslotsPostApi, departmentApi, doctorApi, doctorDeleteApi, doctorPostApi, doctorPutApi, doctorStatusApi, timeslotsApi, treatmentApi } from '../../api/service.api';
import { useCookies } from 'react-cookie';
import { SweetAlert, SweetAlertSingle } from '../../utils/SweetAlert';
import { handleExport, handleExportCsv } from '../../utils/ExportXL';
import AlarmAddIcon from '@mui/icons-material/AlarmAdd';
import { convertToAMPM } from '../../utils/convertDate';
import AssignDate from './AssignDate';
import PDFProfileview from '../../utils/PDFProfileview';
import HPlusMobiledataIcon from '@mui/icons-material/HPlusMobiledata';

const Doctor = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token','user_id']);

  /* ======== other states ========= */
  const [actionType , setactionType] = useState('list');
  const [doctorData , setdoctorData] = useState([]);
  const [departmentData , setdepartmentData] = useState([]);
  const [expertiseData , setexpertiseData] = useState([]);
  const [treatmentData , settreatmentData] = useState([]);
  const [updateData , setupdateData] = useState({
    first_name: "", 
    last_name: "", 
    email: "", 
    password: "", 
    cpassword: "", 

    phone: "",
    dob: "",
    gender: "",
    bio: "",
    education: Array,
    alternative_number: "",
    aadhar_number: "",
    pan_number: "", 
    treatments_info: "", 
    category_info: "",
    expertise_info: "", 
    timeslots: "", 
    start_time: "", 
    end_time: "", 
    profile_image: "", 
    address: "",

    aadhar_image : "",
    aadhar_back_image : "",
    pan_image : "",

  });

  /* ======== get api ========= */

  const clientDoctorApi = async () =>{
     let res = await doctorApi();

     if(res.status===true){

       console.log(res.data)
       setdoctorData(res.data);

     }
  }
  useEffect(()=>{
   clientDoctorApi();
  }, [])

  const getApi = async () =>{
     let res = await departmentApi();
     if(res.status===true){
       console.log(res.data)
       setdepartmentData(res.data);
       setexpertiseData(res.data);
     }

    //  let res2 = await expertiseApi();
    //  if(res2.status===true){
    //    console.log(res2.data)
    //    setexpertiseData(res2.data);
    //  }

     let res3 = await treatmentApi();
     if(res3.status===true){
       console.log(res3.data)
       settreatmentData(res3.data);
     }

  }

  useEffect(()=>{
    getApi();
  }, []);

  
  /* ======== post api ========= */
  const handelAdd = (e) =>{
    let type = e.target.type;
    let name = e.target.name;
    let value;
    if(type==='file'){
      value = e.target.files[0];
    }
    else{
      value = e.target.value;
    }
    setupdateData({ ...updateData, [name]:value })
  }

  const postApi = async () =>{
    updateData.education = formFields;
    updateData.profile_image = selectedFile;
    if(newFile1) {
      updateData.aadhar_image = newFile1;
    }
    if(newFile2) {
      updateData.aadhar_back_image = newFile2;
    }
    if(newFile3) {
      updateData.pan_image = newFile3;
    }


    let res = await doctorPostApi(updateData , cookies.token);
    if(res.status===true){
      clientDoctorApi();
      setactionType('list');
      setSelectedFile(null);
      setupdateData({
        first_name: "", 
        last_name: "", 
        email: "", 
        phone: "",
        dob: "",
        gender: "",
        bio: "",
        education: Array,
        alternative_number: "",
        aadhar_number: "",
        pan_number: "", 
        treatments_info: "", 
        category_info: "",
        expertise_info: "", 
        timeslots: "", 
        start_time: "", 
        end_time: "", 
        profile_image: "", 
        address: "",
      });
      setnewFile1(null);
      setnewFile2(null);
      setnewFile3(null);

    }
    else{
            SweetAlertSingle({title:'Request Failed' , text : res.message , icon : 'warning', showCancelButton:false});
    }

}

  /* ======== update api ========= */
  const [EditData , setEditData] = useState();
  const handleEdit = (data) => {
    setactionType('edit');
    setEditData(data);

    setFormFields( JSON.parse(data.education) );
    setSelectedFile(null);

    console.log(data)
  };

  const handelUpdate = (e) =>{
    let type = e.target.type;
    let name = e.target.name;
    let value;
    if(type==='file'){
      value = e.target.files[0];
    }
    else{
      value = e.target.value;
    }
    setupdateData({ ...updateData, [name]:value })
  }

  const editApi = async (props) =>{
  
    updateData.education = formFields;
    updateData.profile_image = selectedFile;
    if(newFile1) {
      updateData.aadhar_image = newFile1;
    }
    if(newFile2) {
      updateData.aadhar_back_image = newFile2;
    }
    if(newFile3) {
      updateData.pan_image = newFile3;
    }
    let res = await doctorPutApi(props ,updateData , cookies.token);
    if(res.status===true){
      clientDoctorApi();
      setactionType('list');
      setSelectedFile(null);
      setupdateData({
        first_name: "", 
        last_name: "", 
        email: "", 
        phone: "",
        dob: "",
        gender: "",
        bio: "",
        education: Array,
        alternative_number: "",
        aadhar_number: "",
        pan_number: "", 
        treatments_info: "", 
        category_info: "",
        expertise_info: "", 
        timeslots: "", 
        start_time: "", 
        end_time: "", 
        profile_image: "", 
        address: "",
      });
      setnewFile1(null);
      setnewFile2(null);
      setnewFile3(null);
      SweetAlertSingle({title:'Updation' , text : res.message , icon : 'success', showCancelButton:false});

      
    }
    else{
            SweetAlertSingle({title:'Request Failed' , text : res.message , icon : 'warning', showCancelButton:false});
    }

}


  /* ======== delete api ========= */
  let did = null;
  const deleteApi = async () =>{
    let res = await doctorDeleteApi(did,cookies.token);
    if(res.status===true){
      clientDoctorApi();
      setactionType('list');
    }
    else{
      alert(res.message);
    }
  }

  /* ======== preview data ========= */
     const [ViewData , setViewData] = useState([]);
     const handleView = (data) => {
      setactionType('view')
      setViewData(data);
      setFormFields( JSON.parse(data.education) );
    };

  /* ======== timeslots data ========= */
  const [AssignTimeDataDoc , setAssignTimeDataDoc] = useState([]);
  const handleAssignTimeSlot = (data) => {
   setactionType('timeslots')
   setAssignTimeDataDoc(data);
   getTimeSlots(data);
 };

 const [timeslots , settimeslots] = useState([]);
//  const [storeAssignData , setstoreAssignData] = useState([]);

// const [SelectedSlots , setSelectedSlots] = useState([]);
const [selectTimeSlotDate , setselectTimeSlotDate] = useState(new Date());



 const getTimeSlots = async (data) => {
  let res = await timeslotsApi();
  if(res.status===true) settimeslots(res.data)

  // fetchGetAssign(data);


};

// const fetchGetAssign = async (props) =>{
//   console.log(props)

// const formattedDate = new Date().toISOString().slice(0, 10);

// console.log(props,formattedDate,selectTimeSlotDate, AssignTimeDataDoc._id )
//   let data = {
//     id : AssignTimeDataDoc._id || props._id,
//     date : props
//   }
//   let res1 = await assigntimeslotsApi(data);
//   if(res1.status===true && res1.total===1){ setstoreAssignData(JSON.parse(res1.data[0].timeslot_data))}
//   else{
//     setstoreAssignData([]);
//   }
//   console.log( JSON.parse(res1.data[0]?.timeslot_data)
//     , 'res1.data[0]')

// }




// const selectTimeSlot = (event, index) => {
//   const checked = event.target.checked;
//   const value = event.target.value;
//   const slot = timeslots[index];
//   console.log(value ,checked, slot,'valuevaluevalue')
//   let vesel = storeAssignData;


//   if (checked) {
//     // Add the selected timeslot to the selectedSlots array
//         setSelectedSlots(prevSelectedSlots => [...prevSelectedSlots, slot]);
//     // setSelectedSlots([...SelectedSlots, value]);
//     } 
    
//     else {
//       // Remove the selected timeslot from the selectedSlots array
//         setSelectedSlots(SelectedSlots.filter(selectedSlot => selectedSlot !== slot));
//     }

// }

// const postAssignTimeSlot = async () =>{
  
//   // console.log( JSON.stringify(SelectedSlots) , selectTimeSlotDate );
//   let data = {doctor_info:AssignTimeDataDoc._id , date:selectTimeSlotDate , timeslot_data : JSON.stringify(SelectedSlots) }

//   let res = await assigntimeslotsPostApi(data , cookies.token);
//   if(res.status===true){
//     SweetAlertSingle({title:'Time Solts' , text : res.message , icon : 'success', showCancelButton:false});
//   } 
//   else{
//     SweetAlertSingle({title:'Request Failed' , text : res.message , icon : 'warning', showCancelButton:false});
// }

// }

  /* ======== status api ========= */
  const statusApi = async (id,data) =>{
    let res = await doctorStatusApi(id,data , cookies.token);
    if(res.status===true){
      clientDoctorApi();
      setactionType('list');
    }
    else{
        SweetAlertSingle({title:'Request Failed' , text : res.message , icon : 'warning', showCancelButton:false});
    }
  }


 
   /* ======== image action ========= */
  const [selectedFile, setSelectedFile] = useState(null);
 
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const [newFile1, setnewFile1] = useState(null);
  const [newFile2, setnewFile2] = useState(null);
  const [newFile3, setnewFile3] = useState(null);

  const newhandleFileSelect = (event , name) => {
    // setnewFile(event.target.files[0]);
    console.log(event.target.files[0] , '====');
    console.log(name , 'namename');

    if(name==="aadhar_image"){
      setnewFile1(event.target.files[0]);
    }
    if(name==="aadhar_back_image"){
      setnewFile2(event.target.files[0]);
    }
    else{
      setnewFile3(event.target.files[0]);
    }
  };

 
 
  /* ======== table action ========= */

  /* add a virtual Serial Number */
  const formattedRows = doctorData?.map((row, index) => ({
    ...row,
    serialNumber: index + 1,
  }));
  /* ends a virtual Serial Number */


   const columns =[
     { field: 'serialNumber', headerName: 'SN.NO', width: 80 },
     { field: 'profile_image', headerName: 'Image', width: 80,
     renderCell: (params) => (
      <img src={params.row.profile_image || `/icons/noimg.png`} alt="" srcset="" className='rounded-circle' style={{height : '40px' , width : '40px' ,objectFit : 'cover'}} />
  ), },
     { field: 'first_name', headerName: 'First Name', width : 150 },
     { field: 'last_name', headerName: 'Last Name', width : 150 },
     { field: 'email', headerName: 'Email', width : 350 },
     { field: 'status', headerName: 'Status', width:120,
     renderCell: (params) => (
       <span onClick={() => statusApi(params.id , !params.row.status)} style={{ color: params.row.status === true ? 'green' : 'red' , backgroundColor: params.row.status === true ? '#DCFCE7' : '#FEE2E2' , border : '1px solid', fontWeight :'bold' , width : '85px' }} className='text-center px-3 py-1 rounded-5 fs-12-400 cursor-pointer'>
         {params.row.status === true ? 'Active' : 'Draft'}
       </span>
     ),
   },
 
     { field: 'action', headerName: 'Action', width:200 ,
          renderCell: (params) => (
            <>
            <IconButton onClick={() => handleEdit(params.row)}>
              <Edit fontSize='small' color='primary' />
            </IconButton>
            <IconButton onClick={() => {SweetAlert(deleteApi) , did=params.id} }>
              <Delete fontSize='small' color='error'  />
            </IconButton>

            <IconButton onClick={() => handleView(params.row)}>
              <RemoveRedEye fontSize='small' color='inherit'  />
            </IconButton>
            <IconButton onClick={() => handleAssignTimeSlot(params.row)}>
              <AlarmAddIcon fontSize='small' color='inherit'  />
            </IconButton>
            <IconButton title='branch'>
              <HPlusMobiledataIcon fontSize='small' color='inherit'  />
            </IconButton>
          </>
 
          ),
   }
   ] 
   const getRowId = (row) => row._id;


  /* ======== repeater action ========= */
   const [formFields, setFormFields] = useState([
    { degree: '', institute: '', year: ''},
  ])

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  }

  const addFields = () => {
    let object = { degree: '', institute: '', year: '' }
    setFormFields([...formFields, object])
  }

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }


  let [dep,setdep] = useState('')
  let selectdepartment = (e) =>{
    setdep(e.target.value);
  }
 
   return (

     <>
     <Row>
       <Col xl={3} className=''> <span className="title-box fs-24-500">Doctor Name</span> </Col>
       <Col xl={9} className ='d-flex flex-lg-row flex-column justify-content-lg-end '> 

       {actionType==='list' ?  
       <>

      <div className="seach-box">
        <CustomInputText size='small' style={{  borderTopRightRadius : '0px', borderBottomRightRadius : '0px'  , borderRight : 'none',height:'40px' , background : 'white'}} placeholder='Search here....' />
        <CustomButton variant='contained' style={{  borderTopLeftRadius : '0', borderBottomLeftRadius : '0' }}> <SearchIcon /> </CustomButton>
      </div>

      <div className="btn-group  my-lg-0 my-3">
        <CustomButton variant='contained' style={{ height:'40px', width : 'fit-content' }} className='ms-lg-3' startIcon={<InsertDriveFileIcon/>} onClick={()=>{handleExportCsv(doctorData, 'doctor')}}> CSV </CustomButton>
        <CustomButton variant='contained' style={{ height:'40px', width : 'fit-content' }} className='ms-lg-3 ms-1' startIcon={<DescriptionIcon/>} onClick={()=>{handleExport(doctorData, 'doctor.xlsx')}} > Excell </CustomButton>
        <CustomButton onClick={()=>{setactionType('add');}} variant='contained' style={{ height:'40px', width : 'fit-content' }} className='ms-lg-3 ms-1 px-lg-3 px-2' startIcon={<AddIcon/>}> Add new </CustomButton>
      </div>

       </> : 

       <CustomButtonClose onClick={()=>{setactionType('list');}} variant='contained' color='error' style={{ height:'40px', width : 'fit-content' }} className='ms-lg-3' startIcon={<CloseIcon/>}> Close </CustomButtonClose>
       
       }
  
      </Col>


 
 
       {actionType==='list' ?

       <Col xs={12} className='overflow-hidden my-3'>
         <CustomTable rows={formattedRows} columns={columns} getRowId={getRowId} />
       </Col>

       :
       actionType==='timeslots' ? 
       <>

       <AssignDate userid={AssignTimeDataDoc._id} first_name={AssignTimeDataDoc.first_name} last_name={AssignTimeDataDoc.last_name} totalslots={timeslots} date={selectTimeSlotDate} token={cookies.token} />

       {/* <p className='my-3'>{`Assign to: ${AssignTimeDataDoc.first_name} ${AssignTimeDataDoc.last_name}`}</p> */}
{/* 
       <Row>
       <Col xs={12} sm={6} md={4}  className='my-3'>
        <input className='form-control w-100' type='date' size='small'  min={new Date().toISOString().substring(0, 10)} onChange={(e)=>{setselectTimeSlotDate(e.target.value); fetchGetAssign(e.target.value)}} />
       </Col>
       </Row> */}
       {/* <Row>
   
       <p>Select Aviable Time slots</p>
       {
        timeslots && timeslots?.map((val,index)=>{

          const isChecked = storeAssignData?.some(slot => slot._id === val._id);
          
          return( val.status===true && <Col sm={3} xs={6} className='my-2' > <input type='checkbox' className='me-2 cursor-pointer' onChange={(e)=>{selectTimeSlot(e, index)}}
          defaultChecked={isChecked}
           /> <span className={`${storeAssignData?.some(slot => slot._id === val._id) ? 'bg-danger' : 'bg-primary' }`}>{`${convertToAMPM(val.start_time)} - ${convertToAMPM(val.end_time)} `}</span> </Col>)
        })
       }

       <Col xs={12}>
        <CustomButton size='small' className='my-3' variant='contained' onClick={()=>{postAssignTimeSlot()}} >Submit</CustomButton>
       </Col>
      </Row> */}

      
       </>



       : 
       <Col xs={12} className='my-3'>

          <Form className='row'>
            <Col xs={12}>
          <Form.Group>
            <p className='fs-22-600 text-secondary'>Personal Detail</p>
          </Form.Group>
            </Col>

            <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>First Name</Form.Label>
            <CustomInputText size='small' className='w-100' placeholder='First name' variant='outlined' name='first_name' onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} defaultValue={actionType==='edit' ? EditData.first_name : actionType==='view' ? ViewData.first_name  : ''} />
          </Form.Group>
            </Col>


            <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>Last Name</Form.Label>
            <CustomInputText size='small' className='w-100' placeholder='Last name' variant='outlined' name='last_name' onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} defaultValue={actionType==='edit' ? EditData.last_name : actionType==='view' ? ViewData.last_name  : ''} />
          </Form.Group>
            </Col>

            <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>E-mail</Form.Label>
            <CustomInputText size='small' className='w-100' placeholder='name@company.com' variant='outlined' name='email' onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} defaultValue={actionType==='edit' ? EditData.email : actionType==='view' ? ViewData.email  : ''} />
          </Form.Group>
            </Col>
            { actionType==='add' ?  
            <>
        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>Password</Form.Label>
            <CustomInputText size='small' className='w-100' placeholder='Password' variant='outlined' name='password' onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} />
          </Form.Group>
        </Col>

        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
            <CustomInputText size='small' className='w-100' placeholder='Confirm Password' variant='outlined' name='cpassword' onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} />
          </Form.Group>
        </Col>
            </>
            :
            null }

            <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label className=''>Gender</Form.Label>
          <CustomSelectBox 
          displayEmpty
          size='small'
          className='w-100'
          inputProps={{ 'aria-label': 'Without label' }} defaultValue='male' name='gender' onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}}  >
          <MenuItem value='male'>Male</MenuItem>
          <MenuItem value='female'>Female</MenuItem>
          <MenuItem value='other'>Other</MenuItem>
        </CustomSelectBox>
          </Form.Group>
            </Col>

            <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>Date-of-Birth</Form.Label>
            <CustomInputText size='small' type='date' className='w-100' placeholder='' variant='outlined' name='dob' onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} defaultValue={actionType==='edit' ? EditData.dob : actionType==='view' ? ViewData.dob  : ''} />
          </Form.Group>
            </Col>


            <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>Contact No.</Form.Label>
            <CustomInputText size='small' className='w-100' placeholder='Contact No.' variant='outlined' name='phone' onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} defaultValue={actionType==='edit' ? EditData.phone : actionType==='view' ? ViewData.phone  : ''} />
          </Form.Group>
            </Col>

            <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>PAN No.</Form.Label>
            <CustomInputText size='small' className='w-100' placeholder='PAN No.' variant='outlined' name='pan' onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} defaultValue={actionType==='edit' ? EditData.pan : actionType==='view' ? ViewData.pan  : ''} />
          </Form.Group>
            </Col>

            <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>Aadhaar No.</Form.Label>
            <CustomInputText size='small' className='w-100' placeholder='Aadhaar No.' variant='outlined' name='aadhar_number' onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} defaultValue={actionType==='edit' ? EditData.aadhar_number : actionType==='view' ? ViewData.aadhar_number  : ''} />
          </Form.Group>
            </Col>


            <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>Alternate No.</Form.Label>
            <CustomInputText size='small' className='w-100' placeholder='Alternate No.' variant='outlined' name='alternative_number' onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} defaultValue={actionType==='edit' ? EditData.alternative_number : actionType==='view' ? ViewData.alternative_number  : ''} />
          </Form.Group>
            </Col>


            <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>Bio</Form.Label>
            <CustomInputText size='small' as={'textarea'} rows={7} className='w-100 p-2' placeholder='Bio' variant='outlined' name='bio' onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} defaultValue={actionType==='edit' ? EditData.bio : actionType==='view' ? ViewData.bio  : ''} />
          </Form.Group>
            </Col>


            <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>Address</Form.Label>
          <CustomInputText size='small' as={'textarea'} rows={7} className='w-100 p-2' placeholder='Address' variant='outlined' name='address' onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} defaultValue={actionType==='edit' ? EditData.address : actionType==='view' ? ViewData.address  : ''} />
          </Form.Group>
            </Col>

            <Col lg={4} xs={6} className='my-3 d-flex align-items-end'>
          <Form.Group className='d-flex flex-column'>
          {<img src={selectedFile && actionType === 'edit' || selectedFile && actionType==='add' ? URL.createObjectURL(selectedFile)
          : !selectedFile && actionType==='edit' ? EditData.profile_image
          : actionType==='view' ? ViewData.profile_image : actionType==='add' && !selectedFile ?    `/icons/noimg.png` : "" }  
          
          alt="" style={{height : '120px' , width : '120px' , background : 'white' }}  className='rounded-circle mb-2' />}


          <input type="file" id="fileInput" style={{ display: 'none' }} disabled={ actionType==='view' ? true : false } name='profile_image' onChange={(e)=>{handleFileSelect(e)}} />
          {/* <input type="file" id="fileInput" style={{ display: 'none' }} onChange={(e)=>{handleFileSelect(e)}}  name='profile_image' /> */}
            <CustomButton variant='contained' onClick={() => document.getElementById('fileInput').click()}  className='' startIcon={<BackupIcon/>}> Upload</CustomButton>
          </Form.Group>
            </Col>

            <Col xs={12}>
          <Form.Group>
            <p className='fs-22-600 text-secondary'>Education Detail</p>
          </Form.Group>
            </Col>

            <Col xs={12}>

            {formFields.map((item, index) => {
          return (
            <Row key={index} >

            <Col lg={4} xs={6} className='my-3'>
            <Form.Group>
            <Form.Label>Degree</Form.Label>
            <CustomSelectBox 
              onChange={event => handleFormChange(event, index)}
              displayEmpty
              size='small'
              className='w-100'
              inputProps={{ 'aria-label': 'Without label' }} defaultValue={item.degree} name='degree' >
              <MenuItem value='apple'>Apple</MenuItem>
              <MenuItem value='mango'>Mango</MenuItem>
              <MenuItem value='orange'>Orange</MenuItem>
            </CustomSelectBox>
            </Form.Group>
            </Col>


            <Col lg={4} xs={6} className='my-3'>
            <Form.Group>
            <Form.Label>College/University</Form.Label>

            <CustomInputText name='institute' size='small' className='w-100' placeholder='College/University' onChange={event => handleFormChange(event, index)} defaultValue={item.institute} />

            </Form.Group>
            </Col>

            <Col lg={2} xs={6}  className='my-3'>
            <Form.Group>
            <Form.Label>Passing Year</Form.Label>
            <CustomInputText type='date' size='small' name='year' onChange={event => handleFormChange(event, index)} defaultValue={item.year} />
            </Form.Group>
            </Col>
            <Col lg={2} xs={6} className='d-flex align-items-end justify-content-start my-3'>
            <Form.Group>
            <IconButton disabled={ actionType==='view' ? true : false }  style={{border : '1px solid #DC2626' , borderRadius : '4px' , color : '#DC2626'}}  onClick={() => removeFields(index)}>
            <DeleteIcon />
            </IconButton>
            </Form.Group>
            </Col>
            </Row>
          )
            })}
          

            <CustomButton onClick={addFields} type='button' startIcon={<AddIcon />} disabled={ actionType==='view' ? true : false } >Add More</CustomButton>

        </Col>


        
        <Col xs={12} className='mt-3'>
          <Form.Group>
            <p className='fs-22-600 text-secondary'>Department Details</p>
          </Form.Group>
        </Col>

        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label className=''>Department</Form.Label>
          <Form.Select 
            displayEmpty
          size='small'
          className='w-100'
          // inputProps={{ 'aria-label': 'Without label' }} 
          defaultValue={actionType==='edit' ? EditData.category_info : actionType==='view' ? ViewData.category_info  : ''}
          name='category_info' onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}}  
           >
            <option value=''>select</option>

          { departmentData?.map((val)=>{
            return(<>
              <option value={val._id}>{val.name}</option>
            </>)
          }) 
         }
        </Form.Select>
          </Form.Group>
        </Col>

        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label className=''>Treatments</Form.Label>
          <Form.Select 
  
  size='small'
  className='w-100 rounded-1'
          inputProps={{ 'aria-label': 'Without label' }} 
          defaultValue={actionType==='edit' ? EditData.treatments_info : actionType==='view' ? ViewData.treatments_info  : ''}

          name='treatments_info' onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} 
          >
            <option value=''>select</option>

             { treatmentData?.map((val)=>{
            return(<>
              <option value={val._id}>{val.name}</option>
            </>)
          }) 
         }
        </Form.Select>
          </Form.Group>
        </Col>

        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label className=''>Expertise</Form.Label>
          <Form.Select
  
  size='small'
  className='w-100 rounded-1'
          inputProps={{ 'aria-label': 'Without label' }}
          defaultValue={actionType==='edit' ? EditData.expertise_info : actionType==='view' ? ViewData.expertise_info  : ''}

          name='expertise_info' onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} 
           >
            <option value=''>select</option>
               { expertiseData?.map((val)=>{
            return(<>
              <option value={val._id}>{val.name}</option>
            </>)
          }) 
         }
        </Form.Select>
          </Form.Group>
        </Col>


        <Col lg={6} className='d-flex justify-content-between flex-lg-nowrap flex-wrap '>
          <Form.Group className='my-3 '>
          <Form.Label className='w-100'>Front Aadhaar</Form.Label>
          <input type="file" name="aadhar_image" className='d-none' onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} id="frontAadhar" />
     <CustomButton disabled={ actionType==='view' ? true : false } startIcon={<BackupIcon />} onClick={()=>{document.getElementById('frontAadhar').click()}} >Upload</CustomButton>
          </Form.Group>

          <Form.Group className='my-3 '>
          <Form.Label className='w-100'>Back Aadhaar</Form.Label>
          <input type="file" name="aadhar_back_image" className='d-none' onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} id="backAadhar" />
     <CustomButton disabled={ actionType==='view' ? true : false } startIcon={<BackupIcon />} onClick={()=>{document.getElementById('backAadhar').click()}} >Upload</CustomButton>
          </Form.Group>

          <Form.Group className='my-3 '>
          <Form.Label className='w-100'>Upload PAN</Form.Label>
          <input type="file" name="pan_image" className='d-none' onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} id="frontPan" />
     <CustomButton disabled={ actionType==='view' ? true : false } startIcon={<BackupIcon />} onClick={()=>{document.getElementById('frontPan').click()}} >Upload</CustomButton>
          </Form.Group>
        </Col>


        <Col lg={6} className={`my-3 d-flex justify-content-end align-items-end ${actionType ==='view' ? 'd-none' :  null} `}>
          <Form.Group>
   
     <CustomButton startIcon={<FileUploadIcon />} 
      onClick={()=>{{actionType ==='add' ? postApi() :  editApi(EditData._id); }}} 

      
      >  {actionType ==='add' ? 'Submit' :  'update'}  </CustomButton>
          </Form.Group>
 
        </Col>

          </Form>
  
       </Col> 
       
  

        }
 
     </Row>
     
     
     </>
   )
}

export default Doctor