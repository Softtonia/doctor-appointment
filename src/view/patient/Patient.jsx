import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { CustomButton, CustomButtonClose, CustomInputText, CustomSelectBox } from '../../component/Demo'

import SearchIcon from '@mui/icons-material/Search';
import CustomTable from '../../utils/CustomTable';
import { Button, FormControl, FormControlLabel, FormLabel, IconButton, Input, MenuItem, Radio, RadioGroup, Select, TextareaAutosize } from '@mui/material';
import {Edit, Delete, RemoveRedEye} from '@mui/icons-material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DescriptionIcon from '@mui/icons-material/Description';
import BackupIcon from '@mui/icons-material/Backup';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { categoryApi, diseaseApi, doctorApi, patientApi, patientDeleteApi, patientPostApi, patientPutApi, patientStatusApi} from '../../api/service.api';
import { SweetAlert, SweetAlertSingle } from '../../utils/SweetAlert';
import { handleExport, handleExportCsv } from '../../utils/ExportXL';

import ReactSelect from 'react-select'
import { useCookies } from 'react-cookie';

const Patient = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token','user_id']);

  const [diseasePatient, setdiseasePatient] = useState(null);

   const [ViewData, setViewData] = useState(null);
   const handleView = (data) => {
    setactionType('view');
    setViewData(data);
  };

 
   const [actionType , setactionType] = useState('list');

 
   const [selectedFile, setSelectedFile] = useState(null);
   const handleFileSelect = (event) => {
     setSelectedFile(event.target.files[0]);
   }; 
   

 


  //  const [formFields, setFormFields] = useState([
  //   { name: '', age: '' },
  // ])

  // const handleFormChange = (event, index) => { 
  //   let data = [...formFields];
  //   data[index][event.target.name] = event.target.value;
  //   setFormFields(data);
  // }

  // const submit = (e) => {
  //   e.preventDefault();
  //   console.log(formFields)
  // }

  // const addFields = () => {
  //   let object = {
  //     name: '',
  //     age: ''
  //   }

  //   setFormFields([...formFields, object])
  // }

  // const removeFields = (index) => {
  //   let data = [...formFields];
  //   data.splice(index, 1)
  //   setFormFields(data)
  // }




  /* get api */
  const [patientData , setpatientData] = useState([]);
  // const [categoryData , setcategoryData] = useState([]);
  // const [doctorData , setdoctorData] = useState([]);
  // const [diseaseData , setdiseaseData] = useState([]);



  const clientPatientApi = async () =>{
    let res = await patientApi();

    if(res.status===true){
      console.log(res.data)
      setpatientData(res.data);
    }
 }
 useEffect(()=>{
  clientPatientApi();
 }, [])


  const getApi = async () =>{
    //  let res1 = await categoryApi();
    //  if(res1.status===true){
    //    setcategoryData(res1.data);
    //  }

    //  let res2 = await doctorApi();
    //  if(res2.status===true){

    //    setdoctorData(res2.data);
    //  }

    //  let res3 = await diseaseApi();
    //  if(res3.status===true){
    //    console.log(res3.data , 'disease')
    //    setdiseaseData(res3.data?.map((item) => ({ id: item._id, value: item.name, label: item.name }) ));
    //  }
  }

  useEffect(()=>{
    getApi();
  }, []);




  const [selectGender, setselectGender] = useState('male');

  const [parentName, setparentName] = useState('');

  const handleParent = (event) => {
    setparentName(event.target.value);
  };

  const handleGender = (event) => {
    setselectGender(event.target.value);
  };


  const [selectMarried, setselectMarried] = useState('single');

  const handleMarried = (event) => {
    setselectMarried(event.target.value);
  };


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
      // updateData.education = formFields;
      updateData.profile_image = selectedFile;

      selectGender === 'male' ? updateData.s_o = parentName :  updateData.d_o = parentName  ;

  
      let res = await patientPostApi(updateData , cookies.token);
      if(res.status===true){
        clientPatientApi();
        setactionType('list');
        setSelectedFile(null);
        setupdateData({
          "first_name" : "",
          "last_name" : "",
          "email" : "",
          "phone" : "",
          "alternative_number" : "",
          "health_history" : "",
          "dob" : "",
          "gender" : "male",
          "allergies" : "",
          "medications" : "",
          "insurance_info" : "",
          "married_status" : "",
          "s_o" : "",
          "d_o" : "",
          "h_o" : "",
          "department_info" : "",
          "doctor_info" : "",
          "disease" : Array, 
          "address" : "",
          "profile_image" : ""
        });
        setselectGender('male');
        setselectMarried('single');
        SweetAlertSingle({title:'New Record' , text : res.message , icon : 'success', showCancelButton:false});
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
      // EditData.disease = JSON.parse(data.disease) ;
      // setdiseasePatient(JSON.parse(data.disease))
      setSelectedFile(null);
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
      updateData.profile_image = selectedFile;



      let res = await patientPutApi(props ,updateData , cookies.token);
      if(res.status===true){
        clientPatientApi();
        setactionType('list');
        setSelectedFile(null);
        setselectGender('male');
        setselectMarried('single');
        setupdateData({
          "first_name" : "",
          "last_name" : "",
          "email" : "",
          "phone" : "",
          "alternative_number" : "",
          "health_history" : "",
          "dob" : "",
          "gender" : "male",
          "allergies" : "",
          "medications" : "",
          "insurance_info" : "",
          "married_status" : "",
          "s_o" : "",
          "d_o" : "",
          "h_o" : "",
          "department_info" : "",
          "doctor_info" : "",
          "disease" : Array, 
          "address" : "",
          "profile_image" : ""
        });
        SweetAlertSingle({title:'Updation' , text : res.message , icon : 'success', showCancelButton:false});
      }
      else{
          SweetAlertSingle({title:'Request Failed' , text : res.message , icon : 'warning', showCancelButton:false});
      }
  
  }


    /* delete api*/
    let did = null;
    const deleteApi = async () =>{

      console.log('function called ')
      let res = await patientDeleteApi(did,cookies.token);
      if(res.status===true){
        clientPatientApi();
        setactionType('list');
      }
      else{
        SweetAlertSingle({title:'Request Failed' , text : res.message , icon : 'warning', showCancelButton:false});
      }
    }
 
  const [updateData , setupdateData] = useState({
    "first_name" : "",
    "last_name" : "",
    "email" : "",
    "phone" : "",
    "alternative_number" : "",
    "health_history" : "",
    "dob" : "",
    "gender" : "male",
    "allergies" : "",
    "medications" : "",
    "insurance_info" : "",
    "married_status" : "",
    "s_o" : "",
    "d_o" : "",
    "h_o" : "",
    "department_info" : "",
    "doctor_info" : "",
    "disease" : Array, 
    "address" : "",
    "age" : "",
    "profile_image" : ""
  });



    /* ======== status api ========= */
    const statusApi = async (id,data) =>{
      let res = await patientStatusApi(id,data , cookies.token);
      if(res.status===true){
        setactionType('list');
        clientPatientApi();
      }
      else{
              SweetAlertSingle({title:'Request Failed' , text : res.message , icon : 'warning', showCancelButton:false});
      }
    }
    
    // const handelDiseaseSelect = (e)=>{
    //   updateData.disease = e;
    // }



    /* ========== table ============= */

  /* add a virtual Serial Number */
   const formattedRows = patientData?.map((row, index) => ({
    ...row,
    serialNumber: index + 1,
  }));
    /* ends a virtual Serial Number */


    const columns =[
      { field: 'serialNumber', headerName: 'SN.NO', width: 80 },
      { field: 'assign_id', headerName: 'Patient ID', width: 100 },
      { field: 'profile_image', headerName: 'Image', width: 80,
      renderCell: (params) => (
       <img src={params.row.profile_image || `/icons/noimg.png`} alt="" srcset="" className='rounded-circle' style={{height : '40px' , width : '40px' ,objectFit : 'cover'}} />
   ), },
      { field: 'first_name', headerName: 'First Name', width : 150 },
      { field: 'last_name', headerName: 'Last Name', width : 420 },
     
      { field: 'status', headerName: 'Status', width:140,
      renderCell: (params) => (
       <span onClick={() => statusApi(params.id , !params.row.status)} style={{ color: params.row.status === true ? 'green' : 'red' , backgroundColor: params.row.status === true ? '#DCFCE7' : '#FEE2E2' , border : '1px solid', fontWeight :'bold' , width : '85px' }} className='text-center px-3 py-1 rounded-5 fs-12-400 cursor-pointer'>
         {params.row.status === true ? 'Active' : 'Draft'}
       </span>
     ),
    },
  
      { field: 'action', headerName: 'Action', width:140 ,
           renderCell: (params) => (
             <>
             <IconButton onClick={() => handleEdit(params.row)}>
               <Edit fontSize='small' color='primary' />
             </IconButton>
             <IconButton onClick={() => {SweetAlert(deleteApi) , did=params.id} }>
               <Delete fontSize='small' color='error'  />
             </IconButton>
 
             <IconButton onClick={() => handleView(params.id)}>
               <RemoveRedEye fontSize='small' color='inherit'  />
             </IconButton>
           </>
  
           ),
    }
    ] 
    const getRowId = (row) => row._id;
 



   return (
 
     
     <>
     

     <Row>
       <Col xl={3} className=''> <span className="title-box fs-24-500">Patient Name</span> </Col>
       <Col xl={9} className ='d-flex flex-lg-row flex-column justify-content-lg-end '> 

       {actionType==='list' ?  

       <>
       <div className="seach-box">
        <CustomInputText size='small' style={{  borderTopRightRadius : '0px', borderBottomRightRadius : '0px'  , borderRight : 'none',height:'40px' , background : 'white'}} placeholder='Search here....' />
        <CustomButton variant='contained' style={{  borderTopLeftRadius : '0', borderBottomLeftRadius : '0' }}> <SearchIcon /> </CustomButton>
      </div>

      <div className="btn-group  my-lg-0 my-3">
      <CustomButton variant='contained' style={{ height:'40px', width : 'fit-content' }} className='ms-lg-3' startIcon={<InsertDriveFileIcon/>} onClick={()=>{handleExportCsv(patientData, 'patient')}}> CSV </CustomButton>
      <CustomButton variant='contained' style={{ height:'40px', width : 'fit-content' }} className='ms-lg-3 ms-1' startIcon={<DescriptionIcon/>} onClick={()=>{handleExport(patientData, 'patient.xlsx')}} > Excell </CustomButton>
      <CustomButton onClick={()=>{setactionType('add')}} variant='contained' style={{ height:'40px', width : 'fit-content' }} className='ms-lg-3 ms-1 px-lg-3 px-2' startIcon={<AddIcon/>}> Add new </CustomButton>
      </div>

       </> : 
       <CustomButtonClose onClick={()=>{setactionType('list')}} variant='contained' color='error' style={{ height:'40px', width : 'fit-content' }} className='ms-lg-3' startIcon={<CloseIcon/>}> Close </CustomButtonClose>
       }
  
      </Col>


 
 
       {actionType!=='list' ?  
       
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
            <CustomInputText size='small' className='w-100' placeholder='First name' variant='outlined' name="first_name" defaultValue={actionType==='edit' ? EditData.first_name : actionType==='view' ? ViewData.first_name  : ''} onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} />
          </Form.Group>
        </Col>

        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>Last Name</Form.Label>
            <CustomInputText size='small' className='w-100' placeholder='Last name' variant='outlined' name="last_name" defaultValue={actionType==='edit' ? EditData.last_name : actionType==='view' ? ViewData.last_name  : ''} onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} />
          </Form.Group>
        </Col>

        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label className=''>Gender</Form.Label>
          <CustomSelectBox 
            displayEmpty
            size='small'
            className='w-100'
            inputProps={{ 'aria-label': 'Without label' }} defaultValue={actionType==='edit' ? EditData.gender : actionType==='view' ? ViewData.gender  : 'male'} name='gender'  onChange={(e)=>{ actionType==='edit' ?  (handelUpdate(e) , handleGender(e)) :( handelAdd(e) , handleGender(e))}}  >
          <MenuItem value='male'>Male</MenuItem>
          <MenuItem value='female'>Female</MenuItem>
          <MenuItem value='other'>Other</MenuItem>
        </CustomSelectBox>
          </Form.Group>
        </Col>

      

        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>E-mail</Form.Label>
            <CustomInputText size='small' className='w-100' placeholder='name@company.com' variant='outlined' name="email" defaultValue={actionType==='edit' ? EditData.email : actionType==='view' ? ViewData.email  : ''} onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} />
          </Form.Group>
        </Col>

        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>Date-of-Birth</Form.Label>
            <CustomInputText size='small' type='date' className='w-100' variant='outlined' defaultValue={actionType==='edit' ? EditData.dob : actionType==='view' ? ViewData.dob  : ''} name="dob" onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} />
          </Form.Group>
        </Col>

        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>Age</Form.Label>
            <CustomInputText size='small' className='w-100' placeholder='Age' variant='outlined' name="age" defaultValue={actionType==='edit' ? EditData.age : actionType==='view' ? ViewData.age  : ''} onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} />
          </Form.Group>
        </Col>

        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>Contact No.</Form.Label>
          <CustomInputText size='small' className='w-100' placeholder='Contact No.' variant='outlined' defaultValue={actionType==='edit' ? EditData.phone : actionType==='view' ? ViewData.phone  : ''} name="phone" onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} />
          </Form.Group>
        </Col>

        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>Married</Form.Label>
          <CustomSelectBox 
            displayEmpty
            size='small'
            className='w-100'
            name="married_status"
            inputProps={{ 'aria-label': 'Without label' }} defaultValue={actionType==='edit' ? EditData.married_status : actionType==='view' ? ViewData.married_status  : selectMarried} onChange={(e)=>{ actionType==='edit' ?  (handelUpdate(e),handleMarried(e)) : (handelAdd(e),handleMarried(e))}} >
          <MenuItem value='single'>Single</MenuItem>
          <MenuItem value='married'>married</MenuItem>
          <MenuItem value='divorsed'>Divorsed</MenuItem>
        </CustomSelectBox>
        
          </Form.Group>
        </Col>


        <Col lg={4} xs={6} className='my-3'>
        <Form.Group>
          <Form.Label>{selectGender === 'male' ? 'S/O' : 'D/O'}</Form.Label>
            <CustomInputText size='small'  className='w-100'  name={selectGender === 'male' ? 's_o' : 'd_o'} placeholder={selectGender === 'male' ? 's/o' : 'd/o'} variant='outlined' defaultValue={actionType==='edit' ? ( selectGender === 'male' ?  EditData.s_o :  EditData.d_o) : actionType==='view' ? ( selectGender === 'male' ?  ViewData.s_o :  ViewData.d_o)  : ''} onChange={(e)=>{ actionType==='edit' ?  (handelUpdate(e),handleParent(e)) : (handelAdd(e,handleParent(e)))}} />
          </Form.Group>
        </Col>


        {selectMarried === 'married' ? <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>{selectGender==='male' ? 'Husband of' : 'Wife of'}</Form.Label>
          <CustomInputText size='small' className='w-100' placeholder='' variant='outlined' name='h_o' defaultValue={actionType==='edit' ? EditData.h_o : actionType==='view' ? ViewData.h_o  : ''} onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} />
          </Form.Group>
        </Col> : null}

        
        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>Address</Form.Label>
          <CustomInputText size='small' as={'textarea'} rows={7} className='w-100 p-2' placeholder='Address' variant='outlined' name='address' defaultValue={actionType==='edit' ? EditData.address : actionType==='view' ? ViewData.address  : ''} onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} />
          </Form.Group>
        </Col>

        <Col lg={4} xs={6} className='my-3 d-flex align-items-end'>
          <Form.Group className='d-flex flex-column'>
          {<img src={selectedFile && actionType === 'edit' || selectedFile && actionType==='add' ? URL.createObjectURL(selectedFile)
          : !selectedFile && actionType==='edit' ? EditData.profile_image
          : actionType==='view' ? ViewData.profile_image :  ''}  
          
          alt="" style={{height : '120px' , width : '120px' , background : 'white' }}  className='rounded-circle mb-2' />}


          <input type="file" id="fileInput" style={{ display: 'none' }} disabled={ actionType==='view' ? true : false } name='profile_image' onChange={(e)=>{handleFileSelect(e)}} />
            <CustomButton variant='contained' onClick={() => document.getElementById('fileInput').click()}  className='' startIcon={<BackupIcon/>}> Upload</CustomButton>
          </Form.Group>
        </Col>


        <Col lg={12} className={`my-3 d-flex justify-content-end align-items-end ${actionType ==='view' ? 'd-none' :  null} `}>
          <Form.Group>
          <CustomButton startIcon={<FileUploadIcon />} 
        onClick={()=>{{actionType ==='add' ? postApi() :  editApi(EditData._id); }}} >
        {actionType ==='add' ? 'Submit' :  'update'}
        </CustomButton>


          </Form.Group>
 
        </Col>

       </Form>
  
       </Col> 
       
       
       : 
       
       
       <Col xs={12} className='overflow-hidden my-3'>
         <CustomTable rows={formattedRows} columns={columns} getRowId={getRowId} />
       </Col>


       
        }
 
 

 
 
 
     </Row>
     
     
     </>
   )
}

export default Patient