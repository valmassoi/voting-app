import React from 'react'
import { Link } from 'react-router'
import $ from 'jquery'
import * as PollAction from '../actions/PollAction'
import PollStore from '../stores/PollStore'

//TODO check for Login, MOOOVEE TO ACTIONS
export default class Create extends React.Component {
  constructor(props) {
   super(props);

    this.state = {
      title: "",
      options: ["iPhone", "Android"],
      id: 0
    }
  }

  componentWillMount() {
    PollStore.on("change", this.setId.bind(this))
  }

  componentWillUnmount() {
    PollStore.removeAllListeners("change")
  }

  setId() {
    this.setState({
      id: PollStore.getId()
    })
  }

  addOption() {
    let options = this.state.options
    if (options.length>19)
      console.log("too many")
    else{
      options.push("New option")
      this.setState({ options: options })
    }
  }

  removeOption() {
    let options = this.state.options
    if (options.length<3)
      console.log("keep 2")
    else{
      options.pop()
      this.setState({ options: options })
    }
  }

  reset() {
    let options = ["iPhone", "Android"]
    this.setState({ options: options })
  }

  submit() {//TODO move to flux actions?
    let { title, options } = this.state
    PollAction.createPoll(title, options)//TODO MORE DATA, user ect
    $("#success-alert").removeClass("hidden")//TODO check if true
  }

  handleTitleChange(event) {
   this.setState({title: event.target.value.substr(0, 30)});
  }
  handleOptionChange(event) {//BUG weird on iPhone auto complete
    let id = event.target.id,
        i = id[id.length -1],
        options = this.state.options
    options[i] = event.target.value
    this.setState({ options });
  }

  render() {
    let formBtns = {
      float: 'right !important',
      marginRight: '16px'
    }

    return(
      <div>
      <div class="title">
        <h1> Create a new poll </h1>
      </div>
      <div class="alerts">
        <div id="success-alert" class="alert alert-dismissible alert-success hidden" style={{width: '400px'}}>
          <button type="button" class="close" data-dismiss="alert">&times;</button>
          <strong>Success!</strong> Your poll can be viewed at <Link to={"/u/username/"+ this.state.id}>TestPollurl</Link>
        </div>
      </div>
      <div class="form-container centered">
        <form class="form-horizontal">
          <fieldset>
            <legend>New poll</legend>
            <div class="form-group">
              <label class="col-lg-2 control-label"><b>Title</b></label>{/*for="inputEmail" */}
              <div class="col-lg-10">
                <input class="form-control" id="inputTitle" placeholder="iPhone or Android?" type="text" value={this.state.title} onChange={this.handleTitleChange.bind(this)}/>
              </div>
            </div>
            {this.state.options.map((placeholder, i) => {
              return(
                <div class="form-group" key={"div1-"+i}>
                  <label class="col-lg-2 control-label" key={"optionLabel"+i}>Option {i+1}</label>
                  <div class="col-lg-10" key={"div2-"+i}>
                    <input class="form-control" key={"option"+i} id={"option"+i} placeholder={placeholder} type="text" onChange={this.handleOptionChange.bind(this)} />
                  </div>
                </div>
              )
             }
            )}
            <div class="form-group">
              <div class="col-lg-10 col-lg-offset-2">
                <button class="btn btn-primary btn-sm" onClick={this.addOption.bind(this)}><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
                <button class="btn btn-default btn-sm" style={{marginLeft: '5px'}} onClick={this.removeOption.bind(this)}><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button>
              </div>
            </div>
            <div class="form-group">
              <div style={formBtns}>
                <button type="reset" class="btn btn-default" onClick={this.reset.bind(this)}>Reset</button>
                <button type="submit" style={{marginLeft: '10px'}} class="btn btn-primary" onClick={this.submit.bind(this)}>Submit</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
    )
  }
}
