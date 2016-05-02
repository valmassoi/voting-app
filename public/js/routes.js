import React from "react"
import ReactDOM from "react-dom"
import { Router, Route, IndexRoute, hashHistory } from "react-router"

import Home from "./pages/Home"

const app = document.getElementById('app')

ReactDOM.render(<Home/>, app);
