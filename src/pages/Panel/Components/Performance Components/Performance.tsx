import React, { useEffect, useState } from 'react'
import History from './History'
import TimeGraph from './TimeChart'
import PerformanceHeader from './PerformanceHeader'
import { BrowserRouter } from 'react-router-dom'
import "./performance.css";

const Performance = () => {
    //state for logs and graphs
    const [queryData, setQueryData] = useState([]);
    const [queryTimeData, setQueryTimeData] = useState([]);
    const [mutationData, setMutationData] = useState([]);
    const [mutationTimeData, setMutationTimeData] = useState([]);
    //state for tabs in performance header
    const [value, setValue] = useState(0)

    //state for query display
    const [graphqlData, setGraphqlData] = useState('')

    //even handler for performance header tabs
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    
    //updates history state on mount
    //filters logs for valid GraphQL requests
    // chrome.devtools.network.getHAR((result) => console.log(result));
    useEffect(() => chrome.devtools.network.getHAR((result) => {
        setQueryData([]);
        setMutationData([]);
    }), []);

    // listen for response times sent from front-end application
    chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
        console.log(request)
        if (request['cacheMissResponseTime']) setQueryTimeData([...queryTimeData, request.cacheMissResponseTime])
        if (request['cacheHitResponseTime']) setQueryTimeData([...queryTimeData, request.cacheHitResponseTime]) 
        if (request['deleteMutationResponseTime']) setMutationTimeData([...mutationTimeData, request.deleteMutationResponseTime])
        if (request['addOrUpdateMutationResponseTime']) setMutationTimeData([...mutationTimeData, request.addOrUpdateMutationResponseTime])
        if (request['query']) setQueryData([...queryData, request.query])
        if (request['mutation']) setMutationData([...mutationData, request.mutation])
    })

    return (
        <div id='performance'>
            <BrowserRouter>
                <div id='top-performance'>
                    <div id='performance-top-left'>
                        <div>
                            <PerformanceHeader value={value} handleChange={handleChange}/>
                        </div>
                        <div>
                            <History queryData={queryData} mutationData={mutationData} setGraphqlData={setGraphqlData}/>
                        </div>
                    </div>
                    <div id='performance-top-right'>
                        <TimeGraph queryTime={queryTimeData} mutationTime={mutationTimeData}/>
                    </div>
                </div>
                <div id='bottom-performance'>
                    {graphqlData}
                </div>
            </BrowserRouter>
        </div>
    )
}

export default Performance