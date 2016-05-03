import React from "react"
// const BadLanguageFilter = require('bad-language-filter')

export default class Create extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
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

  render() {
    return(
      <div>
      <div class="onboard">
        <h1> Create a new poll </h1>
      </div>
        <div class="form-container centered">
          <form class="form-horizontal">
            <fieldset>
              <legend>New poll</legend>
              <div class="form-group">
                <label class="col-lg-2 control-label"><b>Title</b></label>{/*<!-- for="inputEmail" -->*/}
                <div class="col-lg-10">
                  <input class="form-control" id="inputTitle" placeholder="iPhone or Android?" type="text" />
                </div>
              </div>
              {this.state.options.map((placeholder, i) => {
                return(
                  <div class="form-group" key={"div1-"+i}>
                    <label class="col-lg-2 control-label" key={"optionLabel"+i}>Option {i+1}</label>
                    <div class="col-lg-10" key={"div2-"+i}>
                      <input class="form-control" key={"option"+i} placeholder={placeholder} type="text" />
                    </div>
                  </div>
                )
               }
              )}
              <div class="form-group">
                <div class="col-lg-10 col-lg-offset-2">
                  <button class="btn btn-primary btn-sm" onClick={this.addOption.bind(this)}><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
                  <button class="btn btn-default btn-sm" onClick={this.removeOption.bind(this)}><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button>
                </div>
              </div>
              <div class="form-group">
                <div class="col-lg-10 col-lg-offset-2" style={{float: 'right !important'}}>
                  <button type="reset" class="btn btn-default" onClick={this.reset.bind(this)}>Reset</button>
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    )
  }
}
