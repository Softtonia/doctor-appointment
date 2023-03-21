import React from 'react'
import { NavLink } from 'react-router-dom';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import BackupTableOutlinedIcon from '@mui/icons-material/BackupTableOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import AppsOutageOutlinedIcon from '@mui/icons-material/AppsOutageOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const Sidebar = () => {
    
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
            title : 'Expertise',
            icon :  <AppsOutageOutlinedIcon /> ,
            path : '/expertise'
        },
        {
            id : 4,
            title : 'Doctor',
            icon :  <PersonAddAltOutlinedIcon /> ,
            path : '/doctor'
        }
    ]


  return (
    <> 
        <div className="admin-system-sidebar-content">
            <div className="logo-box">
                <p className='text-center fs-20-600'>LOGO</p>
            </div>
            
            <div className="profile-box d-flex flex-column align-items-center">
                <img src="/images/user.png" alt="" />
                <ul className="list-unstyled">
                    <li className='text-center fs-20-600' >Robert Fox</li>
                    <li className='text-center fs-14-400' >robertfox@company.com</li>
                </ul>
            </div>

            <ul className="list-unstyled dashboard-menu-box">
                {
                    menu_list?.map((val)=>{
                        return(<>
                            <li key={val.id} className='dashboard-menu-list mb-1'> <NavLink active className='dashboard-menu-link' to={val.path}> <span className="icon-tag">{val.icon}</span> <span className="title-tag">{val.title}</span></NavLink> </li>
                        </>)
                    })
                }
            </ul>


            <NavLink to='/my-profile' className="my-profile cursor-pointer">
            <span className='icon-tag'><ManageAccountsIcon /></span> <span className='title-tag'>Profile</span>
            </NavLink>

        </div>
    </>
  )
}

export default Sidebar