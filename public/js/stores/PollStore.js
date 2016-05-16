import { EventEmitter } from "events"
import $ from 'jquery'

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
      },
      {
        date: 1430784000,
        user:{
          username: 'rvalmassoi',
          ip: '192.168.1.1'
        },
        data:{
          title: 'chart 1 title',
          options: ['option11', 'option12', 'option 13'],
          results: [55, 1000, 3]
        }
      },
      {
        date: 1430784001,
        user:{
          username: 'asfdfdsa',
          ip: '192.168.0.1'
        },
        data:{
          title: 'chart 2 title',
          options: ['option1', 'option', 'option 3'],
          results: [55, 51, 55]
        }
      }
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
        id,//TODO CHANGE TO DATE and OTHER OPTIONS
        title,
        options,
        results
      })
      this.emit("change")
    })

  }
  getAll() {
      return this.polls
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
