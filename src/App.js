import React, { useState } from 'react'
import Uploader from './components/Uploader';
import Topbar from './components/Topbar'
import Alerts from './components/Alerts'
import PieChart from './components/Piechart';
import JsonArray from './components/JsonArray';
import SuccessPage from './components/SuccessPage';
import ColumnChart from './components/ColumnChart';
import NestedJson from './components/NestedJson';
import InfoCard from './components/InfoCard';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// import { ThemeProvider } from '@mui/material/styles';
// import Theme from './components/components/Theme';
function App({reupload=true}) 
{
  const [dataFromUploader,setDataFromUploader]=useState(null);
    const handleDataFromUploader=(data)=>{
        setDataFromUploader(data);
    };
    const cardStyle = {
        flex: '1 0 calc(50% - 16px)',
        marginBottom: '16px',
        minWidth: '300px',
        maxWidth: '500px',
        marginRight: '16px',
    };
    const sideBySideContainerStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    };
    const topBottomContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    };
    const renderUploaderOrData = () => {
        if (dataFromUploader) 
        {   
            return (
                <div>
                  {dataFromUploader.status ? (
                    <> 
                    {reupload && <Topbar flag={false} />}
                    <SuccessPage/> 
                    </>) : (
                    <>
                    {reupload && <Topbar flag={true} />}
                    {renderData()}
                    </>
                    )}
                </div>
              );
        } 
        else {
            return (
              <div>
                {reupload && <Topbar flag={false}/>}
                <Uploader onDataFromChild={handleDataFromUploader} />
              </div>
            );
          }
    };
    const renderData = () => (
        <div>
        <Alerts message="File uploaded successfully" />
        <div className='appdiv'>
            {/* Row 1 */}
            <JsonArray title={'Columns'} data={dataFromUploader?.columns} style={cardStyle} />
            <JsonArray title={'Column Information'} data={dataFromUploader?.description} style={cardStyle} />
            <JsonArray title={'First Row'} data={dataFromUploader?.first_row} style={cardStyle} />
            {/* Row 2 */}
            <PieChart
            title={'Mandate P/Ab Column Count'}
            prop1={dataFromUploader?.mandatePresent_no}
            prop2={dataFromUploader?.mandateAbsent_no}
            labels={['MandatePresent', 'MandateAbsent']}
            />
            <PieChart
            title={'Mismatched and Matched Count'}
            prop1={dataFromUploader?.mismatched_no}
            prop2={dataFromUploader?.mandatePresent_no}
            labels={['MismatchedCount', 'MatchedCount']}
            />
            <JsonArray title={'Last Row'} data={dataFromUploader?.last_row} style={cardStyle} />
            {/* Row 3 */}
            <JsonArray title={'Mandate Cols'} data={dataFromUploader?.mandate_columns} />
            <InfoCard title={'Number of Rows'} data={dataFromUploader?.rows} />
            <InfoCard title={'Number of Cols'} data={dataFromUploader?.cols} />
            <InfoCard title={'Empty Count'} data={dataFromUploader?.empty_no} />
            <InfoCard title={'Dataset Date Format'} data={dataFromUploader?.date_format} />

            {/* Row 4 */}
            <div style={sideBySideContainerStyle}>
                <div style={topBottomContainerStyle}>
                <JsonArray title={"Mismatched Columns"} 
                        data={dataFromUploader?.mismatched_columns}/>
                <JsonArray title={"Mandatory Present"} 
                        data={dataFromUploader?.mandateColsPresent}/>
                </div>
            {dataFromUploader.null_flag && (
                <div style={{ flex: '1', minWidth: '40%' }}>
                <ColumnChart title={'Null values count'} data={dataFromUploader?.null_no} />
                </div>)}
                <div style={topBottomContainerStyle}>
                <InfoCard title={"Start Date"} 
                        data={dataFromUploader?.start_date}/>
                <InfoCard title={"End Date"} 
                            data={dataFromUploader?.end_date}/>
                </div>
            </div>
            {dataFromUploader.null_flag && (
                <div style={{ flex: '1', minWidth: '50%' }}>   
                <NestedJson title={'Null Rows'} data={dataFromUploader?.null_row} />
                </div>)}
            </div>
        </div>
    );
  return (
    // <ThemeProvider theme={Theme}>
    <div>
        {renderUploaderOrData()}        
    </div>
    // </ThemeProvider>
  );
}
export default App;