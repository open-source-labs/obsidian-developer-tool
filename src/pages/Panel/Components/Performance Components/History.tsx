import React, { useState, useEffect } from "react"
import Log from './Log'
import TimeGraph from './TimeChart'
import { AppBar, Toolbar, Typography, Box } from "@mui/material"

const History = () => {
    const [historyData, setHistoryData] = useState([]);
    const logs = [];

    //add a function to reload the logs?

    //filters logs for valid GraphQL requests
    const getValidLogs = () => {
        // chrome.devtools.network.getHAR((result) => console.log(result));
        chrome.devtools.network.getHAR((result) => setHistoryData(result.entries.filter((entry) => (entry.request.method === "POST") && entry.response.status === 200)))
    }

    //updates history state on mount
    useEffect(() => {getValidLogs()}, []);

    //udates history state when a new request it sent
    chrome.devtools.network.onRequestFinished.addListener(() => getValidLogs());

    //loop through mutationData and create log parts
    for (let i=0; i<historyData.length; i++){
        const newDate = new Date(historyData[i].startedDateTime);
        const stringDate = newDate.toUTCString();
        const query = historyData[i].request.postData.text.split('').slice(10,15).join('')
        const queryType =  query === "query" ? "Query" : "Mutation"
        logs.push(<Log id={historyData[i].startedDateTime} type={queryType} url={historyData[i].request.url} date={stringDate}/>)
    }

		// listen for response times sent from front-end application
		chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
			if (request['cacheMissResponseTime']) {
				console.log('Here\'s the cacheMissResponseTime: ', request.cacheMissResponseTime, 'ms')
			}
			if (request['cacheHitResponseTime']) {
				console.log('Here\'s the cacheHitResponseTime: ', request.cacheHitResponseTime, 'ms')
			}
			if (request['deleteMutationResponseTime']) {
				console.log('Here\'s the deleteMutationResponseTime: ', request.deleteMutationResponseTime, 'ms')
			}
			if (request['addOrUpdateMutationResponseTime']) {
				console.log('Here\'s the addOrUpdateMutationResponseTime: ', request.addOrUpdateMutationResponseTime, 'ms')
			}
			if (request['query']) {
				console.log('Here\'s the query: ', request.query);
			}
			if (request['mutation']) {
				console.log('Here\'s the mutation: ', request.mutation);
			}
		})

    return (
        <div id='history-container'>
        <div id='log-container'>
            <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography>
                            Query Logs
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            </div>
            <div id='history-logs'>
                {logs}
            </div> 
        </div>
            <div>
                <TimeGraph data={historyData}></TimeGraph>
            </div>
        </div>
    )
}

export default History