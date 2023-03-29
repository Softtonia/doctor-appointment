import React, { useEffect, useState } from 'react'
import { Button, Checkbox, IconButton, Menu, MenuItem } from '@mui/material';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';

import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { useNavigate } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';


import Drawer from '@mui/material/Drawer';
import Sidebar from '../sidebar/Sidebar';
import { Card } from 'react-bootstrap';

const Header = () => {

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 400);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);





    const [open, setOpen] = useState(false);

    const handleToggleDrawer = () => {
      setOpen(!open);
    };



    let navigate = useNavigate();

    const logout = () =>{
        navigate('/login')
    }

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };




  return (<>

<div className="header admin-system-header ">
<div className="">
<IconButton>
<MenuIcon onClick={handleToggleDrawer} className='d-lg-none d-block ' style={{color : 'white'}}  />
</IconButton>
</div>
<div className="">


<NotificationsComponent />
{/* <Checkbox {...label} icon={<NotificationsActiveOutlinedIcon />} checkedIcon={<NotificationsOffOutlinedIcon />} className='bell-checkbox' /> */}
<Button onClick={()=>{logout()}}  variant='contained' className='ms-3' color='error' >
<ExitToAppOutlinedIcon/> </Button>
</div>
</div>



<Drawer className='d-lg-none d-block' anchor="left" open={open} onClose={handleToggleDrawer}  PaperProps={{ style: { width: 380 , height : '89vh', marginTop : '89px'   , boxShadow : 'none' } }} style={{ position: 'absolute' ,bottom : 0 , left : 0, zIndex: 0 }} BackdropProps={{ invisible: true }}>
 <div className="admin-system-sidebar h-100">
 <Sidebar closeFn={handleToggleDrawer} />
 </div>

      </Drawer>


    </>)
}

export default Header;


const NotificationsComponent = () =>{

  

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open_notify = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [notificationsData, setnotificationsData] = useState(
    [      {
          id: 0,
          title : "Heading one",
          discription : "Lorem ipsum dolor sit amet consectetur. Tincidunt amet",
          date : "",
          time: "7: 30 am"
        },
        {
          id: 1,
          title : "Heading two",
          discription : "Lorem ipsum dolor sit amet consectetur. Tincidunt amet",
          date : "",
          time: "7: 30 am"
        },
        {
          id: 2,
          title : "Heading three",
          discription : "Lorem ipsum dolor sit amet consectetur. Tincidunt amet",
          date : "",
          time: "7: 30 am"
        },
        {
          id: 3,
          title : "Heading four",
          discription : "Lorem ipsum dolor sit amet consectetur. Tincidunt amet",
          date : "",
          time: "7: 30 am"
        },
        {
          id: 0,
          title : "Heading one",
          discription : "Lorem ipsum dolor sit amet consectetur. Tincidunt amet",
          date : "",
          time: "7: 30 am"
        },
        {
          id: 1,
          title : "Heading two",
          discription : "Lorem ipsum dolor sit amet consectetur. Tincidunt amet",
          date : "",
          time: "7: 30 am"
        },
        {
          id: 2,
          title : "Heading three",
          discription : "Lorem ipsum dolor sit amet consectetur. Tincidunt amet",
          date : "",
          time: "7: 30 am"
        },
        {
          id: 3,
          title : "Heading four",
          discription : "Lorem ipsum dolor sit amet consectetur. Tincidunt amet",
          date : "",
          time: "7: 30 am"
        }
      ]
        
        )


  return(<>
    <IconButton onClick={handleClick} className='bell-checkbox'><NotificationsActiveOutlinedIcon /></IconButton>
      <Menu 
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        className='my-0 notification-popup'
        anchorEl={anchorEl}
        open={open_notify}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',}} >

          <Card className={` border-0 custome-scroller `} style={{width : '425px'}}>
          <Card.Header className='w-100 border-0 d-flex justify-content-between bg-transparent '>
            <span className='fs-20-500 my-auto' >Notifications</span>
            <Button variant='text'>Mark all as Read</Button>
          </Card.Header>
            <Card.Body>
              <ul className='list-unstyled '>
               {notificationsData?.map((val)=>{
                return(<>

                  <li className='d-flex justify-content-between my-1' key={val.id}>
                  <div className="post-by d-flex w-80">
                    <img src="/images/user.png" alt=""  className='img-fluid rounded-circle' style={{maxHeight : '50px' , maxWidth : '50px'}} />
                    <span className='d-flex flex-column ms-1'>
                        <span className='fs-18-600'>{val.title}</span>
                        <span className='fs-14-400 text-secondary'>{val.discription}</span>
                      </span>

                  </div>

                  <span className='fs-14-400 text-secondary'>{val.time}</span>
                 
                </li>


                </>)
               }) }

              
              </ul>
            </Card.Body>
          </Card>
      </Menu>
  </>)
}