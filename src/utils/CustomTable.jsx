import { DataGrid, GridToolbar,GridToolbarContainer,
  GridToolbarExport, } from '@mui/x-data-grid';
import React, { useEffect, useRef, useState } from 'react';
import Scrollbar from 'react-scrollbar';

import { Box } from '@mui/material';



const CustomTable = (props) => {




  // const [filterData, setfilterData] = useState([]);

  // useEffect(()=>{

  //   if(props.rows){
  //     setfilterData(props.rows)
  //   }
  // },[props])

  // useEffect(()=>{
  //         const result = props.rows.filter((eq) => {
         
  //           return eq.name.toLowerCase().match(props.searchdata.toLowerCase());
  //         });
  //         setfilterData(result);
  // }, [props.searchdata])



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




    {/* <Box style={{ height: '70vh', width: '100%', background:'white' , borderRadius : '6px' }}> */}

    <DataGrid
        rows={props.rows}
        // rows={formattedRows}

        columns={props.columns}
        getRowId={props.getRowId}
        pageSize={15}
        rowsPerPageOptions={[15]}
        disableColumnMenu
        
        sx={{
          height : '70vh',
          background : 'white',
          overflow : 'scroll',
          fontSize : '16px',
    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
      width: '0.4em',
    },
    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track': {
      background: '#f1f1f1',
    },
    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
      backgroundColor: '#888',
    },
    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
  }}
        disableSelectionOnClick
        pagination
    
      />
      
{/* <DataGrid
      getRowId={props.getRowId}
      slots={{
          toolbar: CustomToolbar,
        }}
        rows={props.rows}
        columns={props.columns}
        pagination={false}

        autoHeight={false}
        autoWidth={true}
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
  sx={{
          height: "100%",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}

      /> */}


    {/* </Box> */}
    </>
  )
}

export default CustomTable