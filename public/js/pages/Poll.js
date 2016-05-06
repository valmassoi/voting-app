import React from "react"
import { Link } from "react-router"
import $ from 'jquery';
// import jQuery from 'jquery';
import Chart from 'chart.js'
import { Bar } from 'react-chartjs'



export default class Poll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        title: 'Poll',
        options: [],
        results: [],
        loaded: false
      }
  }

  componentDidMount() {
    const url = 'http://192.168.1.48:8081/api/polls' //change to unquie poll
    console.log("mount poll");
    this.serverRequest = $.getJSON(url, (json) => {
      console.log(json)
      let { title, options, results } = json.data
      this.setState({ title, options, results, loaded: true })
    })
  }

  componentWillUnmount () {
    console.log("unmount poll");
    this.serverRequest.abort()
  }

  render(){
    let pollname = this.state.title
    let chartData = {
        labels: this.state.options,
        datasets: [{
            label: '# of Votes',
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: this.state.results
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
        {(this.state.loaded)?<Bar data={chartData} options={chartOptions} />:<div>Could not load poll</div>}
      </div>
    )
  }
}
