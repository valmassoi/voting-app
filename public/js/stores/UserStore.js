import { EventEmitter } from 'events'
import $ from 'jquery'

import dispatcher from '../dispatcher'

class UserStore extends EventEmitter {
  constructor() {
    super()
    this.id = 0
    this.users = [ ]
  }

  getId() {
    return this.id
  }

  getUser(id) {//BETTER TO SEARCH DB???
    function findUser(users){
      return users._id===id
    }
    return this.users.find(findUser)
  }

  getAll() {
    return this.users
  }

  handleActions(action) {
    console.log(action.type);
    switch(action.type) {
      case "CREATE_USER": {
        this.id = action.id
        break
      }
      case "RECEIVE_USERS": {
        this.users = action.json
        break
      }
      case "VOTE": {
        break
      }
      case "DELETE_USER": {
        break
      }
      case "EDIT_USER": {
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
window.dispatcher = dispatcher//TODO for testing
export default userStore
