import React from "react"
import { Link } from "react-router"
import { isValidPassword as passCheck } from "../utilities/hash"

// import Nav from "../components/Nav"

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
         email: "",
         password: ""
      }
  }
  handleEmailChange(event) {
//TODO CHECK VAILID EMAIL
    this.setState({ email: event.target.value })
  }
  handlePasswordChange(event) {
    let password = event.target.value
    this.setState({ password })
  }
  login(){
    let { email, password} = this.state
    if(passCheck(password, '$2a$08$tj8TW9CUnfOBxGmhQMZRAuSMGr/cnQlATm5OcHscjEYwA5jZEfQoy')){//aaa --> to hash from db
      console.log("valid pass --> login");
      localStorage.setItem("_polley_user_email", this.state.email)
      localStorage.setItem("_polley_loggedIn", true)
      // Nav.setState({ loggedIn: false })
    }
    else{
      console.log("warn user");
    }
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
          <Link to="dashboard" class="btn btn-default btn-lg">go to dash</Link>
        </div>
        <button type="reset" class="btn btn-primary btn-sm" style={twitterBtn}>Signin with Twitter</button>
        <div class="form-container centered">
          <form class="form-horizontal">
            <fieldset>
              <legend>Login to Account</legend>
              <div class="form-group">
                <label class="col-lg-2 control-label" for="inputEmail"><b>Email</b></label>
                <div class="col-lg-10">
                  <input class="form-control" id="inputEmail" placeholder="rvalmassoi@gmail.com" type="text" onChange={this.handleEmailChange.bind(this)}/>
                </div>
              </div>
              <div class="form-group">
                <label for="inputPassword" class="col-lg-2 control-label"><b>Password</b></label>
                <div class="col-lg-10">
                  <input class="form-control" id="inputPassword" placeholder="Password" type="password" onChange={this.handlePasswordChange.bind(this)}/>
                </div>
              </div>
              <div class="form-group">
                <div style={formBtns}>
                  <button type="reset" class="btn btn-default">Reset</button>
                  <button type="button" style={{marginLeft: '10px'}} class="btn btn-primary" onClick={this.login.bind(this)}>Signin</button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    )
  }
}
