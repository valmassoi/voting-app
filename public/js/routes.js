import React from "react"
import ReactDOM from "react-dom"
import { Router, Route, IndexRoute, hashHistory } from "react-router"

import Create from "./pages/Create"
import Home from "./pages/Home"
import Layout from "./pages/Layout"
import Signup from "./pages/Signup"

const app = document.getElementById('app')

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="create" component={Create}></Route>
      <Route path="signup" component={Signup}></Route>
    </Route>
  </Router>,
app)
