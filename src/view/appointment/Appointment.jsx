import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { CustomButton, CustomButtonClose, CustomInputText, CustomSelectBox } from '../../component/Demo'

import SearchIcon from '@mui/icons-material/Search';
import CustomTable from '../../utils/CustomTable';
import { Autocomplete, Button, CircularProgress, FormControl, IconButton, Input, MenuItem, Select, TextareaAutosize } from '@mui/material';
import {Edit, Delete, RemoveRedEye} from '@mui/icons-material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DescriptionIcon from '@mui/icons-material/Description';
import BackupIcon from '@mui/icons-material/Backup';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { appointmentApi, appointmentDeleteApi, appointmentPostApi, appointmentPutApi, appointmentStatusApi, doctorApi, patientApi, appointmentTypeApi, departmentApi, treatmentApi, branchApi, timeslotsApi, assigntimeslotsApi, appointmentnewPostApi, availabletimeslotsApi } from '../../api/service.api';
import { useCookies } from 'react-cookie';
import { SweetAlert, SweetAlertSingle } from '../../utils/SweetAlert';
import { handleExport, handleExportCsv } from '../../utils/ExportXL';
import { convertDate, convertToAMPM } from '../../utils/convertDate';

// import PendingIcon from '@mui/icons-material/Pending';

