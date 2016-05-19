import React from "react"
import { Link } from "react-router"
import Chart from 'chart.js'
import { Bar } from 'react-chartjs'
import * as PollAction from '../actions/PollAction'
import PollStore from '../stores/PollStore'
//TODO pageination
export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        polls: [ ],
        loaded: false
      }
  }

  componentWillMount() {
    PollAction.loadPolls()
    PollStore.on("change", this.getPolls.bind(this))
  }

  componentWillReceiveProps(nextProps) {
    this.sortBy(this.state.polls, nextProps.params.sortby)
  }

  componentWillUnmount() {
    PollStore.removeAllListeners("change")
  }

  getPolls() {
    this.sortBy(PollStore.getAll(), "recent")
  }

  sortBy(polls, sortby) {
    let sort = [ ]
    console.log(sortby);
    if (sortby == "recent" || sortby == null){
      sort = polls.sort((x,y)=> x.date < y.date)
    }
    if (sortby == "popular"){
      sort = polls.sort((x,y)=> x.data.results.reduce((a, b) => +a + +b, 0)<y.data.results.reduce((a, b) => +a + +b, 0))
    }
    if (sortby == "random"){
      sort = polls
      for (var i = sort.length - 1; i > 0; i--) {
       var j = Math.floor(Math.random() * (i + 1));
       var temp = sort[i];
       sort[i] = sort[j];
       sort[j] = temp;
      }
    }
    this.setState({
      polls,
      loaded: true
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
        vAxis:{ viewWindow: { min: 0 } },
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
          <div class="col-sm-1 col-md-2 col-lg-3" />
          <div class="col-sm-10 col-md-8 col-lg-6">
          {this.state.polls.length>0 ? this.state.polls.map( (poll, i) => {
               return (
                <div key={i} class="polls">
                  <Link to={"/u/"+poll.user.username+"/"+poll._id} class="btn btn-default vote-now">Vote</Link>
                  <h1 key={poll._id+i}>  <Link to={"/u/"+poll.user.username+"/"+ poll._id}>{poll.data.title}</Link></h1>
                  <h6 key={poll.user.username+i}><strong>By {poll.user.username}</strong></h6>
                  <Bar key={poll.date+i} data={this.chartData(i)} options={chartOptions} />
                </div>
               )
             })
           : ""}
           </div>
           <div class="col-sm-1 col-md-2 col-lg-3" />
        </div>
      </div>
    )
  }
}
