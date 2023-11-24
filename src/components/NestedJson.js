import React, {useState} from 'react'
import styled from 'styled-components';
import '../index.css';

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"; 
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Paper,Typography,IconButton,CardContent,Collapse} from '@mui/material'; 
function NestedJson({title,data}) {
  const [open, setOpen]=useState(false);

const StyledPaper = styled(Paper)`
  margin-left:30px;
  margin-right:30px;
  margin-top:20px;
  padding-bottom: 30px;
  padding-top:10px;
  margin-bottom: 10px;
  padding-left: 30px;
  padding-right: 30px;
`;
if (!data) {
    return <div>No data to display</div>;
  }
  return (
        <StyledPaper elevation={3}>
        <div className='title'>
        <Typography variant="h6" color={'#ffffff'}> {title} </Typography>
        </div>
          <IconButton onClick={() => setOpen(!open)} aria-label="expand"
            size="small"> 
            {open ?<KeyboardArrowUpIcon sx={{alignSelf:'center'}}/>:<KeyboardArrowDownIcon/>}
          </IconButton>
          <Collapse in={open} timeout="auto" unmountOnExit> 
          <CardContent>     
        {data.map((item, index) => (
        <div key={index}>
          <h4>Null Row {index + 1}</h4>
          <table>
            <tbody>
              {Object.entries(item).map(([key, value], i) => (
                <tr key={i}>
                  <tr>{key} : {JSON.stringify(value)}</tr>
                  {/* <td></td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}</CardContent>
      </Collapse>
     </StyledPaper>
    
  )
}

export default NestedJson