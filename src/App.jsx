import React, { createContext, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Demo from './component/Demo';
import './app.css'
import Login from './view/logreg/Login';

import './view/css/home.css'
import './view/css/main.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import ForgetPassword from './view/logreg/ForgetPassword';
import ChangePassword from './view/logreg/ChangePassword';
import Dashboard from './view/dashboard/Dashboard';
import Department from './view/department/Department';
import Treatment from './view/treatment/Treatment';
import Expertise from './view/expertise/Expertise';
import Doctor from './view/doctor/Doctor';
import Preview from './view/dashboardpreview/Preview';
import MyAccount from './view/myaccount/MyAccount';



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CookiesProvider, useCookies } from 'react-cookie';
import Patient from './view/patient/Patient';
import { adminprofileApi } from './api/service.api';
import Deases from './view/deases/Deases';
import ManageMyPassword from './view/myaccount/ChangePassword';
import Appointment from './view/appointment/Appointment';
import Notification from './view/notification/Notification';
import TimeSlot from './view/timeslot/TimeSlot';
import Branch from './view/branch/Branch';




export const notify = (message) => toast(message);


export const GlobalData = createContext();



const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token','user_id']);


  const location  = useLocation();
  useEffect(() => {
    console.log(location.pathname)
  }, [location])


      /* get api */
      const [profileData , setprofileData] = useState([]);
  
      const getApi = async () =>{
    
        let res = await adminprofileApi(cookies.token);
        if(res.status===true){
        setprofileData(res.data)
        console.log(res , 'resresresres')
        }
    
      }
    
      useEffect(()=>{
        getApi();
      }, []);

  return (    
    <>

{
  location.pathname.includes('/login') || location.pathname.includes('/forget-password') || location.pathname.includes('/change-password') ?  


  <Routes>
  <Route path='/login' element={<Login />} />
  <Route path='/forget-password' element={<ForgetPassword />} />
  <Route path='/change-password/:token' element={<ChangePassword />} />
</Routes> :

<GlobalData.Provider value={{profile:profileData,confirm:getApi }}>
<CookiesProvider>
<Dashboard >
<Routes>
  <Route path='/department' element={<Department />} />
  <Route path='/treatment' element={<Treatment />} />
  <Route path='/expertise' element={<Expertise />} />
  <Route path='/disease' element={<Deases />} />
  <Route path='/doctor' element={<Doctor />} />
  <Route path='/' element={<Preview />} />
  <Route path='/demo' element={<Demo />} />
  <Route path='/my-profile' element={<MyAccount />} />
  <Route path='/profile/changepassword' element={<ManageMyPassword />} />
  <Route path='/patient' element={<Patient />} />

  <Route path='/appointment' element={<Appointment />} />
  <Route path='/timeslots' element={<TimeSlot />} />

  <Route path='/notification' element={<Notification />} />
  <Route path='/branch' element={<Branch />} />


</Routes>
</Dashboard>
</CookiesProvider>
</GlobalData.Provider>

}







<ToastContainer />


    </>
  )
}

export default App