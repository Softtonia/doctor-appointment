import React, { useEffect, useRef, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { CustomButton, CustomButtonClose, CustomInputText } from '../../component/Demo'
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CustomTable from '../../utils/CustomTable';
import { Button, IconButton, Input } from '@mui/material';
import {Edit, Delete} from '@mui/icons-material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DescriptionIcon from '@mui/icons-material/Description';
import BackupIcon from '@mui/icons-material/Backup';

import CloseIcon from '@mui/icons-material/Close';
import CustomAlert, { getAlert} from '../../utils/CustomAlert';
import { categoryPostApi, departmentApi, timeslotsApi, timeslotsDeleteApi, timeslotsPostApi, timeslotsPutApi, timeslotsStatusApi, treatmentApi, treatmentDeleteApi, treatmentPostApi, treatmentPutApi, treatmentStatusApi } from '../../api/service.api';
import { useCookies } from 'react-cookie';
import CustomAlertMui from '../../utils/CustomAlertMui';
import { SweetAlert, SweetAlertSingle } from '../../utils/SweetAlert';
import { handleExport, handleExportCsv } from '../../utils/ExportXL';
import { convertToAMPM, reverseToAMPM } from '../../utils/convertDate';



const TimeSlot = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token','user_id']);
  let formRef = useRef();

  const [EditData , setEditData] = useState();
  const handleEdit = (data) => {
    setactionType('edit');
    setEditData(data);
  };


  const [actionType , setactionType] = useState('list');

  const columns =[
    { field: 'serialNumber', headerName: 'SN.NO', width: 80 },
    { field: 'start_time', headerName: 'Start Time', width : 250,
  renderCell : (params) => convertToAMPM(params.row.start_time)
  },
    { field: 'end_time', headerName: 'End Time', width : 450,
    renderCell : (params) => convertToAMPM(params.row.end_time) },

    { field: 'status', headerName: 'Status', width:140,
    renderCell: (params) => (
      <span  onClick={() => statusApi(params.id , !params.row.status)} style={{ color: params.row.status === true ? 'green' : 'red' , backgroundColor: params.row.status === true ? '#DCFCE7' : '#FEE2E2' , border : '1px solid', fontWeight :'bold' , width : '85px' }} className='text-center px-3 py-1 rounded-5 fs-12-400 cursor-pointer'>
      {params.row.status === true ? 'Active' : 'Draft'}
    </span>
    ),
  },

    { field: 'action', headerName: 'Action', width:140 ,
         renderCell: (params) => (
          <>
          <IconButton onClick={() => handleEdit({id : params.id , start_time : params.row.start_time, end_time : params.row.end_time})}>
            <Edit fontSize='small' color='primary' />
          </IconButton>
          <IconButton onClick={() => {SweetAlert(deleteApi) , did=params.id} }>
            <Delete fontSize='small' color='error'  />
          </IconButton>
        </>

         ),
  }
  ]

  /* edit api*/

  let [newData , setNewData] = useState({
    start_time : "",end_time : ""
  });

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
    setNewData({ ...newData, [name]:value })
  }


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
    setEditData({ ...EditData, [name]:value })
  }

  const editApi = async () =>{
      let res = await timeslotsPutApi(EditData , cookies.token);
      if(res.status===true){
        getApi();
        setactionType('list');
      }
      else{
        SweetAlertSingle({title:'Request Failed' , text : res.message , icon : 'warning', showCancelButton:false});

      }

  }


  /* post api*/
  const postApi = async () =>{
    let res = await timeslotsPostApi(newData , cookies.token);
    if(res.status===true){
      getApi();
      formRef.current.reset();
      setactionType('list');

      setNewData({
        start_time : "",end_time : ""
      })
    }
    else{
      SweetAlertSingle({title:'Request Failed' , text : res.message , icon : 'warning', showCancelButton:false});

    }

  }

    /* status api*/
    const statusApi = async (id,data) =>{
      let res = await timeslotsStatusApi(id,data , cookies.token);
      if(res.status===true){
        getApi();
        setactionType('list');
      }
      else{
        SweetAlertSingle({title:'Request Failed' , text : res.message , icon : 'warning', showCancelButton:false});

      }
  
    }



   const getRowId = (row) => row._id;

   /* get api */
   const [timeslotsData , settimeslotsData] = useState([]);

    /* add a virtual Serial Number */
   const formattedRows = timeslotsData?.map((row, index) => ({
    ...row,
    serialNumber: index + 1,
  }));
    /* ends a virtual Serial Number */

   const getApi = async () =>{
      let res = await timeslotsApi();
      if(res.status===true){ settimeslotsData(res.data); }
   }

   useEffect(()=>{
    getApi();

   }, [])


    /* delete api */
  
     let did = null;
     const deleteApi = async () =>{
      let res = await timeslotsDeleteApi(did,cookies.token);
      if(res.status===true){
        getApi();
        
      }
      else{
        SweetAlertSingle({title:'Request Failed' , text : res.message , icon : 'warning', showCancelButton:false});

      }
    }




     const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);

     const handleAlert = () => {
      setIsConfirmationDialogOpen(true);
    };
   
     const handleCancelAlert = () => {
       setIsConfirmationDialogOpen(false);
       return setgetConfirm(false);
     };
   
     const handleConfirmAlert = () => {
       // Call your delete function here
       setIsConfirmationDialogOpen(false);
       return setgetConfirm(true);

     };


 
   return (
 
     
     <>
     
     
     <Row>
       <Col xl={3} className=''> <span className="title-box fs-24-500">Timeslots</span> </Col>
       <Col xl={9} className ='d-flex flex-lg-row flex-column justify-content-lg-end '> 
      <div className="seach-box">
        <CustomInputText size='small' style={{  borderTopRightRadius : '0px', borderBottomRightRadius : '0px'  , borderRight : 'none',height:'40px' , background : 'white'}} placeholder='Search here....' />
        <CustomButton variant='contained' style={{  borderTopLeftRadius : '0', borderBottomLeftRadius : '0' }}> <SearchIcon /> </CustomButton>
      </div>
      <div className="btn-group  my-lg-0 my-3">
      <CustomButton variant='contained' style={{ height:'40px', width : 'fit-content' }} className='ms-lg-3' startIcon={<InsertDriveFileIcon/>} onClick={()=>{handleExportCsv(timeslotsData, 'treatment')}}> CSV </CustomButton>
      <CustomButton variant='contained' style={{ height:'40px', width : 'fit-content' }} className='ms-lg-3 ms-1' startIcon={<DescriptionIcon/>} onClick={()=>{handleExport(timeslotsData, 'treatment.xlsx')}} > Excell </CustomButton>
      {actionType==='list' ? <CustomButton onClick={()=>{setactionType('add')}} variant='contained' style={{ height:'40px', width : 'fit-content' }} className='ms-lg-3 ms-1 px-lg-3 px-2' startIcon={<AddIcon/>}> Add new </CustomButton> : null}
      </div>
      </Col>
 
 
       {actionType!=='list' ?  
       
       <Col xs={12} className='my-3'>
        
        <Row>
        
        <Col lg={10}>
          <Form className='row' ref={formRef} >
            <Col lg={4} className='my-lg-0 my-2'>
            <Form.Group>
            <Form.Label className='w-100'>Start Time</Form.Label>
            <CustomInputText size='small' 
            className='w-100' 
            name='start_time'
            type='time'
            defaultValue={actionType==='edit' ? EditData.start_time :null} 
            style={{  borderTopRightRadius : '0px', borderBottomRightRadius : '0px'  , borderRight : 'none' , border : '0px' }} 
            placeholder='Start Time'
            onChange={(e)=>{actionType==='edit' ? handelUpdate(e)  : handelAdd(e)}}
             />

            </Form.Group>
            </Col>
            
            <Col lg={4} className='my-lg-0 my-2'>
            <Form.Group>
            <Form.Label className='w-100'>End Time</Form.Label>
            <CustomInputText size='small' 
            className='w-100' 
            type='time'
            name='end_time'
            defaultValue={actionType==='edit' ? EditData.end_time :null} 
            style={{  borderTopRightRadius : '0px', borderBottomRightRadius : '0px'  , borderRight : 'none' , border : '0px' }} 
            placeholder='End Time'
            onChange={(e)=>{actionType==='edit' ? handelUpdate(e)  : handelAdd(e)}}
             />

            </Form.Group>
            </Col>
            <Col lg={4} className='my-lg-0 my-2 d-flex align-items-end'> 

<Form.Group>
<CustomButton variant='contained'  onClick={()=>{ actionType==='edit' ? editApi() : postApi() }}  className='ms-3' > { actionType==='edit' ? 'update' : 'Add New' } </CustomButton>
</Form.Group>


</Col>
            </Form>

          </Col>
 
 
           <Col lg={2} className='d-flex justify-content-end align-items-end'>
           <CustomButtonClose onClick={()=>{setactionType('list')}} variant='contained' color='error' style={{ height:'40px'}} className='ms-3' startIcon={<CloseIcon/>}> Close </CustomButtonClose>
           </Col>
 
 
        </Row>
       </Col> 
       
       
       : null }
 
 
       <Col xs={12} className='overflow-hidden my-3'>
         <CustomTable rows={formattedRows} columns={columns} getRowId={getRowId} />
       </Col>

     </Row>
     
     {isConfirmationDialogOpen && (
        <CustomAlertMui
          onConfirm={handleConfirmAlert}
          onCancel={handleCancelAlert}
          message="Are you sure you want to delete this item?"
        />
      )}

     </>
   )
}

export default TimeSlot