import { DataGrid, GridToolbar,GridToolbarContainer,
  GridToolbarExport, } from '@mui/x-data-grid';
import React, { useState } from 'react';
import Scrollbar from 'react-scrollbar';

import { Box } from '@mui/material';



const CustomTable = (props) => {






  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }


  return (
    <>

    {/* <div style={{ height: '70vh', width: '100%' }}> */}

{/* <DataGrid
        rows={props.rows}
        columns={props.columns}
        // pageSize={5}
        // rowsPerPageOptions={[5, 10, 50]}
        style={{background : 'white', height: "70vh", overflowX : 'scroll' , WebkitOverflowScrolling : 'auto' , scrollbarColor:'red'}}
        scrollbarSize={5}
        
      /> */}




    {/* </div> */}




    <Box sx={{ height: '70vh', width: '100%', overflowX:'scroll', background:'white' , borderRadius : '6px' }}>
      <DataGrid
      // slots={{ toolbar: GridToolbar }}

      getRowId={props.getRowId}


      slots={{
          toolbar: CustomToolbar,
        }}


        rows={props.rows}
        columns={props.columns}
        pagination={false}
        autoHeight={false}
        hideFooterRowCount={false}
        disableVirtualization={true}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
        },
        }}
        style={{fontSize : '16px'  }}
        pageSizeOptions={[10,15,20]}


        disableColumnSelector
  disableSelectionOnClick


      />
    </Box>
    </>
  )
}

export default CustomTable