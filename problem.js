'use strict'

var http = require('http')
var mongodb = require('mongodb')
var ObjectId = mongodb.ObjectId
var url = 'mongodb://localhost:27017/pinipa_exercise_blog'
var port = 8000

var server = http.createServer(function requestHandler (req, res) {
  // console.log(req.method, req.url)

  if(req.url !== '/comments') {
    res.writeHead(200, {'Content-Type': 'application/json'})
    var json = JSON.stringify({
      Document: "Blank JSON" 
    })
    res.end(json)
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end('<html><head><title>Works?</title></head><body>It only fucking works!!</body></html>')
  }
})

mongodb.MongoClient.connect(url, {}, function (err, connection) {
  connection.collection('comments').find().each(function(err, data){console.log(data)})

  server.listen(port, function () {
    console.log('listening on port %d', port)
  })
})

