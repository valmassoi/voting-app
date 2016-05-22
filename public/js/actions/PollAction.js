import dispatcher from '../dispatcher'
import $ from 'jquery'
const local = 'http://192.168.1.108:8081'//TODO CHANGE URL

export function createPoll(title, options, creator) {
  const url = local+'/api/polls/POST'
  $.ajax({
    type: "POST",
    url: url,
    data: { title, options, creator },
    success: result => dispatcher.dispatch({type: "CREATE_POLL", result}),
    dataType: "json"
  })
}

export function loadPolls(sortby) {
  dispatcher.dispatch({type: "FETCH_POLLS"})
  const url = local+'/api/polls'
  $.getJSON(url, (json) => {
    dispatcher.dispatch({type: "RECEIVE_POLLS", json})
  }).done(function() {
    dispatcher.dispatch({type: "POLLS_LOADED"})
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

export function addOption(options, results, id) {
  const url = local+'/api/polls/OPTION'
  $.ajax({
    type: "POST",
    url: url,
    data: { options, results, id },
    success: () => dispatcher.dispatch({type: "ADD_OPTION"}),
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
