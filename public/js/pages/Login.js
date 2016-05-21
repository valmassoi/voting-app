import React from "react"
import { Link } from "react-router"
import createHashHistory from 'history/lib/createHashHistory'
import { isValidPassword as passCheck } from "../utilities/hash"
import * as UserAction from '../actions/UserAction'
import UserStore from '../stores/UserStore'
// import Nav from "../components/Nav"

const history = createHashHistory({ queryKey: false })

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
         email: "",
         password: "",
         loadedHash: false
      }
  }

  componentWillMount() {
    UserStore.on("change", this.setHash.bind(this))
  }

  componentWillUnmount() {
    UserStore.removeAllListeners("change")
  }

  setHash() {
    console.log("sethash");
    this.setState({
      hash: UserStore.getHash(),
      loadedHash: true
    })
    this.checkHash()
  }

  checkHash() {
    let { password, hash, email } = this.state
    console.log("hash:", hash);
    if(hash=="error: no user")
      window.alert("Email does not exist.\nTry again or create an account")
    else if(passCheck(password, hash)){
      console.log("valid pass --> login");
      localStorage.setItem("_polley_user_email", email)
      localStorage.setItem("_polley_loggedIn", true)
      setTimeout(function() {//TODO timeout fixes err:Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch UGGGGLLLLLLYYYYYY use a promise?
        UserAction.login(email);
      }, 1);
      history.push('/dashboard')
    }
    else{
      window.alert("Error: Password did not match")
    }
  }

  handleEmailChange(event) {
//TODO CHECK VAILID EMAIL see signup
    this.setState({ email: event.target.value })
  }
  handlePasswordChange(event) {
    let password = event.target.value
    this.setState({ password })
  }

  login(e) {
    e.preventDefault()
    let { email } = this.state
    UserAction.getUser(email)//TODO ONLY RUN ONCE TO GET HASH, NOT EACH TIME and only if pass and email
  }

  twitterSignin() {
    window.alert("Feature coming soon")
  }

  render() {
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
        </div>
        <button type="reset" class="btn btn-primary btn-sm" onClick={this.twitterSignin.bind(this)} style={twitterBtn}>Signin with Twitter</button>
        <div class="form-container centered">
          <form class="form-horizontal" onSubmit={this.login.bind(this)}>
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
