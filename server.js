'use strict'

const path = require('path')
const express = require('express')
const http = require('http')
const mongo = require('mongodb').MongoClient

const app = express()

const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/data'

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.sendFile('/public/index.html')
})

app.get('*', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('404!')
})

const port = process.env.PORT || 8080
http.createServer(app).listen(port)
console.log('Server Running on port: ' + port)
