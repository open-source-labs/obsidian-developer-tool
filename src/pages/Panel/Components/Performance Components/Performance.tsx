import React, { useEffect, useState } from 'react'
import History from './History'
import TimeGraph from './TimeChart'
import PerformanceHeader from './PerformanceHeader'
import { BrowserRouter } from 'react-router-dom'
import "react-pro-sidebar/dist/css/styles.css";
import "./performance.css";

const Performance = () => {
    const [queryData, setQueryData] = useState([]);
    const [queryTimeData, setQueryTimeData] = useState([]);
    const [mutationData, setMutationTimeData] = useState([]);
    const [mutationTimeData, setMutationData] = useState([]);
    
    //updates history state on mount
    //filters logs for valid GraphQL requests
    // chrome.devtools.network.getHAR((result) => console.log(result));
    useEffect(() => chrome.devtools.network.getHAR((result) => {
        setQueryData([]);
        setMutationData([]);
    }), []);

    // listen for response times sent from front-end application
    chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
        if (request['cacheMissResponseTime']) setQueryTimeData([...queryTimeData, request.cacheMissResponseTime])
        if (request['cacheHitResponseTime']) setQueryTimeData([...queryTimeData, request.cacheHitResponseTime]) 
        if (request['deleteMutationResponseTime']) setMutationTimeData([...mutationTimeData, request.deleteMutationResponseTime])
        if (request['addOrUpdateMutationResponseTime']) setMutationTimeData([...mutationTimeData, request.addOrUpdateMutationResponseTime])
        if (request['query']) setMutationTimeData([...queryData, request.query])
        if (request['mutation']) setMutationTimeData([...mutationData, request.mutation])
    })


    return (
        <div id='performance'>
                <div id='top-performance'>
                    <div>
                        <div>
                            <PerformanceHeader />
                        </div>
                        <div>
                            <History queryData={queryData} mutationData={mutationData}/>
                        </div>
                    </div>
                    <div>
                        <TimeGraph queryTime={queryTimeData} mutationTime={mutationTimeData}/>
                    </div>
                </div>
                <div id='bottom-performance'>
                    log info goes here??
                </div>
        </div>
    )
}

export default Performance