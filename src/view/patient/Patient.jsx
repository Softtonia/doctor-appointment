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
import { categoryApi, doctorApi, expertiseApi, patientApi, treatmentApi } from '../../api/service.api';
import { SweetAlert } from '../../utils/SweetAlert';



const Patient = () => {

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
     { field: 'married', headerName: 'Married', width : 120 },
     { field: 'so', headerName: 'S/0', width : 100 },
     { field: 'do', headerName: 'D/0', width : 100 },
     { field: 'dob', headerName: 'DOB', width : 120 },

     { field: 'H/O', headerName: 'H/O', width : 120 },
     { field: 'address', headerName: 'Address', width : 120 },
     { field: 'department', headerName: 'Department', width : 120 },
     { field: 'disease', headerName: 'Disease', width : 120 },
     { field: 'doctor', headerName: 'DOB', width : 120 },



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
   const getRowId = (row) => row._id;
 
   
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





  // const getApi = async () =>{

  // }

  // useEffect(()=>{
  //   getApi();
  // }, [])


  /* get api */
  const [patientData , setpatientData] = useState([]);

  const [categoryData , setcategoryData] = useState([]);
  const [doctorData , setdoctorData] = useState([]);


  const getApi = async () =>{

    let res = await patientApi();
    if(res.status===true){
    setpatientData(res.data)
    console.log(res , 'resresresres')
    }


     let res1 = await categoryApi();
     if(res1.status===true){
       console.log(res1.data)
       setcategoryData(res1.data);
     }

     let res2 = await doctorApi();
     if(res2.status===true){
       console.log(res2.data)
       setdoctorData(res2.data);
     }
  }

  useEffect(()=>{
    getApi();
  }, []);




  const [selectGender, setselectGender] = useState('male');

  const handleGender = (event) => {
    setselectGender(event.target.value);
  };


  // const [selectedValue2, setSelectedValue2] = useState();

  // const handleChange2 = (event) => {
  //   setSelectedValue2(event.target.value);
  // };
  // const [selectedValue3, setSelectedValue3] = useState();

  // const handleChange3 = (event) => {
  //   setSelectedValue3(event.target.value);
  // };
  

  const myalertfn = ()=>{
    console.log('============== ok alser ==============')
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
          inputProps={{ 'aria-label': 'Without label' }} defaultValue={selectGender} onChange={handleGender} >
          <MenuItem value='male'>Male</MenuItem>
          <MenuItem value='female'>Female</MenuItem>
          <MenuItem value='other'>Other</MenuItem>
        </CustomSelectBox>
          </Form.Group>
        </Col>

        <Col lg={4} xs={6} className='my-3'>
        <Form.Group>
          <Form.Label>{selectGender === 'male' ? 'S/O' : 'D/O'}</Form.Label>
            <CustomInputText size='small'  className='w-100'  name={selectGender === 'male' ? 'so' : 'do'} placeholder={selectGender === 'male' ? 's/o' : 'd/o'} variant='outlined' />
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
          <Form.Label>Married</Form.Label>
            <CustomInputText size='small' className='w-100' placeholder='Married' variant='outlined' />
          </Form.Group>
        </Col>

        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>Disease</Form.Label>
            <CustomInputText size='small' className='w-100' placeholder='Disease' variant='outlined' />
          </Form.Group>
        </Col>

        
        
        <Col lg={4} xs={6} className='my-3'>
          <Form.Group>
          <Form.Label>Address</Form.Label>
          <CustomInputText size='small' as={'textarea'} rows={7} className='w-100 p-2' placeholder='Address' variant='outlined' />
          </Form.Group>
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
          <Form.Label className=''>Doctor</Form.Label>
          <Form.Select
          size='small'
          className='w-100 rounded-1'
          inputProps={{ 'aria-label': 'Without label' }}
           >

               { doctorData?.map((val)=>{
            return(<>
              <option value={val._id}>{`${val.first_name} ${val.last_name}`}</option>
            </>)
          }) 
         }
        </Form.Select>
          </Form.Group>
        </Col>
        <Col lg={12} className={`my-3 d-flex justify-content-end align-items-end ${actionType ==='view' ? 'd-none' :  null} `}>
          <Form.Group>
   
     <CustomButton startIcon={<FileUploadIcon />} onClick={()=>{SweetAlert( { myalertfn } )}} >  {actionType ==='add' ? 'Submit' :  'update'}  </CustomButton>
          </Form.Group>
 
        </Col>

       </Form>
  
       </Col> 
       
       
       : 
       
       
       <Col xs={12} className='overflow-hidden my-3'>
         <CustomTable rows={patientData} columns={columns}
         
          getRowId={getRowId}
          
           />
       </Col>


       
        }
 
 

 
 
 
     </Row>
     
     
     </>
   )
}

export default Patient