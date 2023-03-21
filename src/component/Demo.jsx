import React from 'react'
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
export const CustomButton = styled(Button)({
    color: 'darkslategray',
    backgroundColor: '#4F46E5',
    color : 'white',
    fontWeight: "500",
    fontSize: "14px",
    // padding: 8,
    padding : '8px 20px;',
    borderRadius:'6px',
    '&:hover': {
        background: "#4F46E5",
        color : 'white'
     },
  });
  export const CustomButtonTP = styled(Button)({
    backgroundColor: 'trasparent',
    color : '#4F46E5',
    height : '40px',
    width : '40px',
    // padding: 8,
    borderRadius:'4px',
    '&:hover': {
        background: "#4F46E5",
        color : 'white'
     },
  });


  export const CustomInputText = styled(TextField)({

    fontWeight: "500",
    height : '44px',
    fontSize: "14px",
    // padding: 8,
    borderRadius:4,
     '& ::placeholder': {
        color : 'rgb(255,163,113)'
     }
    
  });


  export const CustomCheckbox = styled(Checkbox)({
   
    // fontWeight: "500",
    // height : '44px',
    // fontSize: "14px",
    // padding: 8,

    '&$checked': {
        color: '#ffa371',
      },
  });


const Demo = () => {


    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
   <>

        <div className="button-group">
        <p>Button Group</p>
        <CustomButton  variant="contained" size="small">Small</CustomButton>
        <CustomButton  variant="contained" size="medium">Medium</CustomButton>
        <CustomButton  variant="contained" size="large">Large</CustomButton>
        </div>
        <div className="button-group">
        <p>Button Group</p>

        <CustomInputText id="outlined-basic" size='small' label="Outlined" variant="outlined"  />
        <TextField id="outlined-basic" size='small' label="Outlined" variant="outlined" />
        </div> 
    
        <FormControlLabel control={<CustomCheckbox style ={{
                      color: "#00e676",
                      borderRadius : '50px',
                    }} iconStyle={{color: 'red'}} defaultChecked />} label="Label" />
   </>
  )
}

export default Demo