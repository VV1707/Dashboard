import React from 'react';
import styled from 'styled-components';
import { Typography,Paper } from '@mui/material';
import '../index.css';

const StyledPaper = styled(Paper)`
  margin-left:30px;
  margin-right:5px;
  padding: 10px;
  padding-bottom:5px;
  padding-right:15px;
  margin-top:20px;
  margin-bottom:20px;
`;
function renderObject(data) { //i/p object-data o/p renders key value paired list items
  return (
    <ul>
      {Object.entries(data).map(([key, value]) => (
        <React.Fragment key={key}> 
        {/* each list is wrapped in separate fragment */}
          {Array.isArray(value) && value.length === 0 ? null : ( //if array not empty
            <li>
              {key}: {JSON.stringify(value)} 
              {/* list has key and the string converted value  */}
            </li>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
}

function JsonArray({ title, data }) {
  return (
      <StyledPaper elevation={3}>
        <div className='title'>
        <Typography variant="h6" color={'#ffffff'}>
            {title}
        </Typography>
        </div>
        {data !== null && typeof data === 'object' ? ( //if input data is a non null obj
            renderObject(data)) : 
            (<ul> 
                {data === null ? ( //if single list item, either print it or print null
                  <li>Null</li>
                ) : (
                  <li>{data}</li>
                )}
              </ul>)}
      </StyledPaper>
  );
}

export default JsonArray;
