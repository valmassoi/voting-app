import dispatcher from '../dispatcher'
import $ from 'jquery'
const local = 'http://192.168.1.48:8081'//TODO CHANGE URL

export function createUser(email, password) {
  const url = local+'/api/polls/USER'
  $.ajax({
    type: "POST",
    url: url,
    data: { email, password },
    success: (result) => dispatcher.dispatch({type: "CREATE_USER", id: result.id}),
    dataType: "json"
  })
}

export function checkUser(sortby) {
  // dispatcher.dispatch({type: "FETCH_POLLS"})TODO DELETE? ->for loader
  const url = local+'/api/users'
  $.getJSON(url, (json) => {
    dispatcher.dispatch({type: "RECEIVE_USERS", json})
  })
}
