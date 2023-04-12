import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QueryTimeGraph from '../components/queryTimeGraph';
import QueryHitRate from '../components/queryHitRate';
import QueryTotal from '../components/queryTotal';
import { dashboardProps } from '../types';

// default landing panel of devtools
// contains 3 main components - query hit rate, query total, query time graph
export default function Dashboard(props: dashboardProps) {
  return(
    <div id='dashboardContainer'>
      <div id='dashboardSummary'>
        <div id='algocap'>
          {/* error for eslint here is ok, 
          we want to uppercase the algo string, but this is showing error 
          because we have multiple types defined for props; will not throw error in build*/}
          {props.algo && <span className='label-text'>ALGORITHM: {props.algo.toUpperCase()}</span>}
          {props.capacity && <span className='label-text'>TOTAL CAPACITY: {props.capacity}</span>}
        </div>
        <div id='hitTotalContainer'>
          <QueryHitRate />
          <QueryTotal />
        </div>
      </div>
      <div id="queryTimeGraph">
        <QueryTimeGraph />
      </div>
    </div>
  )
};