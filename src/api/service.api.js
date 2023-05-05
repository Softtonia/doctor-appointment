import axios from "axios";



 /* admin login credintial api */
 export const loginApi = async (collectData) =>{
    try{
        const response = await axios.post(`${import.meta.env.VITE_APIDOM}/api/login` , collectData );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const forgetpasswordApi = async (collectData) =>{
    try{
        const response = await axios.post(`${import.meta.env.VITE_APIDOM}/api/admin/forget-password` , collectData );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}



export const registerApi = async (collectData) =>{
    try{
        const response = await axios.post(`${import.meta.env.VITE_APIDOM}/api/register` , collectData );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const changepasswordApi = async (collectData,token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        const response = await axios.post(`${import.meta.env.VITE_APIDOM}/api/admin/change-password` , collectData , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const resetpasswordApi = async (collectData) =>{
    try{
  
        const response = await axios.post(`${import.meta.env.VITE_APIDOM}/api/admin/reset-password` , collectData );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}



export const adminprofileApi = async (token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        const response = await axios.get(`${import.meta.env.VITE_APIDOM}/api/admin-profile`,config);
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}


export const adminUpdateApi = async (id,token,collectData) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }

        let formData = new FormData();
      
        formData.append("first_name",collectData.first_name) ;
        formData.append("last_name",collectData.last_name );
        formData.append("email",collectData.email);
        formData.append("district",collectData.district);
        formData.append("state",collectData.state);
        formData.append("country",collectData.country);
        formData.append("pincode",collectData.pincode);
        formData.append("gst",collectData.gst);
        formData.append("tax",collectData.tax);


        const response = await axios.put(`${import.meta.env.VITE_APIDOM}/api/admin?id=${id}`,formData,config);
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}



/* doctor login api */

export const doctorLoginApi = async (collectData) =>{
    try{
        const response = await axios.post(`${import.meta.env.VITE_APIDOM}/api/doctor-login` , collectData);
        return response.data; 
    }
    catch(err){
        return err.response.data;
    }
}

export const doctorRegisterApi = async (collectData) =>{
    try{
        const response = await axios.post(`${import.meta.env.VITE_APIDOM}/api/` , collectData);
        return response.data;
    }
    catch(err){
        return err.response.data;
    }
}

 /* admin department credintial api */
 export const departmentApi = async (collectData) =>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_APIDOM}/api/department`);
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}


 /* admin treatment credintial api */
 export const treatmentApi = async (collectData) =>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_APIDOM}/api/treatment`);
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}


export const treatmentPostApi = async (collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        let formData = new FormData();
        formData.append('name' , collectData.name);
        formData.append('image' , collectData.image);
        formData.append('department_info' , collectData.department_info);


        const response = await axios.post(`${import.meta.env.VITE_APIDOM}/api/treatment` , formData , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const treatmentPutApi = async (collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        let formData = new FormData();
        formData.append('name' , collectData.name);
        formData.append('image' , collectData.image);
        formData.append('department_info' , collectData.department_info);


        const response = await axios.put(`${import.meta.env.VITE_APIDOM}/api/treatment?id=${collectData.id}` , formData , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const treatmentStatusApi = async (id,collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        const response = await axios.patch(`${import.meta.env.VITE_APIDOM}/api/treatment?id=${id}` , {status: collectData} , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const treatmentDeleteApi = async (collectData,token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        const response = await axios.delete(`${import.meta.env.VITE_APIDOM}/api/treatment?id=${collectData}` , config);
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}


 /* admin category credintial api */
export const categoryApi = async (collectData) =>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_APIDOM}/api/category`);
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const categoryPostApi = async (collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        let formData = new FormData();
        formData.append('name' , collectData.name);
        formData.append('image' , collectData.image);

        const response = await axios.post(`${import.meta.env.VITE_APIDOM}/api/category` , formData , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const categoryPutApi = async (collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        let formData = new FormData();
        formData.append('name' , collectData.name);
        formData.append('image' , collectData.image);

        const response = await axios.put(`${import.meta.env.VITE_APIDOM}/api/category?id=${collectData.id}` , formData , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const categoryStatusApi = async (id,collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        const response = await axios.patch(`${import.meta.env.VITE_APIDOM}/api/category?id=${id}` , {status: collectData} , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const categoryDeleteApi = async (collectData,token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        const response = await axios.delete(`${import.meta.env.VITE_APIDOM}/api/category?id=${collectData}` , config);
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

 /* admin category credintial api */
 export const departmentGetApi = async (collectData) =>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_APIDOM}/api/department`);
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const departmentPostApi = async (collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        let formData = new FormData();
        formData.append('name' , collectData.name);
        formData.append('image' , collectData.image);

        const response = await axios.post(`${import.meta.env.VITE_APIDOM}/api/department` , formData , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const departmentPutApi = async (collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        let formData = new FormData();
        formData.append('name' , collectData.name);
        formData.append('image' , collectData.image);

        const response = await axios.put(`${import.meta.env.VITE_APIDOM}/api/department?id=${collectData.id}` , formData , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const departmentStatusApi = async (id,collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        const response = await axios.patch(`${import.meta.env.VITE_APIDOM}/api/department?id=${id}` , {status: collectData} , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const departmentDeleteApi = async (collectData,token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        const response = await axios.delete(`${import.meta.env.VITE_APIDOM}/api/department?id=${collectData}` , config);
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}


 /* expertise credintial api */
 export const expertiseApi = async (collectData) =>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_APIDOM}/api/expertise`);
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const expertisePostApi = async (collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        let formData = new FormData();
        formData.append('name' , collectData.name);
        formData.append('image' , collectData.image);

        const response = await axios.post(`${import.meta.env.VITE_APIDOM}/api/expertise` , formData , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const expertisePutApi = async (collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        let formData = new FormData();
        formData.append('name' , collectData.name);
        formData.append('image' , collectData.image);

        const response = await axios.put(`${import.meta.env.VITE_APIDOM}/api/expertise?id=${collectData.id}` , formData , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const expertiseStatusApi = async (id,collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        const response = await axios.patch(`${import.meta.env.VITE_APIDOM}/api/expertise?id=${id}` , {status: collectData} , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const expertiseDeleteApi = async (collectData,token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        const response = await axios.delete(`${import.meta.env.VITE_APIDOM}/api/expertise?id=${collectData}` , config);
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

 /* disease credintial api */
export const diseaseApi = async (collectData) =>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_APIDOM}/api/disease`);
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const diseasePostApi = async (collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        let formData = new FormData();
        formData.append('name' , collectData.name);
        formData.append('image' , collectData.image);

        const response = await axios.post(`${import.meta.env.VITE_APIDOM}/api/disease` , formData , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const diseasePutApi = async (collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        let formData = new FormData();
        formData.append('name' , collectData.name);
        formData.append('image' , collectData.image);

        const response = await axios.put(`${import.meta.env.VITE_APIDOM}/api/disease?id=${collectData.id}` , formData , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const diseaseStatusApi = async (id,collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        const response = await axios.patch(`${import.meta.env.VITE_APIDOM}/api/disease?id=${id}` , {status: collectData} , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const diseaseDeleteApi = async (collectData,token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        const response = await axios.delete(`${import.meta.env.VITE_APIDOM}/api/disease?id=${collectData}` , config);
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}



 /* admin doctor credintial api */
export const doctorApi = async (collectData) =>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_APIDOM}/api/doctor`);
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const doctorPostApi = async (collectData, token) =>{
    try{
        const config = {
            headers : { 
                'auth-token' : token
            }
        }
        let formData = new FormData();
      
        formData.append("first_name",collectData.first_name) ;
        formData.append("last_name",collectData.last_name );
        formData.append("email",collectData.email);
        formData.append("password",collectData.password);
        formData.append("cpassword",collectData.cpassword);

        formData.append("phone",collectData.phone );
        formData.append("dob",collectData.dob );
        formData.append("gender",collectData.gender );
        formData.append("bio",collectData.bio );
        formData.append("education", JSON.stringify(collectData.education) );
        formData.append("alternative_number",collectData.alternative_number);
        formData.append("aadhar_number",collectData.aadhar_number);
        formData.append("pan_number",collectData.pan_number);
        formData.append("treatments_info",collectData.treatments_info);
        formData.append("category_info",collectData.category_info);
        formData.append("expertise_info",collectData.expertise_info);
        formData.append("timeslots",collectData.timeslots );
        formData.append("start_time",collectData.start_time );
        formData.append("end_time",collectData.end_time );
        formData.append("image",collectData.profile_image );
        formData.append("address",collectData.address );
        // formData.append("aadhar_image",collectData.aadhar_image );
        // formData.append("aadhar_back_image",collectData.aadhar_back_image );
        // formData.append("pan_image",collectData.pan_image );


        const response = await axios.post(`${import.meta.env.VITE_APIDOM}/api/doctor/register` , formData , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}


export const doctorPutApi = async (id,collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        let formData = new FormData();
      
        formData.append("first_name",collectData.first_name) ;
        formData.append("last_name",collectData.last_name );
        formData.append("email",collectData.email);
        formData.append("phone",collectData.phone );
        formData.append("dob",collectData.dob );
        formData.append("gender",collectData.gender );
        formData.append("bio",collectData.bio );
        formData.append("education", JSON.stringify(collectData.education) );
        formData.append("alternative_number",collectData.alternative_number);
        formData.append("aadhar_number",collectData.aadhar_number);
        formData.append("pan_number",collectData.pan_number);
        formData.append("treatments_info",collectData.treatments_info);
        formData.append("category_info",collectData.category_info);
        formData.append("expertise_info",collectData.expertise_info);
        formData.append("timeslots",collectData.timeslots );
        formData.append("start_time",collectData.start_time );
        formData.append("end_time",collectData.end_time );
        formData.append("image",collectData.profile_image );
        formData.append("address",collectData.address );
        // formData.append("aadhar_image",collectData.aadhar_image );
        // formData.append("aadhar_back_image",collectData.aadhar_back_image );
        // formData.append("pan_image",collectData.pan_image );


        const response = await axios.put(`${import.meta.env.VITE_APIDOM}/api/admin/doctor?id=${id}` , formData , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const doctorStatusApi = async (id,collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        const response = await axios.patch(`${import.meta.env.VITE_APIDOM}/api/admin/doctor-update?id=${id}` , {status: collectData} , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const doctorDeleteApi = async (collectData,token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        const response = await axios.delete(`${import.meta.env.VITE_APIDOM}/api/doctor?id=${collectData}` , config);
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}


 /* admin patient credintial api */
export const patientApi = async (collectData) =>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_APIDOM}/api/patient`);
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}
export const patientPostApi = async (collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        let formData = new FormData();
      
        formData.append("first_name",collectData.first_name) ;
        formData.append("last_name",collectData.last_name );
        formData.append("email",collectData.email);
        formData.append("phone",collectData.phone );
        formData.append("dob",collectData.dob );
        formData.append("gender",collectData.gender );
        formData.append("married_status",collectData.married_status );
        formData.append("h_o",collectData.h_o );
        formData.append("s_o",collectData.s_o );
        formData.append("d_o",collectData.d_o );
        formData.append("allergies",collectData.allergies );
        formData.append("medications",collectData.medications );
        formData.append("insurance_info",collectData.insurance_info );
        formData.append("health_history",collectData.health_history );
        formData.append("disease", JSON.stringify(collectData.disease) );
        formData.append("alternative_number",collectData.alternative_number);
        formData.append("department_info",collectData.department_info);
        formData.append("doctor_info",collectData.doctor_info);
        formData.append("image",collectData.profile_image );
        formData.append("address",collectData.address );
        formData.append("age",collectData.age );



        const response = await axios.post(`${import.meta.env.VITE_APIDOM}/api/patient/register` , formData , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const patientPutApi = async (id,collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        let formData = new FormData();
      
        formData.append("first_name",collectData.first_name) ;
        formData.append("last_name",collectData.last_name );
        formData.append("email",collectData.email);
        formData.append("phone",collectData.phone );
        formData.append("dob",collectData.dob );
        formData.append("gender",collectData.gender );
        formData.append("married_status",collectData.married_status );
        formData.append("h_o",collectData.h_o );
        formData.append("s_o",collectData.s_o );
        formData.append("d_o",collectData.d_o );
        formData.append("allergies",collectData.allergies );
        formData.append("medications",collectData.medications );
        formData.append("insurance_info",collectData.insurance_info );
        formData.append("health_history",collectData.health_history );
        formData.append("disease", JSON.stringify(collectData.disease) );
        formData.append("alternative_number",collectData.alternative_number);
        formData.append("department_info",collectData.department_info);
        formData.append("doctor_info",collectData.doctor_info);
        formData.append("image",collectData.profile_image );
        formData.append("address",collectData.address );
        formData.append("age",collectData.age );


        const response = await axios.put(`${import.meta.env.VITE_APIDOM}/api/patient?id=${id}` , formData , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const patientDeleteApi = async (collectData,token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        const response = await axios.delete(`${import.meta.env.VITE_APIDOM}/api/patient?id=${collectData}` , config);
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const patientStatusApi = async (id,collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        const response = await axios.patch(`${import.meta.env.VITE_APIDOM}/api/patient?id=${id}` , {status: collectData} , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}


 /* admin appointment credintial api */
 export const appointmentApi = async (collectData) =>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_APIDOM}/api/appointment`);
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}
export const appointmentPostApi = async (collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        const response = await axios.post(`${import.meta.env.VITE_APIDOM}/api/appointment` , collectData , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}
export const appointmentnewPostApi = async (collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        const response = await axios.post(`${import.meta.env.VITE_APIDOM}/api/new-appointment` , collectData , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}


export const appointmentPutApi = async (id,collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }

        const response = await axios.put(`${import.meta.env.VITE_APIDOM}/api/appointment?id=${id}` , collectData , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const appointmentDeleteApi = async (collectData,token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        const response = await axios.delete(`${import.meta.env.VITE_APIDOM}/api/appointment?id=${collectData}` , config);
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const appointmentStatusApi = async (id,collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        const response = await axios.patch(`${import.meta.env.VITE_APIDOM}/api/appointment?id=${id}` , {appointment_status: collectData} , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}


 /* admin appointment-type credintial api */
 export const appointmentTypeApi = async (collectData) =>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_APIDOM}/api/appointment-type`);
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}


 /* admin notification credintial api */
 export const notificationApi = async (type) =>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_APIDOM}/api/email?type=${type}`);
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const notificationUpdateApi = async (data,type,token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        const response = await axios.post(`${import.meta.env.VITE_APIDOM}/api/email?type=${type}` , data,config);
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}



 /* timeslots api */
export const timeslotsApi = async (collectData) =>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_APIDOM}/api/timeslots`);
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}
export const timeslotsPostApi = async (collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }

        const response = await axios.post(`${import.meta.env.VITE_APIDOM}/api/timeslots` , collectData , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const timeslotsPutApi = async (collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        
        const response = await axios.put(`${import.meta.env.VITE_APIDOM}/api/timeslots?id=${collectData.id}` , collectData , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const timeslotsDeleteApi = async (collectData,token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        const response = await axios.delete(`${import.meta.env.VITE_APIDOM}/api/timeslots?id=${collectData}` , config);
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const timeslotsStatusApi = async (id,collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        const response = await axios.patch(`${import.meta.env.VITE_APIDOM}/api/timeslots?id=${id}` , {status: collectData} , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

 /* assigntimeslots api */
export const assigntimeslotsApi = async (collectData) =>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_APIDOM}/api/assigntimeslots?id=${collectData.id}&date=${collectData.date}`);
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}
export const availabletimeslotsApi = async (collectData) =>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_APIDOM}/api/availableslots?id=${collectData.id}&date=${collectData.date}`);
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const assigntimeslotsPostApi = async (collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }

        const response = await axios.post(`${import.meta.env.VITE_APIDOM}/api/assigntimeslots` , collectData , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}
export const assigntimeslotsDeleteApi = async (collectData,token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        const response = await axios.delete(`${import.meta.env.VITE_APIDOM}/api/assigntimeslots?id=${collectData}` , config);
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}
export const assigntimeslotsStatusApi = async (id,collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        const response = await axios.patch(`${import.meta.env.VITE_APIDOM}/api/assigntimeslots?id=${id}` , {status: collectData} , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

 /* branch api */
export const branchApi = async (collectData) =>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_APIDOM}/api/branch`);
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const branchPostApi = async (collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        const response = await axios.post(`${import.meta.env.VITE_APIDOM}/api/branch` , collectData , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const branchPutApi = async (collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }

        const response = await axios.put(`${import.meta.env.VITE_APIDOM}/api/branch?id=${collectData.id}` , collectData , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const branchStatusApi = async (id,collectData, token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        const response = await axios.patch(`${import.meta.env.VITE_APIDOM}/api/branch?id=${id}` , {status: collectData} , config );
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}

export const branchDeleteApi = async (collectData,token) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        const response = await axios.delete(`${import.meta.env.VITE_APIDOM}/api/branch?id=${collectData}` , config);
        return response.data;
    }
    catch(err){
        return  err.response.data;
    }
}