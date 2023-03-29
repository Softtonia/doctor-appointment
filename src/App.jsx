import React, { useEffect } from 'react';
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
import { CookiesProvider } from 'react-cookie';
import Patient from './view/patient/Patient';



export const notify = (message) => toast(message);


const App = () => {

  const location  = useLocation();
  useEffect(() => {
    console.log(location.pathname)
  }, [location])

  return (

    
    <>

{
  location.pathname.includes('/login') || location.pathname.includes('/forget-password') || location.pathname.includes('/change-password') ?  


  <Routes>
  <Route path='/login' element={<Login />} />
  <Route path='/forget-password' element={<ForgetPassword />} />
  <Route path='/change-password' element={<ChangePassword />} />
</Routes> :


<CookiesProvider>
<Dashboard>
<Routes>
  <Route path='/department' element={<Department />} />
  <Route path='/treatment' element={<Treatment />} />
  <Route path='/expertise' element={<Expertise />} />
  <Route path='/doctor' element={<Doctor />} />
  <Route path='/' element={<Preview />} />
  <Route path='/demo' element={<Demo />} />
  <Route path='/my-profile' element={<MyAccount />} />

  <Route path='/patient' element={<Patient />} />





</Routes>
</Dashboard>
</CookiesProvider>


}







<ToastContainer />


    </>
  )
}

export default App