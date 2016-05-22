import { EventEmitter } from 'events'
import $ from 'jquery'

import dispatcher from '../dispatcher'

class UserStore extends EventEmitter {
  constructor() {
    super()
    this.hash = ""
    this.email = ""
    this.users = [ ]
    this.ip = ""
  }

  getUsers() {
    return this.users
  }

  getIp() {
    return this.ip
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
      case "GOT_USERS": {
        this.users = action.users
        break
      }
      case "GOT_IP": {
        this.ip = action.ip
        break
      }
      case "LOGIN": {
        this.email = action.email
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
window.userStore = userStore//TODO for testing
window.dispatcher = dispatcher//TODO for testing
export default userStore
