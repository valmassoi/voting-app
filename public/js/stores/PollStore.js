import { EventEmitter } from 'events'
import $ from 'jquery'

import dispatcher from '../dispatcher'

class PollStore extends EventEmitter {
  constructor() {
    super()
    this.polls = [ ]
  }

  getAll() {
    return this.polls
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_POLL": {//TODO MOVE FROM create.js
        this.emit("change")
      }
      case "RECEIVE_POLLS": {
        this.polls = action.json
        this.emit("change")
      }
      case "VOTE": {

      }
      case "DELETE_POLL": {

      }
      case "EDIT_POLL": {

      }
    }
  }

  componentWillUnmount() {
    console.log("unmount poll");
    this.serverRequest.abort()//TODO ???
  }

}

const pollStore = new PollStore
dispatcher.register(pollStore.handleActions.bind(pollStore))
// window.pollStore = pollStore//TODO for testing
window.dispatcher = dispatcher//TODO for testing
export default pollStore
