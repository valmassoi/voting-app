import React from "react"
import { Link } from "react-router"
//TODO DELETE/EDIT
export default class Dashboard extends React.Component {

  delete() {

  }

  render() {
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
      <th> </th>
      <th>Poll Name</th>
      <th>Votes</th>
      <th>Date Added</th>
      <th>Settings</th>
    </tr>
  </thead>
  <tbody>
  {fakeData.length>0 ? fakeData.map( (data, i) => {//TODO KEYS
       return (
        <tr>
          <td>{i+1}</td>
          <td><Link to={"/u/"+fakeUser+"/"+fakeData[i].title}>{fakeData[i].title}</Link></td>
          <td>{fakeData[i].count}</td>
          <td>{fakeData[i].date}</td>
          <td>
            <Link to={"/u/username/"+fakeData[i].title+'?edit'} type="reset" class="btn btn-sm btn-default" style={{marginRight: '5px'}}>Edit</Link>
            <button class="btn btn-sm btn-danger" onClick={this.delete.bind(this)}>Delete</button>
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
