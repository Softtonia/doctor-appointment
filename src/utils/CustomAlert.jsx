import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CustomButton } from '../component/Demo';

const CustomAlert = ({ title, message,onSure, timeout = 3000 ,setShowAlertComp,onSureBtn }) => {

  const [showAlert, setShowAlert] = useState(true);
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleCloseAlert();
      setShowAlertComp(false)

    }, timeout);

    return () => clearTimeout(timeoutId);
  }, [handleCloseAlert, timeout]);


  return (
<>
    {
        showAlert ? 

        <div className="custom-alert">
      <div className="custom-alert__content">
        <h2 className="custom-alert__title fs-16-500">{title}</h2>
        <p className="custom-alert__message">{message}</p>
        <div className="btn-group">
           {onSureBtn && <CustomButton size='small'  variant='contained' onClick={()=>{onSure();handleCloseAlert(); setShowAlertComp(false)}}  className=" shadow-none custom-alert__button  me-2">Yes</CustomButton> }
            <Button variant='outlined' className="custom-alert__button" onClick={()=>{handleCloseAlert(); setShowAlertComp(false)}} style={{borderRadius : '6px'}}>{onSureBtn? 'No' : 'Ok'}</Button>
        </div>
      </div>
    </div>

    : null
    }
</>
  );
};

export default CustomAlert;


export const getAlert  = (props) =>{

    // console.log(props,'propsprops')
    return <CustomAlert title={props.title}  onSure={props.alertFn} setShowAlertComp={props.setShowAlert} />
}
