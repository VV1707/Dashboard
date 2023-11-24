import React, { useState } from 'react'
import { Paper,Typography,Grid,Box,Button } from '@mui/material'
import '../index.css';
import App from '../App';
function SuccessPage() {
  const [reuploadStatus,setReuploadStatus]=useState(false); //default reupload kept false
  const handleUploadAgain=()=>{
    setReuploadStatus(true); //if user clicks upload again then entire process repeats
  }
  return (
    <div>
      {reuploadStatus?(<App reupload={false}/>): //reuploaded sent as prop
        (<Grid sx={{mt:'2%',p:'10%'}} container direction="column" 
        alignItems="center" justify="center">
        <Paper variant="elevation" elevation={20}>
        <div className='title'>
            <Typography variant='h6' color='#ffffff' >Success </Typography>
        </div>
            <Box>
            <Typography variant='h6' sx={{textAlign:'center',pt:'10px',pb:'10px',
                pl:'20px',pr:'20px',fontWeight:'light',m:1}}>Your file has been validated successfully!
            </Typography>
            </Box>
            <Box>
            <Button sx={{mt:'20px',mb:'30px',ml:'30%',mr:'15%'}} size='large'
              justify="center" variant="contained" onClick={handleUploadAgain}>Upload Again</Button>
          </Box>
        </Paper>
        </Grid>)}
    </div>
  )
}

export default SuccessPage