import React from "react"
import { Link } from "react-router"
import * as PollAction from '../actions/PollAction'
import PollStore from '../stores/PollStore'
//TODO DELETE/EDIT
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.prettyDate=this.prettyDate.bind(this)
    this.state = {
      polls: [ ],
      loaded: false
    }
  }

  componentWillMount() {
    PollAction.loadPolls()
    PollStore.on("change", this.getPolls.bind(this))
  }

  componentWillUnmount() {
    PollStore.removeAllListeners("change")
  }

  getPolls() {
    this.setState({
      polls: PollStore.getAll(),
      loaded: true
    })
  }

  delete(e) {
    let i = +e.target.id.slice(-1)
    PollAction.deletePoll(this.state.polls[i]._id)
    PollAction.loadPolls()//TODO OTHER DELETE BUTTONS, should i cache and not pull? or combo delete and load
  }

  prettyDate(d) {//TODO timezone (any user post-> UTC -> their zone)
    let date = new Date(d)
    console.log(date);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let month = monthNames[date.getMonth()], day = date.getDate(), year = date.getFullYear()
    let natural = month + " " + day + ", " + year
    return natural
  }

  render() {

    return(
      <div>
        <div class="title">
          <h1><span class="glyphicon glyphicon-stats" aria-hidden="true"></span> Dashboard</h1>
        </div>
        <table class="table table-striped table-hover ">
          <thead>
            <tr>
              <th> </th>
              <th>Poll Name</th>
              <th>Votes</th>
              <th>Date Added</th>
              <th>Settings</th>
            </tr>
          </thead>
          <tbody>
          {this.state.loaded ? this.state.polls.map( (poll, i) => {//TODO KEYS
               return (
                <tr key={"tr-"+i}>
                  <td key={"td1-"+i}>{i+1}</td>
                  <td key={"td2-"+i}><Link to={"/u/"+poll.user.username+"/"+poll._id}>{poll.data.title}</Link></td>
                  <td key={"td3-"+i}>{poll.data.results.reduce((a, b) => +a + +b, 0)}</td>
                  <td key={"td4-"+i}>{this.prettyDate(poll.date)}</td>
                  <td key={"td5-"+i}>
                    <Link to={"/u/"+poll.user.username+"/"+poll._id+'?edit'}  key={"edit-"+i} type="reset" class="btn btn-sm btn-default" style={{marginRight: '5px'}}>Edit</Link>
                    <button id={"delete-"+i} key={"delete-"+i} class="btn btn-sm btn-danger" onClick={this.delete.bind(this)}>Delete</button>
                  </td>
                </tr>
              )
            })
            : <tr>
                <td>{0}</td>
                <td>No Polls</td>
                <td>0</td>
                <td>--</td>
              </tr>
          }
          </tbody>
        </table>
      </div>
      )
    }
}
