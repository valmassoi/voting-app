import dispatcher from '../dispatcher'
import $ from 'jquery'
const local = 'http://192.168.1.48:8081'

export function createPoll(title, options) {
  const url = local+'/api/polls/POST'//TODO CHANGE URL
  $.ajax({
    type: "POST",
    url: url,
    data: { title, options },
    success: (result) => dispatcher.dispatch({type: "CREATE_POLL", id: result.id}),
    dataType: "json"
  })
}

export function loadPolls(sortby) {
  // dispatcher.dispatch({type: "FETCH_POLLS"})TODO DELETE? ->for loader
  const url = local+'/api/polls' //TODO change url
  $.getJSON(url, (json) => {
    dispatcher.dispatch({type: "RECEIVE_POLLS", json})
  })
}

export function vote(id, option) {//TODO CHECK IP
  dispatcher.dispatch({type: "VOTE"})
  //TODO Build backendpoint
}


export function deletePoll(id) {
  const url = local+'/api/polls/DELETE'//TODO CHANGE URL
  $.ajax({
    type: "POST",
    url: url,
    data: { id },
    success: dispatcher.dispatch({type: "DELETE_POLL"}),
    dataType: "json"
  })
}
