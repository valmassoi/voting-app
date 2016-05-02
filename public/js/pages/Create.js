import React from "react"

export default class Create extends React.Component {
  render(){
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
              <div class="form-group">
                <label class="col-lg-2 control-label">Option 1</label>
                <div class="col-lg-10">
                  <input class="form-control" id="option1" placeholder="iPhone" type="text" />
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-2 control-label">Option 2</label>
                <div class="col-lg-10">
                  <input class="form-control" id="option2" placeholder="Android" type="text" />
                </div>
              </div>
              <div class="form-group">
                <div class="col-lg-10 col-lg-offset-2">
                  <a href="#" class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></a>
                </div>
              </div>
              <div class="form-group">
                <div class="col-lg-10 col-lg-offset-2" style={{float: 'right !important'}}>
                  <button type="reset" class="btn btn-default">Cancel</button>
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
