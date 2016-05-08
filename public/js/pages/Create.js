import React from "react"
import { Link } from "react-router"

// const BadLanguageFilter = require('bad-language-filter')

export default class Create extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     title: "",
     options: ["iPhone", "Android"]
   }
 }
  langFilter(words){
    // const filter = new BadLanguageFilter()
    // let clean = console.log(filter.replaceWords(words + " ", "naughty-word "))
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
  removeOption(){
    let options = this.state.options
    if (options.length<3)
      console.log("keep 2")
    else{
      options.pop()
      this.setState({ options: options })
    }
  }
  reset(){
    let options = ["iPhone", "Android"]
    this.setState({ options: options })
  }
  submit(){
    let { title, options } = this.state
    console.log(title, options);
    $.post( "http://pulls.herokuapp.com/api/polls/POST", { title, options } );//TODO alert user, CHANGE URL,
  }
  alertUser(){
    if (true){

    }
  }
  handleTitleChange(event) {
   this.setState({title: event.target.value.substr(0, 20)});
  }
  handleOptionChange(event) {
    let id = event.target.id
    let i = id[id.length -1]
    let options = this.state.options
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
      <div class="alert alert-dismissible alert-success centered" style={{width: '400px', marginTop: '10px'}}>
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <strong>Success!</strong> Your poll can be viewed at <Link to="poll">TestPollurl</Link>
      </div>
      <div class="form-container centered">
        <form class="form-horizontal">
          <fieldset>
            <legend>New poll</legend>
            <div class="form-group">
              <label class="col-lg-2 control-label"><b>Title</b></label>{/*<!-- for="inputEmail" -->*/}
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
