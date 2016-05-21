import dispatcher from '../dispatcher'
import $ from 'jquery'
const local = 'http://172.20.10.8:8081'//TODO CHANGE URL

export function createUser(email, hash) {
  const url = local+'/api/POST/USER'
  $.ajax({
    type: "POST",
    url,
    data: { email, hash },
    success: (result) => dispatcher.dispatch({type: "CREATE_USER"}),//, user: result.user}),
    dataType: "json"
  })
}

export function getUser(email) {
  const url = local+'/api/GET/USER/'+email
  $.getJSON(url, (hash) => {
    dispatcher.dispatch({type: "GOT_HASH", hash: hash})
  })
}

export function login(email) {
  dispatcher.dispatch({type: "LOGIN", email: email})
}

export function logout() {
  dispatcher.dispatch({type: "LOGOUT"})
}
