import React from "react"
import { Link } from "react-router"

import Footer from "../components/Footer"
import Nav from "../components/Nav"

export default class Layout extends React.Component {

  componentDidMount() {
    
    //    let userName = localStorage.getItem("_polley_user_email");
    //  console.log(userName);
   }

  render(){
    // console.log(this.props);
    const { location } = this.props
    return(
      <div>
        <Nav location={location} />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}
