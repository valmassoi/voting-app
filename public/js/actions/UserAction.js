import dispatcher from '../dispatcher'
import $ from 'jquery'
const local = ''//TODO CHANGE URL http://192.168.1.108:8081

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

export function getUsers() {
  const url = local+'/api/GET/USERS/'
  $.getJSON(url, (users) => {
    dispatcher.dispatch({type: "GOT_USERS", users})
  })
}

export function getIp() {
  const url = local+'/api/GET/IP/'
  $.getJSON(url, (ip) => {
    dispatcher.dispatch({type: "GOT_IP", ip})
  })
}

export function login(email) {
  dispatcher.dispatch({type: "LOGIN", email: email})
}

export function logout() {
  dispatcher.dispatch({type: "LOGOUT"})
}
