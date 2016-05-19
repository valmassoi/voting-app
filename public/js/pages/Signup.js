import React from "react"
import { Link } from "react-router"
import createHashHistory from 'history/lib/createHashHistory'
import { generateHash } from "../utilities/hash"
import owasp from "owasp-password-strength-test"
import * as UserAction from '../actions/UserAction'
import UserStore from '../stores/UserStore'

const history = createHashHistory({ queryKey: false })

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
         email: "",
         password: "",
         passwordTwo: "",
         error: "",
         passwordSuccess: "",
         passwordTwoSuccess: ""
      }
  }

  handleEmailChange(event) {
    console.log(event.target.value);//TODO CHECK VAILID EMAIL
  }

  handlePasswordChange(event) {
    //TODO owasp-password-strength-test
    let password = event.target.value,
        passwordSuccess = ""
    // console.log(owasp.test(password));
    if (owasp.test(password).strong)
      passwordSuccess = "has-success"
    this.setState({ password, passwordSuccess })
    this.passwordSame(password, this.state.passwordTwo)
  }

  handlePasswordTwoChange(event) {
    let passwordTwo = event.target.value,
        passwordTwoSuccess = ""
    this.setState({ passwordTwo })
    this.passwordSame(this.state.password, passwordTwo)
  }

  twitterSignin() {
    window.alert("Feature coming soon")
  }

  submit() {
    let { email, password, passwordTwo} = this.state
    if (password != passwordTwo){
      this.setState({ error: "has-error" })
      //alert
    }
    else{
      console.log(email, password, passwordTwo) //TODO CHECK IF ALL IS GOOD
      let hash = generateHash(password)
      this.setState({ passwordSuccess: "has-success" })
      console.log(hash)
      //TODO push data to mongo
      //route to dash
      history.push('/dashboard');
    }
  }

  passwordSame(password, passwordTwo){
    let passwordTwoSuccess = ""
    if (password == passwordTwo && password.length > 2)
      passwordTwoSuccess = "has-success"
    else
      passwordTwoSuccess = ""
    this.setState({ passwordTwoSuccess })
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
          <h1> Create a new account </h1>
        </div>
        <button onClick={this.twitterSignin.bind(this)} class="btn btn-primary btn-sm" style={twitterBtn}>Signin with Twitter</button>
        <div class="form-container centered">
          <form class="form-horizontal">
            <fieldset>
              <legend>New Account</legend>
              <div class="form-group">
                <label class="col-lg-2 control-label" for="inputEmail"><b>Email</b></label>
                <div class="col-lg-10">
                  <input class="form-control" id="inputEmail" placeholder="user@gmail.com" type="text" onChange={this.handleEmailChange.bind(this)} />
                </div>
              </div>
              <div class={"form-group " + this.state.error + this.state.passwordSuccess}>
                <label for="inputPassword" class="col-lg-2 control-label"><b>Password</b></label>
                <div class="col-lg-10">
                  <input class="form-control" id="inputPassword" placeholder="Password" type="password" onChange={this.handlePasswordChange.bind(this)} />
                </div>
              </div>
              <div class={"form-group " + this.state.error + this.state.passwordTwoSuccess}>
                <label for="inputPassword" class="col-lg-2 control-label"><b>Password</b></label>
                <div class="col-lg-10">
                  <input class="form-control" id="inputPassword" placeholder="Password again" type="password" onChange={this.handlePasswordTwoChange.bind(this)}/>
                </div>
              </div>
              <div class="form-group">
                <div style={formBtns}>
                  <button type="reset" class="btn btn-default">Reset</button>
                  <button type="button" style={{marginLeft: '10px'}} class="btn btn-primary" onClick={this.submit.bind(this)}>Create Account</button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    )
  }
}
