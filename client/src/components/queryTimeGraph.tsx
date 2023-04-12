import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js'
import { Bar } from 'react-chartjs-2';
import { useQueryContext } from '../hooks/useQueryContext';

// used in dashboard panel
const QueryTimeGraph = () => {

  const { state } = useQueryContext();

  // console.log('state.queryMetrics in queryTimeGraph is ', state.queryMetrics)

  // linearscale - needed for the y-axis of time since this is numerical
  // categoryscale - needed for the x-axis of name since this is "custom"
  // to learn more about importing and registering elements, see https://react-chartjs-2.js.org/docs/migration-to-v4/#tree-shaking
  ChartJS.register(LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend);
  
  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: 'top',
        labels: {
          color: 'rgb(255, 240, 240)'
        }
      },
      title: {
        display: true,
        text: 'Query Time Graph'
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Time (in ms)'
        },
        ticks: {
          stepSize: 10
        }
      },
      x: {
        title: {
          display: true,
          text: 'Query'
        }
      }
    }
  };
  
  // to assign the correct color to each bar based on if it was hit or miss
  const colors: Array<string> = [];
  for(let i:number = 0; i < state.queryMetrics.length; i++){
    if(state.queryMetrics[i].hit){
      colors.push('rgb(186,218,202)')
    } else {
      colors.push('rgb(255, 240, 240)')
    };
  };

  const data: ChartData<'bar'> = {
    labels: state.queryMetrics.map((el, index) => index + 1),
    datasets: [
      {
        label: 'Time',
        data: state.queryMetrics.map(el => el.time),
        backgroundColor: colors
      }
    ]
  };

  return (
    <>
      <Bar data={data} options={options}/>
    </>
  )
};

export default QueryTimeGraph;