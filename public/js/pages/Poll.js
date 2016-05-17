import React from 'react'
import { Link } from 'react-router'
import Chart from 'chart.js'
import { Bar } from 'react-chartjs'
import PollStore from '../stores/PollStore'

//TODO VOTE SECTION, SHARE SECTION
export default class Poll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        poll: PollStore.getAll(),
        loaded: false
      }
  }
  componentWillMount() {
    console.log("mount");
    PollStore.on("change", () => {
      this.setState({
        poll: PollStore.getAll(),//POLLS?
        loaded: true
      })
    })
  }
  componentDidMount() {
    let pollname = this.props.params.pollname
    let username = this.props.params.username
    console.log(username);
    console.log(pollname);
  }

  render() {
    let pollname = this.state.poll.title
    let chartData = {
        labels: this.state.poll.options,
        datasets: [{
            label: '# of Votes',
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: this.state.poll.results
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
