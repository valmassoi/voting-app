import dispatcher from '../dispatcher'
import $ from 'jquery'
const local = ''//TODO CHANGE URL

export function createPoll(title, options) {
  const url = local+'/api/polls/POST'
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
  const url = local+'/api/polls'
  $.getJSON(url, (json) => {
    dispatcher.dispatch({type: "RECEIVE_POLLS", json})
  })
}

export function vote(id, vote) {//TODO CHECK IP/store //TODO Build backendpoint
  const url = local+'/api/polls/VOTE'
  $.ajax({
    type: "POST",
    url: url,
    data: { id, vote },
    success: (result) => dispatcher.dispatch({type: "VOTE"}),
    dataType: "json"
  })
}

export function deletePoll(id) {
  const url = local+'/api/polls/DELETE'
  $.ajax({
    type: "POST",
    url: url,
    data: { id },
    success: dispatcher.dispatch({type: "DELETE_POLL"}),
    dataType: "json"
  })
}
