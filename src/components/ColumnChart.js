import React from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import { Paper,Typography } from '@mui/material';
import '../index.css';
const ColumnChart = ({ title, data }) => {
  // Extract keys and values from the data object
  const keys = Object.keys(data);
  const values = Object.values(data);

  const StyledPaper = styled(Paper)`
    margin-left:30px;
    margin-right:0px;
    padding: 10px;
    margin-top:10px;
    margin-bottom:0px;
    padding-bottom:20px;
  `;
  const chartData = {
    labels: keys, //x axis labels
    datasets: [
      {
        label: 'Null Count', //graph key
        backgroundColor: '#1976d2',        
        hoverBackgroundColor: '#d90b23',
        borderColor:'black',
        hoverBorderColor:'black',
        barThickness: 30,
        data: values, //y axis values
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text:'Columns',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Null Values Count',
        },
        stepSize:1, //grid space
        beginAtZero: true,
        ticks: {
          stepSize: 1, //step - y values
          beginAtZero: true,
          callback: function (value) {
            return Math.round(value);
          },
          max: Math.ceil(Math.max(...values)), // Set max to the rounded-up maximum value
        },
      },
    },
  };
  
  return (
    <div className='chartContainer'>
      <StyledPaper elevation={3}>
        <div className='title'>
        <Typography variant="h6" color={'#ffffff'}
            sx={{pl:'15px',pr:'15px'}}>{title}
        </Typography>
        </div>
        <Bar data={chartData} options={chartOptions} />
      </StyledPaper>
      </div>
    
  );
};

export default ColumnChart;
