import React from "react"
import { Link } from "react-router"

export default class Dashboard extends React.Component {
  render(){
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
    <tr>
      <td>1</td>
      <td><Link to="poll">iPhone vs Android</Link></td>
      <td>100</td>
      <td>May 4, 2016</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
    </tr>
  </tbody>
</table>
      </div>
    )
  }
}
