import React from "react";
import { Line } from "react-chartjs-2"
import { Chart, registerables } from "chart.js"
Chart.register(...registerables)

const TimeGraph = (props) => {
    const queryTime = props.queryTime
    const mutationTime = props.mutationTime

    const data = {
        labels: [...Array(Math.max(queryTime.length, mutationTime.length)).keys()],
        datasets: [
            {label: "Queries",
            data: queryTime,
            lineTension: 0.4,
            borderColor: "rgba(75,192,192,1)",
            responsive: true
        },
        {label: "Mutations",
            data: mutationTime,
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