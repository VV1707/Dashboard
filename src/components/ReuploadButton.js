import React from 'react'
import { Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
function ReuploadButton() {
    // const navigate = useNavigate();
    const handleClick=()=>{
      // navigate('/');
    };
  return (
    <div>
      <Button sx={{color:'#ffffff'}} onClick={handleClick}>Reupload</Button>
    </div>
  )
}

export default ReuploadButton;