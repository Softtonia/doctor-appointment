import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { CustomButton, CustomInputText } from '../../component/Demo'
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CustomTable from '../../utils/CustomTable';


import { IconButton } from '@mui/material';
import {Edit, Delete} from '@mui/icons-material';

const Department = () => {


  const status = false;

  const handleEdit = (id) => {
   alert(id)
  };

  const handleDelete = (id) => {
    alert(id)
  };
  
  const columns =[
    { field: 'id', headerName: 'SN.NO', width: 80 },
    { field: 'firstName', headerName: 'Dept Name', width : 850 },
    { field: 'status', headerName: 'Status', width:140,
    renderCell: (params) => (
      <span style={{ color: params.row.status === true ? 'green' : 'red' , backgroundColor: params.row.status === true ? '#DCFCE7' : '#FEE2E2' , border : '1px solid', fontWeight :'bold' }} className='px-3 py-1 rounded-5 fs-12-400'>
        {params.row.status === true ? 'Active' : 'Draft'}
      </span>
    ),
  },

    { field: 'action', headerName: 'Action', width:140 ,
         renderCell: (params) => (
      <>
      <IconButton onClick={() => handleEdit(params.id)}>
        <Edit color='primary' />
      </IconButton>
      <IconButton onClick={() => handleDelete(params.id)}>
        <Delete  color='error'  />
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


  return (

    
    <>
    
    
    <Row>
      <Col sm={6}> <span className="title-box fs-24-500">Department Name</span> </Col>
      <Col sm={6} className ='d-flex flex-row justify-content-end flex-wrap'> 
      
      <div className="seach-box">
        <CustomInputText size='small' style={{  borderTopRightRadius : '0', borderBottomRightRadius : '0' , borderRight : 'none'}} placeholder='Search here....' />
        <CustomButton variant='contained' style={{  borderTopLeftRadius : '0', borderBottomLeftRadius : '0' }}> <SearchIcon /> </CustomButton>
      </div>

      <CustomButton variant='contained' style={{ height:'40px' }} className='ms-3' startIcon={<AddIcon/>}> Add new </CustomButton>

      

      </Col>


      <Col xs={12} className='overflow-hidden my-3'>
      <CustomTable rows={rows} columns={columns} />
      </Col>



    </Row>
    
    
    </>
  )
}

export default Department