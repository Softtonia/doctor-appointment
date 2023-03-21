import React, { Children } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'

const Dashboard = ({children}) => {
  return (<>
  
        <Container fluid className='admin-system-wrapper'>
            <Row className='' style={{height : '100vh'}}>
                <Col lg={2} className='h-100 admin-system-sidebar'>
                    <Sidebar />
                </Col>
                <Col lg={10}>
                    <Row className='admin-system-header p-0 px-3'>
                        <Header/>
                    </Row>

                    <Row className='admin-system-content p-3'>
                        <Col xs={12}>
                        {children} 
                        </Col>
                    </Row>

                </Col>
            </Row>
        </Container>
  
  
  </>)
}

export default Dashboard