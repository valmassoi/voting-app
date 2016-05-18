import React from 'react'
import { Link } from 'react-router'
import Chart from 'chart.js'
import { Bar } from 'react-chartjs'
import * as PollAction from '../actions/PollAction'
import PollStore from '../stores/PollStore'

//TODO SHARE button, delete if username
export default class Poll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        poll: PollStore.getAll(),// only need 1 with id
        loaded: false,
        voted: false,
        pollname: "pollname",
        pollid: 0
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

  componentWillUnmount() {
    PollStore.removeAllListeners("change")
  }

  componentDidMount() {//TODO move to will?
    let pollid = this.props.params.pollid,
        username = this.props.params.username
    this.setState({ pollid })
  }

  submit(){
    PollAction.vote("some option")//TODO pass opt
  }

  delete(){
    PollAction.deletePoll(this.state.pollid)//TODO give id
  }

  render() {
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
    let formBtns = {
      float: 'right !important',
      marginRight: '16px'
    }
    let tempOpt = ["op1", "op2"]

    return(
      <div>
        <div class="title">
          <h1><span class="glyphicon glyphicon-stats" aria-hidden="true"></span> {this.state.pollname}</h1>
        </div>
        <button style={{marginLeft: '10px'}} class="btn btn-danger" onClick={this.delete.bind(this)}>Delete</button>
        {(this.state.loaded)?<div><Bar data={chartData} options={chartOptions} /></div>:<div>Could not load poll</div>}
        {(this.state.voted)?<p>change vote?</p>:
        <div class="form-container centered">
          <form class="form-horizontal">
            <fieldset>
              <legend>Vote on {this.state.pollname}</legend>
              <div class="form-group">
                <label class="col-lg-2 control-label">Options</label>
                <div class="col-lg-10">
                {tempOpt.map((option, i) => {
                  return(
                    <div key={option+i+"radio"} class="radio">
                      <label key={option+i+"label"}>
                        <input key={option+i+"input"} name="option" id={option+i+"input"} value={i} type="radio" />
                        {option}
                      </label>
                    </div>
                  )}
                )}
                </div>
              </div>
            <div class="form-group">
              <div style={formBtns}>
                <button type="submit" style={{marginLeft: '10px'}} class="btn btn-primary" onClick={this.submit.bind(this)}>Submit</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>}
      </div>
    )
  }
}
