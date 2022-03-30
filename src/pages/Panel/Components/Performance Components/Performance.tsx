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

		// let count = 0;

    // listen for response times sent from front-end application
    chrome.runtime.onMessageExternal.addListener(function doStuff(request, sender, sendResponse) {
			// chrome.runtime.onMessageExternal.removeListener(setPerformanceTimes);
        if (request['cacheMissResponseTime']) {
					chrome.runtime.onMessageExternal.removeListener(doStuff);
					setQueryTimeData([...queryTimeData, request.cacheMissResponseTime])
				}
        else if (request['cacheHitResponseTime']) {
					chrome.runtime.onMessageExternal.removeListener(doStuff);
					setQueryTimeData([...queryTimeData, request.cacheHitResponseTime]);
				}
        else if (request['deleteMutationResponseTime']) setMutationTimeData([...mutationTimeData, request.deleteMutationResponseTime])
        else if (request['addOrUpdateMutationResponseTime']) setMutationTimeData([...mutationTimeData, request.addOrUpdateMutationResponseTime])
        else if (request['query']) {
					chrome.runtime.onMessageExternal.removeListener(doStuff);
					setQueryData([...queryData, request.query])
				} 
        else if (request['mutation']) {
					chrome.runtime.onMessageExternal.removeListener(doStuff);
					setMutationData([...mutationData, request.mutation])
				} 
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