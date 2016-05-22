import React from "react"
import { Link } from "react-router"
import * as PollAction from '../actions/PollAction'
import PollStore from '../stores/PollStore'
import UserStore from '../stores/UserStore'
//TODO EDIT
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.prettyDate=this.prettyDate.bind(this)
    this.state = {
      polls: [ ],
      loaded: false,
      nameSort: null,
      voteSort: null,
      dateSort: "down"
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
    let polls = PollStore.getAll().sort((x,y)=> x.date < y.date)
    let storedCreator = UserStore.getEmail()//localStorage.getItem("_polley_user_email")
    let userPolls = polls.filter((poll) => poll.users.creator==storedCreator)
    this.setState({
      polls: userPolls,
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
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let month = monthNames[date.getMonth()], day = date.getDate(), year = date.getFullYear()
    let natural = month + " " + day + ", " + year
    return natural
  }
  nameSorter() {//TODO combine all the sorters and pass an type arg
    let nameSort = ""
    this.state.nameSort=="down" ? nameSort = "up" : nameSort = "down"
    let polls = this.state.polls.concat()
    if (nameSort=="down"){
      polls.sort((x,y)=> x.data.title > y.data.title ? 1
      : x.data.title < y.data.title ? -1 : 0)
    }
    else{
      polls.sort((x,y)=> x.data.title > y.data.title ? -1
      : x.data.title < y.data.title ? 1 : 0)
    }
    this.setState({ polls, dateSort:null, nameSort, voteSort: null })
  }
  voteSorter() {
    let voteSort = ""
    this.state.voteSort=="down" ? voteSort = "up" : voteSort = "down"
    let polls = this.state.polls.concat()
    if (voteSort=="down"){
      polls.sort((x,y)=> x.data.results.reduce((a, b) => +a + +b, 0)<y.data.results.reduce((a, b) => +a + +b, 0) ? 1
      : x.data.results.reduce((a, b) => +a + +b, 0)>y.data.results.reduce((a, b) => +a + +b, 0)
      ? -1 : 0)
    }
    else{
      polls.sort((x,y)=>  x.data.results.reduce((a, b) => +a + +b, 0)<y.data.results.reduce((a, b) => +a + +b, 0) ? -1
      : x.data.results.reduce((a, b) => +a + +b, 0)>y.data.results.reduce((a, b) => +a + +b, 0)
      ? 1 : 0)
    }
    this.setState({ polls, dateSort:null, nameSort: null, voteSort })
  }
  dateSorter() {
    let dateSort = ""
    this.state.dateSort=="down" ? dateSort = "up" : dateSort = "down"
    let polls = this.state.polls.concat()
    if (dateSort=="down"){
      polls.sort((x,y)=> x.date < y.date ? 1 : x.date > y.date ? -1 : 0)
    }
    else{
      polls.sort((x,y)=> x.date < y.date ? -1 : x.date > y.date ? 1 : 0)
    }
    this.setState({ polls, dateSort, nameSort: null, voteSort: null })
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
              <th><button onClick={this.nameSorter.bind(this)}><span class={"glyphicon glyphicon-menu-"+this.state.nameSort} aria-hidden="true" /> Name</button></th>
              <th><button onClick={this.voteSorter.bind(this)}><span class={"glyphicon glyphicon-menu-"+this.state.voteSort} aria-hidden="true" /> Votes</button></th>
              <th><button onClick={this.dateSorter.bind(this)}><span class={"glyphicon glyphicon-menu-"+this.state.dateSort} aria-hidden="true" /> Date</button></th>
              <th>Settings</th>
            </tr>
          </thead>
          <tbody>
            {this.state.loaded ? this.state.polls.map( (poll, i) => {
              return (
                <tr key={"tr-"+i}>
                  <td key={"td2-"+i}><Link to={"/u/"+poll.users.creator+"/"+poll._id}>{poll.data.title}</Link></td>
                  <td key={"td3-"+i}>{poll.data.results.reduce((a, b) => +a + +b, 0)}</td>
                  <td key={"td4-"+i}>{this.prettyDate(poll.date)}</td>
                  <td key={"td5-"+i}>
                    <Link to={"/u/"+poll.users.creator+"/"+poll._id+'?edit'}  key={"edit-"+i} type="reset" class="btn btn-sm btn-default" style={{marginRight: '5px'}}>Edit</Link>
                    <button id={"delete-"+i} key={"delete-"+i} class="btn btn-sm btn-danger" onClick={this.delete.bind(this)}>Delete</button>
                  </td>
                </tr>
                )
              }) : ""
            }
          </tbody>
        </table>
          {this.state.polls.length > 0 ? "" : <Link to="create" style={{display: 'block', width: '300'}} class="btn btn-primary btn-lg centered">Create First Poll</Link>}
      </div>
      )
    }
}
