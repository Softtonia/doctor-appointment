import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import WorkIcon from '@mui/icons-material/Work';
import MedicationIcon from '@mui/icons-material/Medication';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { CustomSelectBox } from '../../component/Demo';
import { MenuItem } from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line } from 'recharts';

const data = [
  {
    name: 'Mon',
    pv: 2400,
  },
  {
    name: 'Tue',
    pv: 1398,
  },
  {
    name: 'Wed',
    pv: 9800,
  },
  {
    name: 'Thu',
    pv: 3908,
  },
  {
    name: 'Fri',
    pv: 4800,
  },
  {
    name: 'Sat',
    pv: 3800,
  },
  {
    name: 'Sun',
    pv: 4300,
  },
];


const announcementData = [
  {id : 0,
  title : "Outing schedule for evry dept",
  paragraph : " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  date:"Today, 07:36am"
  },
  {id : 1,
    title : "Outing schedule for evry dept",
    paragraph : " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    date:"Yestarday, 12:00pm"
    },
  {id : 2,
    title : "Outing schedule for evry dept",
    paragraph : " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    date:"Thusday, 10:12pm"
  }
]


const Preview = () => {
  return (<>
    <Row>
      <OverviewCard count='21' icon={<Diversity3Icon/>} title='Workers'  />
      <OverviewCard count='10' icon={<SensorOccupiedIcon/>} title='Patients'  />
      <OverviewCard count='25' icon={<PersonPinIcon/>} title='Doctors'  />
      <OverviewCard count='12' icon={<WorkIcon/>} title='OT'  />
      <OverviewCard count='7' icon={<MedicationIcon/>} title='Emergency'  />

    </Row>


    <Row className='my-4'>
      <Col md={6}>
        <Card className=''>
          <Card.Header className='d-flex justify-content-between align-items-center bg-white'>
            <p className='fs-18-600 my-auto'>Announcement</p>
            <CustomSelectBox size='small' defaultValue='1' style={{minWidth : '150px' , color : '#A1A1AA'}}>
              <MenuItem value='1'>2023/02/01</MenuItem>
              <MenuItem value='2'>2023/02/01</MenuItem>
              <MenuItem value='3'>2023/02/01</MenuItem>
            </CustomSelectBox>
          </Card.Header>

          <Card.Body>


          {
            announcementData?.map((val)=>{
              return(<>
                <Accordion className='shadow-none' key={val.id}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
          <span className='d-flex flex-column'>
          <span className=''>{val.title}</span>
          <span className='fs-12-400'>{val.date}</span>
          </span>
        </AccordionSummary>
        <AccordionDetails>
          <p>{val.paragraph}</p>
        </AccordionDetails>
      </Accordion>
              </>)
            })
          }
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Row className='my-4'>
      <Col md={6}>
        <Card className=''>
          <Card.Header className='d-flex justify-content-between align-items-center bg-white'>
            <p className='fs-18-600 my-auto'>Attendance Summary</p>
          </Card.Header>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
          <Card.Body className='overflowX'  >

          <BarChart width={500} height={300} data={data}  >
      <Bar dataKey="pv" fill="#4F46E5" barSize={30} />
      <XAxis dataKey="name" />
      <YAxis />
    </BarChart>

          </Card.Body>
        </Card>
      </Col>
    </Row>
    
    
    
    </>)
}

export default Preview;


const OverviewCard = ({count,icon,title}) =>{
  return(<>
          <Col xl={2} lg={3} sm={4} xs={6} className='my-2'>
        <Card className='p-3 d-flex justify-content-center align-items-center flex-column'>
          <p className='fs-40-400 my-0' >{count}</p>
          <span className='d-flex aling-items-center text-secondary'> {icon} <span className='my-auto ms-2'>{title}</span> </span>
        </Card>
      </Col>
  </>)
}