import React from "react"
import { Link } from "react-router"

export default class Password extends React.Component {
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
  submit(){
    let { email, password, passwordTwo} = this.state
    if (password != passwordTwo){
      this.setState({ error: "has-error" })
      //alert
    }
    else{
      console.log(email, password, passwordTwo) //TODO CHECK IF ALL IS GOOD
      let hash = generateHash(password)
      console.log(hash)
      //TODO push data to mongo
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
          <h1> Account Settings </h1><p>Coming Soon</p>
          <Link to="dashboard" class="btn btn-default btn-lg">dashboard</Link>
        </div>
        <div class="form-container centered">
          <form class="form-horizontal">
            <fieldset>
              <legend>Change Account Password</legend>
              <div class="form-group">
                <label class="col-lg-2 control-label" for="inputEmail"><b>Old Password</b></label>
                <div class="col-lg-10">
                  <input class="form-control" id="inputEmail" placeholder="Old Password" type="text" onChange={this.handleEmailChange.bind(this)}/>
                </div>
              </div>
              <div class="form-group">
                <label for="inputPassword" class="col-lg-2 control-label"><b>New Password</b></label>
                <div class="col-lg-10">
                  <input class="form-control" id="inputPassword" placeholder="Password" type="password" onChange={this.handlePasswordChange.bind(this)}/>
                </div>
              </div>
              <div class="form-group">
                <label for="inputPassword" class="col-lg-2 control-label"><b>New Password</b></label>
                <div class="col-lg-10">
                  <input class="form-control" id="inputPassword" placeholder="Password" type="password" onChange={this.handlePasswordChange.bind(this)}/>
                </div>
              </div>
              <div class="form-group">
                <div style={formBtns}>
                  <button type="reset" class="btn btn-default">Reset</button>
                  <button type="button" style={{marginLeft: '10px'}} class="btn btn-primary">Change Password</button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    )
  }
}
