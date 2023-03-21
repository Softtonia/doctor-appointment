import React from 'react'
import { Button, Checkbox } from '@mui/material';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';

import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { useNavigate } from 'react-router-dom';
const Header = () => {

    let navigate = useNavigate();

    const logout = () =>{
        navigate('/login')
    }

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (<>

<div className="header admin-system-header ">
<Checkbox {...label} icon={<NotificationsActiveOutlinedIcon />} checkedIcon={<NotificationsOffOutlinedIcon />} />

<Button onClick={()=>{logout()}}  variant='contained' className='ms-3' color='error' >
<ExitToAppOutlinedIcon/> </Button>
</div>

    </>)
}

export default Header