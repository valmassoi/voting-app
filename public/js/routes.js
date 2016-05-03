import React from "react"
import ReactDOM from "react-dom"
import { Router, Route, IndexRoute } from "react-router"
import createHashHistory from 'history/lib/createHashHistory'

import Create from "./pages/Create"
import Home from "./pages/Home"
import Layout from "./pages/Layout"
import Signup from "./pages/Signup"

const app = document.getElementById('app')

const history = createHashHistory({ queryKey: false })

ReactDOM.render(
  <Router history={history}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="create" component={Create}></Route>
      <Route path="signup" component={Signup}></Route>
    </Route>
  </Router>,
app)
