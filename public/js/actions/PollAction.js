import dispatcher from '../dispatcher'
import $ from 'jquery'

export function loadPolls(sortby) {
  dispatcher.dispatch({type: "FETCH_POLLS"})
  const url = '/api/polls' //TODO change url
  $.getJSON(url, (json) => {
    dispatcher.dispatch({type: "RECEIVE_POLLS", json})
  })
}
