import React from "react"
import ReactDOM from "react-dom"
import { Router, Route, IndexRoute } from "react-router"
import createHashHistory from 'history/lib/createHashHistory'
// require("../styles/main.sass")

import Create from "./pages/Create"
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import Layout from "./pages/Layout"
import Login from "./pages/Login"
import Password from "./pages/Password"
import Poll from "./pages/Poll"
import Signup from "./pages/Signup"

const app = document.getElementById('app')

const history = createHashHistory({ queryKey: false })

ReactDOM.render(
  <Router history={history}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="/sort/:sortby" component={Home}></Route>
      <Route path="create" component={Create}></Route>
      <Route path="signup" component={Signup}></Route>
      <Route path="password" component={Password}></Route>
      <Route path="login" component={Login}></Route>
      <Route path="dashboard" component={Dashboard}></Route>
      <Route path="u/:username/:pollname" component={Poll}></Route>
    </Route>
  </Router>,
app)
