import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { CustomButton, CustomButtonClose, CustomInputText, CustomSelectBox } from '../../component/Demo'

import SearchIcon from '@mui/icons-material/Search';
import CustomTable from '../../utils/CustomTable';
import { Button, IconButton, Input, MenuItem, Select, TextareaAutosize } from '@mui/material';
import {Edit, Delete, RemoveRedEye} from '@mui/icons-material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DescriptionIcon from '@mui/icons-material/Description';
import BackupIcon from '@mui/icons-material/Backup';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { categoryApi, doctorApi, expertiseApi, treatmentApi } from '../../api/service.api';



const Doctor = () => {

  const handleEdit = (id) => {
    setactionType('edit')
   };
 
   const handleDelete = (id) => {
     alert(id)
   };

   const handleView = (id) => {
    setactionType('view')
  };

 
   const [actionType , setactionType] = useState('list');
   const addNewFunction = () => {
   };
 
 
   const [selectedFile, setSelectedFile] = useState(null);
 
   const handleFileSelect = (event) => {
     setSelectedFile(event.target.files[0]);
   };
 
 
   
   const columns =[
     { field: '_id', headerName: 'SN.NO', width: 80 },
     { field: 'first_name', headerName: 'First Name', width : 100 },
     { field: 'last_name', headerName: 'Last Name', width : 100 },
     { field: 'email', headerName: 'Email', width : 250 },
     { field: 'gender', headerName: 'Gender', width : 100 },
     { field: 'timeslots', headerName: 'Timeslots', width : 120 },
     { field: 'start_time', headerName: 'Start Time', width : 100 },
     { field: 'end_time', headerName: 'End Time', width : 100 },
     { field: 'dob', headerName: 'DOB', width : 120 },

     { field: 'status', headerName: 'Status', width:140,
     renderCell: (params) => (
       <span style={{ color: params.row.status === true ? 'green' : 'red' , backgroundColor: params.row.status === true ? '#DCFCE7' : '#FEE2E2' , border : '1px solid', fontWeight :'bold' , width : '85px' }} className='text-center px-3 py-1 rounded-5 fs-12-400'>
         {params.row.status === true ? 'Active' : 'Draft'}
       </span>
     ),
   },
 
     { field: 'action', headerName: 'Action', width:140 ,
          renderCell: (params) => (
            <>
            <IconButton onClick={() => handleEdit(params.id)}>
              <Edit fontSize='small' color='primary' />
            </IconButton>
            <IconButton onClick={() => handleDelete(params.id)}>
              <Delete fontSize='small' color='error'  />
            </IconButton>

            <IconButton onClick={() => handleView(params.id)}>
              <RemoveRedEye fontSize='small' color='inherit'  />
            </IconButton>
          </>
 
          ),
   }
   ] 
 
 
   
   const rows = [
     { id: 1, lastName: 'Snow', firstName: <button>ok</button>  , age: 35 , status:true },
     { id: 2, lastName: 'Snow', firstName: 'Jon', age: 35 , status:false },
     { id: 3, lastName1: 'Snow', firstName: 'Jon', age: 35 , status:true },
     { id: 4, lastName2: 'Snow', firstName: 'Jon', age: 35 , status:true },
     { id: 5, lastName3: 'Snow', firstName: 'Jon', age: 35 , status:true },
     { id: 6, lastName4: 'Snow', firstName: 'Jon', age: 35 , status:true },
     { id: 7, lastName5: 'Snow', firstName: 'Jon', age: 35 , status:true },
     { id: 8, lastName6: 'Snow', firstName: 'Jon', age: 35 , status:true },
     { id: 9, lastName7: 'Snow', firstName: 'Jon', age: 35 , status:true },
     { id: 10, lastName8: 'Snow', firstName: <button className='btn-all'>status</button>, age: 35 , status:true },
     { id: 11, lastName8: 'Snow', firstName: 'Jon', age: 35 , status:true },
     { id: 12, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
     { id: 13, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
     { id: 14, lastName: 'Stark', firstName: 'Arya', age: 16 },
     { id: 15, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
     { id: 16, lastName: 'Melisandre', firstName: null, age: 150 },
     { id: 17, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
     { id: 18, lastName: 'Frances', firstName: 'Rossini', age: 36 },
     { id: 19, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
   ];
 


   const [formFields, setFormFields] = useState([
    { name: '', age: '' },
  ])

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  }

  const submit = (e) => {
    e.preventDefault();
    console.log(formFields)
  }

  const addFields = () => {
    let object = {
      name: '',
      age: ''
    }

    setFormFields([...formFields, object])
  }

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }



  const [doctorData , setdoctorData] = useState([]);


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
  const getRowId = (row) => row._id;

  /* get api */
  const [categoryData , setcategoryData] = useState([]);
  const [expertiseData , setexpertiseData] = useState([]);
  const [treatmentData , settreatmentData] = useState([]);


  const getApi = async () =>{

     let res = await categoryApi();
     if(res.status===true){
       console.log(res.data)
       setcategoryData(res.data);
     }

     let res2 = await expertiseApi();
     if(res2.status===true){
       console.log(res2.data)
       setexpertiseData(res2.data);
     }

     let res3 = await treatmentApi();
     if(res3.status===true){
       console.log(res3.data)
       settreatmentData(res3.data);
     }

  }

  useEffect(()=>{
    getApi();
  }, []);




  // const [selectedValue1, setSelectedValue1] = useState();
  // const handleChange1 = (event) => {
  //   setSelectedValue1(event.target.value);
  // };
  // const [selectedValue2, setSelectedValue2] = useState();

  // const handleChange2 = (event) => {
  //   setSelectedValue2(event.target.value);
  // };
  // const [selectedValue3, setSelectedValue3] = useState();

  // const handleChange3 = (event) => {
  //   setSelectedValue3(event.target.value);
  // };
 
   return (
 
     
     <>
     

     <Row>
       <Col xl={3} className=''> <span className="title-box fs-24-500">Doctor Name</span> </Col>
       {/* <Col lg={9} className ='d-flex flex-row justify-content-end flex-wrap'> 
       {actionType==='list' ?  
       
       <>
       <div className="seach-box">
         <CustomInputText size='small' style={{  borderTopRightRadius : '0px', borderBottomRightRadius : '0px'  , borderRight : 'none',height:'40px' , background : 'white'}} placeholder='Search here....' />
         <CustomButton variant='contained' style={{  borderTopLeftRadius : '0', borderBottomLeftRadius : '0' }}> <SearchIcon /> </CustomButton>
       </div>
       <CustomButton variant='contained' style={{ height:'40px', width : 'fit-content' }} className='ms-lg-3' startIcon={<InsertDriveFileIcon/>}> CSV </CustomButton>
      <CustomButton variant='contained' style={{ height:'40px', width : 'fit-content' }} className='ms-lg-3 ms-1' startIcon={<DescriptionIcon/>}> Excell </CustomButton>
       </>

       : null }


       {actionType==='list' ? <CustomButton onClick={()=>{setactionType('add')}} variant='contained' style={{ height:'40px', width : 'fit-content' }} className='ms-lg-3 ms-1 px-lg-3 px-2' startIcon={<AddIcon/>}> Add new </CustomButton> : <CustomButtonClose onClick={()=>{setactionType('list')}} variant='contained' color='error' style={{ height:'40px'}} className='ms-3' startIcon={<CloseIcon/>}> Close </CustomButtonClose>}
       </Col> */}

       <Col xl={9} className ='d-flex flex-lg-row flex-column justify-content-lg-end '> 

       {actionType==='list' ?  

       <>

       <div className="seach-box">
        <CustomInputText size='small' style={{  borderTopRightRadius : '0px', borderBottomRightRadius : '0px'  , borderRight : 'none',height:'40px' , background : 'white'}} placeholder='Search here....' />
        <CustomButton variant='contained' style={{  borderTopLeftRadius : '0', borderBottomLeftRadius : '0' }}> <SearchIcon /> </CustomButton>
      </div>
      <div className="btn-group  my-lg-0 my-3">
      <CustomButton variant='contained' style={{ height:'40px', width : 'fit-content' }} className='ms-lg-3' startIcon={<InsertDriveFileIcon/>}> CSV </CustomButton>
      <CustomButton variant='contained' style={{ height:'40px', width : 'fit-content' }} className='ms-lg-3 ms-1' startIcon={<DescriptionIcon/>}> Excell </CustomButton>
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
            <CustomInputText size='small' className='w-100' placeholder='First name' variant='outlined' />
          </Form.Group>
        </Col>


        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>Last Name</Form.Label>
            <CustomInputText size='small' className='w-100' placeholder='Last name' variant='outlined' />
          </Form.Group>
        </Col>

        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>E-mail</Form.Label>
            <CustomInputText size='small' className='w-100' placeholder='name@company.com' variant='outlined' />
          </Form.Group>
        </Col>

        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label className=''>Gender</Form.Label>
          <CustomSelectBox 
          displayEmpty
          size='small'
          className='w-100'
          inputProps={{ 'aria-label': 'Without label' }} defaultValue='male' >
          <MenuItem value='male'>Male</MenuItem>
          <MenuItem value='female'>Female</MenuItem>
          <MenuItem value='other'>Other</MenuItem>
        </CustomSelectBox>
          </Form.Group>
        </Col>

        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>Date-of-Birth</Form.Label>
            <CustomInputText size='small' type='date' className='w-100' placeholder='First name' variant='outlined' />
          </Form.Group>
        </Col>


        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>Contact No.</Form.Label>
            <CustomInputText size='small' className='w-100' placeholder='Contact No.' variant='outlined' />
          </Form.Group>
        </Col>

        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>PAN No.</Form.Label>
            <CustomInputText size='small' className='w-100' placeholder='PAN No.' variant='outlined' />
          </Form.Group>
        </Col>

        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>Aadhaar No.</Form.Label>
            <CustomInputText size='small' className='w-100' placeholder='Aadhaar No.' variant='outlined' />
          </Form.Group>
        </Col>

        
        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>Alternate No.</Form.Label>
            <CustomInputText size='small' className='w-100' placeholder='Alternate No.' variant='outlined' />
          </Form.Group>
        </Col>

        
        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>Bio</Form.Label>
            <CustomInputText size='small' as={'textarea'} rows={7} className='w-100 p-2' placeholder='Bio' variant='outlined' />
          </Form.Group>
        </Col>

        
        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>Address</Form.Label>
          <CustomInputText size='small' as={'textarea'} rows={7} className='w-100 p-2' placeholder='Address' variant='outlined' />
          </Form.Group>
        </Col>

        <Col lg={4} xs={6} className='my-3 d-flex align-items-end'>
          <Form.Group className='d-flex flex-column'>
          {<img src={selectedFile ? URL.createObjectURL(selectedFile): ''} alt="" style={{height : '120px' , width : '120px' , background : 'white' }}  className='rounded-circle mb-2' />}
          <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileSelect} />
            <CustomButton variant='contained' onClick={() => document.getElementById('fileInput').click()}  className='' startIcon={<BackupIcon/>}> Upload</CustomButton>
          </Form.Group>
        </Col>




        <Col xs={12}>
          <Form.Group>
            <p className='fs-22-600 text-secondary'>Education Detail</p>
          </Form.Group>
        </Col>




        <Col xs={12}>


        {formFields.map((form, index) => {
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
  inputProps={{ 'aria-label': 'Without label' }} defaultValue={form.name} >
  <MenuItem value='mbbs'>MBBS</MenuItem>
  <MenuItem value='female'>MBBS</MenuItem>
  <MenuItem value='other'>MBBS</MenuItem>
</CustomSelectBox>
            </Form.Group>
            </Col>


            <Col lg={4} xs={6} className='my-3'>
            <Form.Group>
            <Form.Label>College/University</Form.Label>
            <CustomSelectBox 
  onChange={event => handleFormChange(event, index)}
  displayEmpty
  size='small'
  className='w-100'
  inputProps={{ 'aria-label': 'Without label' }} defaultValue={form.name} >
  <MenuItem value='medical college'>Medical college</MenuItem>
  <MenuItem value='female'>MBBS</MenuItem>
  <MenuItem value='other'>MBBS</MenuItem>
</CustomSelectBox>
            </Form.Group>
            </Col>

            <Col lg={2} xs={6}  className='my-3'>
            <Form.Group>
            <Form.Label>Passing Year</Form.Label>
            <CustomSelectBox 
  onChange={event => handleFormChange(event, index)}
  displayEmpty
  size='small'
  className='w-100'
  inputProps={{ 'aria-label': 'Without label' }} defaultValue={form.name} >
  <MenuItem value='medical college'>Medical college</MenuItem>
  <MenuItem value='female'>MBBS</MenuItem>
  <MenuItem value='other'>MBBS</MenuItem>
</CustomSelectBox>
            </Form.Group>
            </Col>
            <Col lg={2} xs={6} className='d-flex align-items-end justify-content-start my-3'>
            <Form.Group>
            <IconButton  style={{border : '1px solid #DC2626' , borderRadius : '4px' , color : '#DC2626'}}  onClick={() => removeFields(index)}>
            <DeleteIcon />
            </IconButton>
            </Form.Group>
            </Col>
            </Row>
          )
        })}
     

        <CustomButton onClick={addFields} type='button' startIcon={<AddIcon />}>Add More</CustomButton>

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
  
          size='small'
          className='w-100 rounded-1'
          inputProps={{ 'aria-label': 'Without label' }}
          // value={selectedValue1}
          // onChange={handleChange1}
           >

          { categoryData?.map((val)=>{
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
  
          >

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

           >

               { expertiseData?.map((val)=>{
            return(<>
              <option value={val._id}>{val.name}</option>
            </>)
          }) 
         }
        </Form.Select>
          </Form.Group>
        </Col>


        <Col lg={6} className='d-flex justify-content-between flex-wrap'>
          <Form.Group className='my-3 '>
          <Form.Label className='w-100'>Front Aadhaar</Form.Label>
          <input type="file" name="" className='d-none' id="frontAadhar" />
     <CustomButton startIcon={<BackupIcon />} onClick={()=>{document.getElementById('frontAadhar').click()}} >Upload</CustomButton>
          </Form.Group>

          <Form.Group className='my-3 '>
          <Form.Label className='w-100'>Back Aadhaar</Form.Label>
          <input type="file" name="" className='d-none' id="backAadhar" />
     <CustomButton startIcon={<BackupIcon />} onClick={()=>{document.getElementById('backAadhar').click()}} >Upload</CustomButton>
          </Form.Group>

          <Form.Group className='my-3 '>
          <Form.Label className='w-100'>Upload PAN</Form.Label>
          <input type="file" name="" className='d-none' id="frontPan" />
     <CustomButton startIcon={<BackupIcon />} onClick={()=>{document.getElementById('frontPan').click()}} >Upload</CustomButton>
          </Form.Group>
        </Col>


        <Col lg={6} className={`my-3 d-flex justify-content-end align-items-end ${actionType ==='view' ? 'd-none' :  null} `}>
          <Form.Group>
   
     <CustomButton startIcon={<FileUploadIcon />} >  {actionType ==='add' ? 'Submit' :  'update'}  </CustomButton>
          </Form.Group>
 
        </Col>

       </Form>
  
       </Col> 
       
       
       : 
       
       
       <Col xs={12} className='overflow-hidden my-3'>
         <CustomTable rows={doctorData} columns={columns} getRowId={getRowId} />
       </Col>


       
        }
 
 

 
 
 
     </Row>
     
     
     </>
   )
}

export default Doctor