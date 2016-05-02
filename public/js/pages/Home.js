import React from "react"

export default class Home extends React.Component {
  render(){
    return(
      <div>
        <div class="onboard">
          <h1> Welcome to Polley, a real-time voting system. </h1>
          <h3> Create an account to get started </h3>
          <a href="#" class="btn btn-default btn-lg">Signup</a>
          <h5><span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span> or start browsing </h5>
        </div>
      </div>
    )
  }
}