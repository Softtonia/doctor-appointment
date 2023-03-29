import React, { Children, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Button, IconButton } from '@mui/material';


import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';

import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';


import InsertLinkIcon from '@mui/icons-material/InsertLink';

import SendIcon from '@mui/icons-material/Send';

const StyledBadgeOnline = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));


const ChatList = () => {
  const [open, setOpen] = useState(false);

  const handleToggleDrawer = () => {
    setOpen(!open);
  };


  return (<>



    

      <Drawer anchor="right" open={open} onClose={handleToggleDrawer}  PaperProps={{ style: { width: 380 , height : '89vh', marginTop : '89px'   , boxShadow : 'none' } }} style={{ position: 'absolute' ,bottom : 0 , left : 0, zIndex: 0 }} BackdropProps={{ invisible: true }}>
        <Card style={{width : '300px'}} className='rounded-0 h-100'>
          <Card.Header className='d-flex flex-row align-items-center justify-content-between bg-white'>   
          <div className="d-flex w-100 ">
          <StyledBadgeOnline overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot"  >
                 <Avatar alt="Remy Sharp" src="/images/chat1.png" style={{height : '50px', width : '50px'}} />
             </StyledBadgeOnline>
             <p className='ms-2 my-auto'>Lorem Ipsum</p>
          </div>


<IconButton className="cursor-pointer">
  <CloseIcon onClick={()=>{handleToggleDrawer()}} />
</IconButton>

             </Card.Header>

             <Card.Body style={{background: '#F0F0F0'}} className='h-100'>


             </Card.Body>

             <Card.Footer style={{background: '#F0F0F0'}} className=' pb-3'>
                  <div className="message-box d-flex  align-items-center justify-content-between bg-white px-2 rounded-2">
                    <IconButton>
                    <input type="file" name="" id="message-attachment-send" style={{display : 'none'}} />
                    <InsertLinkIcon onClick = {()=>{document.getElementById('message-attachment-send').click(); }} className='cursor-pointer' />
                    </IconButton>
                    <textarea style={{outline : 'none' , border : '0px' , width : '150px', height : '40px' , paddingTop : '8px' }} placeholder='Type here' ></textarea>
                    <IconButton>
                    <SendIcon />
                    </IconButton>
                  </div>
             </Card.Footer>
        </Card>
      </Drawer>




  
    <ul className="list-unstyled">
         <li className=' mb-3 cursor-pointer' onClick={handleToggleDrawer}>
             <StyledBadgeOnline overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot"  >
                 <Avatar alt="Remy Sharp" src="/images/chat1.png" style={{height : '50px', width : '50px'}} />
             </StyledBadgeOnline>
         </li>
         <li className=' mb-3 cursor-pointer' onClick={handleToggleDrawer}>
         <Avatar alt="Remy Sharp" src="/images/chat2.png" style={{height : '50px', width : '50px'}} />
         </li>
    </ul>
  
  
  </>)
}

export default ChatList