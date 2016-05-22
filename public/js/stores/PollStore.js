import { EventEmitter } from 'events'
import $ from 'jquery'

import dispatcher from '../dispatcher'

class PollStore extends EventEmitter {
  constructor() {
    super()
    this.id = 0
    this.polls = [ ]
    this.loaded = false
  }

  getId() {
    return this.id
  }

  getLoad() {
    return this.loaded
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
    switch(action.type) {
      case "CREATE_POLL": {//TODO MOVE FROM create.js - done?
        this.id = action.result.id
        this.emit("change")
        break
      }
      case "FETCH_POLLS": {
        this.loaded = false
        break
      }
      case "RECEIVE_POLLS": {
        this.polls = action.json
        this.emit("change")
        break
      }
      case "POLLS_LOADED": {
        this.loaded = true
        console.log("loaded_polls");
        this.emit("load_change")
        break
      }
      case "VOTE": {
        this.emit("change")
        break
      }
      case "DELETE_POLL": {
        this.emit("change")
        break
      }
      case "EDIT_POLL": {
        this.emit("change")
        break
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
// window.dispatcher = dispatcher//TODO for testing
export default pollStore
