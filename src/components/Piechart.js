import React from 'react';
import {Typography,Paper} from '@mui/material'
import styled from 'styled-components';
import { Doughnut } from 'react-chartjs-2';
import '../index.css';

const PieChart = ({title,prop1,prop2,labels}) => {
  const StyledPaper = styled(Paper)`
    margin-left:30px;
    margin-right:8px;
    padding: 10px;
    margin-top:20px;
    margin-bottom:15px;
    padding-bottom:20px;
    padding-right:15px;
    padding-left:15px;
  `;
  const chartData = {
    labels: labels, //label of parts
    datasets: [
      {
        data: [prop1,prop2],
        backgroundColor: ['#1976d2', '#d90b23'],
        hoverBackgroundColor: ['#488ee1', '#FF6384'],
      },
    ],
  };
  return (
    <StyledPaper elevation={3}>
      <div className='title'>
      <Typography variant="h6" color={'#ffffff'}
            sx={{pl:'20px',pr:'20px'}}>
            {title}
        </Typography>
      </div>
      <Doughnut data={chartData}/>
    </StyledPaper>
  );
};

export default PieChart;