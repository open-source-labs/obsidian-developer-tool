import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  PointElement,
  LineElement
} from 'chart.js'
import { getRelativePosition } from 'chart.js/helpers'
import { Line } from 'react-chartjs-2';
import { useQueryContext } from '../hooks/useQueryContext';

// used in query log panel
// shows color-coded graph of query time based on if hit, miss, or mutation
const QueryLogGraph = (props: any) => {

  const { state, dispatch } = useQueryContext(); 

  ChartJS.register(LinearScale, CategoryScale, PointElement, Tooltip, LineElement, Legend);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Query Log'
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Time (in ms)',
        },
        ticks: {
          stepSize: 10
        }
      },
      x: {
        title: {
          display: true,
          text: 'Query'
        },
      }
    },
    onClick: (e, element) => {
      // used as mapping on which filter to use for dataset
      // to accurately filter the dataset where a point is clicked
      const mapping = {
        hit: (el: any) => el.hit && !el.mutation,
        miss: (el: any) => !el.hit && !el.mutation,
        mutation: (el: any) => el.mutation
      };
      let callback: any;

      // console.log('element is', element);

      // to set value of callback to be used in filter method
      if(element[0].datasetIndex === 0){
        callback = mapping.hit;
      } else if(element[0]. datasetIndex === 1){
        callback = mapping.miss;
      } else {
        callback = mapping.mutation;
      };

      // filtered data based on whether clicked element was from hit, miss, or mutation
      const data = state.queryMetrics.filter(el => callback(el));

      // selected element
      let final = data[element[0].index];

      // console.log('this is data', data);
      // console.log('this is final', final);

      // moves view from All to Selected, with the selected element being the only one shown
      dispatch({type: 'SET_OPEN', payload: final});
      props.setDisplay('selected');
    }
  };

  const data: ChartData<'line'> = {
    labels: state.queryMetrics.map((el, index) => index + 1),
    datasets: [
      {
        label: 'Hit Time',
        data: state.queryMetrics.filter(el => el.hit && !el.mutation).map(el => el.time),
        backgroundColor: 'rgb(25, 201, 16)',
        borderColor: 'rgba(25, 201, 16, 0.4)',
        pointBackgroundColor: 'rgb(25, 201, 16)',
        pointRadius: state.hitSize,
        pointHoverRadius: 20
      },
      {
        label: 'Miss Time',
        data: state.queryMetrics.filter(el => !el.hit && !el.mutation).map(el => el.time),
        backgroundColor: 'rgb(41, 82, 217)',
        borderColor: 'rgba(41, 82, 217, 0.4)',
        pointBackgroundColor: 'rgb(41, 82, 217)',
        pointRadius: state.missSize,
        pointHoverRadius: 20
      },
      {
        label: 'Mutation Time',
        data: state.queryMetrics.filter(el => el.mutation).map(el => el.time),
        backgroundColor: 'rgb(160, 20, 181)',
        borderColor: 'rgba(160, 20, 181, 0.4)',
        pointBackgroundColor: 'rgb(160, 20, 181)',
        pointRadius: state.mutationSize,
        pointHoverRadius: 20
      }
    ]
  };

  return(
    <div className='line-chart'>
      <Line data={data} options={options} />
    </div>
  )
};

export default QueryLogGraph;