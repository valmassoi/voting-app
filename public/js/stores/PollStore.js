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
    function findPoll(polls){
      return polls._id===id
    }
    return this.polls.find(findPoll)
  }

  getAll() {
    return this.polls
  }

  handleActions(action) {
    console.log(action.type);
    switch(action.type) {
      case "CREATE_POLL": {//TODO MOVE FROM create.js - done?
        //GET ID TO PASS BACK TO CREATE POLL for url
        this.id = action.id
        break
      }
      case "RECEIVE_POLLS": {
        this.polls = action.json
        break
      }
      case "VOTE": {
        break
      }
      case "DELETE_POLL": {
        break
      }
      case "EDIT_POLL": {
        break
      }
    }
    this.emit("change")
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
