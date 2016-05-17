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
        loaded: false,
        voted: false,
        pollname: "pollname"
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
    let pollname = this.props.params.pollname,
        username = this.props.params.username
    this.setState({ pollname })
    console.log(username);
    console.log(pollname);
  }
  reset(){

  }
  submit(){

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


    return(
      <div>
        <div class="title">
          <h1><span class="glyphicon glyphicon-stats" aria-hidden="true"></span> {this.state.pollname}</h1>
        </div>
        {(this.state.loaded)?<div><Bar data={chartData} options={chartOptions} /></div>:<div>Could not load poll</div>}
        {(this.state.voted)?<p>change vote?</p>:
        <div class="form-container centered">
          <form class="form-horizontal">
            <fieldset>
              <legend>Vote on {this.state.pollname}</legend>
              <div class="form-group">
                <label class="col-lg-2 control-label">Options</label>
                <div class="col-lg-10">
                  <div class="radio">
                    <label>
                      <input name="optionsRadios" id="optionsRadios1" value="option1" type="radio" />
                      Option one is this
                    </label>
                  </div>
                  <div class="radio">
                    <label>
                      <input name="optionsRadios" id="optionsRadios2" value="option2" type="radio" />
                      Option two can be something else
                    </label>
                  </div>
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
