'use strict'

const path = require('path')
const express = require('express')
const http = require('http')
const mongo = require('mongodb').MongoClient
const cors = require('cors')
const bodyParser = require('body-parser')
const BadLanguageFilter = require('bad-language-filter')
const ObjectId = require('mongodb').ObjectID;

const app = express()

const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/data'

app.use(express.static(__dirname+'/public/'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

function langFilter(words){
  const filter = new BadLanguageFilter()
  let clean = filter.replaceWords(words + " ", "naughty-word ")
  return clean
}

function fetchpolls(sortby, callback) {
  mongo.connect(dbUrl, (err, db) => {
    if (err) throw err
    let polls = db.collection('polls')
    let data = polls.find().toArray((err, all) => {
      if (err) throw err
      callback(all)
      db.close()
    })
  })
}

function postPolls(title, username, ip, options, callback) {
  let poll = {
    date: Date.now(),
    user:{
      username: username,
      ip: ip
    },
    data:{
      title: title,
      options: options,
      results: options.map( () => 0 )
    }
  }

  mongo.connect(dbUrl, (err, db) => {
   if (err) throw err
   let polls = db.collection('polls')
   polls.insert(poll, (err, data) => {
      if (err) throw err
      let id=JSON.stringify(poll._id)
      callback(id)
      db.close()
    })
  })
}

function deletePoll(id) {
  mongo.connect(dbUrl, (err, db) => {
   if (err) throw err
   let polls = db.collection('polls')
   polls.remove( {"_id": ObjectId(id)});
   db.close()
 })
}

app.get('/api/polls', (req, res) => {
  // let params = req.params.param
  fetchpolls("date", (data) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    let json = JSON.stringify(data)
    res.end(json)
  })
})
app.post('/api/polls/POST', (req, res) => {
  postPolls(langFilter(req.body.title), "username", req.ip, req.body.options, (id) => {
    res.end('{"success" : "POST success", "id" : '+id+', "status" : 200}');
  })
  res.writeHead(200, { 'Content-Type':  'application/json' })
})
app.post('/api/polls/DELETE', (req, res) => {
  deletePoll(req.body.id)
  res.writeHead(200, { 'Content-Type':  'application/json' })
  res.end('{"success" : "POST success", "status" : 200}');
})
app.get('*', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('404!')
})

const port = process.env.PORT || 8081
http.createServer(app).listen(port)
console.log('Server Running on port: ' + port)
