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

  render() {
    let pollname = this.state.polls[0].data.title//TODO make dynamic
    let chartData = {
        labels: this.state.polls[0].data.options,
        datasets: [{
            label: '# of Votes',
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: this.state.polls[0].data.results
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
          <h1> Welcome to Polley, a real-time voting system. </h1>
          <h3> Create an account to get started </h3>
          <Link to="signup" class="btn btn-default btn-lg">Signup</Link>
          <h5><span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span> or start browsing </h5>
        </div>
        <div class="polls">
        {this.state.polls ? this.state.polls.map( (polls, i) => {
             return (
               <div>
                 <h1 key={"title"+i}>{polls.data.title}</h1>
                 <h6>By {polls.user.username}</h6>
                 <Bar key={"bar"+i} data={chartData} options={chartOptions} />
               </div>
             )
           })
         : <p>No poll data</p>}
        </div>
      </div>
    )
  }
}
