import React from "react"
import { IndexLink, Link } from "react-router"

export default class Nav extends React.Component {
  constructor() {
   super()
   this.state = {
     collapsed: true,
   }
 }

 toggleCollapse() {
   console.log("collapse");
   const collapsed = !this.state.collapsed
   this.setState({collapsed})
 }

  render(){
    const { location } = this.props
    const { collapsed } = this.state
    const homeClass = location.pathname === "/" ? "active" : ""
    const createClass = location.pathname.match(/^\/create/) ? "active" : ""
    const signupClass = location.pathname.match(/^\/signup/) ? "active" : ""
    const navClass = collapsed ? "collapse" : ""
    return(
      <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Polley</a>
          </div>

          <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-2">
            <ul class="nav navbar-nav">
              <li class={homeClass}><IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Home</IndexLink></li>
              <li class={createClass}><Link to="create" onClick={this.toggleCollapse.bind(this)}>New Poll</Link></li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Sort by <span class="caret"></span></a>
                <ul class="dropdown-menu" role="menu">
                  <li><a href="#">Recent</a></li>
                  <li><a href="#">Popular</a></li>
                  <li><a href="#">Random</a></li>
                  <li class="divider"></li>
                  <li><a href="#">Separated link</a></li>
                </ul>
              </li>
            </ul>
            <form class="navbar-form navbar-left" role="search">
              <div class="form-group">
                <input class="form-control" placeholder="Search" type="text" />
              </div>
              <button type="submit" class="btn btn-default"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
            </form>
            <ul class="nav navbar-nav navbar-right">
              <li><a href="#">Login</a></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