const Appointment = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token','user_id']);

  /* ======== other states ========= */
  const [actionType , setactionType] = useState('list');
  const [appointementData , setAppointementData] = useState([]);
  const [patientData , setpatientData] = useState([]);
  const [appointementTypeData , setappointementTypeData] = useState([]);
  const [doctorData , setdoctorData] = useState([]);
  const [departmentData , setdepartmentData] = useState([]);
  const [treatmentData , settreatmentData] = useState([]);
  const [branchData , setbranchData] = useState([]);



  const [filterData, setfilterData] = useState([]);


  const [updateData , setupdateData] = useState({
    doctor_info: "",
    patient_info: "",
    appointment_date: "",
    appointment_time: "",
    appointment_type: "virtual"
  });



  /* ======== get api ========= */

  const clientAppointmentApi = async () =>{
     let res = await appointmentApi();

     if(res.status===true){
       console.log(res.data)
       setAppointementData(res.data);
       setfilterData(res.data);
     }
  }
  useEffect(()=>{
   clientAppointmentApi();
  }, [])
  const getApi = async () =>{

    const result = await Promise.allSettled([
      doctorApi(),
      patientApi(),
      appointmentTypeApi(),
      departmentApi(),
      treatmentApi(),
      branchApi(),
    ]);
    const [resolved, rejected] = handle(result);

    setdoctorData(resolved[0].data);
    setpatientData(resolved[1].data);
    setappointementTypeData(resolved[2].data);
    setdepartmentData(resolved[3].data);
    settreatmentData(resolved[4].data);
    setbranchData(resolved[5].data);
  }

  const handle = (result) => {
    const resolved = [];
    const rejected = [];

    result.forEach((res) => {
      if (res.status === "fulfilled") {
        resolved.push(res.value);
      } else {
        rejected.push(res.reason);
      }
    });

    return [resolved, rejected];
  };


  useEffect(()=>{
    getApi();
  }, []);

  // console.log(data[0] , 'ok test datadata promise')

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
    let res = await appointmentPostApi(updateData , cookies.token);
    if(res.status===true){
      clientAppointmentApi();
      setactionType('list');
      setSelectedFile(null);
      setupdateData({
        doctor_info: "",
        patient_info: "",
        appointment_date: "",
        appointment_time: "",
        appointment_type: "virtual"
      });
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
    let res = await appointmentPutApi(props ,updateData , cookies.token);
    if(res.status===true){
      clientAppointmentApi();
      setactionType('list');
      setSelectedFile(null);
      setupdateData({
        doctor_info: "",
        patient_info: "",
        appointment_date: "",
        appointment_time: "",
        appointment_type: "virtual"
      });

      SweetAlertSingle({title:'Updation' , text : res.message , icon : 'success', showCancelButton:false});

      
    }
    else{
            SweetAlertSingle({title:'Request Failed' , text : res.message , icon : 'warning', showCancelButton:false});
    }

}


  /* ======== delete api ========= */
  let did = null;
  const deleteApi = async () =>{
    let res = await appointmentDeleteApi(did,cookies.token);
    if(res.status===true){
      clientAppointmentApi();
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


  /* ======== status api ========= */
  const statusApi = async (e , id) =>{
   let  data = e.target.value;
    let res = await appointmentStatusApi(id,data , cookies.token);
    if(res.status===true){
      clientAppointmentApi();
      setactionType('list');
      SweetAlertSingle({title:'Appointment Status' , text : res.message , icon : 'success', showCancelButton:false});
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
  const [searchdata,setSearchdata] = useState('');

  useEffect(()=>{
          const result = appointementData.filter((eq) => {
            return eq.patient_info?.assign_id.toLowerCase().match(searchdata.toLowerCase()) || eq.patient_info?.phone.match(searchdata);
          });
          setfilterData(result);
  }, [searchdata])


   const columns =[
     { field: '_id', headerName: 'SN.NO', width: 80 },
     { field: 'doctor_info', headerName: 'Appointment To', width: 200,
     renderCell: (params) => (
        <span>{`${params.row.doctor_info?.first_name || 'N/A'} ${params.row.doctor_info?.last_name || ''}`}</span>
  ), },
  { field: 'Patient ID', headerName: 'Patient ID', width : 200 ,
  renderCell: (params) => (
   params.row.patient_info?.assign_id
)
 },
    { field: 'phone', headerName: 'Contact Number', width : 200,
    renderCell: (params) => (
      params.row.patient_info?.phone
   ) },

     { field: 'appointment_date', headerName: 'Appointment date', width : 200 },
     { field: 'appointment_time', headerName: 'Appointment time', width : 200 },
     { field: 'appointment_type', headerName: 'Appointment type', width : 200 },

     { field: 'patient_info', headerName: 'Patient', width : 200 ,
     renderCell: (params) => (
        <span>{`${params.row.patient_info?.first_name || 'N/A'} ${params.row.patient_info?.last_name || ''}`}</span>
  ),
    },
     { field: 'createdAt', headerName: 'Created At', width : 150, 
     renderCell: params => convertDate(params.row.createdAt) 
    },

     { field: 'appointment_status', headerName: 'Appointment status', width:200,
     renderCell: (params) => (

      <CustomSelectBox className='w-100' defaultValue={params.row.appointment_status} onChange={(e)=>{statusApi(e,params.row._id)}} >
        <MenuItem value='pending' >pending</MenuItem>
        <MenuItem value='waiting' >waiting</MenuItem>
        <MenuItem value='confirm' >confirm</MenuItem>
      </CustomSelectBox>
      //  <span onClick={() => statusApi(params.id , !params.row.status)} style={{ color: params.row.status === true ? 'green' : 'red' , backgroundColor: params.row.status === true ? '#DCFCE7' : '#FEE2E2' , border : '1px solid', fontWeight :'bold' , width : '85px' }} className='text-center px-3 py-1 rounded-5 fs-12-400 cursor-pointer'>
      //    {params.row.status === true ? 'Active' : 'Draft'}
      //  </span>
     ),
   },
 
     { field: 'action', headerName: 'Action', width:140 ,
          renderCell: (params) => (
            <>

            <IconButton onClick={() => handleEdit(params.row)}>
              <Edit fontSize='small' color='primary' />
            </IconButton>
{/* 
            <IconButton onClick={() => {SweetAlert(deleteApi) , did=params.id} }>
              <Delete fontSize='small' color='error'/>
            </IconButton> */}

            <IconButton onClick={() => handleView(params.row)}>
              <RemoveRedEye fontSize='small' color='inherit'  />
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
       <Col xl={3} className=''> <span className="title-box fs-24-500">Appointment Name</span> </Col>
       <Col xl={9} className ='d-flex flex-lg-row flex-column justify-content-lg-end '> 

       {actionType==='list' ?  
       <>

       <div className="seach-box">
        <CustomInputText size='small' onChange={(e)=>{setSearchdata(e.target.value)}} style={{  borderTopRightRadius : '0px', borderBottomRightRadius : '0px'  , borderRight : 'none',height:'40px' , background : 'white'}} placeholder='Search here....' />
        <CustomButton variant='contained' style={{  borderTopLeftRadius : '0', borderBottomLeftRadius : '0' }}> <SearchIcon /> </CustomButton>
      </div>
      <div className="btn-group  my-lg-0 my-3">
      <CustomButton variant='contained' style={{ height:'40px', width : 'fit-content' }} className='ms-lg-3' startIcon={<InsertDriveFileIcon/>} onClick={()=>{handleExportCsv(doctorData, 'appointment')}}> CSV </CustomButton>
      <CustomButton variant='contained' style={{ height:'40px', width : 'fit-content' }} className='ms-lg-3 ms-1' startIcon={<DescriptionIcon/>} onClick={()=>{handleExport(doctorData, 'appointment.xlsx')}} > Excell </CustomButton>
      <CustomButton onClick={()=>{setactionType('add');}} variant='contained' style={{ height:'40px', width : 'fit-content' }} className='ms-lg-3 ms-1 px-lg-3 px-2' startIcon={<AddIcon/>}> Add new </CustomButton>
      </div>

       </> : 
       <CustomButtonClose onClick={()=>{setactionType('list');}} variant='contained' color='error' style={{ height:'40px', width : 'fit-content' }} className='ms-lg-3' startIcon={<CloseIcon/>}> Close </CustomButtonClose>
       }
  
      </Col>


       {actionType!=='list' ?  
       
       <Col xs={12} className='my-3'>
       
       {/* <Form className='row'>
        <Col xs={12}>
          <Form.Group>
            <p className='fs-22-600 text-secondary'>Appointment Detail</p>
          </Form.Group>
        </Col>

        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>Appointment Date</Form.Label>
            <CustomInputText size='small' type='date' className='w-100' variant='outlined' name='appointment_date' onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} defaultValue={actionType==='edit' ? EditData.appointment_date : actionType==='view' ? ViewData.appointment_date  : ''} />
          </Form.Group>
        </Col>

        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>Appointment Time</Form.Label>
            <CustomInputText size='small' type='time' className='w-100' variant='outlined' name='appointment_time' onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} defaultValue={actionType==='edit' ? EditData.appointment_time : actionType==='view' ? ViewData.appointment_time  : ''} />
          </Form.Group>
        </Col>

        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>Appointment Type</Form.Label>

            <Form.Select className='w-100 rounded-1' style={{height : '40px'}} name='appointment_type' onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} defaultValue={actionType==='edit' ? EditData.appointment_type : actionType==='view' ? ViewData.appointment_type  : ''} >
              {
                appointementTypeData?.map((val)=>{
                  return(<>
              <option key={val._id} value={val.name} >{val.name}</option>
                  </>)
                })
              }
            </Form.Select>
      
          </Form.Group>
        </Col>



        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>Select Doctor</Form.Label>
            <Form.Select className='w-100 rounded-1' style={{height : '40px'}} name='doctor_info' onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} defaultValue={actionType==='edit' ? EditData.last_name : actionType==='view' ? ViewData.last_name  : ''} >
              <option value='' selected >select</option>
              {
                doctorData?.map((val)=>{
                  return(<>
              <option value={val._id} selected >{`${val.first_name}`}</option>
                  </>)
                })
              }
            </Form.Select>
          </Form.Group>
        </Col>

        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>Select Patient</Form.Label>
            <Form.Select className='w-100 rounded-1' style={{height : '40px'}} name='patient_info' onChange={(e)=>{ actionType==='edit' ?  handelUpdate(e) : handelAdd(e)}} defaultValue={actionType==='edit' ? EditData.last_name : actionType==='view' ? ViewData.last_name  : ''} >
              <option value='' >select</option>
              {
                patientData?.map((val)=>{
                  return(<>
              <option value={val._id} selected >{`${val.first_name}`}</option>
                  </>)
                })
              }
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs={12} className={`my-3 d-flex justify-content-end align-items-end ${actionType ==='view' ? 'd-none' :  null} `}>
          <Form.Group>
   
     <CustomButton startIcon={<FileUploadIcon />} 
      onClick={()=>{{actionType ==='add' ? postApi() :  editApi(EditData._id); }}} 

      
      >  {actionType ==='add' ? 'Submit' :  'update'}  </CustomButton>
          </Form.Group>
 
        </Col>

       </Form> */}
  
       </Col> 
       
       : 
       
       <Col xs={12} className='overflow-hidden my-3'>
        { filterData.length>0 ? <CustomTable rows={filterData} columns={columns} getRowId={getRowId} />
         : 
         
        <CreateAppointment doctorData={doctorData} patientData={patientData} appointementTypeData={appointementTypeData}
        branchData={branchData} treatmentData={treatmentData} departmentData={departmentData} clientAppointmentApi={clientAppointmentApi} setactionType={setactionType}
         /> }
       </Col>

        }
 
     </Row>
     
     
     </>
   )
}

export default Appointment;

const CreateAppointment = ({doctorData,patientData,appointementTypeData,branchData,treatmentData,departmentData,clientAppointmentApi,actionType,setactionType}) =>{
  const [cookies, setCookie, removeCookie] = useCookies(['token','user_id']);
  const [spin, setspin] = useState(false);

  let [activeTab , setactiveTab] = useState(0);






  let formateDoctor,formateBranch,formateTreatment,formateDepartment;

  formateDoctor=doctorData?.map((item) => ({ id: item._id, label: `${item.first_name} ${item.last_name}` }));
  formateBranch=branchData?.map((item) => ({ id: item._id, label: item.name }));
  formateTreatment=treatmentData?.map((item) => ({ id: item._id, label: item.name }));
  formateDepartment=departmentData?.map((item) => ({ id: item._id, label: item.name }));

  // const [formateDoctor, setformateDoctor] = useState();
  // const [formateBranch, setformateBranch] = useState();
  // const [formateTreatment, setformateTreatment] = useState();
  // const [formateDepartment, setformateDepartment] = useState();

  // let formatAllData = () =>{
  //   setformateDoctor(doctorData?.map((item) => ({ id: item._id, label: `${item.first_name} ${item.last_name}` })));
  //   setformateBranch(branchData?.map((item) => ({ id: item._id, label: item.name })));
  //   setformateTreatment(treatmentData?.map((item) => ({ id: item._id, label: item.name })));
  //   setformateDepartment(departmentData?.map((item) => ({ id: item._id, label: item.name })));
  // }


  // useEffect(()=>{
  //   formatAllData();
  // },[]);


  // console.log(d1,d2,d3,d4 , '======><>check point======><>')



  

  let [selectGender , setselectGender] = useState('male');
  const handleGender = (event) => {
    setselectGender(event.target.value);
  };

  const [selectMarried, setselectMarried] = useState('single');
  const handleMarried = (event) => {
    setselectMarried(event.target.value);
  };




  const [selectedDoctor, setselectedDoctor] = useState();
  const [timeslotsData, settimeslotsData] = useState([]);
  const [selectDate, setselectDate] = useState();

  const handleChangeDoctor = async (event, newValue) => {
    setselectedDoctor(newValue.id);
  };

  const handleChangeDate = async (event) => {
    setselectDate(event);
    
    if(selectedDoctor){
      let res = await availabletimeslotsApi({id:selectedDoctor , date : event});
      if(res.status===true){
        settimeslotsData(res.data?.map((item) => ({ id: item._id, label: `${convertToAMPM(item.start_time)} - ${convertToAMPM(item.end_time)}` })));
      }
      else{
        settimeslotsData([])
      }
    }
  };



  const [selectTimeSlot , setselectTimeSlot] = useState();
  const handleChangeSlots = (event, newValue) => {
    setselectTimeSlot(newValue.id);
  };
  const [selectBranch , setselectBranch] = useState();
  const handleChangeBranch = (event, newValue) => {
    setselectBranch(newValue.id);
  };

  const [selectTreatment , setselectTreatment] = useState();
  const handleChangeTreatment = (event, newValue) => {
    setselectTreatment(newValue.id);
  };
  const [selectDepartment , setselectDepartment] = useState();
  const handleChangeDepartment = (event, newValue) => {
    setselectDepartment(newValue.id);
  };


  /* post api */
  const [newData,setNewData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    gender: 'male',
    age: '',
    married: 'single',
    department_info: '',
    treatment_info: '',
    branch_info: '',
    doctor_info: '',
    appointment_date: '',
    appointment_time: '',
    appointment_for: 'self'
  })

  const handelInp = (e) =>{
    let name = e.target.name;
    let value = e.target.value;
    setNewData({...newData, [name]:value})
  }
  let postApi = async (e) =>{
    setspin(true);
    e.preventDefault();
    newData.appointment_date = selectDate;
    newData.appointment_time = selectTimeSlot;
    newData.department_info = selectDepartment;
    newData.treatment_info = selectTreatment;
    newData.married = selectMarried;
    newData.gender = selectGender;
    newData.branch_info = selectBranch;
    newData.doctor_info = selectedDoctor;
    newData.appointment_for = activeTab ===0 ?  'self' : 'other'
 


    let res = await appointmentnewPostApi(newData , cookies.token);
    if(res.status===true){
      clientAppointmentApi();
      setactionType('list')
    }


    setspin(false);
  }



  return(
      <Row>
        <Col xs={12}>
     

            <Form className='row' onSubmit={postApi}>

            <Col xs={12}>
              <Form.Group>
              <Form.Label>Create New Appointment</Form.Label>
              <Row>
                <Col md={4} className='d-flex justify-content-between'>
                <Button onClick={()=>{setactiveTab(0)}} size='small' style={{background :  activeTab ===  0?  '#4f46e5' : 'transparent', color :  activeTab ===  0 ?  'white' : '#4f46e5', height : '40px',width : '48%'}} className='text-uppercase  mb-2 text-start' variant={ activeTab ===  0 ? 'contained' : 'outlined'}  >Create for self</Button>
              <Button onClick={()=>{setactiveTab(1)}} size='small' style={{background :  activeTab ===  1?  '#4f46e5' : 'transparent', color :   activeTab ===  1 ?  'white' : '#4f46e5', height : '40px',width : '48%'}} className='text-uppercase  mb-2 text-start' variant={ activeTab ===  1 ? 'contained' : 'outlined'}  >Create for Other</Button>
                </Col>
              </Row>
              </Form.Group>
            </Col>


              <Col md={4} sm={6} className='my-3' >
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <CustomInputText size='small' className='w-100' type='text' name='first_name' placeholder='Enter first name' onChange={handelInp} />
                </Form.Group>
              </Col>

              <Col md={4} sm={6} className='my-3' >
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <CustomInputText size='small' className='w-100' type='text' name='last_name'  placeholder='Enter last name' onChange={handelInp} />
                </Form.Group>
              </Col>

              <Col md={4} sm={6} className='my-3' >
                <Form.Group>
                  <Form.Label>Contact Number</Form.Label>
                  <CustomInputText size='small' className='w-100' type='text' name='phone'  placeholder='Enter contact number' onChange={handelInp} />
                </Form.Group>
              </Col>


              <Col md={4} sm={6} className='my-3' >
                <Form.Group>
                  <Form.Label>Gender</Form.Label>
                <CustomSelectBox 
                  displayEmpty
                  size='small'
                  className='w-100'
                  inputProps={{ 'aria-label': 'Without label' }} name='gender' defaultValue={selectGender}  onChange={(e)=>{ handleGender(e)}}  >
                <MenuItem value='male'>Male</MenuItem>
                <MenuItem value='female'>Female</MenuItem>
                <MenuItem value='other'>Other</MenuItem>
              </CustomSelectBox>
                </Form.Group>
              </Col>

              <Col md={4} sm={6} className='my-3' >
                <Form.Group>
                  <Form.Label>Age</Form.Label>
                  <CustomInputText size='small' className='w-100' type='text' name='age'  placeholder='Enter age'  onChange={handelInp}  />
                </Form.Group>
              </Col>

              <Col md={4} sm={6} className='my-3' >
                <Form.Group>
                  <Form.Label>Married</Form.Label>
                  <CustomSelectBox 
                    displayEmpty
                    size='small'
                    className='w-100'
                    inputProps={{ 'aria-label': 'Without label' }} name='married' defaultValue={selectMarried}  onChange={(e)=>{ handleMarried(e)}}  >
          <MenuItem value='single'>Single</MenuItem>
          <MenuItem value='married'>Married</MenuItem>
          <MenuItem value='divorced'>Divorced</MenuItem>
        </CustomSelectBox>
                </Form.Group>
              </Col>



              <Col md={4} sm={6} className='my-3' >
                <Form.Group>
                  <Form.Label>Department </Form.Label>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={formateDepartment}
                    onChange={handleChangeDepartment}
                    size='small'
                    renderInput={(params) => <CustomInputText {...params} placeholder='Select department' className='w-100' />}
                  />
                </Form.Group>
              </Col>

              <Col md={4} sm={6} className='my-3' >
                <Form.Group>
                  <Form.Label>Treatment</Form.Label>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={formateTreatment}
                    onChange={handleChangeTreatment}
                    size='small'
                    renderInput={(params) => <CustomInputText {...params} placeholder='Select treatment' className='w-100' />}
                  />
                </Form.Group>
              </Col>

          

              <Col md={4} sm={6} className='my-3' >
                <Form.Group>
                  <Form.Label>Branch</Form.Label>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={formateBranch}
                    onChange={handleChangeBranch}
                    size='small'
                    renderInput={(params) => <CustomInputText {...params} placeholder='Select branch' className='w-100' />}
                  />
                </Form.Group>
              </Col>


              <Col md={4} sm={6} className='my-3' >
              <Form.Group>
          <Form.Label>Select Doctor</Form.Label>
          <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={formateDoctor}
                    onChange={handleChangeDoctor}
                    size='small'
                    renderInput={(params) => <CustomInputText {...params} placeholder='Select doctor' className='w-100' />}
                  />
          </Form.Group>
              </Col>

              <Col md={4} sm={6} className='my-3' >
                <Form.Group>
                  <Form.Label>Date of Appointment</Form.Label>
                  <CustomInputText size='small' className='w-100' type='date'  inputProps={{
        min:new Date(),
      }} onChange={(e)=>{handleChangeDate(e.target.value)}}/>
                </Form.Group>
              </Col>

              <Col md={4} sm={6} className='my-3' >
                <Form.Group>
                  <Form.Label>Available Time Slot</Form.Label>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={timeslotsData}
                    onChange={handleChangeSlots}
                    size='small'
                    renderInput={(params) => <CustomInputText {...params} placeholder='Select doctor' className='w-100' />}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} className='my-3' >
                <Form.Group>
                  <CustomButton size='small' variant='contained' type='submit'>Create { spin && <CircularProgress className='ms-1' size={15}  style={{color : 'white'}} /> }</CustomButton>
                </Form.Group>
              </Col>
              
            </Form>
 
        </Col>


        <Col xs={12}>
          
        </Col>
      </Row>
  )
}