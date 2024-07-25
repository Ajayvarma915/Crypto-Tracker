import React from 'react'
import {Line} from "react-chartjs-2";
import { Chart as ChartJS, plugins } from 'chart.js/auto';

const LineChart = ({chartData,multiAxis}) => {
  const options={
    plugins:{
        legend:{
            display:multiAxis?true:false,
        },
    },
    responsive:true,
    interaction:{
        mode:"index",
        intersect:false,
    },
    scales: {
      y: {
        position:'left',
        ticks: {
          callback: function (value, index, ticks) {
            return '$' + value.toLocaleString();
          }
        }
      },
    y1:multiAxis && {
        position:'right',
        ticks: {
            callback: function (value, index, ticks) {
                return '$' + value.toLocaleString();
            }
        },
        
    }
    }
  };
  return <Line data={chartData} options={options}/>
}

export default LineChart;
