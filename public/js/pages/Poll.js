import React from "react"
import { Link } from "react-router"
// import $ from 'jquery';
// import jQuery from 'jquery';
import Chart from 'chart.js'
// import { Bar } from 'react-chartjs'
// import {Bar} from 'react-chartjs2'
const Bar = require("react-chartjs").Bar;

export default class Poll extends React.Component {



  render(){
    // console.log(Chart);
    let chartData = {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3]
        }]
    }

    let chartOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }

    return(
      <div>
        <div class="title">
          <h1><span class="glyphicon glyphicon-stats" aria-hidden="true"></span> Pollname</h1>
        </div>
        <Bar data={chartData} options={chartOptions} width="600" height="250"/>
      </div>
    )
  }
}
