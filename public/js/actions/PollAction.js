import dispatcher from '../dispatcher'
import $ from 'jquery'

export function loadPolls(sortby) {
  dispatcher.dispatch({type: "FETCH_POLLS"})
  const url = 'http://192.168.1.48:8081/api/polls' //TODO change url
  $.getJSON(url, (json) => {
    dispatcher.dispatch({type: "RECEIVE_POLLS", json})
  })
}
