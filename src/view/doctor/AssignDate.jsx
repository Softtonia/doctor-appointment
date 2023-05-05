import React, { useEffect, useState } from 'react'
import { convertToAMPM } from '../../utils/convertDate';
import { assigntimeslotsApi, assigntimeslotsPostApi } from '../../api/service.api';
import { SweetAlertSingle } from '../../utils/SweetAlert';
import { Col, Row } from 'react-bootstrap';
import { CustomButton } from '../../component/Demo';
import { CircularProgress } from '@mui/material';
import CustomTable from '../../utils/CustomTable';

const AssignDate = (props) => {
    const [selectTimeSlotDate,setselectTimeSlotDate] = useState(new Date().toISOString().slice(0, 10))
    let [store,setStore] = useState([]);


    useEffect(()=>{
        if(props){
            setStore(props);
        }
    }, [selectTimeSlotDate]);


    const [spin, setspin] = useState(false);
    const [timeslotsData, setTimeslotsData] = useState([]);
    
      const handleChange = (event, timeslot) => {

        const isChecked = event.target.checked;
        if (isChecked) {
          // Add the timeslot to the timeslotsData array
          setTimeslotsData([...timeslotsData, timeslot]);

          // console.log(timeslotsData , '====> timeslotsData <===')
        } else {
          // Remove the timeslot from the timeslotsData array
          const updatedTimeslotsData = timeslotsData.filter(
            (t) => t._id !== timeslot._id
          );
          setTimeslotsData(updatedTimeslotsData);



        }
      };
      
      const handelSubmit = async () =>{
            // console.log(timeslotsData , '>>> timeslotsData <<<');
          setspin(true);



              // console.log( JSON.stringify(SelectedSlots) , selectTimeSlotDate );
              let data = {doctor_info:store.userid , date:selectTimeSlotDate , timeslot_data : JSON.stringify(timeslotsData) }

              let res = await assigntimeslotsPostApi(data , store.token);
              if(res.status===true){
                SweetAlertSingle({title:'Time Solts' , text : res.message , icon : 'success', showCancelButton:false});
              } 
              else{
                SweetAlertSingle({title:'Request Failed' , text : res.message , icon : 'warning', showCancelButton:false});
            }
            setspin(false);


      }

      const fetchGetAssign = async () =>{

        let data = {
          id : store.userid || props.userid,
          date :  selectTimeSlotDate || new Date().toISOString().slice(0, 10)
        }

        let res1 = await assigntimeslotsApi(data);
        if(res1.status===true && res1.total===1){ setTimeslotsData(JSON.parse(res1.data[0].timeslot_data))}
        else{
          setTimeslotsData([]);
        }
        
      }

      useEffect(()=>{
        fetchGetAssign();
      }, [selectTimeSlotDate]);



      /* table */
      
      /* add a virtual Serial Number */
      const formattedRows = timeslotsData?.map((row, index) => ({
        ...row,
        serialNumber: index + 1,
      }));
      /* ends a virtual Serial Number */

      const columns =[
        { field: 'serialNumber', headerName: 'SN.NO', width: 80 },
        { field: 'Time Solt', headerName: 'Time Solt', width : 200 ,
        renderCell: (params) => (
       `${convertToAMPM(params.row.start_time)} - ${convertToAMPM(params.row.end_time)}`
      )
      } ] 
      const getRowId = (row) => row._id;

  return (
    <div>

<p className='my-3'>{`Assign to: ${props.first_name} ${props.last_name}`}</p>
<Row>
       <Col xs={12} sm={6} md={4}  className='my-3'>
        <input className='form-control w-100' type='date' size='small' defaultValue={selectTimeSlotDate} min={new Date().toISOString().substring(0, 10)} onChange={(e)=>{setselectTimeSlotDate(e.target.value); fetchGetAssign(e.target.value)}} />
       </Col>
       </Row>

      <div className="box d-flex flex-wrap">

        {props.totalslots && props.totalslots?.map((timeslot) => (
          <div key={timeslot._id} className='col-md-3  p-1  col-sm-6'>
            <div className='py-1 px-2 bg-white rounded-2 '>
            <input
              type="checkbox"
              className='me-1 cursor-pointer'
              id={timeslot._id}
              name={timeslot._id}
              value={timeslot._id}
              checked={timeslotsData.some((t) => t._id === timeslot._id)}
              onChange={(event) => handleChange(event, timeslot)}
            />
            <label htmlFor={timeslot._id}>
              { convertToAMPM(timeslot.start_time) } - { convertToAMPM(timeslot.end_time)}
            </label>
            </div>
          </div>
        ))}

        </div>
        <CustomButton size='small' variant='contained' className='mt-5' onClick={handelSubmit}>Submit{ spin && <CircularProgress className='ms-1' size={15}  style={{color : 'white'}} /> }</CustomButton>



        <Row className='mt-5'>
          <Col xs={12}>
     
          <CustomTable rows={formattedRows} columns={columns} getRowId={getRowId} />
          </Col>
        </Row>
      </div>
  )
}

export default AssignDate;

  