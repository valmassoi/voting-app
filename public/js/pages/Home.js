import React from "react"
import { Link } from "react-router"
import Chart from 'chart.js'
import { Bar } from 'react-chartjs'
import PollStore from '../stores/PollStore'

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        polls: PollStore.getAll(),
        loaded: false
      }
  }
  componentWillMount() {
    console.log("mount");
    PollStore.on("change", () => {
      this.setState({
        polls: PollStore.getAll(),
        loaded: true
      })
    })
  }

  chartData(i) {
    let backgroundColor = ["rgba(255,99,132,.2)","rgba(70,130,180,.2)"],
        borderColor = ["rgba(255,99,132,1)","rgba(70,130,180,1)"],
        hoverBackgroundColor = ["rgba(255,99,132,.4)","rgba(70,130,180,.4)"]
    return {
      labels: this.state.polls[i].data.options,
      datasets: [{
          label: '# of Votes',
          backgroundColor: backgroundColor[i % 2],
          borderColor: borderColor[i % 2],
          borderWidth: 1,
          hoverBackgroundColor: hoverBackgroundColor[i % 2],
          hoverBorderColor: borderColor[i % 2],
          data: this.state.polls[i].data.results
      }]
    }
  }

  render() {


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
          <h1> Welcome to Polley, a real-time voting system. </h1>
          <h3> Create an account to get started </h3>
          <Link to="signup" class="btn btn-default btn-lg">Signup</Link>
          <h5><span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span> or start browsing </h5>
        </div>
        <div class="row">
          <div class="col-md-1" />
          <div class="col-md-10">
          {this.state.polls ? this.state.polls.map( (polls, i) => {
               return (
                 <div key={i} class="polls">
                   <h1 key={polls.data.title+i}><a href={"/poll/"+polls.data.title}>{polls.data.title}</a></h1>
                   <h6 key={polls.user.username+i}><strong>By {polls.user.username}</strong></h6>
                   <Bar key={polls.date+i} data={this.chartData(i)} options={chartOptions} />
                 </div>
               )
             })
           : <p>No poll data</p>}
           </div>
           <div class="col-md-1" />
        </div>
      </div>
    )
  }
}
