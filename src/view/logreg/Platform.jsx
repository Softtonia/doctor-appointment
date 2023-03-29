import React from 'react'
import { Card, Col, Container, Form, Row } from 'react-bootstrap'

const Platform = (props) => {
  return (
    <>

    <Container fluid className='log-platform '>
        <Row className='block2 '>
            <Col lg={6} className='d-lg-block d-none p-0  log-img-col'>
            </Col>

            <Col lg={6} xs={12} className='my-auto'>
                <Card className ='border-0 bg-transparent'>
                {props.form}
                </Card>
            </Col>

        </Row>
    </Container>
    </>
  )
}

export default Platform