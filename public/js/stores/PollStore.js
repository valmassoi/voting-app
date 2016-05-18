import { EventEmitter } from 'events'
import $ from 'jquery'

import dispatcher from '../dispatcher'

class PollStore extends EventEmitter {
  constructor() {
    super()
    this.id = 0
    this.polls = [ ]
  }

  getId() {
    return this.id
  }

  getPoll(id) {//BETTER TO SEARCH DB???
    return this.polls[0]
  }

  getAll() {
    return this.polls
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_POLL": {//TODO MOVE FROM create.js
        //GET ID TO PASS BACK TO CREATE POLL for url
        this.id = action.id
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
