import { EventEmitter } from 'events'
import $ from 'jquery'

import dispatcher from '../dispatcher'

class UserStore extends EventEmitter {
  constructor() {
    super()
    this.hash = "",
    this.email = ""
  }

  getHash() {
    return this.hash
  }
  getEmail() {
    return this.email
  }

  handleActions(action) {
    console.log(action.type);
    switch(action.type) {
      case "CREATE_USER": {
        this.emit("change")
        break
      }
      case "GOT_HASH": {
        this.hash = action.hash
        this.emit("change")
        break
      }
      case "LOGIN": {
        this.email = action.email
        console.log("LOGIN",this.email);
        this.emit("login_change")
        break
      }
      case "LOGOUT": {
        this.email = ""
        this.emit("login_change")
        break
      }
    }

  }

  componentWillUnmount() {
    console.log("unmount user");
    this.serverRequest.abort()//TODO ???
  }

}

const userStore = new UserStore
dispatcher.register(userStore.handleActions.bind(userStore))
// window.userStore = userStore//TODO for testing
// window.dispatcher = dispatcher//TODO for testing
export default userStore
