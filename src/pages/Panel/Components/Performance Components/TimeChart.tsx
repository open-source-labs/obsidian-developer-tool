import React from "react";
import { Line } from "react-chartjs-2"
import { Chart, registerables } from "chart.js"
Chart.register(...registerables)

const TimeGraph = (props) => {
    const allData = props.data
    const querySpeed = []
    const queryName = []
    const mutationSpeed = []
    const mutationName = [];

    for (let i=0; i<allData.length; i++){
        if (allData[i].request.postData.text.split('').slice(10,15).join('') === 'query'){
            querySpeed.push(allData[i].time)
            queryName.push(allData[i].request.url)
        }else {
            mutationSpeed.push(allData[i].time)
            mutationName.push(allData[i].request.url)
        }
    }

    const data = {
        labels: [0, 1, 2 ,3 ,4 ,5, 6, 7, 8, 9, 10],
        datasets: [
            {label: "Queries",
            data: querySpeed,
            borderColor: "rgba(75,192,192,1)"
        },
        {label: "Mutations",
            data: mutationSpeed,
            borderColor: "#742774"
        }]
    }
    console.log(querySpeed)

    return (
        <div>
            <Line data = {data} options ={
                {plugins:{
                    legend: { 
                        display: true, 
                        position:'bottom'
                    },
                    title: {
                        display:true, 
                        text:'Response Time', 
                    }},   
                }}/>
        </div>
    )
}

export default TimeGraph