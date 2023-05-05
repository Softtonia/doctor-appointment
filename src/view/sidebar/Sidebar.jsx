import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import BackupTableOutlinedIcon from '@mui/icons-material/BackupTableOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import AppsOutageOutlinedIcon from '@mui/icons-material/AppsOutageOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { GlobalData } from '../../App';
import AlarmAddIcon from '@mui/icons-material/AlarmAdd';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import EditNotificationsIcon from '@mui/icons-material/EditNotifications';
const Sidebar = (props) => {

    let globaldata = useContext(GlobalData);

    useEffect(()=>{
        globaldata.confirm();

    }, [])
    
    const menu_list = [
        {
            id : 0,
            title : 'Dashboard',
            icon : <WidgetsOutlinedIcon /> ,
            path : '/'
        },
        {
            id : 1,
            title : 'Department',
            icon : <BackupTableOutlinedIcon />,
            path : '/department'
        },
        {
            id : 2,
            title : 'Treatment',
            icon : <VaccinesOutlinedIcon/> ,
            path : '/treatment'
        },
        {
            id : 3,
            title : 'Time Slots',
            icon : <AlarmAddIcon/> ,
            path : '/timeslots'
        },
        {
            id : 4,
            title : 'Branch',
            icon : <AccountTreeIcon/> ,
            path : '/branch'
        },
        // {
        //     id : 3,
        //     title : 'Expertise',
        //     icon :  <AppsOutageOutlinedIcon /> ,
        //     path : '/expertise'
        // },
        // {
        //     id : 4,
        //     title : 'Disease',
        //     icon :  <CoronavirusIcon /> ,
        //     path : '/disease'
        // },
        {
            id : 5,
            title : 'Doctor',
            icon :  <PersonAddAltOutlinedIcon /> ,
            path : '/doctor'
        },
        {
            id : 6,
            title : 'Patient',
            icon :  <PersonAddAltOutlinedIcon /> ,
            path : '/patient'
        },
        {
            id : 8,
            title : 'Appointment',
            icon :  <PersonAddAltOutlinedIcon /> ,
            path : '/appointment'
        },
        {
            id : 9,
            title : 'Notification',
            icon :  <EditNotificationsIcon /> ,
            path : '/notification'
        }
    ]


  return (
    <> 
        <div className="admin-system-sidebar-content scrollbar-custom">
            <div className="logo-box">
                <p className='text-center fs-20-600'>LOGO</p>
            </div>
            
            <div className="profile-box d-flex flex-column align-items-center">
                <img src={globaldata.profile.profile_image} alt="" />
                <ul className="list-unstyled">
                    <li className='text-center fs-20-600' >{globaldata.profile.first_name}</li>
                    <li className='text-center fs-14-400' >{globaldata.profile.email}</li>
                </ul>
            </div>

            <ul className="list-unstyled dashboard-menu-box pe-1">
                {
                    menu_list?.map((val)=>{
                        return(<>
                            <li onClick={props.closeFn} key={val.id} className='dashboard-menu-list mb-1'> <NavLink  active className='dashboard-menu-link font-2' to={val.path}> <span className="icon-tag">{val.icon}</span> <span className="title-tag">{val.title}</span></NavLink> </li>
                        </>)
                    })
                }
            </ul>


            <NavLink onClick={props.closeFn} to='/my-profile' className="my-profile cursor-pointer">
            <span className='icon-tag'><ManageAccountsIcon /></span> <span className='title-tag'>Profile</span>
            </NavLink>

        </div>
    </>
  )
}

export default Sidebar