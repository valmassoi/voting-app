import React from "react"
import { Link } from "react-router"

export default class Dashboard extends React.Component {
  render(){
    let fakeUser = "rvalmassoi"
    let fakeData = [
      {
        title: "iPhone vs Android",
        count: 100,
        date: "May 4, 2016"
      },
      {
        title: "someother",
        count: 20,
        date: Date.now()
      },
      {
        title: "iPhone vs Android",
        count: 100,
        date: "May 4, 2016"
      }
    ]
    return(
      <div>
        <div class="title">
          <h1><span class="glyphicon glyphicon-stats" aria-hidden="true"></span> Dashboard</h1>
        </div>
        <table class="table table-striped table-hover ">
  <thead>
    <tr>
      <th>#</th>
      <th>Poll Name</th>
      <th>Vote Count</th>
      <th>Date Added</th>
    </tr>
  </thead>
  <tbody>
  {fakeData.length>0 ? fakeData.map( (data, i) => {
       return (
        <tr>
          <td>{i+1}</td>
          <td><Link to={"/u/"+fakeUser+"/"+fakeData[i].title}>{fakeData[i].title}</Link></td>
          <td>{fakeData[i].count}</td>
          <td>{fakeData[i].date}</td>
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
