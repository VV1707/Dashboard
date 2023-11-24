import React,{useState} from 'react'
import { Button, Grid, Paper,Box, TextField, Typography } from '@mui/material';
function Uploader({onDataFromChild}) {
  const [fileToUpload, setFileToUpload] = useState();

  const handleFileChange = (e) => {
      setFileToUpload(e.target.files[0]);    
    }; //file selected stored as fileToUpload on each change
    
  const handleSubmit =()=>{
    try{
      if(!fileToUpload){
        alert("Please upload a file");
        return; //if file not selected, alert pops up
      }
      const formData = new FormData();
      formData.append('file', fileToUpload);
      fetch('http://localhost:5000/upload_csv', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json', //header-respone type-json
        },})
      .then((response) => response.json())
        .then((data) => {
          console.log(data);
          onDataFromChild(data);
      })
      .catch((error) => {
        console.error('Error Status:', error);
      });
    }
    catch (error) {
        console.error('Error:', error);
    };
  }
    
  return (
    <div className='upload-form'>
      <Grid sx={{mt:'8%'}} container direction="column" alignItems="center" justify="center">
      <Typography variant='h6' color={'#ffffff'}
            sx={{backgroundColor:'#1976d2',textAlign:'center',pt:'10px',pb:'10px',pl:'8%',pr:'8%',
            fontWeight:'light',m:1}}>Upload csv file</Typography>
      <Paper variant="elevation" elevation={20}>
          <Box>
          <TextField type="file" sx={{ mt: '30px', mb: '10px', ml: '10%', mr: '10%' }} 
          onChange={handleFileChange} name="file" />
          </Box>
          <Box>
            <Button sx={{width:'30%',mt:'20px',mb:'30px',ml:'35%',mr:'5%'}} 
              justify="center" variant="contained" onClick={handleSubmit}>Upload</Button>
          </Box>
        </Paper>
      </Grid>
    </div>
  )
}

export default Uploader