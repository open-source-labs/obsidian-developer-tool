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
        labels: [...Array(Math.max(querySpeed.length, mutationSpeed.length)).keys()],
        datasets: [
            {label: "Queries",
            data: querySpeed,
            lineTension: 0.4,
            borderColor: "rgba(75,192,192,1)",
            responsive: true
        },
        {label: "Mutations",
            data: mutationSpeed,
            lineTension: 0.4,
            borderColor: "#742774",
            responsive: true
        }]
    }

    return (
        <div>
            <Line data = {data} options={
                {plugins:{
                    legend: { 
                        display: true, 
                        position:'bottom'
                    },
                    title: {
                        display:true, 
                        text:'Response Time', 
                    },
                    }
                }
            }/>
        </div>
    )
}

export default TimeGraph