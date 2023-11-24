import React,{useState} from 'react'
import { Alert } from '@mui/material'
function Alerts({message}){ //{}-deconstruct props

  const [open,setOpen]=useState(true); //open-alert visibility flag
  const handleClose=()=>{
    setOpen(false); //alert closes when user clicks close on alert
  };
  setTimeout(handleClose,5000); //automatic closure of alert

  return (
    <div>
      {open && 
        <Alert style={{width:'20%', position: 'fixed', bottom: 16, right: 16 }} 
        severity="success" onClose={handleClose}>{message}</Alert>}
    </div>
  )
}
export default Alerts