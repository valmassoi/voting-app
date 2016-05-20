import React from "react"
import { Link } from "react-router"
import createHashHistory from 'history/lib/createHashHistory'
import { generateHash } from "../utilities/hash"
import { checkEmail } from "../utilities/emailValidation"
import owasp from "owasp-password-strength-test"
import * as UserAction from '../actions/UserAction'
import UserStore from '../stores/UserStore'

const history = createHashHistory({ queryKey: false })

owasp.config({
  allowPassphrases       : true,
  maxLength              : 128,
  minLength              : 7,
  minPhraseLength        : 15,
  minOptionalTestsToPass : 2,
});

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
         email: "",
         password: "",
         passwordTwo: "",
         error: "",
         passwordSuccess: "",
         passwordTwoSuccess: "",
         validEmail: ""
      }
  }

  handleEmailChange(e) {
    let test = checkEmail(e.target.value),
        validEmail=""
    if(test)
      validEmail="has-success"
    this.setState({ email: e.target.value, validEmail })//TODO set email
  }

  handlePasswordChange(e) {
    let password = e.target.value,
        passwordSuccess = ""
    console.log(owasp.test(password).strong);
    if (owasp.test(password).strong)
      passwordSuccess = "has-success"
    this.setState({ password, passwordSuccess })
    this.passwordSame(password, this.state.passwordTwo)
  }

  handlePasswordTwoChange(e) {
    let passwordTwo = e.target.value,
        passwordTwoSuccess = ""
    this.setState({ passwordTwo })
    this.passwordSame(this.state.password, passwordTwo)
  }

  twitterSignin() {
    window.alert("Feature coming soon")
  }

  submit(e) {
    e.preventDefault()
    let { email, password, passwordTwo} = this.state
    let passTest = owasp.test(password)
    if(!passTest.strong) {
      let reqLoop = "",
          optionalLoop = ""
      passTest.requiredTestErrors.forEach(a=> reqLoop+=a.slice(0, -1)+"\n and ")
      passTest.optionalTestErrors.forEach(b=> optionalLoop+=b.slice(0, -1)+"\n or ")
      let errors = "\n" + reqLoop +"one of the following:\n"+ optionalLoop.slice(0, -4)
      window.alert(`Password is not strong! ${errors}`)//change to bootstrap alert
    }
    else if(password != passwordTwo) {
      this.setState({ error: "has-error" })
      window.alert("Passwords are not the same, please try again")//change to bootstrap alert
    }
    else if(!checkEmail(this.state.email)) {
      this.setState({ validEmail: "has-error" })
      window.alert("Not a valid email, please try again")//change to bootstrap alert
    }
    else {
      let hash = generateHash(password)
      this.setState({ passwordSuccess: "has-success" })//not needed bcuz push
      UserAction.createUser(email, hash)
      history.push('/dashboard')
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
          <form class="form-horizontal" onSubmit={this.submit.bind(this)}>
            <fieldset>
              <legend>New Account</legend>
              <div class={"form-group " + this.state.validEmail}>
                <label class="col-lg-2 control-label" for="inputEmail"><b>Email</b></label>
                <div class="col-lg-10">
                  <input class="form-control" id="inputEmail" placeholder="polleyMcPollface@gmail.com" type="text" onChange={this.handleEmailChange.bind(this)} />
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
                  <button type="submit" style={{marginLeft: '10px'}} class="btn btn-primary">Create Account</button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    )
  }
}
