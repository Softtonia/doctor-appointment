import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';



const CustomTable = (props) => {

  


  return (
    <>
    <div style={{ height: 400, width: '100%' }}>
<DataGrid
        rows={props.rows}
        columns={props.columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
   
        autoWidth
        style={{background : 'white' , width:'100%' , height : '400px'}}
      />
    
    </div>
    </>
  )
}

export default CustomTable