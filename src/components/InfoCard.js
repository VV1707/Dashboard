import React from 'react';
import styled from 'styled-components';
import { Typography,Paper } from '@mui/material';
import '../index.css';
function InfoCard({title,data}) {
    const StyledPaper = styled(Paper)`
    margin-left:25px;
    padding:10px;
    padding-bottom:30px;
    margin-top:40px;
    margin-bottom:0px;
    margin-right:0px;
    `;
  return (
    <div>
    <StyledPaper elevation={3}>
      <div className='title'>
        <Typography variant="h6" color={'#ffffff'}
            sx={{pl:'15px',pr:'15px'}}>
            {title}
        </Typography>
        </div>
        <Typography sx={{textAlign:'center',fontSize:'20px'}}>
          {data}</Typography>
    </StyledPaper>
    </div>
  )
}

export default InfoCard