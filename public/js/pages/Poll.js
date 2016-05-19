import React from 'react'
import { Link } from 'react-router'
import Chart from 'chart.js'
import { Bar } from 'react-chartjs'
import * as PollAction from '../actions/PollAction'
import PollStore from '../stores/PollStore'

//TODO SHARE button, delete if username, NOT A POLL ERR
export default class Poll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        poll: {
          date: 0,
          user:{
            username: "",
            ip: 0
          },
          data:{
            title: "",
            options: ["", ""],
            results: [0, 0]
          }
        },
        loaded: false,
        voted: false,
        vote: null,
        pollid: 0
      }
  }
  componentWillMount() {
    let pollid = this.props.params.pollid,
        username = this.props.params.username
    PollAction.loadPolls()//TODO get from cache? instead of loading again?
    this.setState({
      pollid
    })
    PollStore.on("change", () => {
      this.setState({
        poll: PollStore.getPoll(this.state.pollid),
        loaded: true
      })
    })
  }

  componentWillUnmount() {
    PollStore.removeAllListeners("change")
  }

  handleRadio(e) {
    let vote = e.target.value
    this.setState({ vote })//also update results
  }

  submit(option){
    let results = this.state.poll.data.results
    results[this.state.vote]++
    this.setState({ results })
    PollAction.vote(this.state.pollid, results)
  }

  delete(){
    PollAction.deletePoll(this.state.pollid)//TODO give id
  }

  render() {
    let chartData = {
        labels: this.state.poll.data.options,
        datasets: [{
            label: '# of Votes',
            backgroundColor: "rgba(70,130,180,.2)",
            borderColor: "rgba(70,130,180,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(70,130,180,.4)",
            hoverBorderColor: "rgba(70,130,180,1)",
            data: this.state.poll.data.results
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

    return(
      <div>
        <div class="title">
          <h1><span class="glyphicon glyphicon-stats" aria-hidden="true"></span> {this.state.poll.data.title}</h1>
        </div>
        <button style={{marginLeft: '10px'}} class="btn btn-danger" onClick={this.delete.bind(this)}>Delete</button>
        {(this.state.loaded)?<div><Bar data={chartData} options={chartOptions} /></div>:<div>Could not load poll</div>}
        {(this.state.voted)?<p>change vote?</p>:
        <div class="form-container centered">
          <form class="form-horizontal">
            <fieldset>
              <legend>Vote on {this.state.poll.data.title}</legend>
              <div class="form-group">
                <label class="col-lg-2 control-label">Options</label>
                <div class="col-lg-10">
                {this.state.poll.data.options.map((option, i) => {
                  return(
                    <div key={option+i+"radio"} class="radio">
                      <label key={option+i+"label"}>
                        <input key={option+i+"input"} onClick={this.handleRadio.bind(this)} name="option" id={option+i+"input"} value={i} type="radio" />
                        {option}
                      </label>
                    </div>
                  )}
                )}
                </div>
              </div>
            <div class="form-group">
              <div style={formBtns}>
                <button type="button" style={{marginLeft: '10px'}} class="btn btn-primary" onClick={this.submit.bind(this)}>Submit</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>}
      </div>
    )
  }
}
