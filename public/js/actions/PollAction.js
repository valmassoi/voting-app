import dispatcher from '../dispatcher'
import $ from 'jquery'

export function createPoll(title, options) {
  const url = 'http://192.168.1.48:8081/api/polls/POST'//TODO CHANGE URL
  $.ajax({
    type: "POST",
    url: url,
    data: { title, options },
    success: dispatcher.dispatch({type: "CREATE_POLL"}),
    dataType: "json"
  })
}

export function loadPolls(sortby) {
  // dispatcher.dispatch({type: "FETCH_POLLS"})TODO DELETE? ->for loader
  const url = 'http://192.168.1.48:8081/api/polls' //TODO change url
  $.getJSON(url, (json) => {
    dispatcher.dispatch({type: "RECEIVE_POLLS", json})
  })
}

export function vote(option) {
  dispatcher.dispatch({type: "VOTE"})
  //TODO Build backendpoint
}


export function deletePoll(id) {
  //TODO Build backendpoint 
  const url = 'http://192.168.1.48:8081/api/polls/DELETE'//TODO CHANGE URL
  $.ajax({
    type: "POST",
    url: url,
    data: { id },
    success: dispatcher.dispatch({type: "DELETE_POLL"}),
    dataType: "json"
  })
}
