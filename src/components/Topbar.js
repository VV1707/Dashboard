import React from 'react';
import {AppBar,Box,Toolbar,Typography,IconButton} from '@mui/material';
import PieChartOutlinedIcon from '@mui/icons-material/PieChartOutlined';
import ReuploadButton from './ReuploadButton';
function Topbar() {
  return (
    <Box sx={{ flexGrow:1}}>
      <AppBar position="static">
        <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
          <PieChartOutlinedIcon/>
        </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            datamon!tor
          </Typography>
          <ReuploadButton/>
        </Toolbar>
      </AppBar>
   </Box>
  );
}
export default Topbar