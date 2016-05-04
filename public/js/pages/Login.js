import React from "react"
import { Link } from "react-router"

export default class Login extends React.Component {

  login(){
    //TODO check if valid
  }

  render(){
    const findmeprop = "testin props"
    let formBtns = {
      float: 'right !important',
      marginRight: '16px'
    },
    twitterBtn = {
      margin: '10px'
    }
    return(
      <div>
        <div class="title">
          <h1> Login </h1>
          <Link to="dashboard" class="btn btn-default btn-lg" onClick={this.login.bind(this)}>Login Toggl</Link>
        </div>
        <button type="reset" class="btn btn-primary btn-sm" style={twitterBtn}>Signin with Twitter</button>
        <div class="form-container centered">
          <form class="form-horizontal">
            <fieldset>
              <legend>Login to Account</legend>
              <div class="form-group">
                <label class="col-lg-2 control-label" for="inputEmail"><b>Email</b></label>
                <div class="col-lg-10">
                  <input class="form-control" id="inputEmail" placeholder="rvalmassoi@gmail.com" type="text" />
                </div>
              </div>
              <div class="form-group">
                <label for="inputPassword" class="col-lg-2 control-label"><b>Password</b></label>
                <div class="col-lg-10">
                  <input class="form-control" id="inputPassword" placeholder="Password" type="password" />
                </div>
              </div>
              <div class="form-group">
                <div style={formBtns}>
                  <button type="reset" class="btn btn-default">Reset</button>
                  <button type="submit" style={{marginLeft: '10px'}} class="btn btn-primary">Signin</button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    )
  }
}
