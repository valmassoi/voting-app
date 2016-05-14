import { EventEmitter } from "events"

class PollStore extends EventEmitter {
  constructor() {
    this.polls = [

    ]
  }
  getAll(){
    return this.polls
  }
}

const pollStore = new PollStore

export default pollStore
