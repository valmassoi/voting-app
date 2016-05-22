import React from 'react'
import { Link } from 'react-router'
import createHashHistory from 'history/lib/createHashHistory'
import $ from 'jquery'
import Chart from 'chart.js'
import { Bar } from 'react-chartjs'
import * as PollAction from '../actions/PollAction'
import PollStore from '../stores/PollStore'
import * as UserAction from '../actions/UserAction'
import UserStore from '../stores/UserStore'
import _ from 'lodash'

const history = createHashHistory({ queryKey: false })
//TODO NOT A POLL ERR
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
        newOption: "",
        user: ""
      }
  }
  componentWillMount() {
    UserAction.getIp()
    let user=UserStore.getEmail()
    let pollid = this.props.params.pollid,
        username = this.props.params.username
    PollAction.loadPolls()//TODO get from cache? instead of loading again?
    this.setState({ pollid })
    PollStore.on("change", () => {
      this.setState({
        poll: PollStore.getPoll(this.state.pollid),
        loaded: true,
        user
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
    let ip = UserStore.getIp(),
        ips = this.state.poll.users.ips,
        usernames = this.state.poll.users.usernames,
        { voted, user, vote } = this.state
    if(_.contains(usernames, user)&&user!="") { //TODO Allow a change vote, store like: [user, vote]
      window.alert(`You have already voted`)
    }
    else if(_.contains(ips, ip)) {
      window.alert(`Your ip address: ${ip} has already voted`)
    }
    else{
      let results = this.state.poll.data.results
      results[vote]++
      this.setState({ results, ips: ips.push(ip), usernames: usernames.push(user), voted: true  })
      PollAction.vote(this.state.pollid, results, user, ip)
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
    let options = this.state.poll.data.options.concat(this.state.newOption),
        results = this.state.poll.data.results.concat(0),
        newOption = ""
    PollAction.addOption(options, results, this.state.poll._id)
    $("#newOption").val("")
    let poll = this.state.poll
    let title = this.state.poll.data.title
    poll.data = { title, options, results }
    this.setState({ poll, newOption })
  }

  render() {
    const localEmail = this.state.user||"guest"//localStorage.getItem("_polley_user_email")
    const deleteClass = (localEmail==this.state.poll.users.creator) ? "" : "hidden"
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
    const formBtns = {
      float: 'right !important',
      right: '10px'
    }
    const twitterUrl = "http://twitter.com/home?status=Vote%20on%20"+this.state.poll.data.title+window.location.href.replace("#", "%23")+"%20via Polley"
    const twitterStyle = {
      float: 'right !important',
      marginTop: '7px',
      marginRight: '7px'
    }
    let loggedInHidden = this.state.user?"":"hidden"
    let loadedHidden = this.state.loaded?"":"hidden"
    return(
      <div>
        <div class="title">
          <h1><span class="glyphicon glyphicon-stats" aria-hidden="true"></span> {this.state.poll.data.title}</h1>
        </div>
        <a href={twitterUrl} style={twitterStyle} target='_blank' class="btn btn-primary btn-sm">Tweet this poll</a>
        {(this.state.loaded)?
          <div class="container-fluid">
            <div class="row">
              <div class="col-sm-1 col-md-2 col-lg-3" />
              <div class="col-sm-10 col-md-8 col-lg-6">
                <Bar data={chartData} options={chartOptions} /></div>
              <div class="col-sm-1 col-md-2 col-lg-3" />
            </div>
          </div>
          :<div> </div>
        }
        {(this.state.voted)? "" :
        <div class={"form-container centered "+loadedHidden} style={{position: 'relative'}}>
          <div style={{position: 'absolute', right: '16px', top:'16px'}}>
            <button class={"btn btn-danger "+deleteClass} onClick={this.delete.bind(this)}>Delete</button>
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
                <input class={"form-control "+loggedInHidden} id="newOption" style={{marginTop: '8px'}} placeholder="New option" type="text" onChange={this.handleNewOption.bind(this)}/>
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
