import { EventEmitter } from 'events'
import $ from 'jquery'

import dispatcher from '../dispatcher'

class PollStore extends EventEmitter {
  constructor() {
    super()
    this.polls = [
      {
        date: 143078000,
        user:{
          username: 'someguy',
          ip: '192.068.1.1'
        },
        data:{
          title: 'chart 0 title',
          options: ['option1', 'option2', 'option 3'],
          results: [0, 1, 3]
        }
      }
    ]
  }
  createPoll() {
    this.emit("change")
  }

  loadPolls(json) {
    this.polls.push(json)
    this.emit("change")
  }

  getAll() {
    return this.polls
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_POLL": {
        this.createPoll(action.data)
      }
      case "RECEIVE_POLLS": {
        this.loadPolls(action.json)
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
