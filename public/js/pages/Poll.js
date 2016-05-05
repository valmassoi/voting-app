import React from "react"
import { Link } from "react-router"
// import $ from 'jquery';
// import jQuery from 'jquery';
import Chart from 'chart.js'
import { Bar } from 'react-chartjs'



export default class Poll extends React.Component {



  render(){
    let pollname = "iPhone or Android"
    let chartData = {
        labels: ["iPhone", "Android"],
        datasets: [{
            label: '# of Votes',
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [50, 2]
        }]
    }

    let chartOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        responsive: true,
        legend: {
          onClick: () => console.log("click")
        }
    }

    return(
      <div>
        <div class="title">
          <h1><span class="glyphicon glyphicon-stats" aria-hidden="true"></span> {pollname}</h1>
        </div>
        <Bar data={chartData} options={chartOptions} />
      </div>
    )
  }
}
