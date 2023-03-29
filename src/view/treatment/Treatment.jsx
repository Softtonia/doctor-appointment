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
import { categoryPostApi, treatmentApi, treatmentDeleteApi, treatmentPostApi, treatmentPutApi, treatmentStatusApi } from '../../api/service.api';
import { useCookies } from 'react-cookie';
import CustomAlertMui from '../../utils/CustomAlertMui';



const Treatment = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token','user_id']);


  let formRef = useRef();



  const [EditData , setEditData] = useState();
  const handleEdit = (data) => {
    setactionType('edit');
    setEditData(data);
  };


  const [actionType , setactionType] = useState('list');
 
  
  const columns =[
    { field: '_id', headerName: 'SN.NO', width: 80 },
    { field: 'image', headerName: 'Icon', width: 120,
  
    renderCell: (params) => (
      <img src={params.row.image} alt="" srcset="" height='50px' width='50px' />
    ),
  
  },
    { field: 'name', headerName: 'Treatment Name', width : 550 },
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
          <IconButton onClick={() => handleEdit({id : params.id , name : params.row.name, image : params.row.image})}>
            <Edit fontSize='small' color='primary' />
          </IconButton>
          <IconButton onClick={() => deleteApi(params.id)}>
            <Delete fontSize='small' color='error'  />
          </IconButton>
        </>

         ),
  }
  ]

  /* edit api*/

  let [newData , setNewData] = useState({
    name : "",image : ""
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
      let res = await treatmentPutApi(EditData , cookies.token);
      if(res.status===true){
        getApi();
        setactionType('list');
      }
      else{
        console.log(res.status)
      }

  }


  /* post api*/
  const postApi = async () =>{
    let res = await treatmentPostApi(newData , cookies.token);
    if(res.status===true){
      getApi();
      formRef.current.reset();
      setactionType('list');

      setNewData({
        name : "",image : ""
      })
    }
    else{
      console.log(res.status)
    }

  }

    /* status api*/
    const statusApi = async (id,data) =>{
      let res = await treatmentStatusApi(id,data , cookies.token);
      if(res.status===true){
        getApi();
        setactionType('list');
      }
      else{
        console.log(res.status)
      }
  
    }



   const getRowId = (row) => row._id;

   /* get api */
   const [treatmentData , settreatmentData] = useState([]);


   const getApi = async () =>{
      let res = await treatmentApi();

      if(res.status===true){
        console.log(res.data)
        settreatmentData(res.data);

      }
   }

   useEffect(()=>{
    getApi();

   }, [])


    /* delete api */
    const actionFn = (type,data) =>{
        switch (type) {
          case 'delete':
            setShowAlert(true);
            setalertMessage('Are You Sure??')



            break;

            case 'edit':
              alert('ok app googd')
              break;
        
          default:
            break;
        }
     }




     const deleteApi = async (id) =>{
      let res = await treatmentDeleteApi(id,cookies.token);
      if(res.status===true){
        getApi();
        
      }
      else{
        alert(res.message);
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


  /* update api */
  const updateApi = async () =>{
            let res = await categoryPostApi();
            if(res.status===true){
              console.log(res.data)
              settreatmentData(res.data);
            }
  }
 
   return (
 
     
     <>
     
     
     <Row>
       <Col xl={3} className=''> <span className="title-box fs-24-500">Treatment Name</span> </Col>
       <Col xl={9} className ='d-flex flex-lg-row flex-column justify-content-lg-end '> 
      <div className="seach-box">
        <CustomInputText size='small' style={{  borderTopRightRadius : '0px', borderBottomRightRadius : '0px'  , borderRight : 'none',height:'40px' , background : 'white'}} placeholder='Search here....' />
        <CustomButton variant='contained' style={{  borderTopLeftRadius : '0', borderBottomLeftRadius : '0' }}> <SearchIcon /> </CustomButton>
      </div>
      <div className="btn-group  my-lg-0 my-3">
      <CustomButton variant='contained' style={{ height:'40px', width : 'fit-content' }} className='ms-lg-3' startIcon={<InsertDriveFileIcon/>}> CSV </CustomButton>
      <CustomButton variant='contained' style={{ height:'40px', width : 'fit-content' }} className='ms-lg-3 ms-1' startIcon={<DescriptionIcon/>}> Excell </CustomButton>
      {actionType==='list' ? <CustomButton onClick={()=>{setactionType('add')}} variant='contained' style={{ height:'40px', width : 'fit-content' }} className='ms-lg-3 ms-1 px-lg-3 px-2' startIcon={<AddIcon/>}> Add new </CustomButton> : null}
      </div>
      </Col>
 
 
       {actionType!=='list' ?  
       
       <Col xs={12} className='my-3'>
        
        <Row>
        
        <Col lg={8}>
          <Form className='row' ref={formRef} >
            <Col lg={6} className='my-lg-0 my-2'>
            <Form.Group>
            <Form.Label className='w-100'>Treatment</Form.Label>
            <CustomInputText size='small' 
            className='w-100' 
            name='name'
            defaultValue={actionType==='edit' ? EditData.name : ''} 
            style={{  borderTopRightRadius : '0px', borderBottomRightRadius : '0px'  , borderRight : 'none' , border : '0px' }} 
            placeholder='Treatment Name'
            onChange={(e)=>{actionType==='edit' ? handelUpdate(e)  : handelAdd(e)}}
             />

            </Form.Group>
            </Col>
            <Col lg={6} className='my-lg-0 my-2'> 

            <Form.Group>
            <Form.Label className='w-100'>Upload Icon</Form.Label>
            <input type="file" id="fileInput" style={{ display: 'none' }} name='image' onChange={(e)=>{actionType==='edit' ? handelUpdate(e) : handelAdd(e)}} />
            <CustomButton variant='contained' onClick={() => document.getElementById('fileInput').click()}  className='' startIcon={<BackupIcon/>}> Upload Icon </CustomButton>
            <CustomButton variant='contained'  onClick={()=>{ actionType==='edit' ? editApi() : postApi() }}  className='ms-3' > { actionType==='edit' ? 'update' : 'Add New' } </CustomButton>
            
            </Form.Group>


          </Col>

            </Form>

          </Col>
 
 
           <Col lg={4} className='d-flex justify-content-end align-items-end'>
           <CustomButtonClose onClick={()=>{setactionType('list')}} variant='contained' color='error' style={{ height:'40px'}} className='ms-3' startIcon={<CloseIcon/>}> Close </CustomButtonClose>
           </Col>
 
 
        </Row>
       </Col> 
       
       
       : null }
 
 
       <Col xs={12} className='overflow-hidden my-3'>
         <CustomTable rows={treatmentData} columns={columns} getRowId={getRowId} />
       </Col>
 
 
 
     </Row>

     {/* {showAlert && <CustomAlert title={alertMessage} onSure={deleteApi} setShowAlertComp={setShowAlert} onSureBtn={true} />} */}
     {/* {showAlert && getAlert({title:'Are you sure?', alertFn, setShowAlert } ) }  */}
     

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

export default Treatment