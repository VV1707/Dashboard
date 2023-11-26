import React, { useState } from 'react'
import { Button } from '@mui/material';
import App from '../App';
function ReuploadButton({flag}) {

    const [reuploadState,setReuploadState]=useState(false);
    const handleClick=()=>{
        setReuploadState(true);
    };
  return (
    <div>
        {reuploadState ? <App reupload={false}/> :
        <> {flag && <Button sx={{color:'#000000', ml:'90%'}} onClick={handleClick}>Reupload</Button>}</>
        }
        </div>
  )
}

export default ReuploadButton;