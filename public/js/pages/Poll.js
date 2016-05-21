import React from 'react'
import { Link } from 'react-router'
import createHashHistory from 'history/lib/createHashHistory'
import $ from 'jquery'
import Chart from 'chart.js'
import { Bar } from 'react-chartjs'
import * as PollAction from '../actions/PollAction'
import PollStore from '../stores/PollStore'
import _ from 'lodash'

const history = createHashHistory({ queryKey: false })
//TODO SHARE button, delete if username, NOT A POLL ERR
export default class Poll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        poll: {
          date: 0,
          users:{
            creator: "",
            usernames: [ ],
            ips: [ ]
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
        pollid: 0,
        newOption: ""
      }
  }
  componentWillMount() {
    let pollid = this.props.params.pollid,
        username = this.props.params.username
    PollAction.loadPolls()//TODO get from cache? instead of loading again?
    this.setState({ pollid })
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
    let ip = "::ffff:192.168.1.48",
        ips = this.state.poll.users.ips,
        voted = this.state.voted
    if (_.contains(ips, ip)) {//TODO also check username ~ allow change vote (need to know old)
      window.alert(`Your ip address: ${ip} has already voted`)
    }
    else{
      let results = this.state.poll.data.results
      results[this.state.vote]++
      this.setState({ results, ips: ips.push(ip), voted: true })
      PollAction.vote(this.state.pollid, results)
      console.log(this.state.poll.users.ips)
    }
  }

  delete(){
    PollAction.deletePoll(this.state.pollid)
    history.push('/dashboard')
  }

  handleNewOption(e) {
    let newOption = e.target.value
    if(newOption.length>0){
      $("#add-option").removeClass("hidden")
      this.setState({ newOption })
    }
    else {
      $("#add-option").addClass("hidden")
    }
  }

  addOption() {
    //TODO hit backend with newOption and add to results
    let options = this.state.poll.data.options.concat(this.state.newOption),
        results = this.state.poll.data.results.concat(0),
        newOption = ""
    PollAction.addOption(options, results, this.state.poll._id)
    $("#newOption").val("")
    let poll = this.state.poll
    poll.data = { options, results }
    this.setState({ poll, newOption })
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
      right: '10px'
    }

    return(
      <div>
        <div class="title">
          <h1><span class="glyphicon glyphicon-stats" aria-hidden="true"></span> {this.state.poll.data.title}</h1>
        </div>
        {(this.state.loaded)?<div><Bar data={chartData} options={chartOptions} /></div>:<div> </div>}
        {(this.state.voted)?<p>change vote?</p>:
        <div class="form-container centered" style={{position: 'relative'}}>
          <div style={{position: 'absolute', right: '16px', top:'16px'}}>
            <button class="btn btn-danger" onClick={this.delete.bind(this)}>Delete</button>
          </div>
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
                <input class="form-control" id="newOption" style={{marginTop: '8px'}} placeholder="New option" type="text" onChange={this.handleNewOption.bind(this)}/>
                </div>
              </div>
            <div class="form-group">
              <div style={formBtns}>
                <button type="button" id="add-option" style={{marginRight: '5px'}} class="btn btn-default hidden" onClick={this.addOption.bind(this)}>Add Option</button>
                <button type="button" class="btn btn-primary" onClick={this.submit.bind(this)}>Submit</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>}
      </div>
    )
  }
}
