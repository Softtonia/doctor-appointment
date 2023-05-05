import React from 'react'
import Swal from 'sweetalert2'


export const SweetAlert = (callbackFn) =>{
  console.log(callbackFn , 'alert props');

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            timer : 3000,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              callbackFn();
            }
          })

}


export const SweetAlertSingle = ({title,text,icon,showCancelButton}) =>{
        Swal.fire({
            title,
            text,
            icon,
            timer : 3000,
            showCancelButton
          })

}


