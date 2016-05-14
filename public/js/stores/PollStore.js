import { EventEmitter } from "events"
import $ from 'jquery'

class PollStore extends EventEmitter {
  constructor() {
    super()
    this.polls = [
      {
        id: 123,
        title: 'Poll',
        options: [],
        results: []
      },
    ]
  }
  createPoll() {
    const id = Date.now()//HACK
    const url = 'http://192.168.1.48:8081/api/polls' //TODO change to unquie poll AND move to PollStore
    console.log("create poll");
    this.serverRequest = $.getJSON(url, (json) => {
      console.log(json)
      const { title, options, results } = json.data
      this.polls.push({
        id,
        title,
        options,
        results
      })
      this.emit("change")
    })

  }
  getAll() {
    if (this.polls[1])//HACK testing
      return this.polls[1]
    else
      return this.polls[0]
  }


  componentDidMount() {

  }

  componentWillUnmount () {
    console.log("unmount poll");
    this.serverRequest.abort()//TODO ???
  }

}

const pollStore = new PollStore
window.pollStore = pollStore//TODO for testing
export default pollStore
