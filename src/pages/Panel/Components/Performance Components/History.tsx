import React, { useState, useEffect } from "react"
import Log from './Log'

const History = () => {
    const [historyData, setHistoryData] = useState([]);
    const logs = [];

    //add a function to reload the logs?

    //filters logs for valid GraphQL requests
    const getValidLogs = () => {
        // chrome.devtools.network.getHAR((result) => console.log(result));

        chrome.devtools.network.getHAR((result) => {
            setHistoryData(result.entries.filter((entry) => entry.request.method === "POST" && entry.response.status === 200));
        })
    }

    //updates history state on mount
    useEffect(() => {getValidLogs()}, []);

    //udates history state when a new request it sent
    chrome.devtools.network.onRequestFinished.addListener(() => getValidLogs());

    //loop through mutationData and create log parts
    for (let i=0; i<historyData.length; i++){
        const newDate = new Date(historyData[i].startedDateTime);
        const stringDate = newDate.toUTCString();
        logs.push(<Log id={historyData[i].startedDateTime} type={historyData[i].request.method} url={historyData[i].request.url} date={stringDate}/>)
    }

    return (
        <div id='history-container'>
            <div id='history-logs'>
                {logs}
            </div> 
        </div>
    )
}

export default History