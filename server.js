'use strict'

const path = require('path')
const express = require('express')
const http = require('http')
const mongo = require('mongodb').MongoClient
const cors = require('cors')

const app = express()

const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/data'

app.use(express.static(__dirname))
app.use(cors())

function fetchpolls (sortby, callback){
  let fakeData = {
    date: 1430784000,
    user:{
      username: 'rvalmassoi',
      ip: '192.168.1.1'
    },
    data:{
      title: 'new title',
      options: ['option1', 'option2', 'option 3'],
      results: [0, 1, 3]
    }
  }

  /*mongo.connect(sortby, (err, db) => {
    if (err) throw err
    let polls = db.collection('polls')
    polls.toArray((err, data) => {
      if (err) throw err
      console.log("data:" + data)
      callback(data)
      db.close()
    })
  })*/
  callback(fakeData)
}

app.get('/api/polls', (req, res) => {
  // let params = req.params.param
  fetchpolls("date", (data) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    let json = JSON.stringify(data)
    res.end(json)
  })
})

app.get('*', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('404!')
})

const port = process.env.PORT || 8081
http.createServer(app).listen(port)
console.log('Server Running on port: ' + port)
