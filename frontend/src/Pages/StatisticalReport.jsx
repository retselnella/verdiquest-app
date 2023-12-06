import React from 'react';
import UserAges from './UserAges'
import Header from './Header.jsx';
import '../styles/style.scss';
import OverAllReport from './OverAllReport.jsx';
import Gender from './Gender.jsx';
import TotalUser from './TotalUser.jsx';
const StatisticalReport = () => {
   return(
    <div className='bodeh'>
        <div>
            <Header />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '90%', paddingLeft:'10px'}}>
                <TotalUser/>
                <OverAllReport />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '90%', paddingTop:'10px'}}>
                <Gender/>
                <UserAges />
            </div>
        </div>
        
    </div>
   )
};

export default StatisticalReport;
