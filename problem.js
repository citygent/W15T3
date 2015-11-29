'use strict'

var http = require('http')
var mongodb = require('mongodb')
var ObjectId = mongodb.ObjectId
var url = 'mongodb://localhost:27017/pinipa_exercise_blog'
var port = 8000

var server = http.createServer(function requestHandler (req, res) {
  console.log(req.method, req.url)

  if(req.url !== '/comments') {
    res.writeHead(200, {'Content-Type': 'application/json'})
    var json = {
      Document: "Blank JSON" // trololol
    }
    res.end(JSON.stringify(json))
  } else {
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(result))
  }
})

var result;

mongodb.MongoClient.connect(url, {}, function (err, connection) {
  if (err) throw err;

  connection.collection('comments').find().toArray(function(err, commentData){
      // var i;
      // for (i=0; i < data.length; i++) {
      //   dataArray.push(data[i]);
      // }
      // connection.close;
      result = commentData;
    })
  connection.close;
})

server.listen(port, function (){
  console.log('listening on port %d', port)
});
