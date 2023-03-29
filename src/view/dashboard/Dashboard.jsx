import React, { Children, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Button, IconButton } from '@mui/material';
import ChatList from '../chat/ChatList';
import zIndex from '@mui/material/styles/zIndex';



const Dashboard = ({children}) => {
    const [messageOpenState, setmessageOpenState] = useState(false);

  return (<>
  
        <Container fluid className='admin-system-wrapper '>
            <Row className='' style={{height : '100vh'}}>
                <Col lg={3} xl={2} className='h-100 admin-system-sidebar d-lg-block d-none'>
                    <Sidebar />
                </Col>
                <Col lg={9} xl={10} className=' pe-0 overflow-hidden pt-0'>
                    <Row className='admin-system-header p-0 px-3'>
                        <Header/>
                    </Row>

                    <Row className='admin-system-content p-3 pt-0 pe-lg-0 h-100'>
                        <Col lg={10} xl={11} className='pt-3 admin-system-content-source'>
                        {children} 
                        </Col>
                        <Col lg={2} xl={1} className='h-100 d-lg-block d-none'>
                            <Card className='h-100 rounded-0 p-3 ' style={{zIndex : '100'}}>
                                    <IconButton size='small'   style={{ borderRadius : '4px',height : '50px',width : '100%' , color : '#4F46E5' , border : '1px solid #4F46E5' }} > <QuestionAnswerIcon fontSize='medium' /> </IconButton>


                                    <Card.Body className='p-0 mt-3' style={{zIndex : '100' , position: 'relative'}}>
                                        <ChatList />
                                    </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                </Col>
            </Row>
        </Container>
  
  
  </>)
}

export default Dashboard