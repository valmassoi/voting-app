import { EventEmitter } from 'events'
import $ from 'jquery'

import dispatcher from '../dispatcher'

class UserStore extends EventEmitter {
  constructor() {
    super()
    this.hash = "",
    this.email = ""//change to localStorage.getItem("_polley_user_email")
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
        break
      }
      case "GOT_HASH": {
        this.hash = action.hash
        break
      }
      case "LOGIN": {
        this.email = action.email
        break
      }
      case "LOGOUT": {
        this.email = ""
        break
      }
    }
    this.emit("change")
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
