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


export const adminUpdateApi = async (token,collectData) =>{
    try{
        const config = {
            headers : {
                'auth-token' : token
            }
        }
        const response = await axios.get(`${import.meta.env.VITE_APIDOM}/api/admin`,config);
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


 /* admin expertise credintial api */
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